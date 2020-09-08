import React, {Component} from 'react';
import {Button} from 'antd';
import {Link} from "react-router-dom";

class WorkHead extends Component {
    render() {
        return (
            <div style={{paddingBottom: "10px", paddingTop: "10px"}}>
                <Button type="primary"><Link to="/work/add">＋ 记录</Link></Button>
            </div>
        );
    }
}

export default WorkHead