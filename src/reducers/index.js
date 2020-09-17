import * as ActionTypes from '../actions'
import {combineReducers} from 'redux'
import {LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../actions";

const stateAction = ({types}) => {
    const [requestType, successType, failureType] = types
    return (state = {}, action) => {
        let {modify, serverFail, requestFail} = action
        switch (action.type) {
            case requestType:
                return {
                    ...state,
                    isFetching: true,
                    desc: action.desc
                }
            case successType:
                if (!action.response) {
                    if (modify) {
                        return {...modify(state), isFetching: false}
                    }
                }
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
            //退出登录清空数据
            case LOGOUT_REQUEST:
                return {}
            case LOGOUT_SUCCESS:
                return {}
            default:
                return state
        }
    }
}

const rootReducer = combineReducers({
    work: stateAction({
        types: [
            ActionTypes.WORK_REQUEST,
            ActionTypes.WORK_SUCCESS,
            ActionTypes.WORK_FAILURE,
        ]
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
