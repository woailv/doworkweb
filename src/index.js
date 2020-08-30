import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import api from './middleware/api'
import rootReducer from './reducers'
import {loadUser} from "./actions";
import { createLogger } from 'redux-logger'
import DevTools from './containers/DevTools'

let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, api, createLogger()),
        DevTools.instrument()
    )
)

store.dispatch(loadUser("abc"))

ReactDOM.render(
    <p>aaa</p>,
    document.getElementById('root')
);

