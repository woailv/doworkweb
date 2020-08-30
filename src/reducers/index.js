import * as ActionTypes from '../actions'
import {combineReducers} from 'redux'
import union from "lodash/union";

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

const update = ({types, key}) => {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.')
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.')
    }
    if (typeof key !== 'string') {
        throw new Error('Expected key is a string.')
    }

    const [requestType, successType, failureType] = types

    const updateData = (state = {
        isFetching: false,
        pageCount: 0,
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
                    pageCount: state.pageCount,
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
                    // [key]: updateData(state[key], action)
                    ...updateData(state[key], action)
                }
            default:
                return state
        }
    }
}

// Updates the pagination data for different actions.
const data = combineReducers({
    users: update({
        key: "user",
        types: [
            ActionTypes.USER_REQUEST,
            ActionTypes.USER_SUCCESS,
            ActionTypes.USER_FAILURE,
        ]
    })
    // starredByUser: update({
    //     mapActionToKey: action => action.login,
    //     types: [
    //         ActionTypes.STARRED_REQUEST,
    //         ActionTypes.STARRED_SUCCESS,
    //         ActionTypes.STARRED_FAILURE
    //     ]
    // }),
    // stargazersByRepo: update({
    //     mapActionToKey: action => action.fullName,
    //     types: [
    //         // ActionTypes.STARGAZERS_REQUEST,
    //         // ActionTypes.STARGAZERS_SUCCESS,
    //         // ActionTypes.STARGAZERS_FAILURE
    //     ]
    // })
})

const rootReducer = combineReducers({
    data,
    errorMessage,
})

export default rootReducer
