# NodeJS随手记

## 1. 浏览器渲染过程

```
你写的那一堆代码 （JavaScript源代码）
↓
↓ parse （解析）
↓
Abstract Syntax Tree （抽象语法树）
↓
↓ Ignition （解释器）
↓
ByteCode （字节码）
↓
↓ 运行结束
```

## 2. 全局对象

node的在REPL里你直接输入window是没有任何全局变量的，但你可以尝试打印一下process

```javascript
> window
Uncaught ReferenceError: window is not defined
> process
process {
  version: 'v16.13.0',
  versions: {
    node: '16.13.0',
    v8: '9.4.146.19-node.13',
    ......
```

### 特殊的全局对象

为什么特殊呢？因为 ↓

- 模块中任意使用，命令行交互中是不可以使用
- \__dirname、__filename、exports、module、require()

### 常见的全局对象

- process对象 → process提供了Node进程中相关的信息
- console对象 → 提供了简单的调试控制台
- 定时器函数 → `setTimeout()`,`setInterval()`,`setImmediate()`,`process.nextTick()`

### global对象

类比浏览器的window，只是这个是在NodeJS的模块里。而且不同于window，这个定义的变量只会放在当前的模块里。

## 3. exports和module.exports区别

这是昨晚睡觉前听的，现在先总结一下吧。

### 历史

说到区别，首先说一下历史，那就是为什么要有模块。因为JavaScript的创始人在创立这个代码的时候其实并没有予以厚望，只是想在浏览器验证一下输入框这种很弱智的事情。所以创造语言的时候也就没有多想。

```html
<script src="jsForDemoHtml.js"></script> 
```

就这样的而已，事实上没有考虑模块。

但是下面这种不同模块的冲突问题就不能解决了，因为会覆盖变量！！

```javascript
// a.js
var foo = "ok"

// b.js
var foo = "ng"
```

### 解决历史问题

后来为了解决命名冲突等问题，产生了一些解决的方法

- **IIFE** (Immediately Invoked Function Expression) 函数立即执行表达式 → 通过匿名函数的来解决

因为函数是有作用域的。

```javascript
(function(){
    var foo = "okk"
    console.log(foo);
})()
```

但是这样如何让别的文件也来用你内部的作用域呢？

```javascript
// a.js
var moduleBar = (function () {
 var foo = "okk"
 var bar = "bar"

 // 这样就返回去了
  return {
    foo,
    bar
  }
})()

// 以后谁想用a.js的变量，直接就可以这样获取
// b.js 
moduleBar.foo
```

但是上面有一个麻烦

- 谁用你的变量还要跑到你的地盘打开你的文件看看你咋命名的
- 大量的匿名函数**IIFE** 太脏！

大家想着，每个公司如果都有一个类似于👆那种moduleBar的规范的话，那么就会造成混乱。

比如你的公司用的是moduleBar，万一我写的也正好冲突了呢？！

所以大家都😖受不了了！就开始想别的方法！！ 然你后CommoJS的规范就出来了！

### 模块化诞生

注意！！！这只是一个规范！！！

> 最初提出来是在浏览器以外的地方使用，并且当时被命名为**ServerJS**，后来为了 体现它的广泛性，修改为**CommonJS**，平时我们也会简称为CJS。

既然**CommonJS**只是一个规范，那么NodeJS是怎么实现这种规范的呢？

下面开始重点来了。

模块化最重要的就是解决导入和导出

- 导入 `require()` 这个根本不用记忆

- 导出 → 比较难记忆
  
  - exports
  - module.exports

### require和exports的本质

我来直接说一下导出本质吧！！

首先一个模块想导出谁，直接给对象`exports`添加属性

```javascript
// /module.js
const foo = "abc"
const bar = "def"
// exports是一个对象
// 其实就是给exports这个对象赋值一个属性，属性名可以随便取
exports.foo = foo; // exports.newfoo = foo; 也可以的
```

再来看导入

```javascript
const moduleName = require("module.js")
// 其实每次 require 都会返回一个对象

// 也就是 require 通过各种查找方式，最终找到了 exports 这个对象;
// 并且将这个 exports 对象赋值给了 moduleName 变量;
// moduleName变量就是 exports 对象了;

// 所以就可以直接写
moduleName.foo // 就可以拿到了

// 所以按照es6语法也就可以写成
const { foo } = moduleName // 结构赋值
```

其实内存表现就是这样的 所以修改exports.foo里面改变的话，那么moduleName.foo也会改变！

并且因为赋值顺序是

```javascript
const bar = require("我就是在找exports在哪里，找啊找")
// 最后把找到的exports的地址给 bar 就行 
// 也就是本质
const bar = 0x100 // exports的地址
```

  ![image-20220330000954939](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220330000954939.png)

 那么 module.exports 和 exports 有什么关系或者区别呢  

> 我们追根溯源，通过维基百科中对CommonJS规范的解析:
> 
> **CommonJS中是没有module.exports的概念的**
> 
> 但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是 module 
> 
> 所以在Node中真正用于导出的其实根本不是exports，而是module.exports; 因为module才是导出的真正实现者;

- `new Module()`  一个js就是一个 **module** 实例 
- 所有的文件都有一个module全局对象，不信可以在 `console.log(module)`来看看
- 真正导出的人就是 `module.exports`
- 源码里面可以看看 `module.exports = exports`

其实就是exports只是个桥梁，只是个中间调节者，最后的大BOSS还是 `module.exports`

![image-20220330003809366](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220330003809366.png)

那么这俩有啥区别呢

```javascript
module.exports = exports
// exports 有对象的时候就用exports
// 但是一旦module.exports自己有了啥，但就以module.exports为准
module.exports = {
  foo:"aaa"
}
```

## 4. 查找规则

其实查找规则NodeJS官方文档也有。这里说一下规则其实可以看到

```javascript
console.log(module.paths)
```

## 5. 模块的加载过程

- 模块在第1次导入，会被运行1次。
  
  ```javascript
  // 加载过程是同步 → 意思就是一个个向下执行
  console.log("main中的代码被执行");
  
  require('./bar');
  require('./foo');
  ```

- 多次导入，会被放进缓存，最终只会运行1次。
  
  ↑ 验证
  
  ```javascript
  console.log(module.loaded) // false:还未加载 true：已经加载
  ```

- 循环引入，加载顺序？ → 使用图结构的，深度优先搜索（**D**epth **F**irtst **S**earch ）

## 6. CommonJS规范的缺点

```
■ CommonJS加载模块是同步的:
    同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行;
    这个在服务器不会有什么问题，因为服务器加载的js文件都是本地文件，加载速度非常快;
■ 如果将它应用于浏览器呢?
    浏览器加载js文件需要先从服务器将文件下载下来，之后在加载运行;
    那么采用同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作;
■ 所以在浏览器中，我们通常不使用CommonJS规范:
    当然在webpack中使用CommonJS是另外一回事;
    因为它会将我们的代码转成浏览器可以直接执行的代码;
```

## 7. ES module 横空出世

为了解决CJS规范的一些问题，ES6就横空出世了！！！

- 采用关键字`import`还有`export`而不是函数`require()`或者对象`module.exports`
- 采用严格模式 use strict

## 8. import export

首先自己要知道一个地方就是 这俩是**特殊的关键字** 不是对象更不是函数

```javascript
import {

}

export {

}
// 上面看起来像是一个对象，但其实没有 export = {} 本质就是一个关键字 
// 导出的是里面变量的引用
```

### 导出 export

- 导出（2个类）
  - 有名字的导出 named export 
  - 默认导出 default export

```javascript
//  named export 导出方式三种

// 1.方式一:
export const foo = 'foo';
export const bar = 'bar';
export const hoge = (foo) => {console.log(foo)}

// 2.方式二: {}中统一导出
// {}大括号, 但是不是一个对象
// {放置要导出的变量的引用列表}
const foo = 'foo';
const bar = 'bar';
const hoge = (foo) => {console.log(foo)}
export {
    foo,
    bar,
    hoge
}

// 3.方式三: {} 导出时, 可以给变量起 别名
export {
    foo as Cfoo,
    bar as Cbar,
    hoge as Choge
}
```

默认导出  default export

- 一个文件只能有一个  default export

```javascript
//  named export 导出方式三种
export default const foo = () => {}
```

### 导入 import

```javascript
// 1. 方式一
// import {标识符列表} from '模块';
// 这里的{}也不是一个对象，里面只是存放导入的标识符列表内容;
import { foo, bar, hoge} from "./module.js"

// 2. 方式二
// 导入时给标识符起别名
import { foo as Cfoo, bar, hoge} from "./module.js"
// Q:如果在导出的时候已经给取别名了咋办？
// A: 可以在别名的基础上在命名一次 但一定要用export 别名的那个命名
import { Cfoo as CDfoo, bar, hoge} from "./module.js"

// 3. 方式二
```

关于import其实她还是个函数，用来解决什么问题呢？

先想象一个场景，比如

```javascript
// 当flag为true的时候才导入某个模块
let flag = true
if (flag) {
  import time from "./module.js" // NG
  // 但是require()就可以 因为require是函数，运行阶段才执行
  // 但是因为ES module不认require() ※ 除非你用的是webpack的模块化打包工具
}
```

NodeJS在解析阶段其实就会解析` import time from "./module.js"`，所以直接像上面这么写，是会报错的。但`require()`是一个函数，解析阶段并不会执行。

> **所以上面import错误的原因就是一段解析阶段的代码你放到了运行阶段去执行！！**

那么怎么办呢？

`import()` 闪亮登场！！

```javascript
// 当flag为true的时候才导入某个模块
let flag = true
if (flag) {
  // 因为是异步加载 非同步 有个返回值 返回值是promise
  const promise = import("./module.js") 
      .then((res)=>{
      console.log(res)
    })
      .catch()
}
```

于是接下来验证大概是这样的

```javascript
// html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="demo.js" type="module"></script>
    <title>Document</title>
  </head>
  <body></body>
</html>

// demo.js
let flag = true;
if (flag) {
  const promise = import('./module.js')
    .then((res) => {
      console.log('print in res');
      console.log(res.obj);
    })
    .catch((err) => {
      console.log(err);
    });
}

// module.js
const obj = {
  name: 'chin',
  age: 199,
};
let foo = 'iiii';
export { obj, foo };
```

## 9. 关于ES导出的内存图

下面假如是 main.js 需要引入 a.js

```javascript
// a.js
let name = 'chin';
let age = 18;

setTimeout(()=>{
    name = "nnnn";
})

export {
    name,
    age
}
```

这个时候有个main.js 需要导入

```javascript
// main.js
import { name, age } from './a.js';

console.log(name);
```

那么内存的表现是什么样子的？其实

```
1. export在导出一个变量时，js引擎会解析这个语法
2. 并且创建 模块环境记录(module environment record)
3. 模块环境记录会和变量进行绑定(binding)
4. 这个绑定是实时的,而在导入的地方，我们是可以实时的获取到绑定的最新值的
```

![image-20220330204254099](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220330204254099.png)

## 10. CommonJS和ES Module能互通吗

require和export混用

方式一 

```
通常情况下，CommonJS不能加载ES Module
 → 因为CommonJS是同步加载的，但是ES Module必须经过静态分析等，无法在这个时候执行JavaScript代码;
 → 但是这个并非绝对的，某些平台在实现的时候可以对代码进行针对性的解析，也可能会支持
 → Node当中是不支持的
```

```javascript
// a.js
const name = "chin"
export {
    name
}
// main.js 导入文件a
require("a.js") // 这样可以不？
```

方式二

```javascript
多数情况下，ES Module可以加载CommonJS
 → ES Module在加载CommonJS时，会将其module.exports导出的内容作为【default】导出方式来使用
 → 这个依然需要看具体的实现，比如webpack中是支持的、Node最新的Current版本也是支持的
```

```javascript
// a.js
const age = 10;
module.exports = {
  age
}

// main.js → 默认用的是default形式
import foo from "./a.js"
```

## 11. npm是啥

反正就是一个包管理工具，很强大👍🏻

这里有一个小TIPS

那就是每一次npm其实下载的是一个压缩包→压缩包在哪里找的？在registry仓库找→然后下载到本地进行解压！

怎么看自己的registry

```bash
npm config get registry
```

OK

```bash
npm init # 创建需要你自己填写
npm init -y # 创建就默认那种
```

```json
// 其他的我都不写了，差不多搜一搜都知道，写一下自己的盲区。
// 这个入口和webpack打包的入口并不冲突
// 比如我们使用axios模块 const axios = require('axios')
// 实际上是找到对应的main属性查找文件的
"main" : "index.js"
```

## 12. polyfills

`polyfills` 补丁的意思，就是给浏览器增加一些语法支持！`babel`是转换，其实和polyfills还是有很大的不同的。

```json
{
  "browserslist": [
    "last 1 version",
    "> 1%",
    "maintained node versions",
    "not dead"
  ]
}
```

## 13. 关于全局安装 npm install -g

这个全局安装到底是啥意思呢？比如下面的这个全局安装，难道这个意思就是说你的项目不用再次安装 axios ？不是说 -g就是可以安装之后不用再具体项目再次 install 依赖了！

当然axios也不需要全局安装

```bash
npm install axios -g
```

而是因为全局安装的**都是一些工具**，生成一个**可执行文件**，并且放在你电脑的环境变量。然后就能找到包的可执行文件。

感觉就是通过 npm 给你的电脑安装了 **命令**。

```bash
npm list -g --depth=0 // 查看全局安装了
npm root -g // 查看全局的那些包安装在了哪里
```

那么本地**开发环境** PK **生产环境** 安装有啥区别？

```bash
# 安装开发和生产依赖 
npm install axios  # 一样的
npm i axios
# 开发依赖
npm install webpack --save-dev  # 一样的
npm install webpack -D
npm i webpack –D
```

## 14. package-lock.json 干什么用的？

本质就是

- 写真正依赖的版本号
- 记录一下依赖了什么（可以实现缓存）

![image-20220402221352332](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220402221352332.png)

## 15. npm和npx到底啥不一样

本来一直搞不清楚，这一次终于搞清楚了！

比如你在全局安装了一个V2的包，在项目安装了V5的包。

那么当你在终端输入

```bash
webapck # 那么会显示哪里？答案是V2的
```

原因非常简单，在**当前目录下**找不到webpack时，就会去全局找，并且执行命令！这里在终端找的，当前目录么有，肯定去全局找！

如何解决？

- 具体到项目根目录下

```bash
./nodu_modules/bin/webpack —version
# 如果这个时候你想看你本地的，需要具体的到bin下面的可执行文件
```

- 修改package.json中的scripts-

- **使用主角 npx**

  

  ```bash
  npx webpack --version
  ```

npx原理会到当前目录的`./nodu_modules/bin`目录下查找命令

## 15. 如何制作一个自己的终端命令包？

这个貌似需要技术含量很高，在NodeJS day6 - day7 以后需要的时候慢慢看吧。

基本上就是需要两个包

- https://github.com/tj/commander.js/

- 第1步
  - 在index.js写上 `#!/usr/bin/env node`
- 第2步
  - 在package.json增加bin属性
- 第3步 
  - 执行npm link



## 16. 浏览器的事件循环

可以说一下就是代码在浏览器的顺序是如何实现的？

首先JS是单线程的！现在说一下，栈和堆。

栈这里面记录了一个简单的代码执行，代码默认在`main.js`

![image-20220403220431866](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220403220431866.png)

那么浏览器的时间循环加上异步呢？

异步的一些函数调用，比如`setTimeout()`

- `setTimeout()`的本质不是和JS在一条道上的，而是一个webapi，这个会被放入事件队列
- 事件队列中的函数，会放在调用栈，在合适的时机执行
- 下面这个图还蛮形象的

出自于这篇文章[JavaScript Visualized: Promises & Async/Await](https://medium.com/@lydiahallie/javascript-visualized-promises-async-await-a3f1aad8a943)

写的超好！

![img](https://miro.medium.com/max/1400/0*iHLzfmlOAroed4Bz.gif)

下面通过一个面试题说一下执行过程

先说结论

主线程任务 ＞ 微任务（Promise，queueMicrotask） ＞ 宏任务 (setTimeout)等等

![image-20220403231935375](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220403231935375.png)

下面又是一个面试题，增加了await和async

```javascript
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('then1');
});

// await这一句 相当于 就是立即执行这一块
function (resolve) {
  console.log('promise1');
  resolve();
// await后面的那一句 相当于then
  
// 于是就感觉是这样的
async funtion async1() {
  await async2;
  console.log('then1');
}
async funtion async2() {
  console.log('promise1');
  resolve();
}
```

下面来了

![image-20220403234123397](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220403234123397.png)

## 17. 关于阻塞&非阻塞&同步&异步

其实这个吧，我以前经常搞不清，随着我学习的越来越多，我差不多知道是什么意思的。

首先NodeJS的组合会用 libuv 用的是事件队列，和Java那种有线程锁不一样，你所有看起来异步的东西最后都会放进去这个 libuv，然后帮你搞，本质是不会发生脏数据那种的。

我自己的感觉吧

阻塞 非阻塞 → 指的就是调用程序的人 是对后面产生影响不，自己不干后面就不能干。

同步 异步 → 指的是执行自己是以什么形式执行的，嘛。差不多吧。反正JS几乎都是回调异步操作的。

## 17. Buffer&Stream

> JS本身处理二进制是一件很不友好的事情，但是我们的视频音频图片本身就是二进制居多。所以怎么处理呢？
>
> 这时候Buffr就开始闪亮登场了！
>
> 前端用的很少，但是后端就用的很多。

- Buffer就是一个一个8位2进制的数组：01010101

下面是一个小知识

> 8bit(01010101) = 1byte
>
> 1024byte = 1kb
>
> 1024kb = 1Mb

下面都是一些Buffer的API使用了，就没必要看了。

其实本质就是了解几个API

- sharp
- 
