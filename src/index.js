import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createStore} from "redux";
import allReducers from "./reducers/";
import { Provider } from 'react-redux';
const store=createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())




ReactDOM.render(
  <Provider store={store}>
  <Router>
    <App />
    </Router>
    
    </Provider>
    ,

  document.getElementById('root')
);

