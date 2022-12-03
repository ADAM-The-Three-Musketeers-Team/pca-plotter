import { Matrix } from 'ml-matrix';


https://www.turing.com/kb/guide-to-principal-component-analysis
export function getPcaResults(dataset) {
    // get last items, which should be names
    let datasetNames = dataset.map((el) => {
        return el[el.length-1];
    });

    // console.log(datasetNames);

    // get all elements except the last one (which is name)
    let datasetValues = dataset.map((el) => {
        return el.slice(0,-1)
    });

    let matrixDataset = getMatrix(datasetValues);

    matrixDataset = centerDataset(matrixDataset)
    console.log(matrixDataset);


    let results = {x:[], y:[], z:[], k:[]};

    matrixDataset.to2DArray().forEach((el, index) => {
        results.x[index] = el[0];
        results.y[index] = el[1];

    })

    return results;
}


function centerDataset(matrixDataset) {
    // TODO: validate if matrixDataset is a Matrix
    if(!matrixDataset instanceof Matrix) {
        throw ("matrixDataset should be an instance of a Matrix");
    }

    // subtract each column's mean from each value of the column
    for(let colIndex = 0; colIndex < matrixDataset.columns; colIndex++) {
        let column = matrixDataset.getColumnVector(colIndex);

        column.sub(column.mean());
        matrixDataset.setColumn(colIndex, column);
    }

    return matrixDataset;
}

function getMatrix(dataset) {
    return new Matrix(dataset)
}

