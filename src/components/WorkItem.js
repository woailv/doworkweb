import React from 'react';
import {DatePicker, Popconfirm, Button, Checkbox} from "antd";
import {Link} from "react-router-dom";
import moment from "moment-timezone";

const ButtonGroup = Button.Group;

const WorkItem = ({workItem, del, setCompleted}) => {
    return (
        workItem ? (<div style={{
            paddingBottom: "5px",
            paddingTop: "15px",
            borderBottom: "medium solid rgb(110, 50, 200)",
        }}>
            <div>
                <Checkbox
                    onChange={() => {
                        setCompleted()
                    }}
                    checked={workItem.completed}
                >
                    {workItem.completed ? "已完成" : "未完成"}
                </Checkbox>
                <DatePicker defaultValue={moment(workItem.belong_date)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <ButtonGroup size="small">
                    <Popconfirm title="确定要删除吗？" cancelText={"取消"} okText={"确定"} onConfirm={() => del()}>
                        <a style={{"paddingLeft": "5px", "paddingRight": "5px"}} href="#">删除</a>
                    </Popconfirm>
                    <a>
                        <Link to={{pathname: "/work/add", state: workItem}}>编辑</Link>
                    </a>
                </ButtonGroup>
            </div>
            <div style={{marginTop: "10px"}}>
                <span>{workItem.text}</span>
            </div>
        </div>) : ""
    )
}

export default WorkItem