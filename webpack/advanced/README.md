# webpack 高级

## source-map

### 是什么？

这个用来干什么呢？就是你打包后的代码已经被丑化了，如果你想 debug 你也不知道找啥。

**你写的代码** 和 **浏览器上执行的代码** 中间是有差异的，那么谁出来了呢？source-map

### 如何设置？

原理如下

- 根据源文件 生成 source-map 文件，通过 webpack 配置生成 source-map
- 通过 source-map 文件，映射到原始的代码

具体执行

```js
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
};
```

然后执行

```js
npx webpack
```

会发现多了 1 个文件

![image-20230307162604560](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230307162604560.png)

另外想在浏览器看到的话，要打开这个配置。浏览器默认其实也是打开的。

![image-20230307162738424](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230307162738424.png)

### souce-map 设定的值

这个太多了，排练组合共有 26 个。所以先搁置。

## babel ⭐️

babel 是什么呢？其实是一个神器，可以把 es6 转成 es5，ts 转成 js，jsx 转换。。等等。

首先这个可以没有 webpack，自己单独使用，怎么用呢？

### 单独基础使用

```js
 npm i @babel/core @babel-cli -D
```

- ` @babel/core` 核心代码
- `@babel-cli` 允许你在命令行使用 babel

查看是否安装成功

```js
npx babel --version
```

那怎么使用呢？

```js
npx babel ./src --out-dir ./build
```

- ./src 代表转换源
- --out-dir 输出文件夹
- ./build 文件夹

当你执行完之后，你会发现什么都没转换。默认情况下只会解析 → 生成 AST 树 → 输出。所以你需要安装**插件**

> 此时你要安装改变箭头函数的，const 转换的，等等插件。

```js
npm i @babel/plugin-transform-block-scoping @babel/plugin-transform-arrow-function -D
```

一顿安装，然后执行

```
npx babel ./src --out-dir ./build --plugins=@babel/plugin-transform-block-scoping,@babel/plugin-transform-arrow-function
```

使用逗号分割，应用多个产检

> 但是上面你不觉得太繁琐了吗？于是预设插件就横空出世了。

**安装预设插件**

```js
npm i @babel/preset-env -D
```

执行这个预设

```js
npx babel ./src --out-dir ./build --presets=@babel/preset-env
```

以上就完成了

### 底层原理

babel 的底层原理到底是什么？其实就是**编译器**。

什么是编译器呢？只要从一种语言某种编译器转换成另一种语言，这个就是编译器。比如下面就是把 PHP 转换成 JS 语言。这个就是编译器。

PHP →→**编译器**→→JS

- 解析 parsing （词法分析，语法分析，把你的语言转换成一个个 tokens，生成一个 AST 语法树。
- 转换 transformation （然后通过各种转换，生成一个新的 AST 语法树。
- 生成 code generation （根据新的抽象语法树，生成新的代码。

此时介绍一个小型编译器代码，这个是中文化之后的**[the-super-tiny-compiler-cn](https://github.com/starkwang/the-super-tiny-compiler-cn)**

### webpack 配合

上面说了这么多都是单独 babel 的使用，即使没有 webpack 你可以使用的方法。那先安装 webpack

```js
npm i webpack webpack-cli -D
```

然后你会发现 wepack 负责模块化内容，babel 只负责代码转换。但我们希望 模块化 + 代码转换怎么办呢？

配置新的处理 JS 规则，使用 babel-loader 嵌入到 webpack 里。意思就是把 JS 的处理都交给 webpack 里的 babel-loader 来处理

- babel-loader 先给你转换
- webpack 打包

```js
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    // 就是这里
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

然后使用

```js
npx webpack
```

> 但是默认情况下不会转换任何代码，所以你就要提前写你要用的插件

```js
const path = require('path');

module.exports = {
.....
  module: {
    rules: [
      {
        test: /\.js$/,
  // 这里写插件
        use: {
          loader: 'babel-loader',
          options: ['@babel/plugin-transform-block-scoping'],
        },
      },
    ],
  },
};

```

> 但是上面的插件一个个实在太繁琐了，于是你就写了预设

```js
module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 既可以写成这样
            // presets: [['@babel/presets-env']],
            // 也可以是这样 但是有什么区别呢
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
```

上面写成数组的形式，可以写一些 options

```js
module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 可以写额外的配置
            presets: [['@babel/presets-env'],{这里可以写更多的配置，比如polyfill}],
          },
        },
      },
    ],
  },
```

> 你也可以参考 postcss 一样，把这个写在外面。

```js
// webpack.config.js
module: {
    rules: [
      {
        // 写成这个
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ],
  },

// 新建babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
};

```

### browerslist 浏览器兼容性

每一次写代码的时候，会看到 package.json 里面有一个这个配置选项。其实就是基于这个网站[caniuse](https://caniuse.com/usage-table)的信息，对 babel 进行**各种浏览器的兼容转换**。这个就是一个准则一样，你 babel 基于准则这个进行转换。

那我们要不要安装这个工具呢？答案是不需要的，因为安装 babel 就安装了这个工具。详情可以查看 caniuse-lite 还有 browerslist 这个第三方库。如何验证呢？你在命令行直接输入就可以查看默认的规则。

```js
 npx browserslist
 // 如果你想指定规则
  npx browserslist ">1%,not dead"
```

**编写规则**

**在哪里写**

- package.json
- 新建`.browserlistrc`文件

下面是截取了 react 的默认`package.json`文件

```js
{
  "name": "airbin",
  "version": "0.1.0",
  "private": true,
	.........
  // 就在这里写
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

然后你也可以自己写

```js
// .browserlistrc

> 0.2%
not dead
not op_mini all
```

> targets 其实也可以写，但是这样写的话，只是在这一个 babel-loader 使用。但是如果你在`.browserlistrc`设置，可以把所有的 loader 都生效

```js
module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 可以写额外的配置
            presets: [['@babel/presets-env'],{
              targets:"last 2 version"
            }],
          },
        },
      },
    ],
  },
```

如果当 targets 和`browserlistrc`都写的情况下，这样的话`browserlistrc`会被覆盖掉。所以不建议使用 targets

### polyfill

这个是什么呢？其实这个就是对于一些代码打补丁，比如说你的**浏览器可能不支持 new Promise**,这种新的语法，就需要 polyfill。

那你不是说 babel 不是已经会解决兼容性问题吗？但其实 babel 只是给你做了 es6 到 es5 的转换（新旧版本的转换），但你原本的 API 浏览器就没有。此时 babel 是不可能给你转换的，巧妇难为无米之炊啊！

所以当你使用 polyfill 之后，会根据你的浏览器兼容性，直接给你写一下代码。

![image-20230307232723863](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230307232723863.png)

那么 babel 里怎么使用呢？

7.4 之前需要安装@bable/polyfill 这个包。现在推荐用`core-js`和`regenerator-runtime`来完成

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        // false 表示不使用
        // usage 表示使用
        // entry 这个表示第三方的代码也进行polyfill，比如对axios也是用
        useBuiltIns: 'entry',
      },
    ],
  ],
};
```

如果你想使用的是 entry，从入口开始代码。那么在你的入口文件，你一定不要忘记添加。

```js
// ⚠️ 不能忘记添加这两行
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// ⚠️ 不能忘记添加这两行

console.log('hello');
const obj = {
  name: 'chin',
  age: 1888,
};

const { name, age } = obj;

console.log(name);

const msg = 'hello';
console.log(msg.includes('he'));
```

### react 配合

假设我们是从零搭建一个 react 环境，那需要怎么搭建呢？

除了上面搭建的 babel 之后，还需要针对 react 的一些包和预设。

- 安装 react 和 react-dom 这俩包 `npm i react react-dom`
- 编写 react 代码
- 新建模板 index.html
- 安装 html-webpack-plugin 加上支持 `npm i html-webpack-plugin -D`
- 为了处理 jsx 所以需要 babel 对 jsx 进行支持 → 安装 react 预设 `npm i @babel/preset-react -D`

下面具体执行如下

安装 4 个包

```js
npm i react react-dom
npm i html-webpack-plugin -D
npm i @babel/preset-react -D
```

修改`webpack.config.js`和`babel.config.js`配置

![image-20230308000846200](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230308000846200.png)

写 react 代码和模板

```js
// src/react/App.jsx
import { memo, useState } from 'react';

const App = memo((props) => {
  const [c, setC] = useState(1);
  return (
    <div>
      <h2>{c}</h2>
      <button onClick={(e) => setC(c + 1)}>+1</button>
    </div>
  );
});

App.propTypes = {};

export default App;
```

模板

```html
<!-- src/react/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

在入口文件引入

```js
// main.js是入口文件
import React from 'react';
import ReactDom from 'react-dom/client';
import App from './react/App.jsx';

// 这里开始写react代码

const root = ReactDom.createRoot(document.querySelector('#root'));
root.render(<App />);
```

然后这样基本就可以运行了，如果你不想写这个`import App from './react/App.jsx';`而是想写`import App from './react/App';`

那么你要增加一个配置

```js
// webpack.config.js
resolve: {
  // 增加对jsx的支持
    extensions: ['.js', '.json', '.jsx'],
  },
```

## ts

如果你想在 webpack 里使用 ts 有两种方法。一种是 tsloader，一种就是 babel

### ts-loader

下面先写上 tsloader 用法

- 安装 ts-loader （安装 tsloader 会给你自动安装了 typescript
- 写`webpack.config.js`配置，包括对 ts 的处理
- 添加 tsconfig.json 文件 `tsc --init`

下面开始具体一股脑的写了。

安装 ts-loader

```js
npm i ts-loader -D

// 生成tsconfig.json
tsc --init
```

写一个 ts 文件并引入到入口文件里

```js
// ts/math.ts
type Math = number;

export function sum(x: number, y: number): Math {
  return x + y;
}

// main.js
import { sum } from './ts/math';
// 使用ts代码
console.log(sum(2, 8));
```

增加 webpack.config.js 配置

```js
  resolve: {
    // 🆕 增加新的.ts
    extensions: ['.js', '.json', '.jsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //?表示0个或1个
        use: ['babel-loader'],
      },
      // 🆕 增加新的rule
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
```

### babel

**这个是推荐的！**为什么呢？可以增加 polyfill，并且可以少安装包。既然你都可以用 babel 了，就少用了。

- 安装 ts 预设 `npm i @babel/preset-typescript -D`
- `bable.config.js`增加新的预设

那么开始写了

```
npm i @babel/preset-typescript -D
```

```js
// webpack.config.js
{
  test: /\.ts$/,
  exclude: /node_modules/,
  // 这里是ts-loader
  // use: ['ts-loader'],
  // 这里是babel
  use: ['babel-loader'],
},

// babel.config.js
[
  '@babel/preset-typescript',
  {
    corejs: 3,
    useBuiltIns: 'usage',
  },
],
```

> 到底选哪个 loader？

- babel 缺点 无法做类型错误检查
- ts-loader 没有 polyfill 等功能

最佳实践，在开发的时候做实时的类型校验

```js
// package.json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "ts-check": "tsc --noEmit --watch"
},
```

然后使用 babel 进行打包。

## 本地服务器 devServer

首先你要知道这个是干什么的，那么就看一下 AI 的解答。

![image-20230308134150124](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230308134150124.png)

那怎么安装使用呢？

- 安装包 `npm i webpack-dev-server -D`
- 什么都不用配置，也不用写`webpack.config.js` 可以直接输入命令`npx webpack serve`就可以执行了。

执行完上面的命令之后可以看到命令行有这个提示。

![image-20230308134459593](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230308134459593.png)

这个也就相当于成功了，那么只是最基础的配置肯定是不行的。那我们怎么具体进行配置呢？比如我想修改端口，想加载静态资源。

而且此时是自带热更新的，当你修改了，你可以看到浏览器也会自动刷新。底层是使用了 memfs 这个库，可以直接加载到内存里，所以不会生成多余的文件。所以即使你删除掉了打包后的 build 文件夹，也会正常执行。

### 详细配置

#### 静态资源

那如果我们想具体进行配置。比如静态资源。这个静态资源是什么意思呢？比如说我们的入口 html。

```js
.
├── advanced
│   ├── README.md
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── public // 1.新建这个文件夹
│   │   └── js
│   │       └── demo.js
│   ├── src
│   │   ├── index.js
│   │   ├── main.js
│   │   ├── react
│   │   │   ├── App.jsx
│   │   │   └── index.html // 2.然后导入相应的静态文件
│   │   └── ts
│   │       └── math.ts
│   ├── tsconfig.json
│   └── webpack.config.js
```

就像下面这样。

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
    <!--引入了下面这个文件，此时你会发现你是找不到的。因为js这个文件夹根本没有被打包进去你最后的build里面 -->
    <script src="./js/demo.js"></script>
  </body>
</html>
```

那怎么办呢？于是你就可以设置一个静态资源文件夹，当出现静态资源的时候你就相当于默认来到 public 找了

```js
// webpack.config.js
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    clean: true,
  },
  // 重点是这里
  devServer: {
    static: ['public'],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts'],
  },
```

上面的意思就是

` <script src="./js/demo.js"></script>` 只要出现了这个静态文件，就去 public 找。这个参数可以设置多个。

`static: ['public', 'content'],`这个分别找下去。⚠️，以前这个配置属性不叫 static，叫 contentBase。最新的就是 staic.

#### 代理服务

这个需要理解一下，代理是什么，devServer 的意义就是帮你代理，你的所有请求都要经过我，我就是过路费。我帮你搞，我帮你去 web 服务器找。

![image-20230308140216808](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230308140216808.png)

上面的

```js
module.exports = {
  devServer: {
    contentBase: './dist', // 静态文件目录
    port: 8080, // 服务端口号
    open: true, // 自动打开浏览器
    hot: true, // 启用热更新
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 将请求代理到本地服务的3000端口
        pathRewrite: { '^/api': '' }, // 将请求中的/api替换为空字符串
      },
    },
  },
};
```

还有一个 proxy 的属性，也需要注意`changeOrigin:true;`

当你没有写这个属性的时候，后端服务器看到你的接口其实还是图上的 8000，这个时候后端可能会拒收，因为这个端口他不认。如果你加上这个之后，后端接受到的端口就是 3000。多用于防爬虫等等。

```js
module.exports = {
  ....
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 将请求代理到本地服务的3000端口
        pathRewrite: { '^/api': '' }, // 将请求中的/api替换为空字符串
  			changeOrigin:true;
      },
    },
  },
};

```

#### 其他配置

上面其实也写了一些。

```js
module.exports = {
  devServer: {
    contentBase: './dist', // 静态文件目录
    port: 8080, // 服务端口号
    open: true, // 自动打开浏览器
    hot: true, // 启用热更新
    compress: true, // 压缩
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 将请求代理到本地服务的3000端口
        pathRewrite: { '^/api': '' }, // 将请求中的/api替换为空字符串
      },
    },
  },
};
```

增加一个 `compress:true`帮你压缩，缩小传输。写上这个之后你在前端的头里面

`Content-Type: application/javascript; charset=utf-8`

#### historyApiFallback

这个属性理解起来也是很困难的，于是我就去问了 AI。得到的回答基本满意，意思就是说不存在的页面不会显示 404，而是重定向。

![image-20230308141519984](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230308141519984.png)

## webpack 优化

优化？优化哪里呢？不外乎俩。

- 打包速度（exclude → 不必要的文件不打包，cache-loader→ 使用缓存等等）
- 打包后的结果，上线的性能优化。（分包处理，减小包体积，CDN 服务器。

先看看 AI 的回答

![image-20230308141830099](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230308141830099.png)

### 分包处理

分什么包呢？① 第三方包 ② 自己写的代码 ③ 运行 webpack 的包

- 多入口
- 重复打包
- 分包按需加载

#### 多入口

什么是多入口呢？原来不是只有一个入口么，事实上 entry 可以使用多入口的，使用多入口之后，你的 html 也会自动导入多个 js

但是怎么写呢？

```js
entry: {
  // 1. 引入多个
    main: {
      import: './src/main.js',
    },
    index: {
      import: './src/index.js',
    },
  },
  output: {
    path: path.resolve(__dirname, './build'),
     // 2. 🔥 这里的名字必须要改成占位符的。因为固定的名字就不知道引入什么了
    filename: '[name]-bundle.js',
    clean: true,
  },
```

这个时候你会发现 html 也会自动加载多个

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- 在这里 会看到导入了俩-->
    <script defer src="main-bundle.js"></script>
    <script defer src="index-bundle.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script src="./js/demo.js"></script>
  </body>
</html>
```

> 这样的问题就是如果 index.js 和 main.js 两个入口文件如果都引入了同一个包的情况下会产生重复打包。

```js
// main.js
import axios from 'axios';
// index.js
import axios from 'axios';
```

所以会增加【共享】选项，告诉要【共享】什么包。

```js
module.exports = {
...........
  entry: {
    main: {
      import: './src/main.js',
  // 增加这个属性，告诉要shared什么包
      dependOn: 'shared',
    },
    index: {
      import: './src/index.js',
	// 增加这个属性，告诉要shared什么包
      dependOn: 'shared',
    },
      // 相当于新建了一个包shared，你也可以叫shared1，shared2。多写几个，然后按照需求share
    shared: ['axios'],
  },
...........
```

此时你就会发现，webpack 会单独给你 shared 的包新建一个 js 文件用来 share。这就是多个共同依赖，可以使用同一文件打包分包设置.

![image-20230310145140797](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230310145140797.png)

#### 动态导入

动态导入是写在 js 里的，代码运行到的时候**再进行加载**。

- `import()语法` 记住不是 import，而是`import()`是一个函数 → 懒加载原理
- `require.ensure`已经不推荐了

```js
/*
before 这里模拟一个点击菜单栏的感觉，点击之后才加载 这种情况下
这种情况下about和like会在main只要打包就会被引入加载进去 也就是说【首屏渲染】就被加载
*/
// main.js
import './router/about';
import './router/like';

// after
// main.js
/*
after 这种情况 只有你在做出点击的动作之后才会分别被加载进来
*/
btn1.onclick = function () {
  import('./router/about');
};

btn2.onclick = function () {
  import('./router/like');
};
```

下面说一个分包文件命名规则。只有异步的才能用这个分包重命名。比如`import()`

```js
// 这个是所有的包的命名
filename: '[name]-bundle.js',
// 如果我只想把后来加进来的分包单独用另一个命名的话，可以使用这个
output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name]-bundle.js',
    chunkFilename: '[id]_[name]-chunk.js',
    clean: true,
  },

```

```js
// main.js
if (true) {
  import('./about.js');
}
```

这样你在打包之后就会发现生成的是这个

```js
├── build
│   ├── index-bundle.js
│   ├── index.html
│   ├── main-bundle.js
│   ├── shared-bundle.js
│   └── src_about_js-chunk.js // 这个名字就变了
```

如果你觉得你对这个 name 不满意，你可以使用这个**魔法注释**

```js
if (true) {
  // 这个就相当于你自己命名了name，这个叫魔法注释
  import(/*webpackChunkName:"aboutChin"*/ './about.js');
}

// 这样生成的就是
├── README.md
├── babel.config.js
├── build
│   ├── aboutChin-chunk.js // 变成你设置的魔法注释的名字
│   ├── index-bundle.js
│   ├── index.html
│   ├── main-bundle.js
│   └── shared-bundle.js
```

## optimization

这个主要搞优化的配置，这个主要搞分包。默认情况下只针对异步分包，但是对第三方是不会分包的。

```js
// 🔥 这里第三方就不会给你分包
import React from 'react';
import ReactDom from 'react-dom/client';

// 这个会给你分包
if (true) {
  // 这个就相当于你自己命名了name，这个叫魔法注释
  import(/*webpackChunkName:"aboutChin"*/ './about.js');
}
```

所以你需要配置，现在开始配置。

```js
module.exports = {
  mode: 'development',
  ....
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts'],
  },
    // 🔥 这里 async就是只对异步才会分包，all的话对于开头引入的第三方也会分包
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
 ...
};

```

执行`npx webpack`之后得到的分包数据就是

```js
├── build
// 第三方分到了这里
│   └── vendors-node_modules_react-dom_client_js-node_modules_react_jsx-runtime_js-bundle.js
├── package-lock.json
```

> 一般 react 或者 vue 就是分包分出来
>
> - 第三方的包. `chunks: 'all',`
> - 懒加载（`import()`） 修改` chunkFilename: '[id]_[name]-chunk.js',`
> - 主包

#### 分包大小

如果你对分包的大小不满意，比如说太太太大了。那么就可以分起来，这个就是 SplitChunks,这个目前 webpack 已经默认安装和集成了。所以就不用单独安装了。这个可以针对**异步进行分包的大小进行限制**。

```js
optimization: {
    splitChunks: {
      chunks: 'all',
      // 只要包大于2000kb就会给你拆起来（但是不一定就给你拆成这么大，因为函数有可能是一个大的整体）
      maxSize: 20000,
      // 每一个拆成不小于minSize这么小
      minSize: 10000,
    },
  },
```

给分包加成一个组。比如说 node_modules 这个文件我想有一个规则，自己定义的文件有另一个规则就可以

```js
optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 分包给分起来组
        vendors: {
          // 这个做匹配
          test: /node_modules/,
            // 这个写包的名字
          filename: '[id]_[hash:6]_vendor.js',
        },
        utisl: {
          test: /utils/,
          filename: '[id]_vendor.js',
        },
      },
    },
  },
```

执行之后就可以看到拆分的结果

```js
├── build
│   ├── aboutChin-chunk.js
│   ├── index-bundle.js
│   ├── index.html
│   ├── main-bundle.js
│   ├── shared-bundle.js
// 可以看到生效了
│   ├── vendors-node_modules_axios_index_js_vendor.js
│   └── vendors-node_modules_react-dom_client_js-node_modules_react_jsx-runtime_js_vendor.js
```

#### 关于 id 名

在 production 和 development 下，id 的算法是不一样的，不一样之后就导致你导出的包名，在不同的环境下也是不一样的。

但是我们可以自己设置算法，设置不同的属性就有。

- natural → 这个表示自然数递增（会受到包优先级影响）所以每次包都不确定
- named → development 默认的，就是你看得懂的名字。**开发推荐**
- deterministic → 这个表示确定 **webpack5 新增 线上推荐**

```js
optimization: {
    // development默认是named，也是推荐点
    // production的话则推荐使用 deterministic 表示确定的数字，这样的话每次分包的名字固定可以减少更新的频率
    chunkIds: 'deterministic', //
    splitChunks: {
 ....
  },
```

在生产环境里使用 deterministic 表示确定，这就避免了。我们每一次如果写了新的打包，引入了新的包。就会导致所有的顺序打乱，这样全部都会进行打包，效率会很低。很不利于线上部署和缓存。

#### prefetch preload

什么时候加载文件。

首页加载 → 点击 → 下载 js。

首页加载 → 用户停留的时候，先预加载 JS。也就是闲置的时候，但不用 → 点击的时候 → 直接加载

#### CDN

其实就是该到你买的 CDN 服务器的地址，怎么改呢？搜索，output 里增加 publicPath 属性

```js
output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    clean: true,
      // 新增这个
    publicPath: 'https://demo',
  },
```

然后你打包之后就会发现，html 里的所有的地址都成了

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    .......
    <script defer src="https://demo/84_vendor.js"></script>
    <script defer src="https://demo/main-bundle.js"></script>
    <script defer src="https://demo/index-bundle.js"></script>
    <script defer src="https://demo/753_vendor.js"></script>
    <script defer src="https://demo/shared-bundle.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script src="./js/demo.js"></script>
  </body>
</html>
```
