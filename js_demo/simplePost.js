/*  
node post请求 
*/
const http = require('http')
const app = http.createServer()
// postParams字符串转换成对象的模块
const querystring = require('querystring')
app.on('request', (req,res)=>{
    // data 请求参数传递的时候发出
    // end 当参数传递完成的时候发出

    let postParams = ''

    req.on('data',(params)=>{
        postParams += params
    })

    req.on('end', ()=>{
        console.log(postParams)

    })
    
    res.end('我是post结果')
})