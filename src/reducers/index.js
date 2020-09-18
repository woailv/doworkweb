import * as ActionTypes from '../actions'
import {combineReducers} from 'redux'
import {LOGOUT_REQUEST, LOGOUT_SUCCESS, WORK_SYNC_ACTION} from "../actions";

const defState = {query: {}, currentPage: 1, data: {list: [], total: 0}}
const listState = ({types, syncAction}) => {
    const [requestType, successType, failureType] = types
    return (state = defState, action) => {
        let {modify, serverFail, requestFail} = action
        switch (action.type) {
            case requestType:
                return {
                    ...state,
                    isFetching: true,
                    desc: action.desc
                }
            case successType:
                if (action.response.code === 1) {
                    if (modify) {
                        return {...modify(state, action.response), isFetching: false}
                    }
                    return {
                        ...state,
                        isFetching: false,
                        data: action.response,
                    }
                } else {
                    if (serverFail) {
                        serverFail(action.response.msg)
                    }
                    return {
                        ...state,
                        isFetching: false
                    }
                }
            case failureType:
                if (requestFail) {
                    requestFail(state.desc)
                }
                return {
                    ...state,
                    isFetching: false
                }
            case syncAction:
                return {...modify(state), isFetching: false}
            //退出登录清空数据
            case LOGOUT_SUCCESS:
                return defState
            default:
                return state
        }
    }
}

const rootReducer = combineReducers({
    work: listState({
        types: [
            ActionTypes.WORK_REQUEST,
            ActionTypes.WORK_SUCCESS,
            ActionTypes.WORK_FAILURE,
        ],
        syncAction: WORK_SYNC_ACTION,
    }),
    // login: update({
    //     types: [
    //         ActionTypes.LOGIN_REQUEST,
    //         ActionTypes.LOGIN_SUCCESS,
    //         ActionTypes.LOGIN_FAILURE,
    //     ]
    // }),
    // errorMessage,
    // modifyInfo,
})

export default rootReducer
