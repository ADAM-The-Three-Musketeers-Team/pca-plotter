import ShadowStylesStr from "./css/shadow-style.css?inline";
import {DataVis} from "./data-vis.js";
import {getPcaResults} from "./pca/pca.js";
import Plotly from "plotly.js-dist";

class PcaPlot extends DataVis {
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


        console.log(data[0]);

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
        // let results = getPcaResults(this.data);
        // console.log(results);
        //
        // let data = [{
        //     x: results.x,
        //     y: results.y,
        //     type: 'scatter',
        //     mode: 'markers',
        //     marker: { size: 12 }
        // }];
        //
        // let layout = {
        //     title: 'Scatter plot example',
        //     // showLegend: false
        // }
        //
        // let config = {
        //     scrollZoom: true,
        //     displayModeBar: false,
        // }
        //
        //
        // Plotly.newPlot(this.plotSpace, data, layout, config);
        // this.plotSpace.innerHTML = this.data;
    }
}

/**
 * Binds the ScatterPlot class to the <scatter-plot> tag, when the page is loaded
 */
window.addEventListener('load', () => {
    window.customElements.define('pca-plot', PcaPlot);
})
