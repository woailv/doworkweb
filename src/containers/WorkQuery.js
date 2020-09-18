import React from 'react';
import {Radio, DatePicker} from "antd";
import {connect} from "react-redux"
import {selectCompletedStatus, selectCurrentPage, selectEndTime, selectStartTime, workList} from "../actions";
import moment from "moment-timezone";

const RadioGroup = Radio.Group;

const WorkQuery = ({selectEndTime, endTime, selectStartTime, startTime, completed, selectCompleted, workList, selectCurrentPage}) => {
    return (
        <div style={{marginTop: "10px", marginLeft: "10px"}}>
            <RadioGroup
                onChange={(event) => {
                    selectCurrentPage()
                    selectCompleted(event.target.value)
                    workList()
                }}
                value={completed}
            >
                <Radio key="a" value={undefined}>全部</Radio>
                <Radio key="b" value={false}>未完成</Radio>
                <Radio key="c" value={true}>已完成</Radio>
            </RadioGroup>
            <div>
                <DatePicker
                    style={{"marginTop": "10px"}}
                    placeholder="开始日期"
                    value={startTime}
                    onChange={(mmt) => {
                        selectStartTime(mmt)
                        workList()
                    }}
                />
                <br/>
                <DatePicker
                    style={{"marginTop": "10px"}}
                    placeholder="结束日期"
                    value={endTime}
                    onChange={(mmt) => {
                        selectEndTime(mmt)
                        workList()
                    }}
                />
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            endTime: state.work.query.end_time,
            startTime: state.work.query.start_time,
            completed: state.work.query.completed
        }
    },
    (dispatch) => {
        return {
            workList: () => dispatch(workList()),
            selectCurrentPage: () => dispatch(selectCurrentPage(1)),
            selectEndTime: (str) => dispatch(selectEndTime(str)),
            selectStartTime: (str) => dispatch(selectStartTime(str)),
            selectCompleted: (completed) => dispatch(selectCompletedStatus(completed)),
        }
    }
)(WorkQuery)