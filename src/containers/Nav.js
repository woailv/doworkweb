import React, {Component} from 'react';
import {Button, Menu} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from "../actions";

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {current: this.props.location.pathname === "/" ? "/work" : this.props.location.pathname};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState(state => ({
            current: e.key
        }));
    }

    render() {
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    mode="horizontal"
                    selectedKeys={[this.state.current]}
                >
                    <Menu.Item key="/work">
                        <Link to="/work">work</Link>
                    </Menu.Item>
                    <Menu.Item key="/note">
                        <Link to="/note">note</Link>
                    </Menu.Item>
                </Menu>

                <Button style={{float: "right", marginTop: "-35px", marginRight: "10px"}} size="small"
                        onClick={() => {
                            this.props.logout().then(() => {
                                this.props.history.push("/login")
                            })
                        }}
                >退出</Button>
            </div>
        );
    }
}

export default withRouter(connect((state) => {
}, (dispatch) => {
    return {
        logout: () => {
            return dispatch(logout())
        }
    }
})(Nav))

