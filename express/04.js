const express = require('express')
const { userInfo } = require('os')
const app = express()


app.use('/admin',(req,res,next)=>{
    let isLogin = false
    if (isLogin) {

    }
})

app.get('/admin',(req,res)=>{
    console.log('login in ok')
})


app.listen(3000)
console.log('success')

app.get('/', async (req, res, next)=>{
    try {
        await userInfo.find({name:'zhangsan'})
    } catch (ex) {
        next(ex)
    }
})