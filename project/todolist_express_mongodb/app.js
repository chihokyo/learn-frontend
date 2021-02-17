// 路径工具库
const path = require('path')
// 加载express框架
const express = require('express')
// 加载数据库模块
const mongoose = require('mongoose')
// 解析post参数模块
const bodyParser = require('body-parser')

const app = express()
// 静态资源加载
app.use(express.static(path.join(__dirname, 'public')))
// 转换成json解析
app.use(bodyParser.json())

// 导入todo路由案例
const todoRouter = require('./route/todo')
// 当客户端的请求路径以/todo开头时
app.use('/', todoRouter);
// 监听端口
app.listen(4000)