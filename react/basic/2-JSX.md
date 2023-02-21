# JSX

## 1 JSX 是什么？

JavaScript ＋ XML = JSX。**但浏览器无法直接识别 JSX**，所以需要 babel 来转换。

.jsx 结尾的文件和.js 结尾的文件有什么区别

有时候在 vscode 里，会不识别 jsx 语法。你设置成 jsx 就可以识别 jsx 语法了。

## 2 在 React 里干什么的？

用来**创建虚拟的 DOM** 元素对象，既不是字符串，也不是 XML 标签。最终就是一个**对象 Object**。

在测试的时候可能需要编译会有延迟慢的反应，但是在项目中发布的时候一般都是提前编译好的。所以就不是很慢。

![image-20220205001246488](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220205001246488.png)

但是黄色框的话需要 babel 才能解析，下面红色框的无需 babel。

```jsx
<script type="text/babel">
  ↓
<script>
```

这里就印出来一个问题，react 里 jsx 的本质是什么？

> 本质其实就是一个**对象**

```jsx
React.
```

## 3 基本语法

`{ JS 表达式 }` `{}` 这个也叫胡子语法。

```jsx
const VDOM = '<h1>Hello,React</h1>'; /* ❌ 这种只是字符串 */
const VDOM = (
  <h1>Hello,React</h1>
); /* ✅ 此处一定不要写引号，因为不是字符串 这就是JSX */
```

### 什么是表达式？

因为这里扯出来一个表达式的问题。所以就回答一下。

> 什么是表达式 expression？什么是语句 statement？
>
> 一言以蔽之：**有返回值的都是表达式。** （但我感觉可以这样记忆⁉️ `if/for/switch/变量声明/以外都是`
>
> ```
> 1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
>     下面这些都是表达式：
>     (1). a
>     (2). a+b
>     (3). demo(1)
>     (4). arr.map()
>     (5). function test () {}
> 2.语句(代码)：
>     下面这些都是语句(代码)：
>     (1).if(){}
>     (2).for(){}
>     (3).switch(){case:xxxx}
> ```

所以 JSX 可以使用的表达式就是

1. 字符串`string` → 数值`number` → 布尔值`boolean` → null → undefined → object（ 数组`[]` / 对象`{}` ）
2. `1 + 2` `'abc'.split('')` `['a', 'b'].join('-')`
3. `fn()` 精简复杂的逻辑 👇🏻 有例子

> ⚠️ if 语句/ switch-case 语句/ 变量声明语句，这些叫做语句，不是表达式，不能出现在 `{}` 中！！
>
> ⚠️ 如果表达式是 null, boolean,undefined，将不会显示。

这里总结一下

7 大基本类型。

- number/string 你写的值是什么，就渲染出来什么
- 其他全是空

```jsx
import React from 'react';

export function App(props) {
  return (
    <div className="App">
      {/*字符串*/}
      {'hello'}
      <br />
      {/*数字*/}
      {88}
      {/*boolean /undefined/void 0/null*/}
      {true}
      {false}
      {void 0}
      {undefined}
      {null}
      {/*symbol bigint*/}
      {Symbol(100)}
      {10n}
    </div>
  );
}
```

其他复杂类型（地址）

- 普通对象不支持渲染
- 特殊对象（虚拟 DOM 对象）支持渲染
- 特殊对象（style 的行内样式）
- 数组对象 → 数组每一项拿出来分别进行渲染（并不是变为字符串渲染）
- 其他都不行，比如正则，各种 new Date 这种包装类

```jsx
{
  /*普通报错的 除非你是虚拟DOM对象*/
}
{
  /*{{x:20}} */
}
{
  /* new Date() */
}
{
  /** 函数不支持渲染，但如果是函数式组件就可以渲染 */
}
```

## 4 特别注意

接下来是一些具体的注意点。

```
1.定义虚拟DOM时，不要写引号。→ 不是字符串，不用加引号
2.标签中混入JS表达式时要用{}。 id={myId.toLowerCase()} → 规则
3.样式的类名指定不要用class，要用className。
4.内联样式，要用style={{key:value}}的形式去写。→双括号 {}第一层表示js{}第二层包裹表示写一个style对象
5.只有一个根标签 直接写不行，jsx不能有多个根标签。只能包一层
6.标签必须闭合
7.标签首字母
	(1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
	(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
```

关于 5 的深入理解

> 只有一个 **根标签** 直接写不行，jsx 不能有多个根标签。只能包一层。

```jsx
// ❌ 因为 h2 和 input 平级，相当于有 2 个根标签了。
const VDOM = (
    <h2 className="title" id={myId.toLowerCase()}>
        <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
    </h2>
    <h2 className="title" id={myId.toUpperCase()}>
        <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
    </h2>
    <input type="text"/>
)
```

修改之后 ↓

如果不想都写个根标签，可以用 `<>`</>替代 `<div>`！

```jsx
// ✅
const VDOM = (
  <div>
    <h2 className="title" id={myId.toLowerCase()}>
      {' '}
      // 2个id不能一样
      <span style={{ color: 'white', fontSize: '29px' }}>
        {myData.toLowerCase()}
      </span>
    </h2>
    <h2 className="title" id={myId.toUpperCase()}>
      {' '}
      // 2个id不能一样
      <span style={{ color: 'white', fontSize: '29px' }}>
        {myData.toLowerCase()}
      </span>
    </h2>
    <input type="text" />
  </div>
);
```

关于 7

> 若**小**写字母开头，则将该标签转为 html 中同名元素，若 html 中无该标签对应的同名元素，则报错。
> 若**大**写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错。

虽然可以自造标签，但是不被允许。

首字母大小 ➡️ 可能误认为是一个组件

## 5 实际使用技巧

其实在遍历列表的时候，jsx 会直接给我们遍历。

```jsx
// 1️⃣ 这样会直接显示arr里的数组内容
const arr = ['html', 'css', 'js'];
const list = <ul>{arr}</ui>;
// 2️⃣ 这样可以添加li，但其实这样做是不优雅的
for ( let i = 0; i < arr.length; i++) {
    arr.push(<li>{arr[i]}<li/>)
}

但是
```

### `map()`遍历

```jsx
// before
const VOM = {
    <div>
        <h1>JS</h1>
        <ul>
            <li>REACT</li>
            <li>VUR/li>
            <li>AN/li>
        </ul>
    </div>
}
ReactDOM.render(VOM, document.getElementById('test'))
```

传入数组，会自动遍历。但这不行。

所以就可以改写成 这里实际上用的是`arr.map()`,并且遍历的时候 ⚠️ key 要唯一！

```jsx
// 模拟一些数据
const data = ['Angular', 'React', 'Vue'];
// 1.创建虚拟DOM
const VDOM = (
  <div>
    <h1>前端js框架列表</h1>
    <ul>
      {data.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  </div>
);
// 2.渲染虚拟DOM到页面
ReactDOM.render(VDOM, document.getElementById('test'));
```

> **关于为什么 key 要唯一的问题**
>
> 其实这个关于 react 的 diff 算法问题，react 在比较的时候是按照顺序的。

```jsx
const arr = ['html', 'css', 'js'];
const arrA = ['html', 'css', 'js', 'py']; // ✅完全没问题
const arrB = ['py', 'html', 'css', 'js']; // ❌在最前面会导致所有的顺序打乱
```

### 模板精简复杂逻辑

关于精简模板中复杂逻辑的例子

```jsx
// 如果这里有一个需求就是需要你根据不同的数据显示不同的内容
// 对于这样的复杂逻辑，完全可以在外面用一个函数在外面
// 模板只用来调用结果
const switchDisplay = (status) => {
  switch (status) {
    case 1:
      return <h1>hello</h1>;
    case 2:
      return <h2>hello</h2>;
    case 3:
      return <h3>hello</h3>;
    default:
      return;
  }
};

export default function About() {
  return (
    <>
      {switchDisplay(1)}
      {switchDisplay(2)}
      {switchDisplay(3)}
    </>
  );
}
```

### 条件渲染

```jsx
export default function App() {
  const [flag, setFlag] = useState(true);
  return (
    <div className="App">
      {/* 这俩一样的效果 用来做逻辑判断 比如在loading的时候 */}
      {/* 渲染字符串 */}
      <h3>{flag ? '我显示出来啦' : null}</h3>
      <h3>{flag && '我显示出来啦'}</h3>
      {/* 渲染标签 */}
      {flag ? <span>this is span</span> : null}
    </div>
  );
}
```

### 处理 css

在 react 其实处理 css 有很多种方式

- 行内样式直接写
- style.module.css
- [styled-components](https://www.styled-components.com/) CSS in JS 思想。本质就是利用了 JS 的 **标签模板字符串** 原理

> 下面只是写行内样式，不涉及其他俩。

行内样式

```jsx
function App() {
  return (
    <div className="App">
      <div style={{ color: 'red' }}>this is a div</div>
    </div>
  );
}

export default App;
```

但是下面这样写是更优的

```jsx
const styleObj = {
  color: red,
};

function App() {
  return (
    <div className="App">
      <div style={styleObj}>this is a div</div>
    </div>
  );
}

export default App;
```

**类名 - className（推荐）**

`app.css`

```css
.title {
  font-size: 30px;
  color: blue;
}
```

`app.js`

```jsx
import './app.css';

function App() {
  return (
    <div className="App">
      <div className="title">this is a div</div>
    </div>
  );
}
export default App;
```

类名 - className - 可以直接动态控制类名

```jsx
import './app.css';
const showTitle = true;
function App() {
  return (
    <div className="App">
      <div className={showTitle ? 'title' : ''}>this is a div</div>
    </div>
  );
}
export default App;
```

## 6 JSX 本质

其实 JSX 的本质就是返回一个对象，这个对象就是 React.Componet。这个就是虚拟 DOM 的本质。

我们不是操作实际的 DOM，而是操作虚拟 DOM，什么是虚拟 DOM 呢？其实就是对象罢了。只不过这个对象里有你想要的格式。

所以只要是这样的对象，随便写。

![image-20220205004039642](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220205004039642.png)

这里有一段代码可以测试一下。

```jsx
import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const elementObj = (
      <div>
        <h1 title="标题">我是标题</h1>
      </div>
    );
    console.log(elementObj); // ✅ 这里可以打印一下看看jsx是什么
    return elementObj;
  }
}

export default Home;

// 打印的结果
```

### 虚拟 DOM 的好处是什么呢？

就是我们在修改一个页面的时候，可以不去操作真实的 DOM，只是做对象的对比。也就是 DOM-DIFF 语法。第一次渲染之后，第二次渲染的时候，只要做自己修改部分的渲染就行。

### JSX 底层处理机制

你写的 jsx → 使用 babal-preset-react-app 插件 → 编译成`React.createElement()`这种语法糖 → render 渲染到页面。

> 上面就是一整套流程。

![image-20230221014327092](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230221014327092.png)

也就是说，你可以直接

```jsx
// before
ReactDOM.createRoot(document.querySelector('#root')).render(<App />);

// after 可以把App替换掉,替换成虚拟DOM
ReactDOM.createRoot(document.querySelector('#root')).render(
  React.createElement(
    'div',
    {
      className: 'home',
    },
    React.createElement(
      'h1',
      {
        title: '\u6807\u9898',
      },
      '\u6211\u662F\u6807\u9898'
    ),
    React.createElement('span', null, 'hello')
  )
);
```

这个时候我们打印一下`React.createElement()`看看是什么呢？

![image-20230221014619711](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20230221014619711.png)

下面手写一个简单版本的`React.createElement()`

```js
export function createElement(ele, props, ...children) {
  let virtualDOM = {
    $$typeof: Symbol('react.element'),
    key: null,
    ref: null,
    type: null,
    props: {},
  };

  let len = children.length;
  virtualDOM.type = ele;
  if (props !== null) {
    virtualDOM.props = {
      // 其实这一步就是简单的浅拷贝而已
      ...props,
    };
  }

  // 只有1个子的话
  if (len === 1) virtualDOM.props.children = children[0];
  // 多项子
  if (len > 1) virtualDOM.props.children = children;

  return virtualDOM;
}
```
