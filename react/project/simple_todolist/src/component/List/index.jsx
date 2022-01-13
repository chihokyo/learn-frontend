import React, { Component } from "react";
import Item from "../Item";
import PropTypes from "prop-types";
import "./index.css";

export default class index extends Component {
  // 类型约束
  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  // 接收从App传来的todos
  render() {
    const { todos, updateTodo, deleteTodo } = this.props;

    return (
      <ul className="todo-main">
        {todos.map((todo) => {
          // 下面给item传递各种数据 效率极低
          // return <Item key={todo.id} id={todo.id} name={todo.name} done={todo.done}/>
          return (
            <Item
              key={todo.id}
              {...todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    );
  }
}
