const Koa = require('koa')
const app = new Koa()

const middleware1 = function async(ctx, next) {
    console.log('this is a middleware1')
    console.log(ctx.request.path)
    // 这一层通过，交给下一层。
    // 这样就是洋葱的感觉
    next()
    console.log('end middleware1')
}
const middleware2 = function async(ctx, next) {
    console.log('this is a middleware2')
    console.log(ctx.request.path)
    // 交给下一个
    next()
    console.log('end middleware2')
}
const middleware3 = function async(ctx, next) {
    console.log('this is a middleware3')
    console.log(ctx.request.path)
    // next()
    console.log('end middleware3')
}

// 根据这个顺序进行剥洋葱
// 遇到next就停止

// this is a middleware1
// /
// this is a middleware2
// /
// this is a middleware3
// /
// end middleware3
// end middleware2
app.use(middleware1)
app.use(middleware2)
app.use(middleware3)
app.listen(3000)