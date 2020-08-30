import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import api from './middleware/api'
import rootReducer from './reducers'
import {loadUser, login} from "./actions";
import {createLogger} from 'redux-logger'

let store = createStore(
    rootReducer,
    applyMiddleware(thunk, api, createLogger()),//createLogger放在api后才能记录api产生的数据
)

store.dispatch(login("user1","123"))

ReactDOM.render(
    <div>
        <p>aaa</p>
    </div>,
    document.getElementById('root')
);

