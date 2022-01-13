import React, { Component } from "react";
import "./index.css";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

export default class index extends Component {
  // 类型约束
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };

  // 按下回车键回调
  handleKeyUp = (event) => {
    const { keyCode, target } = event;
    if (keyCode !== 13) return;
    if (target.value.trim() === "") {
      alert("输入不能为空");
      return;
    }
    const todoObj = {
      id: nanoid(),
      name: target.value,
      done: false,
    };
    // 从App组件传来的addTodo
    // 通过这样的形式把子组件的 todoObj 传递给 父组件
    this.props.addTodo(todoObj);
    // 别忘记清空
    target.value = "";
  };

  render() {
    return (
      <div className="todo-header">
        <input
          onKeyUp={this.handleKeyUp}
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
        />
      </div>
    );
  }
}
