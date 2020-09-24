# learn-javascript【基础前端记录库】

主要用来记录基础前端知识。

目前工作上日常开发并不是特别常用前端，复习的时候来看看就好。😊

## 1.主要目录结构

### js

JavaScript基础，高级，难点，随便记录。

### jquery

jQuery基本复习，小案例。

### vue

Vue基础知识，项目练习。

### webpack

主要写的是webpack最基本的用法

- 安装webpack
  - `npm install webpack webpack-cli -D`
- 设置 webpack.config.js
    module.exports = {
    mode: 'development'
    }
- 设置 package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack"
  },
- 启动 `npm run dev`进行打包

### gulp

最基础的gulp入门实现编译 + 热更新网页

### koa

最基础的Koa入门知识。主要是通过对路由的封装进行精简的框架。

需要安装n多插件进行开发

### 其他待定知识...

webpack,express,bable,sass,小工具，各种配置和脚手架预定。

## 2.部分更新日志

### 2020/7/28 初稿

### 2020/8/24 整理

- 添加部分demo
- 增加gulp入门用法

### 2020/8/26

- 添加koa入门学习

### 2020/9/11 

- 添加react入门学习

### 2020/9/14

- react基本框架学习
- 通过todolist案例巩固基础复习

### 2020/9/24

- 修改库结构（大改）
- 以后多一门技术就开始一个新的**branch**