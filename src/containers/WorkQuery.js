import React from 'react';
import {Radio, DatePicker, Button} from "antd";

const RadioGroup = Radio.Group;

const WorkQuery = () => {
    return (
        <div style={{marginTop: "10px", marginLeft: "10px"}}>
            <RadioGroup>
                <Radio key="a" value={1}>全部</Radio>
                <Radio key="b" value={2}>未完成</Radio>
                <Radio key="c" value={3}>已完成</Radio>
            </RadioGroup>
            <div>
                <DatePicker style={{"marginTop": "10px"}}
                            placeholder="开始日期"
                />
                <br/>
                <DatePicker style={{"marginTop": "10px"}}
                            placeholder="结束日期"
                />
            </div>
        </div>
    )
}

export default WorkQuery