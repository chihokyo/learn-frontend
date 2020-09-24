# Koa学习

## 基本概念

`Koa`就是对`express`的进一步封装。`express`就是对JS原生`http`模块的进一步封装。

上面是我学到现在理解的本质，就是一步步从JS偷懒到Koa，

其中框架的学习，大部分就是对插件的学习。如何找到常用插件？如何阅读文档？常用的API怎么用？

基本上框架的学习就是对一些模块化的学习。主要是用的ES6的语法进行导入。

- Koa 官网 https://koajs.com/

- Github主页 https://github.com/koajs/koa

- 按照受欢迎程度搜索npm里koa的库 https://www.npmjs.com/search?q=koa&ranking=popularity

**注意，搜索库的时候要看维护的频率，如果是好几年都没更新的，还是要注意安全性的。**

![](https://raw.githubusercontent.com/chihokyo/image_host/master/20200825235512.png)

## 洋葱模型

koa的中间件使用了洋葱模型。

至于什么是洋葱模型呢

![](https://raw.githubusercontent.com/chihokyo/image_host/master/20200826175928.png)

就是`request`进去之后一层层的经过重重阻碍然后一层层的`reponse`又掰开。其中洋葱原型里面又包含了一系列的链式操作。

![](https://raw.githubusercontent.com/chihokyo/image_host/master/20200826182040.png)

使用next中间件进行的顺序，但其实是洋葱。next之后的东西是返回来的。

## 常用插件

```javascript
"dependencies": {
    "@koa/cors": "^3.1.0", // 搞跨域的
    "koa": "^2.13.0", // koa框架
    "koa-body": "^4.2.0", // 解析处理路由参数数据
    "koa-json": "^2.0.2", // 美化json格式
    "koa-router": "^9.4.0" // 路由洋葱
  }
```

### 导入插件

```javascript
const Koa = require('koa')
const Router = require('koa-router')
// 跨域
const cors = require('@koa/cors')
// 解析
const koaBody = require('koa-body')
// json插件
const json = require('koa-json')
// 构造函数
const app = new Koa()
const router = new Router()

// 这里就是开始使用插件。
app.use(koaBody())
app.use(cors())
app.use(json({
    // 添加参数之后json格式会显示的更好看
    pretty: false,
    param:'pretty'

}))
```
### 关于路由压缩插件koa-combine-routers

这样就可以完成对以后项目稍微大的时候路由的设置

```javascript
src
	api
		a.js // 写a业务逻辑
		b.js // 写b业务逻辑
	routes
		aRouter // 写a路由
		bRouter // 写b路由
		routes.js // 大总管路由
index.js // 从这里呼出大总管路由
```

**！现在贴一下常用插件**

![](https://raw.githubusercontent.com/chihokyo/image_host/master/20200826225816.png)

