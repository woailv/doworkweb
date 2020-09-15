import React, {Component} from 'react';
import {Form, Input, Button} from "antd";
import {withRouter} from "react-router-dom";
import {API_ROOT} from "../middleware/api";

const FormItem = Form.Item;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "857951500@qq.com",
            pwd: "123",
        };
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
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
                    <Button style={{"marginTop":"5px"}}>获取验证码</Button>
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
                    label="验证码"
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

                <FormItem style={{textAlign: "center"}}>
                    <Button onClick={() => {
                        this.props.history.push("login")
                    }}>{"< 登录"}</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={() => {
                        this.props.history.push("register")
                    }}>注册</Button>
                </FormItem>
            </Form>
        </div>)
    }
}

export default Register