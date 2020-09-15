import { CHANGE_INPUT_VALUE, ADD_LIST_VALUE, DELETE_LIST_VALUE } from './actionTypes'

// 帮忙创建一个type等于CHANGE_INPUT_VALUE的action
export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
})

// 如法炮制
export const getBtnClickAction = () => ({
    type: ADD_LIST_VALUE
})

// 如法炮制
export const getdeleteItemAction = (index) => ({
    type: DELETE_LIST_VALUE,
    index
})