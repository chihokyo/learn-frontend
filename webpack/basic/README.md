# webpack

## 综述

webpack 是啥子呢？我简单的说一下吧。其实就是模块化工程化必备的**打包工具**！

无论你写了什么东西，通过 webpack 都可以给你一股脑搞成 html/css/js 三剑客静态资源！官网的这个图其实特别形象！中间那个核心就是 webpack！

![Webpack - A Detailed Introduction — Smashing Magazine](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e4c48715-874f-447a-a915-c4615f7f1123/webpack-js-opt.png)

## 小试牛刀

- **安装**

建议本地安装，不要全局安装。因为每个项目要求的 webpack 版本可能不一样。而且 webpack4 之后都要依赖 webpack-cli 这个命令行工具了。

```js
npm install webpack webpack-cli -D
```

- **直接输出 文件夹构成**

```js
.
├── dist  //输出必须是 dist/main.js
│   └── main.js
├── package-lock.json
├── package.json
└── src
    └── index.js //输入必须是src/index.js
```

input 默认输入 `src/index.js` ,output 默认输出` dist/main.js`

直接输入个 webpack 在当前目录下，就是一切都用默认的

```
webpack
```

就可以用了。

- **如果我不想用默认的咋办，你可以命令行指定**

```bash
webpack cli --output-path # 指定输出的path
webpack cli --output-filename # 指定输出的文件名
webpack cli --entry # 指定输入
```

要使用 Webpack 命令行更改输入的文件名和路径，需要在 webpack 命令后添加相应的参数。以下是几个常用的参数：

- `--entry <entry>`：指定入口文件的路径。
- `--output-filename <filename>`：指定输出文件的文件名。
- `--output-path <path>`：指定输出文件的输出目录。

例如，要将 `src/index.js` 作为入口文件，将编译后的文件输出到 `dist` 目录下的 `bundle.js` 文件中，可以使用以下命令：

```bash
webpack --entry src/index.js --output-filename bundle.js --output-path dist
```

其中，`--entry` 参数指定了入口文件路径为 `src/index.js`，`--output-filename` 参数指定了输出文件名为 `bundle.js`，`--output-path` 参数指定了输出目录为 `dist`。

- **上面的每次都要写这么长的命令行我不想用怎么办？**

webpack 还支持在配置文件(`webpack.config.js`)中设置入口和输出，这样可以更方便地管理多个文件和文件夹。可以在配置文件中设置 `entry` 属性和 `output` 属性，然后通过 `--config` 参数指定配置文件路径，使用以下命令运行

```bash
webpack # 输入这个命令默认就是 webpack.config.js
# 不想用webpack.config.js可以改  ⚠️但是尽量不要改！
webpack  --config web.config.js
```

配置文件这样写

```js
// 项目目录webpack.config.js

const path = require('path');
// NodeJS环境 默认是commonjs模块管理
module.exports = {
  // 输入
  entry: './src/main.js',
  // 输出
  output: {
    filename: 'bundle.js',
    // 这里必须要用绝对路径 所以使用了path.resolve()这个系统函数 具体不知道去ChatGPT
    path: path.resolve(__dirname, 'dist'),
  },
};
```

## 1. 具体开始

### 一切的开始

webpack 从哪里开始呢？答案就是从入口文件开始，然后生成一个依赖关系图。通过这个依赖关系图来查找（js,css,image 等等文件），遍历这个图结构。从而开始打包成一个个模块。

**入口 → 依赖关系图 → 各种资源 → 遍历关系图 → 解析关系图 → 打包成单独的模块**

所以说一切都是从 entry，开始。👇🏻 开始写一个处理 css 的作为例子

### 1-1. 处理 css

由于 webpack 默认只会处理 js，所以当你有其他文件的时候，比如 css。默认情况下，我们 css 是必须写在 html 里的

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!--  下面这种感觉 正常css都是这样的 -->
    <link rel="stylesheet" href="style.css" />
    <script src="./dist/bundle.js"></script>
  </head>
  <body></body>
</html>
```

可是当使用工厂化之后，并不是直接在 html 文件里引入 css，而是在入口的 js 文件里引入，比如下面这种

```js
├── dist
│   └── bundle.js
├── index.html → 模板html
├── package-lock.json
├── package.json
├── src
│   ├── css
│   │   └── style.css
│   └── main.js // 在这里引入style.css
└── webpack.config.js
```

也就是这种感觉

```js
// src/main.js
import './css/style.css';

const add = (x, y) => {
  return x + y;
};

console.log('aaaa');
```

可是默认 webpack 只会处理 js，不会处理 css 啊。那怎么办呢？

各种 loader 就登场了。按照下面的步骤

1. 安装 css-loader `npm i css-loader -D`
2. 写配置文件`webpack.config.js`

```js
const path = require('path');
// NodeJS环境 默认是commonjs模块管理
module.exports = {
  // 输入
  entry: './src/main.js',
  // 输出
  output: {
    filename: 'bundle.js',
    // 这里必须要用绝对路径 所以使用了path.resolve()这个系统函数 具体不知道去ChatGPT
    path: path.resolve(__dirname, 'dist'),
  },
  //***************重点看这里******************
  module: {
    // 这里为什么用数组，因为可能有多个loader
    rules: [
      {
        test: /\.css$/,
        // 这里为什么用数组，因为可能1个类型 需要多重loader来处理
        use: [{ loader: 'css-loader' }],
      },
    ],
  },
  //****************重点看这里*****************
};
```

3. 安装 style-loader `npm i style-loader -D`

为什么还要继续安装这个，难道 css-loader 不够么？不够的，css-loader 只负责解析 css，并不负责展示到页面 html 上去。所以还要追加 style-loader

4. 写配置文件`webpack.config.js`

```js
module: {
  // 这里为什么用数组，因为可能有多个loader
  rules: [
    {
      test: /\.css$/,
      // 这里为什么用数组，因为可能1个类型 需要多重loader来处理
      // useloader顺序是从后向前的，所以先用css-loader，在用style-loader
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    },
  ],
},
```

> ⚠️ 从右向左按照顺序，所以要先 css 解析，然后 style 解析

关于简写

**如果处理某个文件只用到了 1 个 loader，可以不写 use 直接 loader**

```js
// before
module: {
  rules: [
    {
      test: /\.css$/,
      use: [{ loader: 'style-loader' }],
    },
  ],
},
// after 🆕
module: {
  rules: [
    {
      test: /\.css$/,
      loader: 'style-loader'
    },
  ],
},
```

如果 loader 没有`options:{}`情况下，可以直接写

```js
// before
use: [{ loader: 'style-loader',options:{} }, { loader: 'css-loader' }],
// after 🆕
use: ['style-loader', 'css-loader'],
```

同理的话，也可以写一个处理 scss 的配置文件

安装 要记得必须安装 loader 和 sass

```js
npm install sass-loader sass -D
```

修改配置文件

```js
{
    test: /\.s[ac]ss$/i,
    // 这里为什么按照这个顺序呢？
    // sass处理转换成css 然后再处理css 然后插入style
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
```

你可以写一个 scss 文件试一下

```scss
// src/css/style.scss
$body-color: red;

body {
  background-color: $body-color;
  h2 {
    color: blue;
  }
}
```

#### css 兼容性问题

很多 css 属性必须需要浏览器前缀才能被识别，必须你要自己写，但是有了 webpack 之后，你完全可以不用写了。

那 webpack 怎么才知道那些需要加上前缀哪些不需要呢？有没有一种工具自动加呢？有的！**postcss！**

怎么用呢？安装走起

```js
npm i postcss-loader -D
```

> ⚠️ 因为添加前缀这个是一个新功能，并不单单只是一个 loader，所以还需要另一个包来进行添加新功能。

```js
 npm i autoprefixer -D
```

#### 插件和 loader 区别

至于插件和 loader 有什么区别，这点我去问了 ChatGPT！我觉得回答的还不错，就截图下来了。

重点就是，**源代码转换（让文件能用）用 loader，扩展功能就是插件**！

![](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230227234130286.png)

然后就是写配置文件

```js
{
  test: /\.css$/,
  // 这里为什么用数组，因为可能1个类型 需要多重loader来处理
  // useloader顺序是从后向前的，所以先用css-loader，在用style-loader
  use: [
    'style-loader',
    'css-loader',
    // 重点在这里
    {
      loader: 'postcss-loader',
      // ⭐️这里要写options ⚠️ 其实这些规则都是插件自己定义的 和webpack已经关系不大了
      options: {
        // 导入插件
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
  ],
},
```

如果你觉得上面写的一坨配置文件实在太繁琐了，webpack 也支持把 postcss 的配置文件写在外面

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

新建一个`postcss.config.js` 名字不能改。当发现上面没有写配置文件的情况下，就会来找这个配置文件。

```js
module.exports = {
  plugins: [require('autoprefixer')],
};
```

> 但是这里推荐使用 postcss-preser-env 这个插件 plugins，代替 autoprefixer。因为这个更强大，不仅内置了 autoprefixer，还有新特性。

使用方法很简单

```js
npm i postcss-preser-env -D
```

然后把配置文件直接改成这个就可以

```js
module.exports = {
  plugins: [
    require('postcss-preser-env'): // 最新的可以省略require,直接写个'postcss-preser-env'
  ]
}
```

### 1-2. 处理图片

webpack5 之前你都要自己搞 loader，但是 5 之后 webpack 已经内置了处理这些图片 loader。先说一下以前，以前的话需要这几个包。（现在不需要了，但内置也是基于以前的包。

早期处理图片包（webpack5 之前）

- `file-loader`
- `url-loader`
- `raw-loader`

现在的话[官方 asset 文档](https://webpack.js.org/guides/asset-modules/)

```javascript
{
  test: /\.(png|jpe?g|png|svg)$/,
  type: 'asset', // 直接在type这里写类型
},
```

- asset/resource → 直接当成单独文件（其实就是复制粘贴了一并且发送了一次 url 请求 → **适合大 size 的图 消耗时间长**
- asset/inline → 使用 base64 的编码，并且直接编码后放在 js 文件中。但是会造成 js 解析时间过长，所以 → 小 size 图都用这个方法 因为直接嵌入到 js 里的 data:image 代码不会阻塞
- asset/source → 导出源代码（很少用，属于二进制
- asset → 包含了 asset/resource 和 asset/inline 可以配置资源体积

那我如何让大的资源`asset/resource `用这个，小的资源用`asset/inline `呢？

```js
{
    test: /\.(png|jpe?g|gif|svg)$/,
    type: 'asset',
      // 设置这个
    parser: {
      // 不超过60kb的就可以用data:image嵌入js的方式
      dataUrlCondition: {
        maxSize: 60 * 1024,
      },
    },
  },
```

那如果我想重命名呢？

```js
generator: {
    // 占位符
    // name 原来文件名字
    // ext 拓展名字
    // hash 哈希值 如果觉得太长 可以截取[hash:7]
    // 这里会提前生成文件夹
    filename: 'static/[name][hash:7][ext]',
  },
```

### 1-3. 处理 JS

这个是为什么呢？不是说默认可以处理 JS 吗？其实主要是将 es6 转换成 es5 代码，主要用的是 babel 插件。

什么是 babel 呢？→ 用法太多，以后可以单独写一下。但是现在只讲如何在 webpack 用 babel。

但插件需要以下这么多！

```js
npm i @babel/cli @bable/core -D
```

所以直接用预设的 bable 就可以

```js
npm i babel-loader -D
npm i @babel/preset-env -D
```

写配置

```js
// webpack.config.js
{
  test: /\.js$/,
  use: ['babel-loader'],
},
```

写单独的 babel 配置

```js
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
};
```

babel 还有其他预设。主要有 env,react,typescript 这个可以查找。

## 2. resolve 模块解析

这个配置就是主管各种路径解析的。

这个是什么呢？那就是你在写代码的时候会引入各式各样的模块。就是

```js
require('module');
```

以前在模块化的时候是有规则的，但其实 webpack 其实也有规则

### 规则

- 绝对路径 → 已经都是绝对的了 不用解析
- 相对路径 → 使用 import 和 require 的会认为是上下文目录，然后给相对路径，拼接成绝对路径。
- 模块目录 → 会从 resolve.modules 指定的所有目录进行检索。默认是`[node_modules]`

### 确定是文件还是文件夹

如果是一个文件

- 有扩展名，直接打包。比如 js
- 没有的话，就用`resolve.extensions`选项作为扩展名解析。这也就是为什么即使你引入的是`jsx`,`vue`，你没有写后缀名。也可以被识别打包的原因。

如果是一个文件夹

- `resolve.mainFiles`默认值是

配置

```js
resolve: {
    extensions: ['.js', '.json', '.jsx', 'vue']  // 就按照这个顺序
},
```

配置别名，为了防止你引入模块的时候。`require("../../这样一大坨")`

```js
resolve: {
  extensions: ['.js', '.json', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, './src/utils'),
  },
},
```

## 3. Plugins 各种插件

上面说了一下 loader 和插件的区别。所以接下来讲一下常用的插件。

### CleanWebpackPlugin

清除的，每次打包后先给你把老的所有文件给删掉。然后重新打包。防止你的目录一堆不用的老垃圾。

但是这个插件现在已经被**内置配置**代替了

```js
// 输出
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  // 直接用这个配置就行
  clear: true,
},
```

### HtmlWebpackPlugin

你每次打包之后，dist 打包后的文件夹里根本没有 html 文件的。每次都是在外面的。难道你每次都要自己手动转入到打包后的 dist 文件夹里面吗。

这样很不专业，也不规范。

```js
.
├── README.md
├── babel.config.js
├── dist
│   └── bundle.js
├── index.html // 这个每次都在外面很不专业
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── css
│   │   ├── style.css
│   │   └── style.scss
│   ├── img
│   │   ├── image_demo.png
│   │   └── small.png
│   └── main.js
└── webpack.config.js
```

这个插件就是自动在 dist 给你自动生成文件的。每次你就不用自己在外面写 `index.html`了。

但是他自己给你写的 html。你不是很满意怎么办？

```js
npm i html-webpack-plugin -D // 先安装
```

然后配置里直接写

```js
plugins: [new HtmlWebpackPlugin()],
```

如果你觉得 title 不满意

```js
plugins: [
  new HtmlWebpackPlugin({
    title: '我取的名字',
  }),
],
```

如果你觉得整个 index 你都不满意，可以用自己写的模板。

```js
plugins: [
  new HtmlWebpackPlugin({
    title: '我取的名字',
    template: './index.html',
  }),
],
```

### DefinePlugin

这个做什么呢？你仔细看 react 模板的话，会发现有一个谜之变量`%PUBLIC_URL%`。跟一些模板引擎很像。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</html>

```

这个就是 EJS 模板填充数据，属于**全局变量**。那怎么设置呢？

webpack 内置的插件`DefinePlugin`

```js
// 引入
const { DefinePlugin } = require('webpack');

plugins: [
  new HtmlWebpackPlugin({
    title: '我取的名字',
    template: './index.html',
  }),
  // 书写
  new DefinePlugin({
    BASE_URL: "'./'",
  }),
],
```

> ⚠️ 这里有个要注意的，` BASE_URL: "'./'",`后面的双引号里面的代码会被解析成 js 代码，类似于`eval()`
>
> 所以你直接写`BASE_URL: "./",` 的话，`./`会被误认成为 JS 代码。所以包裹了一层。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
   <!-- 这里就能用了 -->
    <link rel="stylesheet" href="<%= BASE_URL %>" />
</html>

```

而且你不仅仅能写在 html 里，任何一个 js 文件。都可以使用这个全局变量

```js
console.log(BASE_URL); // 随便在哪里都能直接用
```

## 4. mode

这个配置，是可以告诉 webpack 使用相应模式的内置优化。

总共有 3 种模式。

- none → 不使用任何默认优化
- development → 比如会有源码可以查看。
- production 默认 → 比如会有混淆，丑化，等等。

![image-20230302222318229](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230302222318229.png)

### 区分开发线上环境

那么如何区分开发 development/production 环境呢？

方法一

新增一个文件夹，然后分别写

```js
.
├── README.md
├── babel.config.js
├── config
│   ├── webpack.dev.config.js
│   └── webpack.pro.config.js
```

然后你在`package.json` 分别写上这个

```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "serve": "webpack serve --config ./config/webpack.dev.config.js",
  "build": "webpack --config ./config/webpack.pro.config.js"
},
```

> ⚠️，此处有个注意点，入口文件的路径永远是相当于 webpack 启动命令的。
>
> 其实本质是相当于 context 属性

```js
module.exports = {
  // entry是相当于这个目录的。但这个极少改变，一律都用默认的
  context: path.resolve(__dirname, '/'),
  // 永远是相当于webpack启动，也就是根路径
  entry: './src/main.js',
};
```

那如果我们想有一个共通的，然后分别设置 dev 和 pro 呢？

安装一个包`webpack-merge`

```js
npm i webpack-merge -D
```

然后修改配置文件，增加一个共通的配置

```js
├── config
│   ├── webpack.com.config.js // 共通的
│   ├── webpack.dev.config.js
│   └── webpack.pro.config.js
```

```js
const { merge } = require('webpack-merge'); // 导入插件
const comConfig = require('./webpack.com.config'); // 导入共通
// dev配置
module.exports = merge(comConfig, {
  // dev的专属配置
});
```

## 5. 搭建本地服务器

目前的话是没有本地服务器的，你写的每次都是要用 live server 这个插件的。也没有热更新，也需要手动打包。

为了我们每一次可以自动重新编译+可以自己打开`index.html`

那么如果我们本地需要一个服务器怎么办？需要一个插件。`devServer`

**安装使用**

```js
// 安装
npm i webpack-dev-server -D

// 什么都不用配置 直接输入命令行运行
npx webpack serve
```

> 这样就可以直接用了。但是用这个之后，会发现就不会给你打包了（不会生成 dist，不会输出任何文件），这个会直接给你加载到内存里，直接运行。

而且你会发现会给你输出默认 8080 端口打开。

**热模块更新**

可是这样修改了一个文件，会导致全部都被刷新，于是就有了 HMR。热模块更新 hot module replacement。

就是运行过程中，替换添加删除模块，不需要刷新整个网页。

如何配置？其实默认是打开的。

```js
mode: 'development',
decServer: {
  hot: true,
},
```

但只是这样是不够的，这个只是开启了热更新模式。至于你想让哪个模块热更新，需要你自己写

```js
if (module.hot) {
  // demo.js是需要你更新的
  module.hot.accept('./demo.js');
}
```

> 难道我所有文件还要 1 个个写吗？
>
> 真实开发的时候其实不用你写，框架 react 等等会给你配置好的。

**修改 host/port 端口**

默认是 8080，想要其他的。

```js
mode: 'development',
decServer: {
  hot: true,
    // 这里修改
  port:8787;
},
```

你也可以修改

```js
mode: 'development',
decServer: {
  hot: true,
    // 这里修改
  port:8787,
  host:0.0.0.0, // 这里可以改host
  open:true, // 自动打开浏览器
  compress:true // 压缩成gzip 节省传输资源
},
```
