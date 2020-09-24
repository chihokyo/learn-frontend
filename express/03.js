const express = require('express')
const app = express()

// 接收所有请求
app.use((req,res,next)=>{
    console.log('app')
})

app.use('/request',(req,res,next)=>{
    console.log('request')
})

app.get('/request', (req,res,next)=>{
    req.name = 'zhangsan'
    next() // 即使匹配完也要继续匹配
})

app.get('/request', (req,res)=>{
    res.send(req.name)
})



app.listen(3000)
console.log('success')