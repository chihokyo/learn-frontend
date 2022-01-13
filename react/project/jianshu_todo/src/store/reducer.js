/**
 * 本事这个模块是一个对象。包含了无数个状态
 */

// 引入store → action 自定义常量
import { CHANGE_INPUT_VALUE, ADD_LIST_VALUE, DELETE_LIST_VALUE, INIT_LIST_ACTION } from './actionTypes'

const defaultState = {
    inputValue: '',
    list: []
}


export default (state = defaultState, action) => {
    // action ：表示传过来的action
    // state ：整个store的全部数据
    console.log(state, action)
    if (action.type === CHANGE_INPUT_VALUE) {
        // 深拷贝
        // 因为reducer只能接受state，决不能修改state
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        // → 这里返回给了store
        return newState
    }

    if (action.type === ADD_LIST_VALUE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue = ''
        return newState
    }

    if (action.type === DELETE_LIST_VALUE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
    }

    if (action.type === INIT_LIST_ACTION ) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list = action.data
        return newState
    }

    return state
}