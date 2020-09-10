import * as ActionTypes from '../actions'
import {combineReducers} from 'redux'

//修改数据结果
const modifyInfo = (state = null, action) => {
    const {type, data, response} = action
    if (type === ActionTypes.RESET_MODIFY_INFO) {
        return null
    } else if (data) {
        return data ? (response ? (response.code === 1 ? data + "成功" : data + "失败" + response.msg) : data) : null
    }
    return state
}

// 错误信息状态
const errorMessage = (state = null, action) => {
    const {type, error} = action
    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }
    return state
}

const update = ({types}) => {
    if (!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.')
    }

    const [requestType, successType, failureType] = types

    const updateData = (state = {
        isFetching: false,
    }, action) => {
        switch (action.type) {
            case requestType:
                return {
                    ...state,
                    isFetching: true
                }
            case successType:
                let data = action.response
                return {
                    ...state,
                    isFetching: false,
                    data: data,
                }
            case failureType:
                return {
                    ...state,
                    isFetching: false
                }
            default:
                return state
        }
    }

    return (state = {}, action) => {
        switch (action.type) {
            case requestType:
            case successType:
            case failureType:
                return {
                    ...state,
                    ...updateData(state, action)
                }
            default:
                let {modify} = action
                if (modify !== undefined && state.data !== undefined && state.data.data !== undefined && state.data.data.list !== undefined) {
                    if (action.response !== undefined && action.response.code === 1) {
                        state.data.data.list = modify(state.data.data.list)
                    }
                }
                return state
        }
    }
}

const rootReducer = combineReducers({
    login: update({
        types: [
            ActionTypes.LOGIN_REQUEST,
            ActionTypes.LOGIN_SUCCESS,
            ActionTypes.LOGIN_FAILURE,
        ]
    }),
    workList: update({
        types: [
            ActionTypes.WORK_LIST_REQUEST,
            ActionTypes.WORK_LIST_SUCCESS,
            ActionTypes.WORK_LIST_FAILURE,
        ]
    }),
    errorMessage,
    modifyInfo,
})

export default rootReducer
