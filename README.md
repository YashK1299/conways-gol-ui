# [Conway's Game Of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

This is the implementation of Conway's Game Of Life frontend, and uses React, Javascript, HTML, CSS to utilize following REST API endpoints to provide a GUI for the required features of the game:

1. PUT /gameoflife/editGameBoardSize
2. PUT /gameoflife/randomGame
3. PUT /gameoflife/toggleCell
4. GET /gameoflife/gameBoard
5. PUT /gameoflife/nextGen
6. GET /gameoflife/isGameOver
7. PUT /gameoflife/resetGame

These endpoints can be provided by a front end server to access all the in game functionality.

## Problem Statement

* Implement Conway's Game of Life (http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
* Implementation should utilize Java and Maven(used Maven) or Gradle for the back end server, which should communicate with the front end via REST.
* Create GUI or output; you are free to decide how to do it (used React). Please make sure there is communication between your back end and front end.

## Contents of the [repository](https://github.com/YashK1299/conways-gol-backend)

* [Source Code](src/)
* Find example Backend(using React) code [here](https://github.com/YashK1299/conways-gol-backend)

## How to run

* Clone and unzip the repository in your workspace
* Navigate to the repository
* Run the following command from the root of your directory to start the server on your localhost:

```shell
npm start
```

## Development Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

```npm start```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```npm test```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```npm run build```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```npm run eject```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
