import {covariance, Matrix} from 'ml-matrix';
import { eigs } from 'mathjs'


// https://www.turing.com/kb/guide-to-principal-component-analysis
// https://www.kaggle.com/code/shrutimechlearn/step-by-step-pca-with-iris-dataset/notebook
// https://wiki.pathmind.com/eigenvector#covariance
export function getPcaResults(dataset) {
    // get last items, which should be names
    let datasetNames = dataset.map((el) => {
        return el[el.length-1];
    });

    // get all elements except the last one (which is name)
    let datasetValues = dataset.map((el) => {
        // alternative: change this column to a number representing title
        return el.slice(0,-1)
    });

    let matrixDataset = getMatrix(datasetValues);

    let standardisedDataset = standardise(matrixDataset)
    let covarianceMatrix = getCovarianceMatrix(standardisedDataset);
    let principalComponents = getPrincipalComponents(covarianceMatrix);

    let finalDataset = standardisedDataset.mmul(principalComponents.vectors);

    // to get data losses: sum all eigenvalues and use it as 100%
    // then find how much % each eigenvalue represents

    let results = {
        fractionsExplained: {
            byX: principalComponents.values[1],
            byY: principalComponents.values[0],
        },
        x:[],
        y:[],
        name:[]
    };

    finalDataset.to2DArray().forEach((el, index) => {
        results.x[index] = el[1];
        results.y[index] = el[0];
        results.name[index] = datasetNames[index];
    })

    return results;
}

/**
 * The range of variables is calculated and standardized in this process to analyze the contribution of each variable equally.
 * Calculating the initial variables will help categorize the variables that are dominating the other variables of small ranges.
 * This will help attain biased results at the end of the analysis.
 * Formula to transform the variables of the same standard:
 * z = (value - mean) / standard deviation
 *
 * @param matrixDataset
 */

function standardise(matrixDataset) {
    // TODO: validate if matrixDataset is a Matrix
    if(!matrixDataset instanceof Matrix) {
        throw ("matrixDataset should be an instance of a Matrix");
    }

    // subtract each column's mean from each value of the column
    for(let colIndex = 0; colIndex < matrixDataset.columns; colIndex++) {
        let column = matrixDataset.getColumnVector(colIndex);

        column.sub(column.mean()) // subtract column's mean value from each element of the column

        column.divide(column.standardDeviation()) // divide each column's element by standard deviation

        matrixDataset.setColumn(colIndex, column);
    }

    return matrixDataset;
}

/**
 *
 * @param standardizedMatrixDataset
 */
function getCovarianceMatrix(standardizedMatrixDataset) {
    return covariance(standardizedMatrixDataset);
}

/**
 * Returns an object with feature vectors and values,
 * that describe fraction of variance explained by each principal component
 * @param covarianceMatrix
 * @returns {{vectors: Matrix, values: *[]}}
 */
function getPrincipalComponents(covarianceMatrix) {
    // values and vectors are already sorted in INCREASING order by the library
    let eigenObj = eigs(covarianceMatrix.to2DArray());

    // get the last 2 values and make them our new basis
    let lastItemIndex = eigenObj.vectors.length-1;

    return {
        values: [
            eigenObj.values[lastItemIndex],
            eigenObj.values[lastItemIndex - 1]
        ],
        vectors: new Matrix([
                   eigenObj.vectors[lastItemIndex],
                   eigenObj.vectors[lastItemIndex - 1]
               ]).transpose()
    };
}

function getVarianceFractions(covarianceMatrix) {
    let lastItemIndex = eigenObj.vectors.length-1;

    return new Matrix([
        eigenObj.vectors[lastItemIndex],
        eigenObj.vectors[lastItemIndex - 1]
    ]).transpose();
}

function getMatrix(dataset) {
    return new Matrix(dataset)
}

