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
