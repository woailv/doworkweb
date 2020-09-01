import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import api from './middleware/api'
import rootReducer from './reducers'
import {login, noteAdd, noteList} from "./actions";
import {createLogger} from 'redux-logger'
import App from "./containers/App";

let store = createStore(
    rootReducer,
    applyMiddleware(thunk, api, createLogger()),//createLogger放在api后才能记录api产生的数据
)

// store.dispatch(login("user1", "123"))
// store.dispatch(noteAdd({
//     "id": 1,
//     "text": "text1",
//     "title": "title1"
// }))
// store.dispatch(noteList())

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
