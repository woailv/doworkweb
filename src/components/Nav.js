import React, {Component} from 'react';
import {Menu} from 'antd';
import {Link,withRouter} from "react-router-dom";


class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {current: "work"};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState(state => ({
            current: e.key
        }));
    }

    render() {
        return (
            <Menu onClick={this.handleClick}
                  mode="horizontal"
                  selectedKeys={[this.state.current]}
            >
                <Menu.Item key="work">
                    <Link to="/">work</Link>
                </Menu.Item>
                <Menu.Item key="note">
                    <Link to="/note">note</Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default  Nav

