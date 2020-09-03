import React, {Component} from 'react';
import WorkItem from "../components/WorkItem";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {noteList} from "../actions";
import WorkHead from "../components/WorkHead";
import {Col, Row} from "antd";

class Work extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired,
        list: PropTypes.array,
        isFetching: PropTypes.bool,
        load: PropTypes.func,
    }

    componentDidMount() {
        this.props.load()
    }

    render() {
        let {total, list, isFetching} = this.props
        return (
            <Row>
                <Col style={{backgroundColor: "#eff"}} span={3}>
                </Col>

                <Col>
                    <WorkHead/>
                    {isFetching ? "正在获取数据..." : ""}
                    <div>
                        {list ? list.map((item, index) => (<WorkItem workItem={item}/>)) : "没有数据"}
                    </div>
                    <p>筛选出 {total ? total : 0} 条</p>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.notesList ? (state.notesList.data ? state.notesList.data.data.list : []) : [],
        total: state.notesList ? (state.notesList.data ? state.notesList.data.data.total : 0) : 0,
        isFetching: state.notesList ? state.notesList.isFetching : false,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => dispatch(noteList("note")),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)