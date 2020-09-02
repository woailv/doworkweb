import React from 'react';

const WorkItem = ({workItem}) => {
    return (
        workItem ? (<div>
            <span>text:{workItem.text}</span>,
            <span>time:{workItem.time_view}</span>
        </div>) : ""
    )
}

export default WorkItem