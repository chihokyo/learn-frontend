const express = require('express')
const _ = require('lodash')
const Joi = require('joi')

const todoRouter = express.Router()
const Task = require('../model/task')

// 获取全部任务
todoRouter.get('/task', async (req, res) => {
	const task = await Task.find()
	res.send(task)
	console.log('成功读取所有任务')
})

// 添加任务
todoRouter.post('/addTask', async (req, res) => {
	const { title } = req.body
	const schema = {
		title: Joi.string().required().min(2).max(30)
	}
	const { error } = Joi.validate(req.body, schema)
	if (error) {
		return res.status(400).send({ message: error.details[0] }.message)
	}
	const task = new Task({ title: title, completed: false })
	await task.save()
	res.send(task)
	console.log('成功添加任务：' + title)
})

// 删除
todoRouter.get('/deleteTask', async (req, res) => {
	const { _id } = req.query
	const schema = {
		_id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
	}
	const { error } = Joi.validate(req.query, schema)
	if (error) {
		return res.status(400).send({ message: error.details[0] }.message)
	}
	const task = await Task.findOneAndDelete({ _id: _id })
	res.send(task)
	console.log('成功删除任务：' + _id)
})

// 修改任务
todoRouter.post('/modifyTask', async (req, res) => {
	const task = await Task.findOneAndUpdate(
		{ _id: req.body._id },
		_.pick(req.body, ['title', 'completed']),
		{ new: true })
	res.send(task)
})

// 查询未完成任务数量
todoRouter.get('/unCompletedTaskCount', async (req, res) => {
	const result = await Task.countDocuments({ completed: false })
	res.send(result)
})

// 更改状态
todoRouter.get('/changeAllTasksComplete', async (req, res) => {
	const { status } = res.query
	const result = await Task.updateMany({}, { completed: status })
	res.send(result)
})

// 将todo案例路由作为模块成员进行导出
module.exports = todoRouter;