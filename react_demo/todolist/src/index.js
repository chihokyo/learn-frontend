import React from 'react';
// 渲染组件，就是渲染react的虚拟dom到真正网页上的真实dom
// 挂载到root节点下
import ReactDOM from 'react-dom';
import Todolist from './TodoList';
import NewTodolist from './NewTodolist';

// PWA 
// 用网页来写手机app应用
// 写了一个网页上线到https 网页进行缓存，一旦网页断网，第二次访问也有缓存到之前的网页里
// 这样就可以离线进行查看
// import * as serviceWorker from './serviceWorker';
// jsx语法 <App /> 如果需要使用这个语法 就需要 import React from 'react';

ReactDOM.render(
  <React.StrictMode>
    <Todolist />
    <NewTodolist />
  </React.StrictMode>,
  document.getElementById('root')
);
