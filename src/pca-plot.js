import ShadowStylesStr from "./css/shadow-style.css?inline";
import {DataVis} from "./data-vis.js";
import {getPcaResults} from "./pca/pca.js";
import Plotly from "plotly.js-dist";
import {round} from "mathjs";

class PcaPlot extends DataVis {
    trace = {
        x: [],
        y: [],
        name: 'no name',
        color: '#000',
        type: 'scatter',
        mode: 'markers',
        marker: {
            size: 12
        },
    };

    constructor() {
        super(ShadowStylesStr); // pass css string as an argument
    }

    /**
     * Gets data from dataLoader function, validates it and
     * saves validated data to the "data" class field
     */
    async validateData() {
        let data = await this.dataLoaderFn();

        // all array elements should have homogeneous structure (same size and types)
        let coordinateTypes = [];

        // save each datapoint type
        data[0].forEach((el, index) => {
            coordinateTypes[index] = typeof el;
        })

        let dataPointLength = data[0].length;

        let dataPointsHaveSameTypes = true;
        let dataPointsLengthsAreEqual = true;
        let lastDataPointElementIsAString = typeof data[0][dataPointLength-1] === 'string';


        // console.log(data[0]);

        data.forEach((dataPoint, dataPointIndex) => {
            if(!dataPointsHaveSameTypes) {
                return false;
            }
            // console.log(dataPoint);

            // check length
            if(dataPoint.length !== dataPointLength) {
                // console.log(dataPoint.length + " !== " + dataPointLength);
                dataPointsLengthsAreEqual = false;
                return false;
            }

            dataPoint.forEach((coordinate, coordinateIndex) => {

                // check types
                if(typeof coordinate !== coordinateTypes[coordinateIndex]) {
                    // console.log(typeof coordinate + " !== " + coordinateTypes[coordinateIndex]);
                    dataPointsHaveSameTypes = false;
                    return false;
                }

            });

        });

        // console.log(dataPointsHaveSameTypes ,dataPointsLengthsAreEqual)
        let errorMessages = [];

        if(!dataPointsHaveSameTypes) {
            errorMessages.push("data points should be of the same type")
        }

        if(!dataPointsLengthsAreEqual) {
            errorMessages.push("all data point should be of the same length (have same number of dimensions)")
        }

        if(!lastDataPointElementIsAString) {
            errorMessages.push("last data point element should be string and represent a datapoint title")
        }

        if (errorMessages.length !== 0) {
            this.displayError(
                'Data format error',
                errorMessages.join("\n")
            );
        }

        // last array element should be the sample name;


        //
        // let areAxisDefined = (data.x !== undefined && data.y !== undefined);
        // let isCoordinatesNumberEqual = (data.x?.length === data.y?.length);
        //
        // let dataIsValid = areAxisDefined && isCoordinatesNumberEqual;
        //
        // if(dataIsValid) {
            this.data = data;
        // } else {
        //     this.displayError(
        //         'Data format error',
        //         'data loader function returns data in invalid format'
        //     );
        // }
    }


    /**
     * Analyses and visualises data from the "data" class field
     */
    analyzeAndVisualizeData() {
        let results = getPcaResults(this.data);
        console.log("results:", results);
        let uniqueNames = results.name.filter(onlyUnique);

        let colorsList = [
            'rgb(255, 0, 0)',
            'rgb(0, 255, 0)',
            'rgb(0, 0, 255)',
            'rgb(255, 255, 0)',
            'rgb(255, 0, 255)',
            'rgb(0, 255, 255)',
            'rgb(0, 0, 0)',
        ]

        let traces = [];

        for(let index = 0; index < results.x.length; index++) {
            let name = results.name[index];
            let x = results.x[index];
            let y = results.y[index];

            if(traces[uniqueNames.indexOf(name)] === undefined) {
                let newTrace = JSON.parse(JSON.stringify(this.trace)); // deep copy an object
                newTrace.name = name;
                newTrace.color = colorsList[uniqueNames.indexOf(name)];

                traces[uniqueNames.indexOf(name)] = newTrace;
            }

            traces[uniqueNames.indexOf(name)].x.push(x)
            traces[uniqueNames.indexOf(name)].y.push(y)
        }


        let layout = {
            title: 'PCA plot',
            showLegend: true,
            legend: {
                x: 0,
                y: 1,
                traceorder: 'normal',
                font: {
                    family: 'sans-serif',
                    size: 12,
                    color: '#000'
                },
                bgcolor: '#E2E2E2',
                bordercolor: '#FFFFFF',
                borderwidth: 2
            },
            hovermode: 'closest',
            xaxis: {
                title: {
                    text: `PC-1 (fraction of variance explained: ${results.fractionsExplained["byX"].toFixed(3)})`,
                }
            },
            yaxis: {
                hoverformat: ',',
                title: {
                    text: `PC-2 (fraction of variance explained: ${results.fractionsExplained["byY"].toFixed(3)})`,
                }
            }
        }
        round
        let config = {
            scrollZoom: true,
            displayModeBar: false,
        }


        Plotly.newPlot(this.plotSpace, traces, layout, config);
        // this.plotSpace.innerHTML = this.data;
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

/**
 * Binds the PcaPlot class to the <pca-plot> tag, when the page is loaded
 */
window.addEventListener('load', () => {
    window.customElements.define('pca-plot', PcaPlot);
})
