import React from 'react';
import {Button, Input} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux"
import {noteAdd} from "../actions";

const WorkAdd = ({save}) => {
    let text;
    return (
        <div>
            <Input style={{height: "200px"}} type="textarea" autosize={{minRows: 2, maxRows: 6}} onChange={(event) => {
                text = event.target.value
            }}/>
            <Button type="primary" onClick={() => {
                save(text)
            }}>
                <Link to="/work">保存</Link>
            </Button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        save: (text) => {
            dispatch(noteAdd(text))
        }
    }
}

export default withRouter(connect((state)=>{},mapDispatchToProps)(WorkAdd))