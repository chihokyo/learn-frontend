const Koa = require('koa')
const Router = require('koa-router')
// 跨域
const cors = require('@koa/cors')
// 解析
const koaBody = require('koa-body')
// json插件
const json = require('koa-json')


const app = new Koa()
const router = new Router()

// 给所有路由增加一个前缀 api
// 这样所有的请求都必须有api，不然就出错
router.prefix('/api')

router.get('/', ctx => {
    console.log(ctx)
    console.log(ctx.response)
    ctx.body = 'hello koa'
})

router.get('/api', ctx => {
    console.log(ctx)
    console.log(ctx.response)
    ctx.body = 'hello api'
})

router.get('/param', ctx => {
    const params = ctx.request.query
    console.log(params)
    ctx.body = {
        name: params.name,
        age: params.age
    }
})

router.get('/async', async (ctx) => {
    // 这里请求一些db数据的时候，可以进行异步
    let result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('hello koa 2s later')
        }, 2000);
    })

    ctx.body = result
})


router.post('/post', async (ctx) => {
    let { body } = ctx.request
    console.log(body)
    console.log(ctx.request)
    ctx.body = {
        ...body
    }
})

// 因为是按照顺序的，所以就是先处理request解析
// 这里开始使用插件
app.use(koaBody())
app.use(cors())
app.use(json({
    // 添加参数之后json格式会显示的更好看
    pretty: false,
    param: 'pretty'

}))

// 链式操作
app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)