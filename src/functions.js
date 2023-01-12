import {getDataset as getIrisDataset} from 'ml-dataset-iris';

// Delay func for simulating data loading process
// const delay = ms => new Promise(res => setTimeout(res, ms));
//
//
//
// window.getValidData = async () => {
//     await delay(1000);
//
//     return {
//         x: [1999, 2000, 2001, 2002],
//         y: [10, 15, 13, 17],
//     };
// }
//
// window.getAnotherValidData = async () => {
//     await delay(1000);
//
//     return {
//         x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//         y: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     };
// }
//
// window.getInvalidData = async () => {
//     await delay(2000);
//
//     return [
//         [1,2,3]
//     ];
// }
//
// window.syncFn = () => {
//     return [
//         [1,2,3],
//         [4,5,6]
//     ];
// }


/**
 * A function that returns an IRIS flower dataset
 * More info: https://github.com/mljs/dataset-iris
 * @returns {(number | string)[][]}
 */
window.loadIrisDataset = async () => {
    return getIrisDataset();
}