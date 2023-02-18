import {getDataset as getIrisDataset} from 'ml-dataset-iris';

/**
 * A function that returns an IRIS flower dataset
 * More info: https://github.com/mljs/dataset-iris
 * @returns {(number | string)[][]}
 */
window.loadIrisDataset = async () => {
    return getIrisDataset();
}