import React, {Component} from 'react';
import {Menu} from 'antd';

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
                    Work
                </Menu.Item>
                <Menu.Item key="note">
                    笔记
                </Menu.Item>
            </Menu>
        );
    }
}

export default Nav