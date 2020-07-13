const mongoose = require('mongoose')

dbUrl = 'mongodb://todo:todo@localhost:27017/todo'


// 一些url设置上的选项
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection

db.on('open', ()=>{
    console.log('成功连接到数据库')
})

db.on('error', ()=>{
    console.log('error')
})

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {versionKey: false})

const Task = mongoose.model('task',taskSchema)

module.exports = Task