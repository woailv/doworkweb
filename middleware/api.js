import {normalize, schema} from 'normalizr'
import {camelizeKeys} from 'humps'

const API_ROOT = 'https://api.github.com/'

const callApi = (endpoint, schema) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint//拼接完整请求路径
    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }
                return Object.assign({}, {json}
                )
            })
        )
}

export const CALL_API = 'Call API'

export default store => next => action => {
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {endpoint} = callAPI
    const {types} = callAPI
    //动态计算请求路径
    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }
    if (typeof endpoint !== 'string') {
        throw new Error('调用url只能为string')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('须包含3种请求状态requestType(请求中)、successType(成功)、failureType(失败)')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('action中的types中的元素须为string')
    }
    //修改提交action中的type与数据并删除types
    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({type: requestType}))//请求中

    return callApi(endpoint, schema).then(
        response => next(actionWith({//成功
            response,
            type: successType
        })),
        error => next(actionWith({//失败
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
}
