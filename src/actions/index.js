import {CALL_API} from '../middleware/api'

export let POST = "POST"
export let GET = "GET";


export const WORK_REQUEST = 'WORK_REQUEST'
export const WORK_SUCCESS = 'WORK_SUCCESS'
export const WORK_FAILURE = 'WORK_FAILURE'

const workActions = [WORK_REQUEST, WORK_SUCCESS, WORK_FAILURE]

//work新建
export const workAdd = (text) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: workActions,
            endpoint: `/api/work/add`,
            method: POST,
            body: {text: text},
        },
        desc: "work新建",
        modify: (state, response) => {
            state.data.list = state.data.list ? [response.data, ...state.data.list] : [response.data]
            return {...state}
        }
    })
}

//work列表
export const workList = (data, page) => (dispatch, getState) => {
    if (getState().work.desc === "work新建" || getState().work.desc === "work修改内容") {
        return
    }
    return dispatch({
        [CALL_API]: {
            types: workActions,
            endpoint: `/api/work/list`,
            method: POST,
            body: data,
            page: page,
        },
        desc: "work列表",
        modify: (state, response) => {
            return {...state, data: response.data}
        }
    })
}

//work删除
export const workDel = (id) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: workActions,
            endpoint: `/api/work/del`,
            method: POST,
            body: {id: id},
        },
        desc: "work删除",
        modify: (state, response) => {
            state.data.list.splice(state.data.list.findIndex(item => item.id === id), 1)
            return {...state}
        }
    })
}

//work修改内容
export const setText = (data) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: workActions,
            endpoint: `/api/work/setText`,
            method: POST,
            body: data,
        },
        desc: "work修改内容",
        modify: (state, response) => {
            state.data.list = state.data.list.map((v) => {
                return v.id === data.id ? {...v, text: data.text} : v
            })
            return {...state}
        }
    })
}

//work修改完成状态
export const workSetCompleted = (data) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: workActions,
            endpoint: `/api/work/setCompleted`,
            method: POST,
            body: data,
        },
        desc: "work修改完成状态",
        modify: (state, response) => {
            state.data.list.map((v, k) => {
                state.data.list[k].completed = v.id === data.id ? data.completed : state.data.list[k].completed
            })
            return state
        }
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

