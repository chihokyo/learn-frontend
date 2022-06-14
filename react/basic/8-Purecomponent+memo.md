# PureComponent + Memo

这个是为了解决有些组件，会被重复渲染的问题。

当子组件明明没有数据变化，因为父组件的渲染导致子组件也被重复渲染。就很浪费。

## 1 使用之前

比如，A 和 B 组件作为 App 组件的子孙。每一次 App 组件都渲染的时候，A/B 也会被渲染。测试代码。

```jsx
// B.js
function B() {
  console.log('B 被渲染了!');
  return (
    <div>
      <h2>我是子组件：B</h2>
    </div>
  );
}

export default B;

// A.js
import B from './B';
function A() {
  console.log('A 被渲染了!');
  return (
    <div>
      <h2>我是子组件：A</h2>
      <B />
    </div>
  );
}

export default A;

// PureBefore
import React, { Component } from 'react';
import A from './A';

/**
 * 在这里你会发现每一次调用 PureBefore 的时候
 * 子孙组件的A和B都会被渲染，即使他们根本没有任何变化
 * 这样就会造成一些损失
 */

export class PureBefore extends Component {
  state = {
    count: 0,
  };

  countHanler = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    console.log('PureBefore被渲染了!');
    return (
      <div>
        <h1>PureBefore</h1>
        <p>{this.state.count}</p>
        <button onClick={this.countHanler}>+1</button>
        <A />
      </div>
    );
  }
}

export default PureBefore;
```

![image-20220614175451024](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220614175451024.png)

## 2 使用之后

```jsx
// BPure.js
import React, { PureComponent } from 'react';

export class BPure extends PureComponent {
  render() {
    console.log('B 被渲染了!');
    return (
      <div>
        <h2>我是子组件：B</h2>
      </div>
    );
  }
}

export default BPure;

// APure.js
import React, { PureComponent } from 'react';

import BPure from './BPure';

export class APure extends PureComponent {
  render() {
    console.log('A 被渲染了!');
    return (
      <div>
        <h2>我是子组件：A</h2>
        <BPure />
      </div>
    );
  }
}

export default APure;

// PureBefore.js
import React, { Component } from 'react';
import A from './A';

/**
 * 在这里你会发现每一次调用 PureBefore 的时候
 * 子孙组件的A和B都会被渲染，即使他们根本没有任何变化
 * 这样就会造成一些损失
 */

export class PureBefore extends Component {
  state = {
    count: 0,
  };

  countHanler = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    console.log('PureBefore被渲染了!');
    return (
      <div>
        <h1>PureBefore</h1>
        <p>{this.state.count}</p>
        <button onClick={this.countHanler}>+1</button>
        <A />
      </div>
    );
  }
}

export default PureBefore;

```

> 只要你对比之后就会发现这里不会每次都打印出来 A/B 组件的渲染。

## 3 看源码只是个浅层比较

首先，这个 PureComponent 的本质就是实现了生命周期函数`shouldComponentUpdate()`

只要 state 和 props 不变，那么就不会被重新渲染。默认是 return true。

源码 ↓

[1instance.shouldComponentUpdate](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberClassComponent.new.js#L316)

👆🏻 是一些过程代码

真正的确定浅层比较

[2ctor.prototype.isPureReactComponent](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberClassComponent.new.js#L352)

```jsx
if (ctor.prototype && ctor.prototype.isPureReactComponent) {
  return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
}

return true;
```

然后就是看`shallowEqual()`这个函数

最后来到了最本质的地方

[3shallowEqual.js](https://github.com/facebook/react/blob/main/packages/shared/shallowEqual.js)

```js
function shallowEqual(objA: mixed, objB: mixed): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (
      !hasOwnProperty.call(objB, currentKey) ||
      !is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
```

差不多这就是本质了。

## 4 验证浅层比较

下面的代码，直接看的话。会发现有 2 个

```
count: 0, → 这个直接赋值1之后就【不会被重新渲染】
obj: { num: 1 }, → 但是这个即使改成不变的数字100 也【依然会被重新渲染】
```

完整代码如下。

```jsx
import React, { PureComponent } from 'react';
import APure from './APure';

/**
 * 如果主要看源码的话，会发现shouldComponent用的是浅层比较
 * 都是浅层比较
 *  count → 简单类型 每次都固定的
 *  obj.num → 是复杂数据类型 每一次数据地址都不一样 所以每次都会被重新渲染
 */

export class PureAfter extends PureComponent {
  state = {
    count: 0,
    obj: { num: 1 },
  };

  countHanler = () => {
    this.setState({
      count: 1,
    });
  };

  numHanler = () => {
    this.setState({
      obj: { ...this.state.obj, num: 100 },
    });
  };

  // 继承了 PureComponent 就不用实现 shouldComponentUpdate
  // shouldComponentUpdate(nextState, nextProps) {
  //   // 现在的this.state !== 最新的state(已经被setState之后的)
  //   if (this.state.count !== nextState.count) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    console.log('PureAfter被渲染了!');
    return (
      <div>
        <h1>PureAfter</h1>
        <p>{this.state.count}</p>
        <p>{this.state.obj.num}</p>
        <button onClick={this.countHanler}>+2不会被多次渲染</button>
        <button onClick={this.numHanler}>
          number+100 会被多次渲染！ 因为是浅层比较
        </button>
        <APure />
      </div>
    );
  }
}

export default PureAfter;
```

## 5 函数值组件 memo

PureComponent 是类组件的，memo 主要是函数式组件。是一个高阶组件 HOC。使用 memo 包裹进行优化。

before 是这个样子的

```jsx
import { useState } from 'react';

function ChildAA(props) {
  console.log('ChildAA 被渲染了');
  const [aastate, setAAstate] = useState(9);
  return (
    <div>
      <h2>子组件：childAA</h2>
      <p>{aastate}</p>
    </div>
  );
}
function ChildA(props) {
  console.log('ChildA 被渲染了');
  const [astate, setAstate] = useState(99);
  return (
    <div>
      <h2>子组件：childA</h2>
      <p>{astate}</p>
      <ChildAA />
    </div>
  );
}

export default function MemoBefore() {
  console.log('Memo 被渲染了');

  const [memostate, setMemoState] = useState(77);
  return (
    <div>
      <h2>我是父组件Memo</h2>
      <p>{memostate}</p>
      <button
        onClick={() => {
          setMemoState(memostate + 10);
        }}
      >
        memo组件点击+10
      </button>
      <ChildA />
    </div>
  );
}
```

after 用了 memo 之后

```jsx
import { useState, memo } from 'react';

/**
 * 只会在props发生变化时 子组件才会被重新渲染
 * 小组件没必要加上，主要用于那些大的需要优化的组件
 */

// 包裹写法1 推荐
const ChildAA = memo((props) => {
  console.log('ChildAA 被渲染了');
  const [aastate] = useState(9);
  return (
    <div>
      <h2>子组件：childAA</h2>
      <p>{aastate}</p>
    </div>
  );
});
const ChildA = memo((props) => {
  console.log('ChildA 被渲染了');
  const [astate, setAstate] = useState(99);
  return (
    <div>
      <h2>子组件：childA</h2>
      <p>{astate}</p>
      <ChildAA />
    </div>
  );
});

// 包裹写法2
// const ChildAA = memo(function (props) {
//   console.log('ChildAA 被渲染了');
//   const [aastate] = useState(9);
//   return (
//     <div>
//       <h2>子组件：childAA</h2>
//       <p>{aastate}</p>
//     </div>
//   );
// });

// const ChildA = memo(function (props) {
//   console.log('ChildA 被渲染了');
//   const [astate, setAstate] = useState(99);
//   return (
//     <div>
//       <h2>子组件：childA</h2>
//       <p>{astate}</p>
//       <ChildAA />
//     </div>
//   );
// });

export default function MemoAfter() {
  console.log('Memo 被渲染了');

  const [memostate, setMemoState] = useState(77);
  return (
    <div>
      <h2>我是父组件Memo</h2>
      <p>{memostate}</p>
      <button
        onClick={() => {
          setMemoState(memostate + 10);
        }}
      >
        memo组件点击+10
      </button>
      <ChildA />
    </div>
  );
}
```

## 6 真的可以优化性能吗？什么时候都要用吗？

答案是不是的。对于一些 UI 性质，如果没有 props，state 属性的组件。当然可以用，但是对于需要一些大量数据的就没必要，因为其实用了也没优化多少。
