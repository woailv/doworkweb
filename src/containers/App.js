import React from 'react';
import 'antd/dist/antd.css';
import Nav from "./Nav";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Work from "./Work";
import WorkAdd from "./WorkAdd";
import {Provider} from 'react-redux'
import Login from "../components/Login";

const App = ({store}) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/" component={Work}/>
                <Route exact path="/work" component={Work}/>
                <Route path="/work/add" children={WorkAdd}/>
            </Switch>
        </Router>
    </Provider>
)

export default App