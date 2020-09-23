import React from 'react';
import {Button, Col, Input} from 'antd';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux"
import {workAdd, setText} from "../actions";
import Nav from "./Nav";

const WorkAdd = ({save, location, history}) => {
    let {state} = location
    let text;
    return (
        <div>
            <Col style={{"marginTop":"30px"}} span={22} offset={1}>
                <Input defaultValue={state && state.text} style={{height: "200px"}} type="textarea"
                       autosize={{minRows: 2, maxRows: 6}}
                       onChange={(event) => {
                           text = event.target.value
                       }}
                       onPressEnter={() => {
                           save(text, state ? state.id : 0).then(
                               history.push("/work")
                           )
                       }}
                />
                <Button type="primary"
                        onClick={() => {
                            save(text, state ? state.id : 0).then(
                                history.push("/work")
                            )
                        }}
                >
                    保存
                </Button>
            </Col>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        save: (text, id) => {
            if (text === "" || text === undefined) {
                return Promise.reject()
            }
            return id ? dispatch(setText({id, text})) : dispatch(workAdd(text))
        }
    }
}

export default withRouter(connect((state) => {
    return state
}, mapDispatchToProps)(WorkAdd))