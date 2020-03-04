# TSM

## Setup

1. Install [Node.js](https://nodejs.org/en/ 'Node.js') (LTS).
    ```
    node -v
    ```
2. Install [Yarn](https://yarnpkg.com/).
    ```
    yarn -v
    ```
3. Clone [repository](https://github.com/AlexeyTryapko/tsm):
    ```
    git clone git@github.com:AlexeyTryapko/tsm.git
    ```
4. Go to project directory
    ```
    cd tsm
    ```
5. Install dependenies
    ```
    yarn
    ```

## Scripts

### `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn electron`

Runs the app in development mode in Electron.

### `yarn electron-pack:linux`

Builds the app for linux production to the `dist` folder.

### `yarn electron-pack:win`

Builds the app for windows production to the `dist` folder.
