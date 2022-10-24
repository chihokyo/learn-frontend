# 组件三大属性（state/props/refs)

react 就有三大属性就我上面写的

## 1 state

本质就是一个变量而已，但是组件一个特殊变量。

React 会进行监控这个变量变化，当 state 发生变化。组件就会重新渲染。

### 在类组件的 2 种写法

因为有是类组件，所以有 this 的存在。

```jsx
import React, { Component } from 'react';
/**
 * ========================================
 * 其实这里跟React无关
 * 利用的是ES6的语法 【Class的基本语法】
 * https://es6.ruanyifeng.com/#docs/class
 * ！实例属性除了定义在constructor()里面
 * ！也可以定义在最顶层
 * ========================================
 */

export default class App extends Component {
  //  方案1：写在构造函数里
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       user: { msg: 'hello world', name: 'chin' },
  //     };
  //   }

  //  方案2：直接写在外面最顶层
  state = {
    user: { msg: 'hello REACT!', name: 'CHIN' },
  };

  render() {
    const { msg, name } = this.state.user;

    return (
      <>
        <h2>{msg}</h2>
        <h2>{name}</h2>
      </>
    );
  }
}
```

### state 的值只要改变就一定会被渲染吗？

当然不是，React 内部要 diff 对比，2 次值不同。才会通过调用`setState()`进行重新渲染

- 值要不一样
- `setState()`

### 什么数据都要写在 state 里面？

对于那种组件内部经常变化的写在 state，其他固定的直接写个**实例属性**就好。

![image-20220207154352726](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220207154352726.png)

![image-20220207154503012](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220207154503012.png)

合起来就是这样的意思

数组放在 jsx 里面会自动遍历。

![image-20220207235018827](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220207235018827.png)

### state 为什么可以用 const 写？

其实这个 state 既然是可以变化的，那么应该是 let 才是啊？

其实当通过 setState 去修改一个 state 时，并不表示修改当前的 state，他是修改的是组件下一次渲染时 state 值！⚠️ 也就是每一次渲染都是新的值 ⚠️！

![image-20220203230523019](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203230523019.png)

### 和 setState 关系亲密

因为 state 和 setState 的关系很亲密。所以建议配合 state 一起食用！

### 在函数式组件里

这个要看 hooks `useState()`

## 2 props

主要是用来传递数据用的，React 组件基本的通信是通过 props 来实现的。

props 指向的是一个对象。它包含了父组件中传递的所有参数

```jsx
this.props.name = 'jack'; //此行代码会报错，因为props是只读的
```

这里继续详细的看一下 props

props 传递的数据类型

```jsx
import React, { memo } from 'react';

const App = memo(() => {
  return (
    <div>
      {/* 下面这两种传递的其实都是string 字符串比较特殊 可以2种方式传递都ok*/}
      <Child text="hello react" />
      <Child text={'hello react'} />
    </div>
  );
});

const Child = memo((props) => {
  // 这里传递的是一个string没错
  console.log(typeof props.text);
  const greeting = 'Welcome to newyork';
  return <h1>{greeting}</h1>;
});

export default App;
```

传递一个对象

```jsx
import React, { memo } from 'react';

const App = memo(() => {
  return (
    <div>
      {/* 下面这两种传递的其实都是string 字符串比较特殊 可以2种方式传递都ok*/}
      <Child text="hello react" />
      <Child text={'hello yes'} />
      {/* 第1个{} 是用来表示下面是一段js哦，第2个{}才是你要传递的对象 */}
      <Child text={{ obj: 'i am obj' }} />
    </div>
  );
});

const Child = memo((props) => {
  // 然后你会发现这里传递的就是obj了
  console.log(typeof props.text);
  const greeting = 'Welcome to newyork';
  return <h1>{greeting}</h1>;
});

export default App;

// 下面一段
import React, { memo } from 'react';

const App = memo(() => {
  return (
    <div>
      {/* 下面这两种传递的其实都是string 字符串比较特殊 可以2种方式传递都ok*/}
      <Child text="hello react" />
      <Child text={'hello yes'} />
      {/* 第1个{} 是用来表示下面是一段js哦，第2个{}才是你要传递的对象 */}
      <Child text={{ obj: 'i am obj' }} />
    </div>
  );
});

const Child = memo(({ text }) => {
  return <h1>{text.obj}</h1>;
});

export default App;

```

> 基本上这就是 React 中 props 从组件传递到组件的方式。您可能已经注意到，props 仅在 React 应用程序的组件层次结构中从上到下传递。没有办法将道具从子组件传递给父组件。我们将在本教程后面重新讨论这个警告。
>
> 同样重要的是要注意 React 的 props 是只读的（不可变的）。作为开发人员，你永远不应该改变 props，而只能在你的组件中读取它们。不过，您可以从中派生新值（请参阅稍后的计算属性）。毕竟，props 仅用于将数据从父组件传递给子组件 React。本质上，道具只是将数据沿组件树传输的工具。

![image-20221021161755790](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221021161755790.png)

### 父 → 子 传递小 demo

```jsx
import React, { Component } from 'react';

/**
 * 子组件
 */
class Child extends Component {
  constructor(props) {
    super(props);
    // 这里可以看到父组件传过来的全部参数
    console.log(props);
  }
  render() {
    // 这里也是可以看到的 一模一样
    // console.log(this.props);
    const { msg, info } = this.props;
    return (
      <div>
        <h1>我是子组件</h1>
        <h2>{msg}</h2>
        <h3>{info.id}</h3>
        <h3>{info.hobby}</h3>
      </div>
    );
  }
}

/**
 * 父组件
 */
export default class ParChildClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'hello react',
      info: { id: 'uuid1', hobby: 'swim' },
    };
  }
  //  想把上面的信息传递给Child这个组件
  render() {
    return (
      <div>
        <h1>ParChildClass</h1>
        <Child msg={this.state.msg} info={this.state.info} />
      </div>
    );
  }
}
```

### 子 → 父 传递小 demo

![image-20220207234405065](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220207234405065.png)

关于父子传递的函数/类组件

下面的代码以后会补充。

详情可以参考一下 codesandbox

- 父 → 子
  - [函数](https://codesandbox.io/s/adoring-taussig-8sioiz?file=/src/%E7%88%B6%E4%BC%A0%E5%AD%90/ParChildFunc.js)
  - [类](https://codesandbox.io/s/adoring-taussig-8sioiz?file=/src/%E7%88%B6%E4%BC%A0%E5%AD%90/ParChildClass.js)
- 子 → 父
  - [函数](https://codesandbox.io/s/adoring-taussig-8sioiz?file=/src/%E5%AD%90%E4%BC%A0%E7%88%B6/ChildParFunc.js)
  - [类](https://codesandbox.io/s/adoring-taussig-8sioiz?file=/src/%E5%AD%90%E4%BC%A0%E7%88%B6/ChildParClass.js)

### 一些应用

#### 用 react 实现 slot

slot 是什么呢。就是那种一个页面，比如导航栏，看起来都是一样的

```
左 中 右
```

但其实内容不一样，共通的结构，不同的细节。

在 vue 里就是用的 slot 实现的，但是 react 里怎么实现呢？

其实本质用的就是**props 属性**进行传递，只不过传递的是 JSX 数据

![image-20220208135224514](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220208135224514.png)

## 3 refs

react 是不推崇直接 DOM 操作的，但是有些时候不避免的也要 dom 操作。这个时候就要用 refs 取得。

**Q1：什么是？为什么要用？**

组件内的标签可以定义 ref 属性来标识自己 快速定位呗

**Q2：取得的是真实的 DOM 还是虚拟的 DOM？**

真实的 DOM 可以通过`debugger`验证

### 字符串形式 refs

下面是字符串形式的 refs

```jsx
class Demo extends React.Component {
  showData = () => {
    console.log(this);
    debugger;
    const { input1 } = this.refs; // 复数
  };
  showData2 = () => {
    const { input1 } = this.refs;
  };
  render() {
    return (
      <div>
        <input ref="input1" type="text" value="" />
        <button onClick={this.showData}></button>
        <input ref="input2" onBlur={this.showData2} type="text" value="" />
      </div>
    );
  }
}
```

注意，根据官网的描述，这个 API 已经快过时了。**因为效率不高**
[过时 API：String 类型的 Refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)

> 过时 API：String 类型的 Refs
>
> 如果你之前使用过 React，你可能了解过之前的 API 中的 string 类型的 ref 属性，例如 `"textInput"`。你可以通过 `this.refs.textInput` 来访问 DOM 节点。我们不建议使用它，因为 string 类型的 refs 存在 [一些问题](https://github.com/facebook/react/pull/8333#issuecomment-271648615)。它已过时并可能会在未来的版本被移除。
>
> > 注意
> >
> > 如果你目前还在使用 `this.refs.textInput` 这种方式访问 refs ，我们建议用[回调函数](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)或 [`createRef` API](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#creating-refs) 的方式代替。

### 回调形式 refs

- 我定义了一个函数
- 我没有调用它
- 它执行了

用这个可以验证，**回调函数返回值跟调用者有关**。这里返回的就是 a 所在的节点`<input ref={(a)=>{console.log(a)}} `

所以就可以这样写 ↓` <input ref={(curNode)=>{this.input1 = curNode}} type="text" value="" />`

这样的结果，就是把 a 所在的节点挂在了 this.input1 上，这里的 this 也就是箭头函数最近的实例 Demo

```jsx
class Demo extends React.Component {
  showData = () => {
    console.log(this);
    debugger;
    const { input1 } = this.refs; // 复数
  };
  showData2 = () => {
    const { input1 } = this.refs;
  };
  render() {
    return (
      <div>
        <input ref={(c) => (this.input1 = c)} type="text" value="" />
        <button onClick={this.showData}></button>
      </div>
    );
  }
}
```

回调次数问题

官方说明内联函数问题 → [关于回调 refs 的说明](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs)

```jsx
//  内联形式
{/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}
<input ref={this.saveInput} type="text"/><br/><br/>
// 绑定形式
saveInput = (c)=>{
    this.input1 = c;
    console.log('@',c);
}
```

所以下面会有一个非内联的，绑定的。但这两者*无关紧要*，不用过于纠结。

```jsx
//创建组件
class Demo extends React.Component {
  state = { isHot: false };
  showInfo = () => {
    const { input1 } = this;
    alert(input1.value);
  };

  changeWeather = () => {
    //获取原来的状态
    const { isHot } = this.state;
    //更新状态
    this.setState({ isHot: !isHot });
  };

  saveInput = (c) => {
    this.input1 = c;
    console.log('@', c);
  };

  render() {
    const { isHot } = this.state;
    return (
      <div>
        <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
        {/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}{' '}
        内联形式
        <input ref={this.saveInput} type="text" />
        <br />
        <br /> 绑定形式
        <button onClick={this.showInfo}>点我提示输入的数据</button>
        <button onClick={this.changeWeather}>点我切换天气</button>
      </div>
    );
  }
}
```

### createRef()形式 看这个就可以

官方写的很清楚。[创建 Refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#creating-refs)

**要注意，这里的创建方式并不是通过回调函数，而是官方的 API。**

创建 `myRef = React.createRef()`

获取`this.myRef.current.value`

他的局限性就是，专人专用，一个萝卜一个坑。而且用几个容器就要创建几个，代码稍微要写多点。

```jsx
//创建组件
class Demo extends React.Component {
  /* 
		React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
	*/
  myRef = React.createRef();
  myRef2 = React.createRef();
  //展示左侧输入框的数据
  showData = () => {
    alert(this.myRef.current.value);
  };
  //展示右侧输入框的数据
  showData2 = () => {
    alert(this.myRef2.current.value);
  };
  render() {
    return (
      <div>
        <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />
        &nbsp;
        <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        <input
          onBlur={this.showData2}
          ref={this.myRef2}
          type="text"
          placeholder="失去焦点提示数据"
        />
        &nbsp;
      </div>
    );
  }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2" />, document.getElementById('test'));
```

### 函数组件 useRefs

这里有一个简单的原生 PKreact 的实现对比

![image-20220517140835537](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220517140835537.png)

其实这里可以发现

`useRef()` 返回的就是一个对象`{}`，但是必须要有 current 这个属性

```react
export default function App() {
  // react自己的
  const demoRef = useRef();
  // 自己写一个
  const myRef = {
    current: null
  };

  const redHandler = () => {
    console.log(demoRef.current);
    console.log(myRef.current);
  };

  return (
    <div className="App">
      {/* 想要谁的dom 就把上面创建的ref对象放进来 */}
      <h2 ref={demoRef}>测试ref</h2>
      <button ref={myRef} onClick={redHandler}>
        click
      </button>
    </div>
  );
}
```

但其实是有区别的！！

- 自己创建的，每次重新渲染都会创建一个新对象。
- `useRef()` 都是同一个对象，可以确保每次渲染获取的都是一个对象
- 当你需要一个对象不会因为组件的重新的渲染而改变时候，就要用`useRef()`

这个时候就需要 ref，比如我想拿到自己组件的元素，想拿到子组件的元素

### 如何获取子组件的 dom？

这个初级有点难，可以不看。

答案就是一个高阶函数`forwardRef()`

这是一个高阶函数，传入一个组件，出来一个组件。出来之后这个组件拥有了一个强大的属性，那就是 ref！！你不是不让我自己搞吗？于是我自己搞！

![image-20220322201646230](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220322201646230.png)
