import * as ActionTypes from '../actions'
import {combineReducers} from 'redux'

const update = ({types}) => {
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
            default:
                return state
        }
    }
}

const rootReducer = combineReducers({
    work: update({
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
