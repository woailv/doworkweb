import React, {Component} from 'react';
import WorkItem from "../components/WorkItem";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {workDel, workList, workSetCompleted} from "../actions";
import WorkHead from "../components/WorkHead";
import {Col, Row, Pagination} from "antd";
import Nav from "./Nav";

class Work extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired,
        list: PropTypes.array,
        isFetching: PropTypes.bool,
        load: PropTypes.func,
        del: PropTypes.func,
        setCompleted: PropTypes.func,
    }

    componentDidMount() {
        this.props.load(1)
    }

    render() {
        let {total, list, isFetching} = this.props
        return (
            <div>
                <Nav/>
                <Row>
                    <Col span={3}>
                    </Col>

                    <Col span={20}>
                        <WorkHead/>
                        {/*{isFetching ? "正在获取数据..." : ""}*/}
                        <div style={{paddingBottom: "15px"}}>
                            {list ? list.map((item, index) => (<WorkItem key={item.id} workItem={item}
                                                                         del={() => {
                                                                             this.props.del(item.id)
                                                                         }}
                                                                         setCompleted={() => {
                                                                             this.props.setCompleted({
                                                                                 id: item.id,
                                                                                 completed: !item.completed
                                                                             })
                                                                         }}
                            />)) : "没有数据"}
                        </div>
                        <Pagination onChange={(page) => {
                            this.props.load(page)
                        }} simple total={total ? total : 1}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.work ? (state.work.data ? state.work.data.list : []) : [],
        total: state.work ? (state.work.data ? state.work.data.total : 0) : 0,
        isFetching: state.work ? state.work.isFetching : false,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (page) => dispatch(workList("note", page)),
        del: (id) => dispatch(workDel(id)),
        setCompleted: (work) => dispatch(workSetCompleted(work)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)