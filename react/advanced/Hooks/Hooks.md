# Hooks

[toc]

## 为什么需要 Hooks

- 类组件太过冗余，有很多不必要的模板代码。
- componentDidMount 里面有很多不必要的代码。
- this 太多了，不想学习。
- 组件复用很难。

## 1 什么是 hooks？

一个叫 hook，多个叫 hooks。就差不多是这样。

关于什么是 hooks，直译过来就是钩子，帮你钩过来数据，然后你自己倒腾完之后，再帮你盯梢，在钩回去的感觉。钩来钩去的，蜘蛛侠？

![image-20220222230520370](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220222230520370.png)

## 2 使用规则

官方说的，我觉得看得懂。

```
Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：
1 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
2 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）
```

- 一个就是只能在最外层用
- 一个就是只能自己用

![image-20220517135354688](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220517135354688.png)

## 3 useState

useState 使用前后对比。其实主要写的就是函数组件的优越性。

一般来说，一个变量在函数里使用完正常情况下就会被【销毁】，但是 state 的变量不会，Reac 会保留。

### 基础使用

```jsx
const [counter, setCounter] = useState(10);
```

- 参数 初始值，不设置就是 undefined
- 返回值 1 当前状态（第 1 次就是初始值
- 返回值 2 设置状态的函数

点击`onClick`发生了什么

- 调用`setCounter`设置最新的值
- 组件重新渲染，并且根据新的值返回 DOM 结构

```jsx
import React, { useState } from 'react';

// useState最基础用法
function App() {
  const arr = useState(0);
  const [counter, setCounter] = useState(10);
  return (
    <div>
      <h1>简单计数器</h1>
      <h3>超级原始：数组原理</h3>
      {/* 因为本质是一个数组，所以这里可以用解构赋值 */}
      <h4>{arr[0]}</h4>
      <button onClick={(e) => arr[1](arr[0] + 1)}>+1</button>
      <button onClick={(e) => arr[1](arr[0] - 1)}>-1</button>
      <h3>正常写法</h3>
      <h4>{counter}</h4>
      <button onClick={(e) => setCounter(counter + 1)}>+1</button>
      <button onClick={(e) => setCounter(counter - 1)}>-1</button>
    </div>
  );
}

export default App;
```

![image-20221001004209956](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221001004209956.png)

[这一次竟然很意外的看懂了官方文档](https://zh-hans.reactjs.org/docs/hooks-state.html)

[这是新的文档 是 demo](https://beta.reactjs.org/apis/react/useState#usestate)

### 使用注意事项

接下来就是一个小细节，`useState()` 既可以传入对象，也可以是函数。

这里既可以传入一个函数，也可以是一个数值，根据源码来的。

所以说下面这俩是一样的

```jsx
useState(0); // 一个传入0
useState(() => {
  0;
}); // 一个传入的函数 返回的是0
```

![image-20220227011805839](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220227011805839.png)

而且，以下的效果是一样的。

```jsx
<button onClick={(e) => setCount(count + 1)}>+1</button>
<button onClick={(e) => setCount((preValue) => preValue + 1)}>+1</button>
```

他们有什么区别呢？其实跟`setState()`的区别差不多

也就是说，在只有一个 setXXX 调用的时候，写成回调函数和直接 set 没别。

![image-20220227012743236](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220227012743236.png)

话说，每次 setXXX 的时候，虚拟 dom 都会对比，**发生变化**就会重新渲染，重新调用函数的。

这里顺便补充一下，关于 setXXX 异步执行的问题。并不是调用之后立即生效。

![image-20220517133011053](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220517133011053.png)

一些注意点。

![image-20220614130747090](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220614130747090.png)

为什么这里会被渲染 2 次？

```jsx
import React, { useState } from 'react';

export default function Hooks() {
  console.log('组件被渲染了');
  const [count, setCount] = useState(0);

  /**
   * 1 渲染阶段，不会检查state值是否相同。就一直重新渲染。
   * 2 非渲染阶段(已渲染) 检查值是否相同
   *  2-1 不同在继续重新渲染。
   *  2-2 相同不会渲染
   *    (如果相同，React会继续执行当前渲染
   *    但不会触发其他子组件渲染，也不会产生实际效果)
   */

  const clickHandler = () => {
    setCount(1);
  };
  return (
    <div>
      <h2>验证渲染</h2>
      <p>{count}</p>
      <button onClick={clickHandler}>验证渲染，看console.log</button>
    </div>
  );
}
```

![image-20220614131827406](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220614131827406.png)

可以看一下**子组件**是不会被再次渲染的。注意看`console.log()`，第 2 次就不会再次被渲染了

```jsx
import React, { useState } from 'react';

function B(props) {
  console.log('子组件B被渲染啦');
  return (
    <div>
      <h2>我是子组件B</h2>
    </div>
  );
}

export default function Hooks() {
  console.log('组件被渲染了');
  const [count, setCount] = useState(0);

  /**
   * 1 渲染阶段，不会检查state值是否相同。就一直重新渲染。
   * 2 非渲染阶段(已渲染) 检查值是否相同
   *  2-1 不同在继续重新渲染。
   *  2-2 相同不会渲染
   *    (如果相同，React会继续执行当前渲染
   *    ⚠️ 但不会触发其他子组件渲染，也不会产生实际效果)
   */

  const clickHandler = () => {
    setCount(1);
  };
  return (
    <div>
      <h2>验证渲染</h2>
      <p>{count}</p>
      <button onClick={clickHandler}>验证渲染，看console.log</button>
      <B />
    </div>
  );
}
```

## 4 useEffect

说是叫副作用。其实本质就是生命周期的钩子。比如以前经常在`componentDidMount`进行网络请求，事件监听，reduxstore 等等。都可以在这里写了。并且可以分开写，防止文件太大了。

[官方说的](https://zh-hans.reactjs.org/docs/hooks-effect.html)

```
如果你熟悉 React class 的生命周期函数
你可以把 useEffect Hook 看做
componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
```

这个图也可以展示一下，如何结合的

- `componentDidMount()` 已经挂载 请求异步调用等等
- `componentDidUpdate()` 将要更新
- `componentWillUnmount()` 将要卸载

![Alt text of image](https://res.cloudinary.com/practicaldev/image/fetch/s--viFx5qPl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pbs.twimg.com/media/EgWi0rUXoAEC9zQ%3Fformat%3Djpg%26name%3Dsmall)

比如下面都是实现一个更改 dom 的例子。

![image-20220227014813375](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220227014813375.png)

我觉得关于 useEffect 的解释，这句话说的听得懂。

```
useEffect 做了什么？
通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。
React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。
在这个 effect 中，我们设置了 document 的 title 属性，不过我们也可以执行数据获取或调用其他命令式的 API。
```

> 一定要看清楚，重点是**渲染**后。

话说我觉得这篇文章也写的挺好的

[React hooks を基礎から理解する (useEffect 編)](https://qiita.com/seira/items/e62890f11e91f6b9653f)

差不多的意思就是说

```javascript
// 不写就是每一次都要渲染
useEffect(() => {
  document.title = `${count}回クリックされました`;
  console.log(`再レンダーされました`);
});

// [] 本质只会执行第一次 → componentDidMount
useEffect(() => {
  document.title = `${count}回クリックされました`;
  console.log(`再レンダーされました`);
}, []);

// [count] 只有count数据有变化才会再次渲染 → componentDidUpdate
useEffect(() => {
  document.title = `${count}回クリックされました`;
  console.log(`再レンダーされました`);
}, [count]);

// 返回一个函数 差不多清除清理的操作的感觉 → componentWillUnmount
useEffect(() => {
  return () => {
    // 这里写逻辑
  };
}, []);
```

> 而且一个组件可以写多个 useEffect 的，没必要把所有数据都写在一个 useEffect 里面。
>
> 一般会把异步请求写在`useEffect(()=>{},[])` 这里

### 注意事项

- 1 个函数式组件里面，可以有多个 useEffect
- 多个按照顺序执行

这里顺便补充一下 useEffect 的执行顺序

下面是一段很简单的代码，你会发现再不写依赖的情况下，她每次都会被渲染。

```jsx
import { useEffect, useState } from 'react';

const AdvanceEffect = () => {
  const [number, setNumber] = useState(0);
  console.count('component render渲染了');

  // 每一次渲染都会被后执行
  // 且会发现title的number会稍微晚于页面的nubmer 这是因为useEffect总是在页面渲染之后被调用
  //总结说就是 component:render → component:useEffect→ react dom → brower dom
  useEffect(() => {
    console.count('useEffect 被调用了');
    document.title = `${number} times`;
  });

  return (
    <div>
      <span>number is {number}</span>
      <button onClick={() => setNumber(number + 1)}> +1</button>
      <button onClick={() => setNumber((pre) => pre + 2)}> +2</button>
    </div>
  );
};

export default AdvanceEffect;
```

然后你再上面的代码里增加了一个修改显示姓名的 input 框，你会发现即使 number 没有任何变化，但只要你输入东西，useEffect 都会被再次调用，于是你增加了依赖。

```jsx
import { useEffect, useState } from 'react';

const AdvanceEffect = () => {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('');
  console.count('component render渲染了');

  // 每一次渲染都会被后执行
  // 且会发现title的number会稍微晚于页面的nubmer 这是因为useEffect总是在页面渲染之后被调用
  //总结说就是 component:render → component:useEffect→ react dom → brower dom
  useEffect(() => {
    console.count('useEffect 被调用了');
    document.title = `${number} times`;
  });

  return (
    <div>
      <span>number is {number}</span>
      <button onClick={() => setNumber(number + 1)}> +1</button>
      <button onClick={() => setNumber((pre) => pre + 2)}> +2</button>
      <hr />
      <div>name is {name}</div>
      <label htmlFor="">输入姓名</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default AdvanceEffect;
```

那么，如果我们依赖的数据是一个复杂数据呢？

例如下面的依赖是一个 state，这个 state 是一个对象。这个对象每次渲染的时候都会生成新的对象，这样肯定每次都不一样，肯定每次都被渲染了啊

```jsx
import { useEffect, useState } from 'react';

const AdvanceEffect2 = () => {
  const [name, setName] = useState(0);
  // 此时我们的格式如果不是name那种，而是包裹在一个对象里呢?
  const [state, setState] = useState({
    name: '',
    selected: false,
  });

  // ❓ 你会发现即使你没修改state，也依然会被重新渲染
  useEffect(() => {
    console.log('useEffect 被调用了 state被修改了');
  }, [state]);

  // 点击修改输入框名字
  const handleAddName = () => {
    setState((prev) => ({ ...prev, name }));
  };

  // 点击修改selected
  const handleSelect = () => {
    setState((prev) => ({ ...prev, selected: true }));
  };

  return (
    <div>
      {`name is ${state.name}, selected is ${state.selected.toString()}`}
      <br />
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      <button onClick={handleAddName}>点击修改名字</button>
      <br />
      <button onClick={handleSelect}>点击修改select为true</button>
    </div>
  );
};

export default AdvanceEffect2;
```

面对上面的问题，要怎么修改呢？

- 把依赖换成到你的属性 `state.name`
- 使用 useMemo 来记忆函数返回值为你的对象

下面是俩解决方案

```jsx
// 解决方案2 1-a 使用useMemo记录函数返回值
const user = useMemo(
  () => ({
    name: state.name,
    selected: state.selected,
  }),
  [state.name, state.selected]
);

// ❓ 你会发现即使你没修改state，也依然会被重新渲染
useEffect(() => {
  console.log('useEffect 被调用了 state被修改了');
  // 解决方案2 1-b 把依赖改成user
}, [user]); // 解决方案1 把依赖改成 state→state.name state→state.selected
```

### 定时器问题 ⭐️

最近在做一个，就是每秒钟增加 1 个数字打印出来的问题。我会发现真的每次都是错误的，`setInterval()`这个真的很难搞，因为你想注册一次定时器而已。如果依赖的 number，每次 number 变化的时候就注册一个定时器，那个时候会发现有 n 个定时器。造成根本达到不想要的效果。🔥 **很重要 要理解！！！**

```jsx
import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * 现在要实现一个计数器，每1秒就向前走一下
 * 这里你会发现一个问题就是会无限
 * @returns
 */
const AdvanceEffect3 = () => {
  const [number, setNumber] = useState(0);

  // ① 错误写法1 依赖的number 但是number每一秒都在被更改
  // 造成内存泄漏
  // useEffect(() => {
  //   console.log('useEffect 被调用了');
  //   setInterval(() => {
  //     setNumber(number + 1);
  //   }, 1000);
  // }, [number]);

  // ② 错误写法2 没有依赖 看似没问题
  // 但是只要一旦页面其他地方发生渲染 这个定时器就会混乱起来
  // useEffect(() => {
  //   console.log('useEffect 被调用了');
  //   setInterval(() => {
  //     setNumber((number) => number + 1);
  //   }, 1000);
  // }, []);

  // ③ 这一次终于对了
  useEffect(() => {
    console.log('useEffect 被调用了');
    const id = setInterval(() => {
      setNumber((number) => number + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  // 这里为什么拿不到最新的count 因为每一次render都是最新的值
  // 那么怎么才可以呢，使用useRef
  // const numRef = useRef(number);
  // useEffect(() => {
  //   numRef.current = number;
  // });

  // console.log(`render number:${number}`);
  // useEffect(() => {
  //   let id = setInterval(() => {
  //     // console.log(`useEffect number:${numRef.current}`);
  //     // console.log(`useEffect number:${number}`);
  //     // setNumber((pre) => pre + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);

  return (
    <div style={{ fontSize: '30px' }}>
      <span>number is {number}</span>
    </div>
  );
};

export default AdvanceEffect3;
```

好吧，上面说完了定时器的问题，其实原因就是**副作用没清除的**

> 进阶一下，下面这段代码是点 start 开始计时，点 stop 结束计时的，问什么没效果。

```jsx
import { useState } from 'react';

// 接下来用定时器写一个测试
// 下面这段代码为什么不可以的问题
// 只能start，无法stop 根本停不下来
const AdvanceEffectB = () => {
  const [number, setNumber] = useState(0);
  let id = null;
  const start = () => {
    console.log('start 调用了');
    id = setInterval(() => {
      console.log('setInterval 计时开始');
      setNumber((pre) => pre + 1);
    }, 1000);
  };

  const stop = () => {
    console.log('stop 调用了');
    clearInterval(id);
  };

  return (
    <div>
      <h2 style={{ fontSize: '30px' }}>number is {number}</h2>

      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
    </div>
  );
};

export default AdvanceEffectB;
```

原因如下

其实就是渲染的时候 start 每次都是新的 id。而 stop 永远停留在了 null

![Snipaste_2022-10-05_22-46-38](https://raw.githubusercontent.com/chihokyo/image_host/develop/Snipaste_2022-10-05_22-46-38.png)

怎么解决？使用`useRef()`来解决

```jsx
import { useRef, useState } from 'react';

// 接下来用定时器写一个测试
const AdvanceEffectC = () => {
  const [number, setNumber] = useState(0);
  const intervalRef = useRef(null); // 1-a 设置一个ref

  const start = () => {
    console.log('start 调用了');
    //  1-b 防止start被重复点
    if (intervalRef.current != null) {
      return;
    }
    // 1-c 每次的结果都给current 因为intervalRef对象不变的(useRef特性)
    // 所以每次记录的都是最新的
    intervalRef.current = setInterval(() => {
      console.log('setInterval 计时开始');
      setNumber((pre) => pre + 1);
    }, 1000);
  };

  const stop = () => {
    console.log('stop 调用了');
    // 1-d 防止多次stop
    if (intervalRef.current == null) {
      return;
    }
    // 1-e 这样清除的肯定就是最新的id
    clearInterval(intervalRef.current);
    intervalRef.current = null; // 1-f 最后记得给清空
  };
	....
};

export default AdvanceEffectC;
```

除此之外，没清除副作用还会引起什么呢？那就是获取数据的时候，网络太慢，我不想获取了，或者是想获取别的了。网页依然还会记录第一次的状态，不会获取最新的，为什么？没消除副作用！！

下面这段代码，本来是把网络设置成 fast 3g，从主页点击个连接跳转到这个组件，但是太慢于是你想回过去，但是发现依旧在请求。

```jsx
import { useEffect, useState } from 'react';

const AdvanceEffect4 = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        alert('post are ready');
        setPosts(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {posts?.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
};

export default AdvanceEffect4;
```

如何解决这种延迟问题呢？

```jsx
useEffect(() => {
  let isCancelled = false; // 1-a 新增变量
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => {
      if (!isCancelled) {
        // 1-b 只有在没取消的时候
        alert('post are ready');
        setPosts(data);
        console.log(data);
      }
    });
  return () => {
    // 1-c 设置为true
    isCancelled = true;
  };
}, []);
```

如果你不想使用这种不优雅的方式，可以使用一个原生 API，就是`new AbortController()`

```jsx
useEffect(() => {
  const controller = new AbortController(); //1-a
  const signal = controller.signal;
  //1-b 增加个option{}
  fetch('https://jsonplaceholder.typicode.com/posts', { signal })
    .then((res) => res.json())
    .then((data) => {
      alert('post are ready');
      setPosts(data);
      console.log(data);
    });
  return () => {
    // 1-c 抛弃
    controller.abort();
  };
}, []);
```

## 5 useContext

这个其实就是为了以前的 context 的 API 创造的。首先要知道 context 的用法是什么。

就是**跨组件的数据交互**的啦。具体想知道普通的 context 的话，去看 Tips 我写的。

> 以前都是：类名+ contextType = context
>
> 然后用的时候 Provier 包裹最外层，Consumer

如果说用这个`useContext()`省略了什么的话

- 不用 consumer
- 传递多个组件会有嵌套。不用老太太裹脚布 又臭又长。

```jsx
// 使用之前
<UserContext.Consumer>
  {(user) => {
    return (
      <HobbyContext.Consumer>
        {(hobby) => (
          <p>
            {user.name}({user.age}歳): 趣味：{hobby}
          </p>
        )}
      </HobbyContext.Consumer>
    );
  }}
</UserContext.Consumer>;

// 使用之后
const user = useContext(UserContext);
const hobby = useContext(HobbyContext);
return (
  <p>
    {user.name}
    {user.age}歳: 趣味は{hobby}です。
  </p>
);
```

优点如下

> - 可以少写 Consumer → `const user = useContext(UserContext);`
> - 可以写多个`useContext()` 省了多次嵌套。

### 使用步骤

- ① 创建一个`createContext()`

```js
const TestContext = createContext({
  defaultValue: 'defaultValue',
});
```

- ② 传递数据 `<TestContext.Provider value={state}>`
- ③ 直接拿来就用了 `const appData = useContext(TestContext);` 这里依赖的数据如果发生变化，也会自动修改重新渲染的。

useContext 的应用问题。最近在做暗黑模式一个小 demo 的时候，发现可以用。

demo 在这里[Dark Mode in React](https://levelup.gitconnected.com/dark-mode-in-react-533faaee3c6e)

这个 Conext 比较像一个全局上下文，你可以把所有你要的数据和函数都写在这里。

全局的话哪里想用就可以用。上面的 demo 就是写了一个黑暗模式的 class 数据，和 changeTheme 的函数。都存在了 conext，这样组件哪里需要用的时候，直接 use 就可以了。

## 6 useReducer

不要看到 reducer 就感觉是 redux 了。

首先这个和 redux 关系不大，唯一很像的地方的就是 reducer 作为一个纯函数。

### 之前的弊端

然后这个本质就是操作一组数据的总和，就比如以前的项目。操作数据和初始化数据都是分开的。但是使用这个，就可以把**操作数据和初始化数据结合在一起**。那这样的话你会说，`useState()`不是也可以操作吗？但是`useState()`是没办法写复杂逻辑的。

> 本质，useState 的替代方案，升级版。

比如说 before

```jsx
import { useState } from 'react';

// 以前的话，这样很麻烦
function ReducerBefore() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>{counter}</h1>
      <button
        onClick={(e) => {
          setCounter(counter + 1);
        }}
      >
        +1
      </button>
      <button
        onClick={(e) => {
          setCounter(counter - 1);
        }}
      >
        -1
      </button>
      <button
        onClick={(e) => {
          setCounter(counter + 5);
        }}
      >
        +5
      </button>
      <button
        onClick={(e) => {
          setCounter(counter - 5);
        }}
      >
        -5
      </button>
    </div>
  );
}

export default ReducerBefore;
```

after

```jsx
import { useReducer } from 'react';

// 这里和before实现了一样的东西，却简单了很多
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
    case 'decrement':
      return { ...state, counter: state.counter - 1 };
    case 'add':
      return { ...state, counter: state.counter + action.num };
    case 'sub':
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}

function ReducerAfter() {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });
  return (
    <div>
      ReducerAfter
      <h1>{state.counter}</h1>
      <button onClick={(e) => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={(e) => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={(e) => dispatch({ type: 'add', num: 5 })}>+5</button>
      <button onClick={(e) => dispatch({ type: 'sub', num: 8 })}>-8</button>
    </div>
  );
}

export default ReducerAfter;
```

### 基础使用

```
const [state的值, dispatch具体行为] = useReducer(reducer, 初始值);
```

**参数 1 state 是数据**

**参数 2 dispatch 发请求。**

通过 useReducer 完成加减操作。

```jsx
const [state, dispatch] = useReducer(reducer, { count: 1 });
```

![image-20220303183117391](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220303183117391.png)

要注意的就是`reducer()`这个函数吧，是可以抽取出来的，逻辑是大家一起的，比如下面有 2 个组件的情况下，**逻辑一起用**是可以的，但是**数据不是共享**的，大家各自的 state，都是自己家的，即使都调用同一个 reducer，也不会用别人家的数据。

![image-20220303183558100](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220303183558100.png)

> **小知识，useReducer 可以替代 useState 的用法**
>
> 看源码的话，可以看到 useState 内部用的就是 useReducer 的逻辑。

在网上看到的，用 useReducer 实现 useState

```jsx
function useCustomState(initialState) {
  // 特殊的 reducer
  const reducer = (state, action) => {
    if (typeof action === 'function') {
      return action(state);
    }
    return action;
  };
  //
  const [state, dispatch] = useReducer(reducer, initialState);

  // setState 和 dispatch 一样引用也不变的
  const setState = useCallback((action) => {
    dispatch(action);
  }, []);

  return [state, setState];
}

// 使用 useCustomState
function Parent() {
  const [count, setCount] = useCustomState(0);
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>add</button>
      <span>{count}</span>
    </>
  );
}
```

> **看起来 useReducer 和 redux 很像，那么可以取代吗。答案是不可以取代的。**
>
> 主要问题 useReducer+useContext 维护的状态还只是一个**强耦合于 UI** 的状态。【简言之，就是要和 UI 强关联，尤其是 Provide 这样。】
>
> 这些状态的生命周期完全局限于在函数组件内部，这个状态是在在组件函数作用域内创建的，和 UI 组件是耦合在一起而没有真正分离。
>
> 但是有的状态是需要完全独立于 UI 的，需要完全 UI 无关地进行维护，**UI 组件只是状态的一个消费者，而不是定义和初始化状态的地方**。
>
> **Redux**可以做到分离，但**useReducer+useContext**不能。
>
> 另外 Redux 有 thunk 和 saga 之类的中间件支持 async action，而 useReducer 没有，还得用其他库。
>
> useContext+useReducer 说白了就是项目很小，只有少部分祖孙组件间需要共享状态时才会使用的一个简易共享方案。真正较复杂的情况那必然还是用 Redux/Mobx 这些的。

**那么继续问一下，useReducer 可以取代 useState 吗？**

当然不可以，这个用起来反而很麻烦了。所以大家宁愿多写几个`useState`也不用写这个。当然你要写完全也是可以的。

## 7 useCallback（理解很难）

这个本来是为了性能优化。这个经常和`useMemo()`一起来搞的。

### 背景

**这个是为了解决什么问题呢？**

每次发生事件的时候函数会被多次调用问题，比如下面这个。

![image-20221002000249178](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221002000249178.png)

```jsx
import React, { useState } from 'react';

function CallbackProb() {
  const [counter, setCounter] = useState(0);

  // 每次点击，我都要被重新定义一次。
  // 并不是调用，而是定义。React这里只要counter发生变化我就会被定义了。这个是可以验证的。
  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      CallbackProb
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default CallbackProb;
```

> 那么有没有一个方法可以解决这个每一次函数每次都会被重新定义的问题？
>
> useCallBack 就是为了解决这个问题的。

为了解决这个问题，于是我们这样写了。↓

因为 useCallBack 是这样进行性能优化的

- **useCallBack 是一个函数（memorized 有记忆），他会返回一个值**
- **在只要内部的依赖不变，多次定义的时候，返回的值是相同的。这个值就不会变化。**

⚠️ 但是只是这样写，也是没有意义的。

为什么呢？

```jsx
import React, { useCallback, useState } from 'react';

function CallbackProb() {
  const [counter, setCounter] = useState(0);

  // 但是这样是没有意义的，因为counter这里发生变化之后
  // setCounter会被重新运行 那么整个函数组件都会被重新渲染CallbackProb
  // ❓所以本质还是一样的 没有进行优化
  const increment = useCallback(() => {
    setCounter(counter + 1);
  });

  return (
    <div>
      CallbackProb
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default CallbackProb;
```

因为

```jsx
() => {
  setCounter(counter + 1);
};

// 上面那一部分函数依然是要被重新定义的，不外乎以前你写在外面，现在你写在了useCallback() 这个里面而已。目前来说是没有优化的，不信你写一下也是一样的
```

那么怎么写才有意义呢？这里就要考虑到原理部分了。

> 那就是参考一下 useEffect，加上一个`[]`来看依赖。为什么这样可以呢？
>
> 因为 useCallBack 是这样进行性能优化的
>
> - **useCallBack 是一个函数（memorized 有记忆），他会返回一个值**
> - **在只要内部的依赖不变，多次定义的时候，返回的值是相同的。这个值就不会变化。**

### 闭包陷阱

⚠️ 很重要，你按照上面的原理部分，对下面的代码进行修改了。

你会发现打印行为是每一次都会调用，但是 counter 却没有人任何变化，反而出问题了？这是怎么回事，这就是**闭包陷阱**

> 这样说一下，闭包陷阱问题是一个 React 在 Hooks 里的一个很容易产生的错误。这里产生的只是其中一例子，你可以看一下这篇文章的**结论**部分就行。[从根上理解 React Hooks 的闭包陷阱](https://www.51cto.com/article/707963.html)

```jsx
// 这样的话，每一次 这一个就是同一个，每次都是用的同一个也就是第一个，即使你点了n次，那么不会+1，这是闭包陷阱问题。因为你再次传入回调函数，也是用的初次渲染那个。
// () => {
//     console.log(22);
//     setCounter(counter + 1);
//   }
// 这一次你加了[] 还是没有任何变化
const increment = useCallback(() => {
  console.log('increment'); // 这里依然会被多次调用
  setCounter(counter + 1);
}, []);
```

相当于是这种感觉

```js
function foo(id) {
  return () => {
    console.log(id);
  };
}

const test1 = foo('tom');
test1(); // tom

const test2 = foo('jerry');
test2(); // jerry

// 那么这里调用test1结果依然还是tom useCallback差不多就是这种⚠️陷阱
test1(); // tom
```

所以说无论你写多少次，你会发现`useCallback(第一次的函数定义)`

因为依赖没发生改变的情况下，useCallback 都会记住第一次的，也就是你相当于每一次都是记忆的最初的那个 counter 也就是 0`const [counter, setCounter] = useState(0);` 相当于就是这里。

```jsx
const increment = useCallback(() => {
  console.log(22);
  setCounter(counter + 1);
}, []);
// 都会发现22是一直被打印的，但是setCounter只会被调用1次，也就是最初的一次。
```

那怎么解决呢？

```jsx
// 那么怎么解决？ 和useEffect一样，写上你要依赖的数据
// 这样每一次都会捕获
const increment = useCallback(() => {
  console.log(22);
  setCounter(counter + 1);
}, [counter]);
```

> 经过这么多的步骤，终于解决了，那么这玩意儿到底有啥用啊，搞了这么久，貌似也没啥大用。主要用处其实是在子组件

### 使用场景

先看一下没有优化的感觉，再来推导。

#### 推导 1

```jsx
import React, { memo, useCallback, useState } from 'react';

// 这里开始定义一个子组件，而且必须用memo包裹起来
const Child = memo((props) => {
  console.log('Child被渲染了');
  const { increment } = props;
  return (
    <div>
      <h1>Child counter:</h1>
      <button onClick={increment}>child给父组件 +1</button>
    </div>
  );
});

function CallbackSolve1() {
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => {
    console.log('increment'); // 这里依然会被多次调用
    setCounter(counter + 1);
  }, [counter]);

  return (
    <div>
      CallbackSolve
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
      <h1>接下来是Child</h1>
      <Child increment={increment} />
    </div>
  );
}

export default CallbackSolve1;
```

可以看到父组件的+1，子组件也会被渲染。这是为什么？

因为每一次父组件通过+1 之后 counter 发生了变化 → increment 会被重新调用 → 那么每次传入给子组件的 increment 也是新的 → 子组件发现 props 又发生了改变，就会再次渲染。

那么现在到底有什么意义呢？那就是如果你还有一个新的 useState，这样还会发生渲染吗

那么继续看接下来的代码

#### 推导 2

```jsx
import React, { memo, useCallback, useState } from 'react';

// 这里开始定义一个子组件，而且必须用memo包裹起来
const Child = memo((props) => {
  console.log('Child被渲染了');
  const { increment } = props;
  return (
    <div>
      <h1>Child counter:</h1>
      <button onClick={increment}>child给父组件 +1</button>
    </div>
  );
});

function CallbackSolve1() {
  const [counter, setCounter] = useState(0);
  const [msg, setMsg] = useState('hello');

  // 🔥 对比1
  const increment = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  // 🔥 对比2
  // const increment = () => {
  //   setCounter(counter + 1);
  // };

  return (
    <div>
      <h1>父组件：CallbackSolve</h1>
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
      <div>{msg}</div>
      <button onClick={(e) => setMsg('react')}>
        修改msg → 修改我子组件不会重新渲染
      </button>
      <h1>子组件：Child</h1>
      <Child increment={increment} />
    </div>
  );
}

export default CallbackSolve1;
```

结论终于来了，这就是最后优化的对比，看一下有无 useCallback 的对比。会发现如果加上 useCallback，那么 msg 的变化并不会引起子组件的重新渲染。不加的话，即使子组件没有任何变化，也会重新渲染

那你可能就要问，那么我都包裹了一层 memo，为什么还会出现这个状况呢。其实这个和 memo 关系不是很大，你父组件传给子组件的 increment 都变化了，此时肯定子组件 props 也发生变化。

> 而上面的代码里面 msg 发生了变化，但是 count 没有发生变化，所以依然用的是原始的函数，就这样传递给了子组件，自然子组件就会有了优化。

### 结论

useCallback + memo（子组件） = 才有真正的效果

没有 memo，那么子组件怎么样都要渲染。这里 genhooks 无关，跟 memo 有关。

也就是说当你有函数传递给子组件的时候，这个才会真正**效果拔群**。

> 当需要传递给子组件**函数**的使用缓存
>
> 那么这个函数组件内及时其他状态即使引起变化，这个子组件不会再次渲染。主要缓存的是函数。这个函数地址`<Child increment={increment} />`被记忆了！！
>
> 所以这就可以解释，为什么父组件依然渲染（都 set 了，肯定变化），子组件不会渲染（父组件的 count 没变化，props 的函数地址没有变化，子组件就认为不用刷新）
>
> 所以这就可以解释，为什么修改+1 子组件会渲染（因为 count 都变化了，依赖的 count 也变化了，肯定函数有变化，props 也有变化）。而修改 msg 的时候子组件不会渲染，因为只有 msg 发生了变化而已，不在依赖范围内）

### 进一步优化

还是上面的例子，这次就是要解决什么问题呢？那就是给父组件+1 的时候，我并不想让子组件重新渲染。就是说我只想执行

- `setCounter(counter + 1);` 我只想执行这个

- 但是这个`() => {
  setCounter(counter + 1);
  }

  ` 这个函数不想每次都重新渲染。

- 因为目前 counter 发生改变，上面整个回调函数又会重新定义，那么 increment 也会发生变化。

这次想实现的就是当 counter 发生改变，也使用同一函数。

如何实现？虽然这里的原理也是闭包陷阱。解决方法就是用`useRef`，因为他的特点，就是组件多次渲染，返回同一个值。

```jsx
import React, { memo, useCallback, useState } from 'react';

// 这里开始定义一个子组件，而且必须用memo包裹起来
const Child = memo((props) => {
  console.log('Child被渲染了');
  const { increment } = props;
  return (
    <div>
      <h1>Child counter:</h1>
      <button onClick={increment}>child给父组件 +1</button>
    </div>
  );
});

function CallbackSolve3() {
  const [counter, setCounter] = useState(0);
  const [msg, setMsg] = useState('hello');

  // 🔥 对比1
  const increment = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  return (
    <div>
      <h1>父组件：CallbackSolve</h1>
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
      <div>{msg}</div>
      <button onClick={(e) => setMsg('react')}>
        修改msg → 修改我子组件不会重新渲染
      </button>
      <h1>子组件：Child</h1>
      <Child increment={increment} />
    </div>
  );
}

export default CallbackSolve3;
```

解决方案

```js
function CallbackSolve3() {
  const [counter, setCounter] = useState(0);
  const [msg, setMsg] = useState('hello');

  // 修改成[] 里面的回调函数确实是不会修改了 但是函数整体也没办法啊用力
  // 这里就需要useRef来解决了
  const countRef = useRef(); // 这个对象有个属性
  countRef.current = counter; // count这个对象保存到了 countRef.current
  // 也就是说对象咱不会变化，但是current里的值 一直都是最新的counter
  const increment = useCallback(() => {
    setCounter(countRef.current + 1); // 最新的值
  }, []);

```

通过`useRef()`因为他不会变化，但是`countRef.current`都是最新的值达到了一种效果

- 每一次`setCounter(countRef.current + 1);`都是最新的值
- increment 因为没有依赖任何东西，所以不会发生变化，这样传递给子组件传递的 increment 也不会发生变化，所以子组件也不会重新被渲染。

## 8 useMemo

这个和 useCallback 的区别就是，这个优化的是**函数的返回**值。而 useCallback 优化的是**函数**

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

也就是说优化的是`() => computeExpensiveValue(a, b)`这个函数的返回值。

官方文档有句话，足矣看出，两者可以互通。

> `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

### 使用场景 1

比如下面这段代码

```jsx
import React, { memo, useState } from 'react';

function calNumTotal(num) {
  let total = 0;
  for (let i = 1; i < 50; i++) {
    total += i;
  }
  return total;
}

const UseMemo = memo(() => {
  const [counter, setCounter] = useState(10);

  return (
    <div>
      <div>这里的结果是固定的</div>
      <h1>结果：{calNumTotal(50)}</h1>
      <div>counter的结果是不断变化的</div>
      <h1>{counter}</h1>
      <button
        onClick={(e) => {
          setCounter(counter + 1);
        }}
      >
        +1
      </button>
    </div>
  );
});

export default UseMemo;
```

> 需要解决的是我们只是每一次改变了 counter，但是对于`calNumTotal`这种计算量很大的函数，却每次要重新渲染，然后重新计算。这可怎么办。
>
> 于是`useMemo()`登场了。因为这个记忆的是函数的返回值！！所以正好有了用武之地。

```jsx
import React, { memo, useMemo, useState } from 'react';

function calNumTotal(num) {
  console.log('calNumTotal function');
  let total = 0;
  for (let i = 1; i < 50; i++) {
    total += i;
  }
  return total;
}

const UseMemoAfter = memo(() => {
  const [counter, setCounter] = useState(10);

  // 你会发现无论点击了多少次，calNumTotal只会执行1次
  const memorizeFn = useMemo(() => {
    return calNumTotal(50);
  }, []); // 这里是要写依赖的，目前这个函数没有依赖，所以啥都没写

  return (
    <div>
      <div>这里的结果是固定的</div>
      <h1>结果：{memorizeFn}</h1>
      <div>counter的结果是不断变化的</div>
      <h1>{counter}</h1>
      <button
        onClick={(e) => {
          setCounter(counter + 1);
        }}
      >
        +1
      </button>
    </div>
  );
});

export default UseMemoAfter;
```

### 使用场景 2

给子组件传递一个**对象**，注意，是对象而不是普通值。因为对象可能每次都有变化，普通值结果 1 就是 1。

```jsx
import React, { memo, useMemo, useState } from 'react';

function calNumTotal(num) {
  console.log('calNumTotal function');
  let total = 0;
  for (let i = 1; i < 50; i++) {
    total += i;
  }
  return total;
}

const Child = memo(() => {
  console.log('Child 渲染啦');
  return (
    <div>
      <h1>我是子组件</h1>
    </div>
  );
});

const UseMemoAfter = memo(() => {
  const [counter, setCounter] = useState(10);

  const memorizeFn = useMemo(() => {
    return calNumTotal(50);
  }, []);

  // 对比1-a 没有被记忆的 在父组件每次+1的时候 子组件会被多次渲染
  // const obj = {
  //   id: 'uuid',
  //   age: 99,
  // };

  // 对比1-b 这里是被记忆了的
  const memorizeObj = useMemo(
    () => ({
      id: 'uuid',
      age: 99,
    }),
    []
  );

  return (
    <div>
      <div>这里的结果是固定的</div>
      <h1>结果：{memorizeFn}</h1>
      <div>counter的结果是不断变化的</div>
      <h1>{counter}</h1>
      <button
        onClick={(e) => {
          setCounter(counter + 1);
        }}
      >
        +1
      </button>
      <hr />
      <div>渲染子组件了</div>
      <Child memorizeObj={memorizeObj} />
    </div>
  );
});

export default UseMemoAfter;
```

可以看到，如果传的是**对象**的情况下。是可以进行记忆缓存的。

### 总结

**useCallback ：**单单给自己使用 useCallback，你使用不使用都不会给自身带来性能优化。必须要配合 memo 给子组件传递函数才有性能优化效果。**useCallback 并不是给函数做缓存，而是不希望子组件多次渲染。**

**useMemo：** 这个才是给函数的结果做了一个缓存，是可以给自身的组件做优化。适用于场景 ① 需要大量计算的函数 ② 给子组件传递**对象**也可以有优化效果（传递普通的值没意义）。

## 9 useRef

这个跟之前学的 React.createRef 有什么关联呢。

` React.createRef();` 以前用的话就是直接使用 React 内部的 API 而已。

```jsx
import React, { useRef } from 'react';

// 这里演示一下普通的ref用法
function CreatRef() {
  //   const demoRef = useRef(); // 1️⃣ReactAPI可以获取
  const demoRef = React.createRef(); // 2️⃣hooks获取

  const getDomByRef = () => {
    console.log(demoRef.current);
    const demo = document.getElementById('demo');
    console.log(demo === demoRef.current); // 可以推导出来是同一个
  };

  return (
    <div>
      <h2 id="demo" ref={demoRef}>
        我是h2元素
      </h2>
      <button onClick={getDomByRef}>点击我获取ref</button>
    </div>
  );
}

export default CreatRef;
```

### 基本用法

useRef 返回一个**ref 对象**，这个对象在组件的**整个生命周期保持不变**。不管你是重新渲染了，更新了，卸载了。我就是不变。

主要运用在下面

- 引入 dom → 这个就是上面的的案例，获取 dom。
- 保存一个数据，这个数据在整个生命周期不变。所以可以绑定数值。→ 解决闭包陷阱

这个闭包陷阱在上面的`useCallback()`说的很清楚了。现在写一个绑定数值解决闭包陷阱的案例。

```jsx
import React, { memo, useCallback, useRef, useState } from 'react';

// 1-d 因为这里不会引起increment的变化 这里也不会变的
const Child = memo(() => {
  console.log('Child 渲染了');
  return <div>子组件:Child</div>;
});

function UseRefSolve() {
  const [counter, setCounter] = useState(0);
  // 这里是有闭包陷阱的 before
  const cb = useRef(); // 1-a 先设置一个对象（永不变）
  cb.current = counter; // 1-b 把counter最新的值给counter
  const increment = useCallback(() => {
    setCounter(cb.current + 1); // 1-c 这里既可以达到更新，又不会引起increment的变化
  }, []);
  return (
    <div>
      <div>父组件</div>
      <h2>counter:{counter}</h2>
      <button onClick={increment}>+1</button>
      <div>子组件</div>
      <Child increment={increment} />
    </div>
  );
}

export default UseRefSolve;
```

## 10 useImperativeHandle

### 导入背景

这个到底是干嘛的？首先你要知道 ref 和 forward 的用法。forward 是什么呢？父子间调用子组件 ref 的时候用的。

现在我们要实现一个需求，就是点击父组件的按钮，获取子组件的 dom。比如下面这个点击父组件，让子组件聚焦。

```jsx
import React, { forwardRef, useRef } from 'react';

// 这里目前不涉及useImperativeHandle 是设计forwordref

// 必须要有forwardRef 才能包裹到ref这个参数
const Child = forwardRef((props, ref) => {
  // 1-c 这里就是拿到了父组件传过来的ref
  return (
    <div>
      <h1>子组件：Child</h1>
      {/* 1-d 拿到ref之后放在子组件的身上 */}
      <input ref={ref} type="text" name="" id="" />
    </div>
  );
});

const UseImperativeHandleBefore = () => {
  // 1-a 定义ref
  const inputRef = useRef();
  return (
    <div>
      <h1>我是父组件</h1>
      {/* 1-e 成功拿到聚焦！ */}
      <button onClick={(e) => inputRef.current.focus()}>点击聚焦子组件</button>
      {/* 1-b 给子组件传递一下ref */}
      <Child ref={inputRef} />
    </div>
  );
};

export default UseImperativeHandleBefore;
```

通过上面一系列的操作，父组件终于拿到了子组件的 dom 元素。

但是这里是有隐患的，那么就引入到了

> 为什么要使用 useImperativeHandle？
>
> 因为你可以看见父组件拿到了一整个子组件的 dom，但其实我只是想暴露一下 focus 这一个方法而已。导致整个 dom 都暴露了，于是 useImperativeHandle 就出来解决这个问题。
>
> 我暴露了啥方法，你才能用。

### 使用方法

目前我只想暴露 focus，那么就登场了。解决方法。

下面也写了具体的操作方法

```jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

// 这里就是具体的使用，就是我子组件暴露了什么方法你才能用
const Child = forwardRef((props, ref) => {
  // 1-a 想创建子组件内部的ref
  const inputChildRef = useRef();

  // 参数1 就是ref
  // 参数2 是一个回调函数 这个回调函数里暴露你想要暴露的方法
  // 1-c 使用useImperativeHandle
  useImperativeHandle(ref, () => {
    return {
      // 1-d 暴露你想暴露的具体操作方法
      focus: () => {
        inputChildRef.current.focus();
      },
    };
  });
  return (
    <div>
      <h1>子组件：Child</h1>
      {/* 1-b 这里传入 */}
      <input ref={inputChildRef} type="text" name="" id="" />
    </div>
  );
});

const UseImperativeHandleAfter = () => {
  const inputRef = useRef();
  return (
    <div>
      <h1>我是父组件</h1>
      <button onClick={(e) => inputRef.current.focus()}>点击聚焦子组件</button>
      <button onClick={(e) => (inputRef.current.value = '')}>
        点击清除（不能用的，因为没暴露
      </button>
      <Child ref={inputRef} />
    </div>
  );
};

export default UseImperativeHandleAfter;
```

![image-20221002222133307](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221002222133307.png)

### 注意点

这个也是可以绑定依赖的，比如什么时候

```jsx
useImperativeHandle(
  ref,
  () => {
    return {
      focus: () => {
        inputChildRef.current.focus();
      },
    };
  },
  [inputChildRef]
); // 这里发生更新你才可以，但其实是不用的，因为useRef特性就是不变的，所以你可以写

useImperativeHandle(
  ref,
  () => {
    return {
      focus: () => {
        inputChildRef.current.focus();
      },
    };
  },
  [inputChildRef.current]
); // ✅ 这样就OK
```

## 11 useLayoutEffect

这个和上面的 useEffect 其实特别像，那么只有那里不一样呢？

> useEffect 是整个 DOM 都更新，渲染完了之后执行，不**会阻塞 DOM 更新。**
>
> useLayoutEffect 会在渲染的内容在 DOM 更新之前执行，**会阻塞 DOM 更新。**

相当于在 useEffect 之前拦截了。

官方不推荐用这个，就不写了。 主要是解决 DOM 在渲染之前 check 以下值的问题，用 useEffect 的话因为是在 DOM 渲染之后发生的，会产生闪烁。用的很少。

## 12 什么是自定义的 hooks

你 react 不是给我准备了 n 多个 hooks 吗？

[![Alt text of image](https://res.cloudinary.com/practicaldev/image/fetch/s--viFx5qPl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pbs.twimg.com/media/EgWi0rUXoAEC9zQ%3Fformat%3Djpg%26name%3Dsmall)](https://res.cloudinary.com/practicaldev/image/fetch/s--viFx5qPl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pbs.twimg.com/media/EgWi0rUXoAEC9zQ%3Fformat%3Djpg%26name%3Dsmall)

但是在**普通的函数**里面，你是不能用这些强大的 hooks 的。

有点像是 2,3 代蜘蛛侠，你不穿战袍，你就吐不出来蜘蛛丝！

但是你自定义了一个 hook，你就可以在你自定义的 hook 里面使用 react 给你提供的 hooks。

```
普通函数 + 可以使用react hooks = 自定义hooks
```

那如何自定义呢？

一定要用 useXXX 开头！！

```jsx
function useXXXX() {}
```

### 自定义 hooks 实际使用场景

场景一，给每个组件增加一个删除和销毁的 log 提示。

![image-20220302014943572](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220302014943572.png)

场景二 封装组件

比如每一个组件都有一个需要用的 context

![image-20220302170231486](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220302170231486.png)

又比如 封装一个滚动

![image-20220302171143676](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220302171143676.png)

> **其实和普通的函数封装没区别**
>
> **就是可以用 hooks！！！而且不只是可以放 1 个 hook，多个 hooks 都可以混用。**

## 13 useSeletor

这个用在什么地方呢？答案：redux 才用。主要用于把冗长的`mapStateToProps`给替换掉的。

```jsx
// =====useSelector 主要是为了替换你的=====
const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});
//=====useSelector 主要是为了替换你的=====

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(counterSlice.actions.addNumberAction(num));
  },
  subNumber(num) {
    dispatch(counterSlice.actions.subNumberAction(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxHookBefore);
```

这里主要是对比以前，之前和之后。尤其是配合 rtk 使用之后真的很 easy

before

```jsx
import { memo } from 'react';
import { connect } from 'react-redux';
import counterSlice from './modules/counter';

const ReduxHookBefore = memo((props) => {
  const { counter, addNumber, subNumber } = props;

  const addNumberHandle = (num) => {
    addNumber(num);
  };

  const subNumberHandle = (num) => {
    subNumber(num);
  };
  return (
    <div>
      <h1>counter is {counter}</h1>
      <button onClick={(e) => addNumberHandle(1)}>+1</button>
      <button onClick={(e) => addNumberHandle(5)}>+5</button>
      <button onClick={(e) => subNumberHandle(-5)}>-5</button>
    </div>
  );
});

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(counterSlice.actions.addNumberAction(num));
  },
  subNumber(num) {
    dispatch(counterSlice.actions.subNumberAction(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxHookBefore);
```

after

```jsx
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from './modules/counter';

const ReduxHookBefore = memo((props) => {
  //  1-a 将redux中store的数据映射到了这里
  // 替代以前的mapStateTopProps 主要拿到最新的state
  // 然后返回你想要的数据 然后这里做了解构
  const { counter } = useSelector((state) => {
    return {
      counter: state.counter.counter,
    };
  });

  // 1-b dispatch直接用这个hook就可以拿到了
  const dispatch = useDispatch();
  const addNumberHandle = (num) => {
    dispatch(counterSlice.actions.addNumberAction(num));
  };

  const subNumberHandle = (num) => {
    dispatch(counterSlice.actions.subNumberAction(num));
  };

  return (
    <div>
      <h1>counter is {counter}</h1>
      <button onClick={(e) => addNumberHandle(1)}>+1</button>
      <button onClick={(e) => addNumberHandle(5)}>+5</button>
      <button onClick={(e) => subNumberHandle(-5)}>-5</button>
    </div>
  );
});
export default ReduxHookBefore;
```

![image-20221006154828059](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221006154828059.png)

### 浅层比较陷阱

但是这里的 useSelector 有一个陷阱需要演示一下，关于浅层比较的。

这里为了演示一下父组件的 UseSelectorA counter 改变了 但是子组件按照常理说用了 memo 应该不会发生再次渲染的 但是却渲染了

```jsx
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from './modules/counter';

// 这里为了演示一下父组件的 UseSelectorA counter改变了
// 但是子组件按照常理说用了memo应该不会发生再次渲染的 但是却渲染了
// 演示了一下这个过程
const Child = memo((props) => {
  console.log('Child render');
  const { msg } = useSelector((state) => {
    return {
      msg: state.counter.msg,
    };
  });

  return <div>message is :{msg}</div>;
});

const UseSelectorA = memo((props) => {
  const { counter } = useSelector((state) => {
    return {
      counter: state.counter.counter,
    };
  });

  const dispatch = useDispatch();
  const addNumberHandle = (num) => {
    dispatch(counterSlice.actions.addNumberAction(num));
  };

  const subNumberHandle = (num) => {
    dispatch(counterSlice.actions.subNumberAction(num));
  };

  return (
    <div>
      <h1>counter is {counter}</h1>
      <button onClick={(e) => addNumberHandle(1)}>+1</button>
      <button onClick={(e) => addNumberHandle(5)}>+5</button>
      <button onClick={(e) => subNumberHandle(-5)}>-5</button>
      <Child />
    </div>
  );
});

export default UseSelectorA;
```

> 这是为什么呢？
>
> 原理就是 useSelector 会监控所有的 state 的状态变化，只要有一个变化了，她就会更新。所以即使 Child 组件里面 msg 没有更新，但是 state 里的 counter 更新了，那就会更新的。
>
> 那如何解决呢？很简单`shallowEqual` 这里的`shallowEqual` 会浅层比较 ，只要没有更新就不会渲染
>
> **旧 state.msg** PK **新 state.msg**

```jsx
const Child = memo((props) => {
  console.log('Child render');
  const { msg } = useSelector((state) => {
    return {
      msg: state.counter.msg,
    };
  }, shallowEqual); // 添加shallowEqual 这个的作用就是只要不是检测整个state 而是检测到state.msg发生变化才渲染

  return <div>message is :{msg}</div>;
});
```

## 14 useDispatch

直接看上面的 13 就行，替代 redux 里的`mapDispatchToProps()`

## React18 新 hooks

暂时不想写了，用到再说吧。反正都是新的，大部分都是搞性能优化的。
