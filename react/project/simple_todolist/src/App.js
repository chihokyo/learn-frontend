import React, { Component } from "react";
import Header from "./component/Header";
import List from "./component/List";
import Footer from "./component/Footer";
import "./App.css";

export default class App extends Component {
  // 共通的数据给这里
  state = {
    todos: [],
  };

  // 下面写增删改查

  /**
   * 增加一个任务
   *
   * @param {object} todoObj 一个任务数据的对象
   */
  addTodo = (todoObj) => {
    // 获取已有任务列表
    const { todos } = this.state;
    // 添加新任务到已有任务列表
    const newTodo = [todoObj, ...todos];
    // 更新状态
    this.setState({ todos: newTodo });
  };

  /**
   * 更新任务（完成 <==> 未完成）
   *
   * @param {string} id 任务唯一id
   * @param {boolean} done 任务状态
   */
  updateTodo = (id, done) => {
    const { todos } = this.state;
    // 遍历所有任务，符合条件id更改done状态
    const newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) {
        return { ...todoObj, done };
      } else {
        // 没有匹配的就按兵不动
        return todoObj;
      }
    });
    this.setState({ todos: newTodos });
  };

  /**
   * 删除一个任务
   *
   * @param {string} id 任务唯一id
   */
  deleteTodo = (id) => {
    const { todos } = this.state;
    // 这里删除使用的是过滤，不等于你传过来的id的全部返回去
    // 那么返回去的就是你没传过来的id，这就是变相的删除了
    const newTodos = todos.filter((todoObj) => {
      return todoObj.id !== id;
    });
    this.setState({ todos: newTodos });
  };

  /**
   * 选中or取消所有任务
   *
   * @param {boolean} done 选中 true 取消 false 状态
   */
  checkAllBox = (done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todo) => {
      // return {...todo, done:done};
      return { ...todo, done };
    });
    this.setState({
      todos: newTodos,
    });
  };

  /**
   * 清除已完成任务
   *
   */
  clearAllDone = () => {
    const { todos } = this.state;
    // 过滤掉所有未完成的，返回已经完成的
    const newTodos = todos.filter((todoObj) => {
      return !todoObj.done;
    });
    this.setState({
      todos: newTodos,
    });
  };

  render() {
    // const todos = this.state.todos;
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List
            todos={todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
          />
          <Footer
            todos={todos}
            checkAllBox={this.checkAllBox}
            clearAllDone={this.clearAllDone}
          />
        </div>
      </div>
    );
  }
}
