import React from 'react';
import {Button} from "antd";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;

const WorkItem = ({workItem, del}) => {
    return (
        workItem ? (<div style={{
            paddingBottom: "5px",
            paddingTop: "15px",
            borderBottom: "medium solid rgb(110, 50, 200)",
        }}>
            <div>
                <span>{workItem.time_view}</span>
                <ButtonGroup size="small">
                    <Button type="primary" onClick={() => del()}>删除</Button>
                    <Button type="primary">
                        <Link to={{pathname: "/work/add", state: workItem}}>编辑</Link>
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                <span>{workItem.text}</span>
            </div>
        </div>) : ""
    )
}

export default WorkItem