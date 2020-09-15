import React, { Component, Fragment } from 'react';
// import { Component } from 'react'
// 等价于
// import React from 'react'
// const Component = React.Component

import axios from 'axios'
import TodoItem from './TodoItem'
// 脚手架里面可以直接引入css
import './style.css'

class TodoList extends Component {

  // 最优先执行 初始化函数
  constructor(props) {
    // 调用Component的构造函数
    super(props)
    // 组件状态
    this.state = {
      inputValue: '',
      list: []
    }
  }

  /**
   * 
   * !!这里的指向很重要 还可以使用箭头函数也可以进行改变
   */

  handleChange = (e) => {
    // console.log(e)
    // DOM节点
    // console.log(e.target)
    // console.log(e.target.value)
    // this.state.inputValue = e.target.value

    // this.setState({
    //   inputValue: e.target.value
    // })

    // 使用ref
    // 这样直接操作dom的方法其实并不推崇，还是直接使用数据驱动dom比较好。
    const value = this.input.value
    this.setState({
      inputValue: value
    })
  }

  handleChange2(e) {
    // 优化前
    // this.setState({
    //   inputValue: e.target.value
    // })

    // // 优化后1
    // const value = e.target.value  
    // this.setState(()=>{
    //   return {
    //     inputValue: value
    //   }
    // })

    // 优化后2
    const value = e.target.value
    this.setState(() => ({
      inputValue: value
    }))

  }

  handleBtnClick() {

    // this.setState({
    //   // 展开运算符
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })

    // preveState 修改数据之前的数据
    // 其实就等于 preveState = this.state
    this.setState((preveState) => ({
      list: [...preveState.list, preveState.inputValue],
      inputValue: ''
    }), () => {
      console.log(this.ul.querySelectorAll('div').length)
    })

  }

  handleItemDelete(index) {

    // 展开运算符，打包给了list
    // 其实本质上就是一份拷贝 
    // state是 immutable 本质上不允许做任何改变
    // 如果直接操作state不行，需要拷贝出来一个副本

    // const newlist = [...this.state.list]
    // newlist.splice(index, 1)
    // this.setState({
    //   // 第一个list是state里面需要改变的，第二个是拷贝出来的
    //   list: newlist
    // })

    /**
     * 下面是错误的写法
     * 
     * this.state.list.splice(index, 1)
     * this.setState({
     *   list: this.state.list
     * })
    */

    /**
     * 下面是优化写法
     */

    this.setState((preveState) => {
      const list = [...preveState.list]
      list.splice(index, 1)
      return { list }
    })

  }
  // 优化实现
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (

        // <li key={index}
        //   onClick={this.handleItemDelete.bind(this, index)}
        //   dangerouslySetInnerHTML={{ __html: item }}
        // >

        // </li>
        <TodoItem
          key={item}
          itemPasstoChild={item}
          index={index}
          ItemDelete={this.handleItemDelete.bind(this)}
        />
      )
    })
  }
  render() {
    // 下面也是jsx语法，return后面的
    return (
      <Fragment>
        <div>
          {
            // for ==>>> htmlFor 防止jsx认错 
          }
          <label htmlFor='area' >输入内容</label><br />
          {/* 这样就绑定了 但是这样输入框的值会一直不变，所以绑定了onchange*/}
          输入框1：<input
            id='area'
            className='input'
            value={this.state.inputValue}
            onChange={this.handleChange}
            ref={(input) => { this.input = input }}
          />
          输入框2：<input
            className='input'
            value={this.state.inputValue}
            onChange={this.handleChange2.bind(this)}
          /><br />
          <button onClick={this.handleBtnClick.bind(this)}>提交</button>
        </div>
        <ul ref={(ul) => { this.ul = ul }}>
          {
            this.getTodoItem()
          }
        </ul>
      </Fragment>
    )
  }

  /**
  * 这里开始写生命周期函数
  */

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
    // 这里适合发送异步请求ajax
    // 目前使用的是charlesproxy进行模拟数据
    axios.get('/api/todolist.json')
      .then((res) => {
        this.setState(() => ({
          list: [...res.data]
        }))
      })
      .catch(() => { alert('error') })
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    // 必须要指定Boolen
    // 决定是否要被更新
    return true
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
}



export default TodoList;