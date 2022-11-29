import { Matrix } from 'ml-matrix';



export function getPcaResults(dataset) {
    console.log();
    return;
    let matrixDataset = getMatrix(dataset);
    console.log(matrixDataset);
    matrixDataset = centerDataset(matrixDataset)



    let results = {x:[], y:[]};

    dataset.forEach((el, index) => {
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

    findMean(matrixDataset);

    let centeredDataset = [];
    return centeredDataset;
}

function findMean(matrixDataset) {
    return matrixDataset.mean();
}

function getMatrix(dataset) {
    return new Matrix(dataset)
}

