import * as ActionTypes from '../actions'
import {combineReducers} from 'redux'

const update = ({types}) => {
    const [requestType, successType, failureType] = types
    return (state = {}, action) => {
        let {modify} = action
        switch (action.type) {
            case requestType:
                return {
                    ...state,
                    isFetching: true,
                    desc: action.desc
                }
            case successType:
                let data = action.response
                if (modify) {
                    return {...modify(state, action.response), isFetching: false}
                }
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
