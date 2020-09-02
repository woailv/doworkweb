import React from 'react';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';
import Nav from "../components/Nav";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Head from "../components/Head";
import Work from "./Work";

const App = () => (
    <Router>
        <Nav/>
        <Row>
            <Col style={{backgroundColor: "#eff"}} span={3}>
                查询区
            </Col>
            <Col span={21}>
                <Row style={{backgroundColor: "#ffe"}}>
                    <Head/>
                </Row>
                <Row>
                    <Switch>
                        <Route exact path="/" children={<Work/>}/>
                        <Route path="/note" children={"noteToDo"}/>
                    </Switch>
                </Row>
            </Col>
        </Row>
    </Router>
)


export default App