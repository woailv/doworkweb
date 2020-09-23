import React from 'react';
import 'antd/dist/antd.css';
import {HashRouter as Router, Redirect, Switch, Route} from "react-router-dom";
import Work from "../containers/Work";
import WorkAdd from "../containers/WorkAdd";
import {Provider} from 'react-redux'
import Login from "./Login";
import Register from "./Register";
import Note from "./Note";
import Nav from "../containers/Nav";

const App = ({store}) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route path="" children={
                    <Router>
                        <Nav/>
                        <Switch>
                            <Route exact path={"/"}>
                                <Redirect to="/work"/>
                            </Route>
                            <Route exact path="/work" component={Work}/>
                            <Route path="/work/add" component={WorkAdd}/>
                            <Route path="/note" component={Note}/>
                        </Switch>
                    </Router>
                }/>
            </Switch>
        </Router>
    </Provider>
)

/*
* work
* 笔记
* 备忘录
* 便签
* 讨论主题(团队层面)
* */

export default App