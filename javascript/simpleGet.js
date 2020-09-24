/*  
node get请求 demo
*/

// 引入http模块
const http = require('http')
// 引入url模块解析url
const url = require('url')
const { read } = require('fs')
const app = http.createServer()

app.on('request', (req,res)=>{

    // 解决编码问题
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8',
    })
    console.log(req.url) // /?param1=hkk&param2=12
    console.log(url.parse(req.url)) // 这里几乎包含了所有请求信息 true表示转换成对象形式
    // 这里用了对象的解构赋值，
    // url路径的各个部分解析出来并且返回对象
    // http://localhost:3000/?q=1&param=yes ===>>>  { q: '1', param: 'yes' }
    let { query,pathname } = url.parse(req.url,true)
    console.log(query)

    // 随便写入写入表示测试
    if (pathname == '/' || pathname == '/index') {
        res.end('<h1>Hello I am index</h1>')
    } else {
        res.end('<h1>反正不是首页</h1>') // 这样写会中文会有乱码，上面接上
    }
})

app.listen(3000)