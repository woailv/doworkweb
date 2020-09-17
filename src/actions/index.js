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
export const workList = (page) => (dispatch, getState) => {
    // if (getState().work.desc === "work新建" || getState().work.desc === "work修改内容") {
    //     return
    // }
    return dispatch({
        [CALL_API]: {
            types: workActions,
            endpoint: `/api/work/list`,
            method: POST,
            body: getState().work.query ? getState().work.query : {},
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

//work修改所属日期
export const workSetBelongDate = (data) => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: workActions,
            endpoint: `/api/work/setBelongDate`,
            method: POST,
            body: data,
        },
        desc: "work修改所属日期",
        modify: (state, response) => {
            state.data.list.map((v, k) => {
                state.data.list[k].belong_date = v.id === data.id ? data.belong_date : state.data.list[k].belong_date
            })
            return state
        }
    })
}

//改变查询条件
export const selectCompletedStatus = (completed) => {
    return {
        desc: "改变完成状态查询条件",
        type: WORK_SUCCESS,
        modify: (state) => {
            if (completed == null) {
                if (state.query) {
                    delete state.query["completed"]
                }
                return state
            } else {
                return {...state, query: {...state.query, completed: completed}}
            }
        }
    }
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

//退出登录
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const logout = () => (dispatch) => {
    return dispatch({
        [CALL_API]: {
            types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
            endpoint: `/api/user/logout`,
            method: GET,
        },
    })
}