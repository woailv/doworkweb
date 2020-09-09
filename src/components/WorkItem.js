import React from 'react';
import {Popconfirm, Button, Checkbox} from "antd";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;

const WorkItem = ({workItem, del}) => {
    let completed = false
    return (
        workItem ? (<div style={{
            paddingBottom: "5px",
            paddingTop: "15px",
            borderBottom: "medium solid rgb(110, 50, 200)",
        }}>
            <div>
                <Checkbox
                    onChange={() => {
                        completed = !completed
                    }}>
                    {completed ? "已完成" : "未完成"}
                </Checkbox>
                <span>{workItem.time_view}</span>
                <ButtonGroup size="small">
                    <Popconfirm title="确定要删除吗？" cancelText={"取消"} okText={"确定"} onConfirm={() => del()}>
                        <a style={{"paddingLeft": "5px", "paddingRight": "5px"}} href="#">删除</a>
                    </Popconfirm>
                    <a>
                        <Link to={{pathname: "/work/add", state: workItem}}>编辑</Link>
                    </a>
                </ButtonGroup>
            </div>
            <div>
                <span>{workItem.text}</span>
            </div>
        </div>) : ""
    )
}

export default WorkItem