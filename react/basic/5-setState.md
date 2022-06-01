# setState

## 1 为什么要使用 setState？

因为要页面发生刷新，即使你修改了一个数据。但只要不调用 setState，就不会进行比较页面渲染。

比如下面的这段代码，即使打印出来的`this.state.counter`已经变了，但是页面也不会重新渲染。

```jsx
this.state.counter += 1; ❌ 绝对不可以直接在上面修改
```

![image-20220531001937714](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220531001937714.png)

只能使用 setState(),这样才会进行虚拟 dom 的比较，然后决定是否刷新渲染。

```jsx
.....
increment() {
  this.setState({
    counter: this.state.counter + 1 // ✅
  });
}
.....
```

## 2 setState 从哪里来的

从上面的代码可以看出来，我们是直接使用`this.setState()`这个方法的，但是我们并没有定义啊。那么从哪里来的呢？

答案！继承自 Component！

[官方源码 Component](https://github.com/facebook/react/blob/main/packages/react/index.js#L38)

[官方源码 setState](https://github.com/facebook/react/blob/main/packages/react/src/ReactBaseClasses.js#L56)

```js
// react/packages/react/index.js
export {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  act as unstable_act,
  Children,
  Component,
  Fragment,
  Profiler,
  .....

// react/packages/react/src/ReactBaseClasses.js
Component.prototype.setState = function(partialState, callback) {
  if (
    typeof partialState !== 'object' &&
    typeof partialState !== 'function' &&
    partialState != null
  ) {
    throw new Error(
      'setState(...): takes an object of state variables to update or a ' +
        'function which returns an object of state variables.',
    );
  }

  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```

👆 然后你就可以看到`setState()`的本体了。

这里的同步和异步其实说的是 是否可以拿到更新的值。

## 3 异步更新还是同步更新？

异步更新，是人家 react 的团队大佬说的。[why is `setState` asynchronous](https://github.com/facebook/react/issues/11527)

验证如下

```jsx
import { Component } from 'react';

class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '我是🐱',
    };
  }

  // ⚠️ 重点看这段代码
  handleMsg() {
    this.setState({
      msg: '我是小狗',
    });
    // 如果是同步的话，在上面改成我是小狗之后
    // 因为打印的是小狗才对
    // 但是点击之后出来的确实小猫
    // 这说明并非是按照顺序同步执行的，而是异步执行的
    console.log(this.state.msg); // 我是🐱
  }

  render() {
    return (
      <>
        <h2>{this.state.msg}</h2>
        <button
          onClick={(e) => {
            this.handleMsg();
          }}
        >
          click
        </button>
      </>
    );
  }
}

export default State;
```

为什么要用异步呢？大佬是这样解释的。

- 如果每次调用 setState 都进行一次更新，那么意味着 render 函数会被频繁调用，界面重新渲染，这样效率是很低的最好的办法应该是获取到多个更新，之后进行**批量更新**
- 如果同步更新了 state，但是还没有执行 render 函数，那么 state 和 props 不能保持同步.state 和 props 不能保持一致性，会在开发中产生很多的问题

关于上面这个 state 和 props 的问题，我写一个代码来说明一下。这里设计到父子组件问题

```jsx
import { Component } from "react";

function Statechind(props) {
  return <p> {props.msg}</p>;
}

class State extends Component {
 .........
  // ⚠️ 重点看这段代码
  handleMsg() {
    this.setState({
      msg: "我是小狗"
    });
    console.log(this.state.msg); // 我是🐱
  }

  render() {
    return (
      <>
        <h2>{this.state.msg}</h2>
        <Statechind msg={this.state.msg} />
					.........
      </>
    );
  }
}

export default State;

```

![image-20220531005823778](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220531005823778.png)

### 那么如何拿到异步的结果呢？

方式 1️⃣ `setState()`回调函数

从 setState 源码里可以看到，这个方法接受 2 个参数。`function(partialState, callback)`

- 参数 1 function || object
- 参数 2 回调函数 → 当 setState 里的值更新之后，就会触发这个回调函数。利用这个，就可以拿到异步结果。

全部代码如下 ↓

```jsx
import { Component } from 'react';

class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Hello world',
    };
  }

  handleMsg() {
    this.setState(
      {
        msg: 'Hello REACT',
      },
      // 解决方法1️⃣ 回调函数
      () => {
        console.log(this.state.msg);
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.msg}
        <button onClick={this.handleMsg.bind(this)}>click to change msg</button>
      </div>
    );
  }
}

export default State;
```

方式 2️⃣，生命周期函数 `componentDidUpdate()`

因为这个声明周期函数就是在`render()`之后，页面重新渲染之后才执行的。这样的话，就肯定能拿到。

```jsx
import { Component } from 'react';

class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Hello world',
    };
  }

  handleMsg() {
    this.setState({
      msg: 'Hello REACT',
    });
  }

  // 方式 2️⃣ 获取异步更新的state
  componentDidUpdate() {
    console.log(this.state.msg);
  }

  render() {
    return (
      <div>
        {this.state.msg}
        <button onClick={this.handleMsg.bind(this)}>click to change msg</button>
      </div>
    );
  }
}

export default State;
```

> 🤔 如果 2 个异步获取数据的同时执行，那么是谁先呢？
>
> 答案是先执行 `componentDidUpdate()` ，然后 `setState(更新的setState,回调函数)`

## 4 同步更新

在某些情况下其实还是同步的！

下面这段代码需要我在看一下，不然貌似

1️⃣`setTimeout()`

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'hello world',
    };
  }

  handleMsg = () => {
    // 1️⃣ 这里使用定时器就是同步的
    setTimeout(() => {
      this.setState({
        msg: 'HELLO REACT',
      });
      // 在setTimout的回调函数里输出
      console.log(this.state.msg);
    }, 10);
  };

  //  组件挂载完
  componentDidMount() {
    // 2️⃣ 渲染之后就使用原生的事件监听
    document.getElementById('btn').addEventListener('click', () => {
      this.setState({
        msg: 'HELLO DOMAPI',
      });
      console.log(this.state.msg);
    });
    // ❌ 必须在原始的事件监听里面，直接放在componentDidMount里面是不会
    this.setState({
      msg: 'HELLO DOMAPI',
    });
    console.log(this.state.msg);
  }
  render() {
    return (
      <div>
        <h2>{this.state.msg}</h2>
        <button onClick={this.handleMsg}>click me</button>
        <button id="btn">click me by DOMAPI</button>
      </div>
    );
  }
}
```

2️⃣ 原生事件

```jsx
//  组件挂载完
componentDidMount() {
  // 2️⃣ 渲染之后就使用原生的事件监听
  document.getElementById('btn').addEventListener('click', () => {
    this.setState({
      msg: 'HELLO DOMAPI',
    });
    console.log(this.state.msg);
  });
  // ❌ 必须在原始的事件监听里面，直接放在componentDidMount里面是不会
  this.setState({
    msg: 'HELLO DOMAPI',
  });
  console.log(this.state.msg);
}
```

## 5 决定同步和异步的本质是？

其实看源码可以找到，react 内部，

同步更新

- `setTimeout()`
- 原生事件。

异步更新

- React 合成事件（onClick 这种）
- 生命周期

> 上面 2 种更新其实是不同的上下文！原生时间的上下文和 react 事件的上下文不同，通过**上下文来判断优先等级**。判断是同步，异步，批处理。

源码找不到了，反正写在了这里附近。`getCurrentPriorityLevel()`

## 6 数据的合并

这里说的是数据的合并，不是 setState 的合并。关于数据是否会被完全覆盖掉的问题。

使用的源码在这里[react/packages/react-reconciler/src/ReactUpdateQueue.new.js](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js#L447)

```jsx
// react/packages/react-reconciler/src/ReactUpdateQueue.new.js
return assign({}, prevState, partialState);
```

这里是 `Object.assign({}, this.state,{id:uuid99})`，[MDN 的 Object.assign 说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

```js
Object.assign(target, ...sources);
Object.assign({}, this.state, { id: uuid99 });
// 相当于是把后面的全部source，都拷贝到了target{}这里
```

![image-20220208233417430](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220208233417430.png)

验证代码

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'uuid1',
      msg: 'hello world',
    };
  }

  handleMsg = () => {
    this.setState({
      // ❓ 这里会不会给完全覆盖掉，导致上面的msg不见，最后显示的只有id呢？
      // 答案是不会，这里只会先浅拷贝。然后
      id: 'uuid99',
    });
  };

  render() {
    return (
      <div>
        <h2>{this.state.id}</h2>
        <h2>{this.state.msg}</h2>
        <button onClick={this.handleMsg}>click me</button>
      </div>
    );
  }
}
```

## 7 本身的合并

如果对于同一个数据使用多次`setState()`怎么样。

🤔 下面这段代码

```jsx
increment = () => {
  this.setState({
    counter: this.state.counter + 1,
  });
  this.setState({
    counter: this.state.counter + 2,
  });
  this.setState({
    counter: this.state.counter + 3,
  });
};

// 结果是+1还是+3还是+6？
// 结果是+3，因为前面的会被后面的给覆盖掉。
```

`setState()` 这里的本质也是看源码，会有一个 `do/while`。所有的 setState 本身会被合并。

如果不想被合并呢？`setState()`是可以被接受一个函数的，这个函数里面可以接受上一次的值。[源码](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.old.js#L390)

```jsx
const nextState = payload.call(instance, prevState, nextProps);
```

然后根据这个

```jsx
increment = () => {
  // 如果是一个函数，会进行累加操作。每一次都会用prevState的值，所以会有累加效果。
  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1,
    };
  });
  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 2,
    };
  });
  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 3,
    };
  });
};
```

根据这个就可以判断`setState()`什么时候需要一个 function，什么时候需要一个 object。

以上 🎉
