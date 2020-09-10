import React, {Component} from 'react';
import WorkItem from "../components/WorkItem";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {workDel, workList} from "../actions";
import WorkHead from "../components/WorkHead";
import {Col, Row, Pagination} from "antd";

class Work extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired,
        list: PropTypes.array,
        isFetching: PropTypes.bool,
        load: PropTypes.func,
        del: PropTypes.func,
    }

    componentDidMount() {
        this.props.load(1)
    }

    render() {
        let {total, list, isFetching} = this.props
        return (
            <Row>
                <Col span={3}>
                </Col>

                <Col span={20}>
                    <WorkHead/>
                    {isFetching ? "正在获取数据..." : ""}
                    <div style={{paddingBottom: "15px"}}>
                        {list ? list.map((item, index) => (<WorkItem key={item.id} workItem={item} del={() => {
                            this.props.del(item.id)
                        }}/>)) : "没有数据"}
                    </div>
                    <Pagination onChange={(page) => {
                        this.props.load(page)
                    }} simple total={total ? total : 1}/>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.workList ? (state.workList.data ? state.workList.data.data.list : []) : [],
        total: state.workList ? (state.workList.data ? state.workList.data.data.total : 0) : 0,
        isFetching: state.workList ? state.workList.isFetching : false,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (page) => dispatch(workList("note", page)),
        del: (id) => dispatch(workDel(id)).then(() => dispatch(workList("note", 1))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)