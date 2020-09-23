import React from 'react';
import {Form, Input, Button} from "antd";
import {withRouter} from "react-router-dom";
import {API_ROOT} from "../middleware/api";

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "test",
            pwd: "123",
        };
    }

    render() {
        return (
            <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                minHeight: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
            }}>
                <Form style={{width: "300px", margin: "0 auto"}}>
                    <FormItem
                        label="邮箱"
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
                               onPressEnter={this.login()}
                        />
                    </FormItem>

                    <FormItem
                        label="密码"
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
                               onPressEnter={this.login()}
                        />
                    </FormItem>

                    <FormItem style={{textAlign: "center"}}>
                        <Button type="primary"
                                onClick={this.login()}
                        >登录</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button onClick={() => {
                            this.props.history.push("register")
                        }}>{"注册 >"}</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

    login() {
        return () => {
            fetch(API_ROOT + "/api/user/login",
                {
                    method: "POST",
                    body: JSON.stringify({email: this.state.email, pwd: this.state.pwd}),
                    credentials: "include",
                },
            ).then(
                response => response.json().then(
                    json => {
                        if (!response.ok) {
                            return Promise.reject(json)
                        }
                        return Object.assign({}, {...json})
                    }
                )
            ).then(response => {
                if (response.code === 1) {
                    this.props.history.push("/")
                } else {
                    alert(response.msg)
                }
            })
        };
    }
}

export default withRouter(Login)