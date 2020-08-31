import * as ActionTypes from '../actions'
import {combineReducers} from 'redux'

//修改数据结果
const modifyInfo = (state = null, action) => {
    const {type, data} = action
    if (type === ActionTypes.RESET_MODIFY_INFO) {
        return null
    } else if (data) {
        return data
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
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.')
    }
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
                return {
                    ...state,
                    isFetching: false,
                    data: action.response,
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
        // Update pagination by key
        switch (action.type) {
            case requestType:
            case successType:
            case failureType:
                return {
                    ...state,
                    ...updateData(state, action)
                }
            default:
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
    notesList: update({
        types: [
            ActionTypes.NOTE_LIST_REQUEST,
            ActionTypes.NOTE_LIST_SUCCESS,
            ActionTypes.NOTE_LIST_FAILURE,
        ]
    }),
    errorMessage,
    modifyInfo,
})

export default rootReducer
