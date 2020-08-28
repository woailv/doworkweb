import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import api from './middleware/api'
import rootReducer from './reducers'
import {loadUser} from "./actions";
import { createLogger } from 'redux-logger'

let store = createStore(
    rootReducer,
    applyMiddleware(createLogger(),thunk, api)
)

store.dispatch(loadUser("abc"))

ReactDOM.render(
    <p>aaa</p>,
    document.getElementById('root')
);

