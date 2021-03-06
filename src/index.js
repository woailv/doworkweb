import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import api from './middleware/api'
import rootReducer from './reducers'
import {createLogger} from 'redux-logger'
import App from "./components/App";
import {login} from "./actions";

let store = createStore(
    rootReducer,
    applyMiddleware(thunk, api, createLogger()),//createLogger放在api后才能记录api产生的数据
)

ReactDOM.render(
    <App store={store}/>,
    // <p>a</p>,
    document.getElementById('root')
);
