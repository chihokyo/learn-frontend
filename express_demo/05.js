const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(fn())
function fn(){
    return function (req,res,next){
        console.log(req.method)
        next()
    }
}

app.get('/',(req,res)=>{
    res.send('ok')
})

function serializeToJson(form){
    let result = {}
    let f = $(this).serializeArray()
    f.forEach(function(item){
        result[item.name] = item.value
    })
}