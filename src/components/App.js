import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Work from "../containers/Work";
import WorkAdd from "../containers/WorkAdd";
import {Provider} from 'react-redux'
import Login from "./Login";
import Register from "./Register";

const App = ({store}) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/" component={Work}/>
                <Route exact path="/work" component={Work}/>
                <Route path="/work/add" children={WorkAdd}/>
            </Switch>
        </Router>
    </Provider>
)

/*
* work
* 笔记
* 备忘录
* 便签
* */

export default App