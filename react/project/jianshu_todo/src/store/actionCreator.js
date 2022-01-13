import { CHANGE_INPUT_VALUE, ADD_LIST_VALUE, DELETE_LIST_VALUE, INIT_LIST_ACTION } from './actionTypes'
import axios from 'axios'

// 帮忙创建一个type等于CHANGE_INPUT_VALUE的action
// 小括号里面包含大括号表示返回是一个对象
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

// 获取异步数据
export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

// 当使用中间件的时候 不仅仅是可以使用对象，还可以引入函数

export const getTodoList = () => {
  // return 正常来说是对象， 使用thunk可以使用函数
  return (dispatch) => {
    axios.get('/api/todolist.json')
      .then((res) => {
        const data = res.data
        const action = initListAction(data)
        dispatch(action)
      })
      .catch((error) => {
        console.log( error + 'error')
      })
  }
}