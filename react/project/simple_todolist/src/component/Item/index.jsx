import React, { Component } from "react";
import "./index.css";

export default class index extends Component {
  state = {
    mouse: false,
  };

  // 鼠标移除移入状态
  handleMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag });
    };
  };

  // 点击完成
  handleCheck = (id) => {
    return (event) => {
      this.props.updateTodo(id, event.target.checked);
    };
  };

  // 点击删除
  handleDelete = (id) => {
    // 一个小坑，this指向问题 必须window
    if (window.confirm("你确定要删除?")) {
      this.props.deleteTodo(id);
    }
  };

  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state;
    return (
      <li
        style={{ backgroundColor: mouse ? "#ddd" : "white" }}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
      >
        <label>
          <input
            type="checkbox"
            checked={done}
            onChange={this.handleCheck(id)}
          />
          <span>{name}</span>
        </label>
        <button
          onClick={() => {
            this.handleDelete(id);
          }}
          className="btn btn-danger"
          style={{ display: mouse ? "block" : "none" }}
        >
          删除
        </button>
      </li>
    );
  }
}
