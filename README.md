# Team information
#### Group name: The Three Musketeers
#### Project name: Principal Component Analysis and Visualization
#### Team members:
- **Lucas Theiss (201774)**
- **Illia Kremenenko (2201348)**
- **Swathi Kamalapuram(2192327)**

Demo version with the IRIS dataset can be viewed [here](https://adam-the-three-musketeers-team.github.io/)

# Usage

## How to run the project

This project uses [Vite](https://vitejs.dev/)

First, install dependencies by running:
```
npm install
```

To run a local server type in console:
```
npm run dev
```

## Other available commands:

Build the project and compile all assets
```
npm run build
```

Preview the built version with browser-sync (live reload) (building may take some time so it's better to preview the changes before actually building the project)
```
npm run preview
```

---

## How to upload your dataset

Define your own **async** function in JS that will return the data you want to analyze.
The data should have a [specific format](#Data-format)
The [functions.js](./src/functions.js) is already imported. 
You can define your own function there. 
If you decide to define your own JS-file 
then you'll need to import in [main.js](./src/functions.js) like so:

```js
import "./myFunctionsFile.js" 
```

### Data format
Data should be an array of arrays. Each sub-array should contain 
the data points to be analyzed, with the **last element being a string**,
containing a group name

An example of such array:
```js
[
    [5.1, 3.5, 1.4, 0.2, 'setosa'],
    [4.9, 3, 1.4, 0.2, 'setosa'],
    [4.7, 3.2, 1.3, 0.2, 'setosa'],
    [5.6, 2.7, 4.2, 1.3, 'versicolor'],
    [5.7, 3, 4.2, 1.2, 'versicolor'],
    [5.7, 2.9, 4.2, 1.3, 'versicolor'],
    [6.3, 3.3, 6, 2.5, 'virginica'], 
    [5.8, 2.7, 5.1, 1.9, 'virginica'],
    [7.1, 3, 5.9, 2.1, 'virginica'],
    ...
]
```

---

## How to visualize data
1. Include main.js file at the bottom of your html file. 
    ```html
    <script type="module" src="src/main.js"></script>
    ```
2. Add a ``<pca-plot>`` html-element where you want the plot to be displayed.
The ``dataLoader`` attribute should contain the **name of the function**, that
return the data to be analyzed and visualized
    ```html
    <pca-plot dataLoader="loadIrisDataset"></pca-plot>
    ```
3. Preview and build your solution, as described in the [how to run the project](#How-to-run-the-project) segment
4. Upload the files from [dist](dist) directory to any web-server

Example [index.html](index.html) file is included in the repository

---

## Styling

All styles can be found in the [css](src/css) folder.

[shadow-style.css](src/css/shadow-style.css) is used to style the elements inside Shadow DOM. A Shadow DOM is hidden so you can not access it directly.

[style.css](src/css/style.css) is just a normal CSS file used for styling the page. The only difference is that It is imported inside [main.js](src/main.js) file.