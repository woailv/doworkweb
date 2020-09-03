import React from 'react';
import 'antd/dist/antd.css';
import Nav from "../components/Nav";
import {connect} from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Work from "./Work";
import WorkAdd from "./WorkAdd";
import {Provider} from 'react-redux'

const App = ({store}) => (
    <Provider store={store}>
        <Router>
            <Nav/>
            <Switch>
                <Route exact path="/" component={Work}/>
                <Route exact path="/work" component={Work}/>
                <Route path="/work/add" children={WorkAdd}/>
            </Switch>
        </Router>
    </Provider>
)

export default App