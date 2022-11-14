# 总体介绍

这里介绍的是学习 redux 的一些心路历程

## 1 redux 总体介绍

![image-20220912234110212](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220912234110212.png)

### redux01

这里主要介绍的是 redux，只是 redux 而已。

是学习 redux 的第一步，这里不设计涉及 react 知识。

一个文件梭哈。就是最简单的 redux 的形式，就是跑通 redux 而已。

拆分文件。就是把 redux 更加细分化。

### redux02

这里结合了 react，描述了在 react 里面直接使用 redux 是怎么用的。

### redux03

这里进一步封装了一下，上一个重复的代码太多。这里使用了 connect 进行封装。

### redux04

这里就是进一步的进行封装，因为 store 要解耦合。所以把 store 单独拆分出去，用了 context。

### redux05

这里就是正式使用了 react-redux 这个第三方库。

### redux06

展示了在异步请求的时候 redux 的局限性，必须在组件初始化加载。这样不行。所以需要导入中间件。

### redux07

中间件 redux-thunk 登场

主要其实就是把 dispatch 原来是` dispatch(对象);`，现在是` dispatch(函数);`，在函数里面执行你想要的异步操作，然后让 dispatch 直接派发函数的结果。总结起来 redux-thunk 做了两件事情。

至于为什么要派发函数呢？是因为异步请求这些操作，不好直接放在组件里，那么放在 actionCreator 里的话会发生一些问题，是什么问题？那就是 action 里面都是同步的，但是如果遇到异步请求，顺序有晚有早。所以需要再 dispatch 里直接传入函数，这个函数里可以执行一个异步请求，然后把最新的数值直接 return 过去，这个函数里 return 的是一个对象就好。

- `dispatch()` 可以接受函数
- 并且帮你调用里面的函数

### redux08

redux-saga 登场

为什么要使用 redux-saga？因为 thunk 的时候，所有的异步请求依然还是写在了 action 里面的，还没有进一步的解耦合。

现在可以使用 saga 进行进一步的解耦合，把所有的异步请求写在*saga.js*里面

### redux09

reducer 承受了太多，于是接下来了拆分。拆分就是为每个组件都搞一个 store 文件夹，然后进行拆分。

主要是用了`combineReducer`这个函数

### react toolkit

这个是官方出的包，主要解决了以下问题

- 形式代码太多，一个 redux 要写`constant.js reducer.js index.js action.js`
- 异步请求还需要用到第三方的包`redux-thunk`
- 每次修改数据等等，还需要浅复制`...state`这种。

> 为了解决上面的问题，官方直接出了新的包。

其实就是相当于把 constant.js，reducer.js，action.js 三合一了，只用写一个文件就行了

```jsx
createSlice(三合一);
```

安装

```bash
npm install @reduxjs/toolkt react-redux
```

### redux hooks

这个算是目前的终极形态了，因为你会发现在组件里如果要用到数据和方法，总会有一个映射的过程。

```jsx
const mapStateToProps = (state) => ({
  counter: state.counter,
  banners: state.banners,
  recommends: state.recommends,
});

const mapDispatchToProps = (dispatch) => ({
  decrement: () => {
    dispatch(deAction());
  },
  subNumber: (num) => {
    dispatch(subAction(num));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(About);
```
