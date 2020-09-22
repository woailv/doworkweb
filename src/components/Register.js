import React, {Component} from 'react';
import {Form, Input, Button, message} from "antd";
import {withRouter} from "react-router-dom";
import {API_ROOT} from "../middleware/api";
import {POST} from "../actions";

const FormItem = Form.Item;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "857951500@qq.com",
            pwd: "123",
            pwdSure: "123",
            code: "",
            btnCodeText: "获取验证码",
            counter: 0,
        };
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        return (<div style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            minHeight: "100%",
            height: "auto",
            display: "flex",
            alignItems: "center",
        }}>
            <Form horizontal style={{width: "300px", margin: "0 auto"}}>
                <FormItem
                    label="邮箱"
                    {...formItemLayout}
                >
                    <Input defaultValue={this.state.email}
                           onChange={
                               (event) => {
                                   event.persist()
                                   this.setState(state => {
                                           return {email: event.target.value}
                                       }
                                   )
                               }
                           }
                    />
                    <Button disabled={this.state.counter !== 0} onClick={() => {
                        fetch(API_ROOT + "/api/user/registerEmailKey", {
                            method: POST,
                            body: JSON.stringify({email: this.state.email}),
                        }).then(
                            response => {
                                response.json().then(
                                    response => {
                                        message.info("获取验证码成功")
                                        this.setState(state => ({
                                            counter: 60,
                                        }))
                                        let timer = setInterval(() => {
                                            this.setState(state => {
                                                if (state.counter === 0) {
                                                    clearInterval(timer)
                                                    return
                                                }
                                                return {counter: state.counter - 1,}
                                            })
                                        }, 1000)
                                    }
                                )
                            },
                            error => {
                                message.error("验证码获取失败")
                            })
                    }}
                            style={{"marginTop": "5px"}}
                    >
                        {this.state.btnCodeText}<span>{this.state.counter > 0 ? this.state.counter : ""}</span>
                    </Button>
                </FormItem>

                <FormItem
                    label="密码"
                    {...formItemLayout}
                >
                    <Input type="password" defaultValue={this.state.pwd} autoComplete="off"
                           onChange={
                               (event) => {
                                   event.persist()
                                   this.setState(state => {
                                           return {pwd: event.target.value}
                                       }
                                   )
                               }
                           }
                    />
                </FormItem>
                <FormItem
                    label="确认密码"
                    {...formItemLayout}
                >
                    <Input type="password" defaultValue={this.state.pwdSure} autoComplete="off"
                           onChange={
                               (event) => {
                                   event.persist()
                                   this.setState(state => {
                                           return {pwdSure: event.target.value}
                                       }
                                   )
                               }
                           }
                    />
                </FormItem>
                <FormItem
                    label="验证码"
                    {...formItemLayout}
                >
                    <Input defaultValue={this.state.code} autoComplete="off"
                           onChange={
                               (event) => {
                                   event.persist()
                                   this.setState(state => {
                                           return {code: event.target.value}
                                       }
                                   )
                               }
                           }
                    />
                </FormItem>

                <FormItem style={{textAlign: "center"}}>
                    <Button onClick={() => {
                        this.props.history.push("login")
                    }}>{"< 登录"}</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={() => {
                        if (this.state.pwd !== this.state.pwdSure) {
                            message.warn("密码不一致")
                            return
                        }
                        fetch(API_ROOT + "/api/user/register", {
                            method: POST,
                            body: JSON.stringify({
                                code: this.state.code,
                                email: this.state.email,
                                pwd: this.state.pwd,
                            }),
                        }).then(
                            response => {
                                response.json().then(
                                    json => {
                                        if (json.code === 1) {
                                            message.info("注册成功")
                                            this.props.history.push("login")
                                        } else {
                                            message.error(json.msg)
                                        }
                                    },
                                    error => {
                                        message.error(error)
                                    }
                                )
                            },
                            error => {
                                message.error("注册失败")
                            }
                        )
                    }}>注册</Button>
                </FormItem>
            </Form>
        </div>)
    }
}

export default Register