import {CALL_API} from '../middleware/api'

export let POST = "POST"
export let GET = "GET";

export const MODIFY_DATA = "MODIFY_DATA"
export const MODIFY_RESULT = "MODIFY_SUCCESS"
export const MODIFY_FAILURE = "MODIFY_FAILURE"
export const RESET_MODIFY_INFO = "RESET_MODIFY_INFO"

//隐藏正在请求api的状态信息
export const resetModifyInfo = () => ({
    type: RESET_MODIFY_INFO
})

//note新建
export const NOTE_ADD_REQUEST = 'NOTE_ADD_REQUEST'
export const noteAdd = (text) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [MODIFY_DATA, MODIFY_RESULT, MODIFY_FAILURE],
            endpoint: `/api/note/add`,
            method: POST,
            body: {text: text},
        },
        data: "note新建",
    })
}

//note列表
export const NOTE_LIST_REQUEST = 'NOTE_LIST_REQUEST'
export const NOTE_LIST_SUCCESS = 'NOTE_LIST_SUCCESS'
export const NOTE_LIST_FAILURE = 'NOTE_LIST_FAILURE'
export const noteList = (data, page) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_LIST_FAILURE],
            endpoint: `/api/note/list`,
            method: POST,
            body: data,
            page: page,
        },
    })
}

//note删除
export const NOTE_DEL_REQUEST = 'NOTE_Del_REQUEST'
export const NOTE_DEL_SUCCESS = 'NOTE_Del_SUCCESS'
export const NOTE_DEL_FAILURE = 'NOTE_Del_FAILURE'
export const noteDel = (id) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [NOTE_DEL_REQUEST, NOTE_DEL_SUCCESS, NOTE_DEL_FAILURE],
            endpoint: `/api/note/del`,
            method: POST,
            body: {id: id},
        },
        needRefresh: true,
        refresh: noteList(null, 1)
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


//隐藏错误信息
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})