const express = require('express')
const app = express()

app.get('/request', (req,res,next)=>{
    req.name = 'zhangsan'
    next() // 即使匹配完也要继续匹配
})

app.get('/request', (req,res)=>{
    res.send(req.name)
})



app.listen(3000)
console.log('success')