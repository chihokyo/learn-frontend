import React, { Component } from 'react';
import TodoListUI from './TodoListUI'
// 引入数据
import store from './store/index'
// 引入antd样式
import 'antd/dist/antd.css';

import { getInputChangeAction, getBtnClickAction, getdeleteItemAction, getTodoList } from './store/actionCreator'

// 引入正常使用方法 actionCreator
// import { getInputChangeAction } from './store/actionCreator'

class NewTodolist extends Component {

  constructor(props) {
    super(props)
    // store.getState() 获得最新数据
    // console.log(store.getState())
    this.state = store.getState()
    this.setState({})
    // console.log(this.state)
    // 订阅了 store的改变 handleStoreChange 自动执行
    store.subscribe(this.handleStoreChange)
  }

  handleInputChange = (e) => {
    // // 初级用法
    // const action = {
    //   type: CHANGE_INPUT_VALUE,
    //   value: e.target.value
    // }
    // // store会自动穿法给reducer
    // store.dispatch(action)

    // 进阶用法
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)

  }

  handleStoreChange = () => {
    // 一旦感知到了数据store的变化，就重新从store里面获取最新的数据
    // 替换掉之后就是最新的数据
    this.setState(store.getState())
  }

  handleBtnClick = () => {
    // const action = {
    //   type: ADD_LIST_VALUE
    // }

    const action = getBtnClickAction()
    // 发送信号
    store.dispatch(action)
  }

  handleDeleteItem(index) {
    // const action = {
    //   type: DELETE_LIST_VALUE,
    //   index
    // }

    const action = getdeleteItemAction(index)
    store.dispatch(action)
  }

  // 处理异步ajax请求
  componentDidMount () {
    // axios.get('/api/todolist.json')
    // .then((res)=>{
    //   const data = res.data
    //   const action = initListAction(data)
    //   store.dispatch(action)
    // })
    // .catch((error)=>{
    //   console.log('error')
    // })
    const action = getTodoList()
    // action里面的函数会被自动执行。
    store.dispatch(action)
  }

  render() {
    return (
    <TodoListUI 
      inputValue = {this.state.inputValue}
      list = {this.state.list}
      handleInputChange = {this.handleInputChange}
      handleBtnClick = {this.handleBtnClick}
      handleDeleteItem = {this.handleDeleteItem}
    />
    )
  }
}


export default NewTodolist;