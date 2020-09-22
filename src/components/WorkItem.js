import React from 'react';
import {DatePicker, Popconfirm, Button, Checkbox} from "antd";
import {Link} from "react-router-dom";
import moment from "moment-timezone";

const ButtonGroup = Button.Group;

const WorkItem = ({workItem, del, setCompleted, setBelongDate}) => {
    return (
        workItem ? (<div style={{
            paddingBottom: "5px",
            paddingTop: "15px",
            borderBottom: "1px solid rgb(110, 50, 200)",
        }}>
            <div>

                <DatePicker style={{"border": "none", "width": "105px"}} size={"small"}
                            defaultValue={moment(workItem.belong_date)}
                            onChange={(_, str) => {
                                setBelongDate(str)
                            }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            </div>
            <div style={{marginTop: "10px"}}>
                <Checkbox
                    onChange={() => {
                        setCompleted()
                    }}
                    checked={workItem.completed}
                />
                &nbsp;&nbsp;&nbsp;
                <span>{workItem.text}</span>
                <Link style={{float: "right"}} to={{pathname: "/work/add", state: workItem}}>编辑</Link>
                <div style={{float: "right"}}>
                    <Popconfirm title="确定要删除吗？" cancelText={"取消"} okText={"确定"}
                                onConfirm={() => del()}>
                        <a style={{"paddingLeft": "5px", "paddingRight": "5px"}} href="#">删除</a>
                    </Popconfirm>
                </div>
            </div>
        </div>) : ""
    )
}

export default WorkItem