import React, { Component } from "react";
import "./index.css";
import PropTypes from "prop-types";

export default class index extends Component {
  // 类型约束
  static propTypes = {
    todos: PropTypes.array.isRequired,
    checkAllBox: PropTypes.func.isRequired,
    clearAllDone: PropTypes.func.isRequired,
  };

  // 全选回调函数
  handleCheckAll = (event) => {
    this.props.checkAllBox(event.target.checked);
  };

  // 清除已完成的回调
  handleClearAllDone = () => {
    if (window.confirm("是否清除所有已完成的任务")) {
      this.props.clearAllDone();
    }
  };

  render() {
    const { todos } = this.props;
    // 总数
    const countAll = todos.length;
    // 已完成
    const doneAll = todos.reduce((pre, todo) => {
      return pre + (todo.done ? 1 : 0);
    }, 0);

    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            onChange={this.handleCheckAll}
            checked={doneAll === countAll && countAll !== 0 ? true : false}
          />
        </label>
        <span>
          <span>已完成{doneAll}</span> / 全部{countAll}
        </span>
        <button onClick={this.handleClearAllDone} className="btn btn-danger">
          清除已完成任务
        </button>
      </div>
    );
  }
}
