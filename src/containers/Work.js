import React, {Component} from 'react';
import WorkItem from "../components/WorkItem";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectCurrentPage, workDel, workList, workSetBelongDate, workSetCompleted} from "../actions";
import WorkHead from "../components/WorkHead";
import {Spin, Col, Row, Pagination} from "antd";
import Nav from "./Nav";
import WorkQuery from "./WorkQuery";

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
        this.props.workList()
    }

    render() {
        let {total, list, isFetching} = this.props
        return (
            <div>
                {isFetching ? <div style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                }}><Spin/></div> : ""}
                <Nav/>
                <Row>
                    <Col span={3}>
                        <WorkQuery/>
                    </Col>
                    <Col span={20}>
                        <WorkHead/>
                        <div style={{paddingBottom: "15px"}}>
                            {list ? list.map((item, index) => (<WorkItem key={item.id} workItem={item}
                                                                         del={() => {
                                                                             this.props.workDel(item.id)
                                                                         }}
                                                                         setCompleted={() => {
                                                                             this.props.setCompleted({
                                                                                 id: item.id,
                                                                                 completed: !item.completed
                                                                             })
                                                                         }}
                                                                         setBelongDate={(date) => {
                                                                             this.props.setBelongDate(item.id, date)
                                                                         }}
                            />)) : "没有数据"}
                        </div>
                        <Pagination current={this.props.currentPage} onChange={(page) => {
                            this.props.selectCurrentPage(page)
                            this.props.workList()
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
        currentPage: state.work ? state.work.currentPage : 1,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        workList: () => dispatch(workList()),
        workDel: (id) => dispatch(workDel(id)),
        selectCurrentPage: (currentPage) => dispatch(selectCurrentPage(currentPage)),
        setCompleted: (work) => dispatch(workSetCompleted(work)),
        setBelongDate: (id, date) => dispatch(workSetBelongDate({id, belong_date: date})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)