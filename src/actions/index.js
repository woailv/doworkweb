import {CALL_API} from '../middleware/api'

export let POST = "POST"
export let GET = "GET";

export const MODIFY_DATA = "MODIFY_DATA"
export const MODIFY_SUCCESS = "MODIFY_SUCCESS"
export const MODIFY_FAILURE = "MODIFY_FAILURE"
export const RESET_MODIFY_INFO = "RESET_MODIFY_INFO"

//隐藏正在请求api的状态信息
export const resetModifyInfo = () => ({
    type: RESET_MODIFY_INFO
})

//work新建
export const workAdd = (text) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [MODIFY_DATA, MODIFY_SUCCESS, MODIFY_FAILURE],
            endpoint: `/api/work/add`,
            method: POST,
            body: {text: text},
        },
        data: "work新建",
    })
}

//work列表
export const WORK_LIST_REQUEST = 'WORK_LIST_REQUEST'
export const WORK_LIST_SUCCESS = 'WORK_LIST_SUCCESS'
export const WORK_LIST_FAILURE = 'WORK_LIST_FAILURE'
export const workList = (data, page) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [WORK_LIST_REQUEST, WORK_LIST_SUCCESS, WORK_LIST_FAILURE],
            endpoint: `/api/work/list`,
            method: POST,
            body: data,
            page: page,
        },
        modify: (list) => {
            return list.map((v) => {
                return v
            })
        }
    })
}

//work删除
export const WORK_DEL_REQUEST = 'WORK_DEL_REQUEST'
export const WORK_DEL_SUCCESS = 'WORK_DEL_SUCCESS'
export const WORK_DEL_FAILURE = 'WORK_DEL_FAILURE'
export const workDel = (id) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [WORK_DEL_REQUEST, WORK_DEL_SUCCESS, WORK_DEL_FAILURE],
            endpoint: `/api/work/del`,
            method: POST,
            body: {id: id},
        },
    })
}

//work更新
export const WORK_UPDATE_REQUEST = 'WORK_UPDATE_REQUEST'
export const WORK_UPDATE_SUCCESS = 'WORK_UPDATE_SUCCESS'
export const WORK_UPDATE_FAILURE = 'WORK_UPDATE_FAILURE'
export const workUpdate = (data) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [WORK_UPDATE_REQUEST, WORK_UPDATE_SUCCESS, WORK_UPDATE_FAILURE],
            endpoint: `/api/work/setText`,
            method: POST,
            body: data,
        },
    })
}

//work修改完成状态
export const WORK_SET_COMPLETED_REQUEST = 'WORK_SET_COMPLETED_REQUEST'
export const WORK_SET_COMPLETED_SUCCESS = 'WORK_SET_COMPLETED_SUCCESS'
export const WORK_SET_COMPLETED_FAILURE = 'WORK_SET_COMPLETED_FAILURE'
export const workSetCompleted = (data) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [WORK_SET_COMPLETED_REQUEST, WORK_SET_COMPLETED_SUCCESS, WORK_SET_COMPLETED_FAILURE],
            endpoint: `/api/work/setCompleted`,
            method: POST,
            body: data,
        },
        data: "work修改完成状态",
        modify: (list) => {
            return list.map((v) => {
                return {...v, completed: v.id == data.id ? data.completed : v.completed}
            })
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


//隐藏错误信息
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})