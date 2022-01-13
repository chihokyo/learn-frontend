# JS难点总结

>这个难点和不清楚的地方主要用于长时间没有写JavaScript之后忘记的场合！
>
>主要是写一些比较难以理解的？

## JS语法Tips

- 关于ES6模块的导入问题
  - node不支持es6，需要的话，记得要下载babel
  
## 回调函数

### 什么是回调函数？

- 我定义了1个函数
- 我没有使用
- 但是最后调用了

```javascript
// 比如这种
setTimeout(() => {
    console.log("callback function")
}, 1000);

// 有比如这种 eat()函数作为一个参数传入到另一个函数里面
const fruits = ["Apple", "Orange"]
// 回调函数eat
function eat (fruitName) {
    console.log("Eat " + fruitName)
}
// map 就是高阶函数
const res = fruits.map(eat);
```

常用的dom时间，ajax，promise，高阶的函数都是回调函数。

**回调函数作为高阶函数的参数，高阶函数通过调用回调函数来执行操作。**

### 回调函数的分类？

- 同步 sync → 同步回调是“阻塞”的：高阶函数直到回调函数完成后才继续执行。绝大多数的数组操作都是同步。
- 异步 async → 异步回调是“非阻塞的”：高阶函数无需等待回调完成即可完成其执行。高阶函数可确保稍后在特定事件上执行回调。比如，ajax，io操作，setTimeout()等等

*同步示例*

```
array.map(callback), array.forEach(callback), array.find(callback),array.filter(callback), array.reduce(callback, init)
```

### JavaScript为什么是单线程的？

因为比如你浏览器，比如要1个个执行，不然你html还没渲染完，就直接搞dom操作，那可能吗。所以要1个个执行。

### JavaScript 为什么有异步？

1个个执行的话，就产生1个问题，比如向ajax数据库拿东西，比如io读写这种耗时的，难道你不完成，我下面的页面都白搭啦？肯定不行的！所以就有了异步。

### 回调地狱是怎么回事？

刚才说的，比如ajax这些需要一定的处理时间的操作，一次性全部开始使用异步，就是你干你的，我干我的，大家相安无事还好，比如说小张开饭店需要果汁，小王想要榨橙汁，需要小李的橙子怎么办？一步步需要上一步的处理结果的这种异步问题如何解决？那就是说现在`zhang(wang(li()))` 三层调用，这样就有了回调地狱。

### 异步是怎么实现的？

事件轮询 `event loop`

![img](https://miro.medium.com/max/1400/1*iHhUyO4DliDwa6x_cO5E3A.gif)

Call Stack → WebAPIs 

回调函数结果完成之后就会放进去 → Callback queue 有个Event Loop就可以

比如下面这段代码

```javascript
console.log(1) // 1
setTimeout(() => {
    console.log("in") // 3
}, 100);
console.log(2) // 2
```

### 什么是事件轮询 event loop？

其实就是主任务的call stack执行之后，通过event loop的方式执行callback queue！

事件轮询的核心是回调函数。

### 什么是Promise？

本质就是一个构造函数，可以new的那种。 `new Promise()`

2个特色

- then链式调用
- catch() 错误处理

```javascript
fetch("url")
.then((reponse) => reponse.json())
.then((json) => {console.log(json)})
.catch((error) => {console.log(error)})
.finally(()=>{console.log("正在清理")})
```

### 那什么是await和async？

语法糖！[B站视频：全面掌握Javascript重点 async和await](https://www.bilibili.com/video/BV1gf4y1e7Us?spm_id_from=333.999.0.0)

看看就差不多
