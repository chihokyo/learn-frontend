import React, { Component, Fragment } from 'react'
import  PropTypes from 'prop-types'
import './style.css'

class TodoItem extends Component {

    handleClick = () => {
        // 获取index值
        console.log(this.props.index)
        // 调用父组件的方法
        const { ItemDelete, index } = this.props 
        ItemDelete(index)
        //this.props.ItemDelete(this.props.index)

    }

    // 优化前
    // render() {
    //     return (
    //         <div onClick={this.handleClick}>
    //             {this.props.itemPasstoChild}
    //         </div>
    //     )
    // }

    // 优化后
    render() {
        const { itemPasstoChild, test } = this.props
        // 其实就是一个 jsx → createElement → 虚拟DOM（js对象） → 真实dom
        return (
            <div onClick={this.handleClick}>
                {test}-{itemPasstoChild}
            </div>
            // React.createElement('div', {}, 'item')
        )
    } 
}

// 校验父组件传来的数据类型
TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  // number或者string
  itemPasstoChild: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ItemDelete: PropTypes.func,
  index: PropTypes.number
}
// 默认值
TodoItem.defaultProps = {
  test : 'hello'
}

export default TodoItem;