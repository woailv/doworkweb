import React from 'react';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';
import Nav from "../components/Nav";

const App = () => (
    <div>
        <Row>
            <Col style={{backgroundColor: "#ddd"}} span={2}/>
            <Col span={20}>
                <Nav/>
                content
            </Col>
            <Col style={{backgroundColor: "#ddd"}} span={2}/>
        </Row>
    </div>
)

export default App