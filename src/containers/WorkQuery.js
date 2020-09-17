import React from 'react';
import {Radio, DatePicker} from "antd";
import {connect} from "react-redux"
import {selectCompletedStatus} from "../actions";

const RadioGroup = Radio.Group;

const WorkQuery = ({selectCompleted}) => {
    return (
        <div style={{marginTop: "10px", marginLeft: "10px"}}>
            <RadioGroup onChange={(event) => {
                selectCompleted(event.target.value)
            }}>
                <Radio key="a" value={null}>全部</Radio>
                <Radio key="b" value={false}>未完成</Radio>
                <Radio key="c" value={true}>已完成</Radio>
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

export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {
            selectCompleted: (completed) => dispatch(selectCompletedStatus(completed))
        }
    }
)(WorkQuery)