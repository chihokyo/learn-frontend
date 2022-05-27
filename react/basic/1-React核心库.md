> 1. # React 特点
>
>    **组件化模式**
>
>    命令式编码 → 让 dom 干嘛你干嘛 其实比如说获取 dom，操作 dom 这种。就是说你通过数据来操纵视图。比如 user 是 true，你就是显示已经登录页面的个人资料。然后 JavaScript 自己就会重新通过数据渲染页面。
>
>    **声明式代码** → 我告诉你页面应该是什么样子的，然后 react 帮你全干了。
>
>    JS 和 JQ 那种原生操作 DOM 会浪费大量资源，因为每一次都是更新都是重新渲染进行 repaint，然后 refloat，recalculte the layout。change dom is really expensive operation
>
>    关于这里，有一个知乎[声明式编程和命令式编程有什么区别？](https://www.zhihu.com/question/22285830)
>
>    ## 1 三大核心库
>
>    ### 1-1 react.js 核心库
>
>    这个没什么好说的，必须要有，React 核心库。**引入核心库，要先引入** 。数据 → VDOM。
>
>    ### 1-2 react-dom.js
>
>    提供操作 DOM 的 react 扩展库。上面引入了这个才可以，用于 react 操作 DOM。VDOM → DOM。
>
>    `reactDOM.render(虚拟DOM,真实DOM) `
>
>    ```javascript
>    // ReactDOM.render(虚拟DOM,真实DOM)
>    ReactDOM.render(VDOM, document.getElementById('test'));
>    ```
>
>    这里提到了虚拟 DOM，那么虚拟 DOM 是怎么来的。
>
>    #### ① 生成虚拟 DOM `React.createElement()`
>
>    ```jsx
>    // 因为无需用jsx的话，不需要babel了
>    <script type="text/javascript" src="../js/babel.min.js"></script>
>    <script type="text/babel" >
>    React.createElement(标签名,属性,内容);
>
>    const vDom1 = React.createElement('h2',React.createElement(在这里无限嵌套),内容)
>    ```
>
>    但是当标签多了之后会有写起来就是一个无线嵌套，所以实际上很少有人这么写。
>
>    ```jsx
>    const vDom1 = React.createElement(
>      'h2',
>      React.createElement(在这里无限嵌套),
>      内容
>    );
>    ```
>
>    ⚠️ 虚拟 DOM 肯定不只是一个啊，然后就会发生。无线嵌套。所以方法二就出来了。
>
>    #### ② 生成虚拟 DOM JSX
>
>    ```jsx
>    const VDOM = '<h1>Hello,React</h1>'; /* ❌ 这种只是字符串 */
>    const VDOM = (
>      <h1>Hello,React</h1>
>    ); /* ✅ 此处一定不要写引号，因为不是字符串 这就是JSX */
>    ```
>
>    这个单独下面写，先说下 JSX 如果想转换成 JS 的那种虚拟 DOM 需要三大核心库的最后一个也就是 babel
>
>    ```jsx
>    <script type="text/babel">
>      {' '}
>      /* 此处一定要写babel */ // 1.创建虚拟DOM 用()这样表示一个整体 这样更像一个整体
>      const VDOM = ( /* 此处一定不要写引号，因为不是字符串 */
>      <h1 id="title">
>        <span>Hello,React</span>
>      </h1>
>      ) // 2.渲染虚拟DOM到页面 ReactDOM.render(VDOM,document.getElementById('test'))
>    </script>
>    ```
>
>    ### 1-3 babel.min.js
>
>    bable 在 react 主要作用其实就是 2 个。
>
>    作用 1 ES6 → ES5
>
>    作用 2 JSX → JS
>
>    ```html
>    <!DOCTYPE html>
>    <html lang="en">
>      <head>
>        <meta charset="UTF-8" />
>        <title>hello_react</title>
>      </head>
>      <body>
>        <!-- 准备好一个“容器” -->
>        <div id="test"></div>
>
>        <!-- 引入react核心库 多了一个React -->
>        <script
>          type="text/javascript"
>          src="../js/react.development.js"
>        ></script>
>        <!-- 引入react-dom，用于支持react操作DOM 多了一个ReactDOM对象 -->
>        <script
>          type="text/javascript"
>          src="../js/react-dom.development.js"
>        ></script>
>        <!-- 引入babel，用于将jsx转为js -->
>        <script type="text/javascript" src="../js/babel.min.js"></script>
>
>        <script type="text/babel">
>          /* 此处一定要写babel 而不是写jsx */
>          //1.创建虚拟DOM
>          const VDOM = (
>            <h1>Hello,React</h1>
>          ); /* 此处一定不要写引号，因为不是字符串 这就是JSX */
>          //2.渲染虚拟DOM到页面（虚拟DOM，容器）
>          ReactDOM.render(VDOM, document.getElementById('test'));
>        </script>
>      </body>
>    </html>
>    ```
>
>    > 👆 写的都是最基础的引入方式，是为了学习语法，真正开发的时候是不推荐这样直接引入的，因为浏览器在遇到`<script type="text/babel" >`的时候才会进行翻译。
>
>    ```jsx
>    ReactDOM.render(VDOM, document.getElementById('test'));
>    ReactDOM.render(VDOM2, document.getElementById('test'));
>    ```
>
>    ## 2 虚拟 DOM PK 真实 DOM
>
>    为什么要用虚拟 DOM？ 因为操作真实的 DOM 是特别没有效率的事情。
>
>    其实这也是 react 的特色，就是先通过生成虚拟 DOM，然后在生成真实 DOM，最后渲染。
>
>    > 为什么不用 XML，因为是这个 XML 的标签数据结构性的内容比数据还多。特别繁琐，没有效率。
>
>    **虚拟 DOM**
>
>    ```jsx
>    // 创建虚拟DOM
>    const VDOM = (
>      /* 此处一定不要写引号，因为不是字符串 */
>      <h1 id="title">
>        <span>Hello,React</span>
>      </h1>
>    );
>    // 渲染虚拟DOM到页面
>    ReactDOM.render(VDOM, document.getElementById('test'));
>    ```
>
>    **真实 DOM**
>
>    ```jsx
>    // 创建真实DOM
>    const TDOM = document.getElementById('demo');
>    console.log('虚拟DOM', VDOM);
>    console.log('真实DOM', TDOM);
>    debugger; // 在这里可以看出真实DOM会有很多不需要的属性很重
>    // console.log(typeof VDOM);
>    // console.log(VDOM instanceof Object);
>    ```
>
>    关于虚拟 DOM 的本质
>
>    > 1. 本质是 Object 类型的对象（是一般对象`{}` 因为不是数组对象，也不是函数对象）
>    > 2. 虚拟 DOM 比较“轻”，真实 DOM 比较“重”，因为虚拟 DOM 是 React 内部在用，无需真实 DOM 上那么多的属性。
>    > 3. 虚拟 DOM 最终会被 React 转化为真实 DOM，呈现在页面上。
