const express = require('express')
const app = express()


app.get('/', (req,res)=>{
    // send()
    res.send('hello,express')
})

app.get('/list',(req,res)=>{
    res.send({name:'ok',age:18})
})
app.listen(3000)
console.log('success')