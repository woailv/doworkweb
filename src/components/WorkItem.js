import React from 'react';
import {Button} from "antd";

const ButtonGroup = Button.Group;

const WorkItem = ({workItem, del}) => {
    return (
        workItem ? (<div>
            <div>
                <span>{workItem.time_view}</span>
                <ButtonGroup size="small">
                    <Button type="primary" onClick={() => del()}>删除</Button>
                    <Button type="primary">编辑</Button>
                </ButtonGroup>
            </div>
            <div>
                <span>{workItem.text}</span>
            </div>
        </div>) : ""
    )
}

export default WorkItem