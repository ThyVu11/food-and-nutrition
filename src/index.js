import React from 'react';
import {createRoot} from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './redux/reducers'; // imports ./redux/reducers/index.js
import rootSaga from './redux/sagas'; // imports ./redux/sagas/index.js
import App from './App/App';

import { createTheme , ThemeProvider } from '@mui/material/styles';


const sagaMiddleware = createSagaMiddleware();
const root = createRoot(document.getElementById('react-root'));


const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewareList),
);

sagaMiddleware.run(rootSaga);

const theme = createTheme({
  typography: {
    fontFamily: ['"Quicksand"', "sans-serif"].join(","),
    button: {
      fontFamily: ['"Quicksand"', "sans-serif"].join(","),
      fontWeight: 400,
      fontSize: "0.975rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "inherit",
    },
    
  },
  palette: {
    primary: { main: "#b4967290" },
    // be8664, c38523 dark yellow
    secondary: { main: "#354739dc" },
    // 524f4a
    text:{
      primary:  "#524f4a" ,
      secondary: "#524f4a" ,

    }
  }, 
  
  

});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
);

serviceWorker.register();
