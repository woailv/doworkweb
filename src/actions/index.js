import {CALL_API} from '../middleware/api'

export let POST = "POST"
export let GET = "GET";

//note新建
export const NOTE_ADD_REQUEST = 'NOTE_ADD_REQUEST'
export const NOTE_ADD_SUCCESS = 'NOTE_ADD_SUCCESS'
export const NOTE_ADD_FAILURE = 'NOTE_ADD_FAILURE'
export const noteAdd = (data) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            endpoint: `/api/note/add`,
            method: POST,
            body: data,
        },
    })
}

//note列表
export const NOTE_LIST_REQUEST = 'NOTE_LIST_REQUEST'
export const NOTE_LIST_SUCCESS = 'NOTE_LIST_SUCCESS'
export const NOTE_LIST_FAILURE = 'NOTE_LIST_FAILURE'
export const noteList = (data) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_LIST_FAILURE],
            endpoint: `/api/note/list`,
            method: POST,
            body: data,
        },
    })
}

//登录
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const login = (uid, pwd) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            endpoint: `/api/user/login`,
            method: POST,
            body: {
                uid,
                pwd,
            },
        },
    })
}

//正在请求api的状态信息
export const RESET_REQUEST_MESSAGE = "RESET_REQUEST_MESSAGE"


//不显示错误信息
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})