# Hooks

## 1 什么是hooks？

一个叫hook，多个叫hooks。就差不多是这样。

关于什么是hooks，直译过来就是钩子，帮你钩过来数据，然后你自己倒腾完之后，再帮你盯梢，在钩回去的感觉。钩来钩去的，蜘蛛侠？

![image-20220222230520370](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220222230520370.png)

## 2 使用规则

官方说的，我觉得看得懂。

```
Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：
1 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
2 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）
```

-  一个就是只能在最外层用
- 一个就是只能自己用

## 2 什么是自定义的hooks

你react不是给我准备了n多个hooks吗？

[![Alt text of image](https://res.cloudinary.com/practicaldev/image/fetch/s--viFx5qPl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pbs.twimg.com/media/EgWi0rUXoAEC9zQ%3Fformat%3Djpg%26name%3Dsmall)](https://res.cloudinary.com/practicaldev/image/fetch/s--viFx5qPl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pbs.twimg.com/media/EgWi0rUXoAEC9zQ%3Fformat%3Djpg%26name%3Dsmall)

但是在**普通的函数**里面，你是不能用这些强大的hooks的。

有点像是2,3代蜘蛛侠，你不穿战袍，你就吐不出来蜘蛛丝！

但是你自定义了一个hook，你就可以在你自定义的hook里面使用react给你提供的hooks。

```
普通函数 + 可以使用react hooks = 自定义hooks
```

那如何自定义呢？

直接用use就行！！

```jsx
function useXXXX(){}
```

## 3 自定义hooks实际使用场景

场景一，给每个组件增加一个删除和销毁。

![image-20220302014943572](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220302014943572.png)

场景二 封装组件

比如每一个组件都有一个需要用的context

![image-20220302170231486](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220302170231486.png)

又比如 封装一个滚动

![image-20220302171143676](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220302171143676.png)

>**其实和普通的函数封装没区别**
>
>**就是可以用hooks！！！**

## 4 useState

useState使用前后对比。

[这一次竟然很意外的看懂了官方文档](https://zh-hans.reactjs.org/docs/hooks-state.html)

接下来就是一个小细节，`useState()` 既可以传入对象，也可以是函数。

这里既可以传入一个函数，也可以是一个数值，根据源码来的。

所以说下面这俩是一样的

```jsx
useState(0) // 一个传入0
useState(() => {0}) // 一个传入的函数 返回的是0
```

![image-20220227011805839](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220227011805839.png)

而且，以下的效果是一样的。

```jsx
<button onClick={(e) => setCount(count + 1)}>+1</button>
<button onClick={(e) => setCount((preValue) => preValue + 1)}>+1</button>
```

他们有什么区别呢？其实跟`setState()`的区别差不多

![image-20220227012743236](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220227012743236.png)

话说，每次setXXX的时候，虚拟dom都会对比，发生变化就会重新渲染，重新调用函数的。

## 5 useEffect

其实本质就是生命周期的钩子

[官方说的](https://zh-hans.reactjs.org/docs/hooks-effect.html)

```
如果你熟悉 React class 的生命周期函数
你可以把 useEffect Hook 看做 
componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
```

这个图也可以展示一下，如何结合的

![Alt text of image](https://res.cloudinary.com/practicaldev/image/fetch/s--viFx5qPl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pbs.twimg.com/media/EgWi0rUXoAEC9zQ%3Fformat%3Djpg%26name%3Dsmall)

比如下面都是实现一个更改dom的例子。

![image-20220227014813375](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220227014813375.png)

我觉得关于useEffect的解释，这句话说的听得懂。

```
useEffect 做了什么？ 
通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。
React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。
在这个 effect 中，我们设置了 document 的 title 属性，不过我们也可以执行数据获取或调用其他命令式的 API。
```

###### 

话说我觉得这篇文章也写的挺好的

[React hooksを基礎から理解する (useEffect編)](https://qiita.com/seira/items/e62890f11e91f6b9653f)

差不多的意思就是说

```javascript
// [] 本质只会执行第一次 → componentDidMount
useEffect(() => {
  document.title =`${count}回クリックされました`
  console.log(`再レンダーされました`)
},[])

// [count] 只有count数据有变化才会再次渲染 → componentDidUpdate
useEffect(() => {
  document.title =`${count}回クリックされました`
  console.log(`再レンダーされました`)
},[count])

// 返回一个函数 差不多清除清理的操作的感觉 → componentWillUnmount
useEffect(() => {
  return () => {
    // 这里写逻辑
  }
},[])
```

## 6 useContext

首先要知道context的用法是什么。

就是跨组件的数据交互的啦。具体想知道普通的context的话，去看Tips我写的。

如果说用这个省略了什么的话

- 不用consumer
- 不用老太太裹脚布 又臭又长

```jsx
// 使用之前
<UserContext.Consumer>
  {
    user => {
      return (
        <HobbyContext.Consumer>
          { hobby => <p>{user.name}({user.age}歳): 趣味：{hobby}</p> }
        </HobbyContext.Consumer>
      )
    }
  }
</UserContext.Consumer>

// 使用之后 
const user = useContext(UserContext)
const hobby = useContext(HobbyContext)
return (
  <p>{user.name}{user.age}歳: 趣味は{hobby}です。</p>
)
```

## 7 useReducer

首先这个和redux关系不大，唯一很像的地方的就是reducer作为一个纯函数。dispatch发请求。

通过useReducer完成加减操作。

```jsx
const [state, dispatch] = useReducer(reducer, { count: 1 });
```



![image-20220303183117391](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220303183117391.png)

要注意的就是`reducer()`这个函数吧，是可以抽取出来的，逻辑是大家一起的，比如下面有2个组件的情况下，**逻辑一起用**是可以的，但是**数据不是共享**的，大家各自的state，都是自己家的，即使都调用同一个reducer，也不会用别人家的数据。

![image-20220303183558100](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220303183558100.png)

>**小知识，useReducer可以替代useState**
>
>看源码的话，可以看到useState内部用的就是useReducer的逻辑。

在网上看到的，用useReducer实现useState

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

> **看起来useReducer和redux很像，那么可以取代吗。答案是不可以取代的。**
>
> 主要问题useReducer+useContext维护的状态还只是一个强耦合于UI的状态。
>
> 这写状态的生命周期完全局限于在函数组件内部，这个状态是在在组件函数作用域内创建的，和UI组件是耦合在一起而没有真正分离。
>
> 但是有的状态是需要完全独立于UI的，需要完全UI无关地进行维护，UI组件只是状态的一个消费者，而不是定义和初始化状态的地方。
>
> **Redux**可以做到分离，但**useReducer+useContext**不能。
>
> 另外Redux有thunk和saga之类的中间件支持async  action，而useReducer没有，还得用其他库。
>
> useContext+useReducer说白了就是项目很小，只有少部分祖孙组件间需要共享状态时才会使用的一个简易共享方案。真正较复杂的情况那必然还是用Redux/Mobx这些的。