import {CALL_API} from '../middleware/api'


//不显示错误信息
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})


//调用api示例
export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'
const fetchUser = login => ({
    [CALL_API]: {
        types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
        endpoint: `users/${login}`,
    }
})

//获取单个对象示例
export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
    const user = getState().entities.users[login]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
        return null
    }
    return dispatch(fetchUser(login))
}

export const STARRED_REQUEST = 'STARRED_REQUEST'
export const STARRED_SUCCESS = 'STARRED_SUCCESS'
export const STARRED_FAILURE = 'STARRED_FAILURE'
const fetchStarred = (login, nextPageUrl) => ({
    login,
    [CALL_API]: {
        types: [STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE],
        endpoint: nextPageUrl,
    }
})

//获取列表示例
export const loadStarred = (login, nextPage) => (dispatch, getState) => {
    const {
        nextPageUrl = `users/${login}/starred`,
        pageCount = 0
    } = getState().pagination.starredByUser[login] || {}

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchStarred(login, nextPageUrl))
}
