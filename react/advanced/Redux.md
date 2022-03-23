# Redux相关

## 1 redux

因为redux不只是react可以用，vue也可以用。

这个有一个纯函数的概念，`reducer()`本质就是一个纯函数

**所以说reduce（state）这里传入的state数据是不能改的！！！**可是你可以复制一份。

```
纯函数
确定的输入，一定会产生确定的输出; 
函数在执行过程中，不能产生副作用;所谓副作用就是传入的数据不能被修改
```

![image-20220215222721776](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220215222721776.png)

于是最后的完成版本就是这样的。

![image-20220215224046602](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220215224046602.png)

![image-20220215233757128](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220215233757128.png)

一些补充

![image-20220216000617737](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220216000617737.png)

关于导出导入也是可以有多个选择的。

我看了这么多，都不如这个解释的好。

![img](https://pic3.zhimg.com/80/84a649275f15c1d6699482beb4b1318f_1440w.jpg?source=1940ef5c)

## 2 redux 抽离出来

刚才上面的案例是一个合在一起的，都写在一个文件里面的。这样不够模块化，不够好。

```
store
└──  index.js 
			└── new一个reducer实例的感觉
└──  constans.js
			└── 用来放常量
└──  actionCreator.js
			└── 存储url和数据 
└──  reducer.js
			└── 纯函数 用来处理逻辑路由+控制器
index.js → 里面有dispatch 分发用
```

所以下面开始重新写一下了。

先不充一个小知识点

![image-20220308144637562](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220308144637562.png)

所以真正的抽离出去的感觉应该是这样的

![image-20220308151339630](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220308151339630.png)

## 3 自己写一个connect来完成组件 → redux

下面就用一个点击的案例来说明一下如何搭配起来的。

其实主要的就是在生命周期函数的时候进行监听，然后请求，在销毁的手取消订阅。

![image-20220217000130292](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220217000130292.png)

上面这段代码吧，它只适用于About这个组件，如果是在加上一个Home呢？一个Person呢？

这样的话就会有很多重复的逻辑，所以需要抽取公共逻辑。这个时候就需要connect来实现一个桥梁。

而实现桥梁的原理就是使用了高阶组件进行包裹。

## ![image-20220308155453075](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220308155453075.png)

搞定了这个理念的话，接下来继续看。完整版本。

![image-20220308163258356](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220308163258356.png)

> 其实从上面的一系列表现可以看出来，就是数据的处理，完全都交给了connect这个桥梁，连接到了store
>
> 本身自己没有state，而全都是交给了store进行处理。
>
> 可以说页面只要渲染 → connect → store处理 → 组件获取最新数据 → 继续渲染

**这里有一个完整实现的demo！**

如果某一年某一月某一日给看不懂的我写的一封信。

就是看一下这个demo！！！



## 4 context的抽取！独立起来！

这算是最后一步了！只要完成这个就可以了。为什么要完成呢？

因为不够独立，可以发现如果connect.js如果是一个包的话，还需要在此基础上进行依赖store，这样不具备独立性。因为connect.js里面还导入import store，不独立！

**如何使用context 拆分出来 store？**

答案就是利用context的上下文，

道理我懂了，接下来补代码。

![image-20220309013030514](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220309013030514.png)

## 5 react-redux 善良登场！

但其实真正的开发，是不需要我自己来实现*context.js*和*connect.js*。那么用什么呢？

于是react-redux就闪亮登场了！！！

如果你前面4个都懂的话，这个react-redux 就是帮你实现了 这个桥梁的作用而已！！

![image-20220309013735416](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220309013735416.png)

## 6 来看看源码

本质了

![image-20220309014255359](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220309014255359.png)

---

基本上上面就是redux的一切了、接下来继续react的异步请求！！

## 7 船新的版本 关于异步请求

**7-1 为什么用异步呢？**

因为你看你自己写的垃圾代码，用的数据是你自己定义的哦！

实际开发工作里怎么可能用你自己写的数据，不都是要跟数据库进行交互吗。那么你交互的时候，不就是异步请求吗，难道大家都要互相依赖，没你的数据就没我的数据，没我的数据接下来就无法执行了？这样不是很好，于是就需要异步进行请求。

那么继续来看些的redux，发现无论是在哪里，都不知道哪里写异步请求，也就是发送axios这样的地方。这个时候**中间件**就顺利登场了。

首先先写一个不需要中间件的，也就是在每一次组件已经渲染之后的时候开始发起请求

**7-2 `componentDidMount()`  这里进行书写请求**

这个看我的git

**7-3  通过redux**

因为上面是状态发送的，这样redux还有个毛意义，于是想在redux里面发

```
.
├── store 
│   └── actionCreators.js → 写action分发的 
│   └── constants.js → 写常量的
│   └── index.js → 创建store实例的
│   └── reducer.js → 写逻辑的
├── 
```

会发现上面的模块里面，没有地方可以写。于是就引出来了全新的东西，那就是

**7-4 中间件（Middleware）redux-thunk**

貌似本质就是在dispatch的action 和 reducer 之间，扩展自己的代码。

![image-20220309235842142](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220309235842142.png)

![image-20220309235717777](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220309235717777.png)

所以说具体的代码实现如下

![image-20220310003219483](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220310003219483.png)

接下来有空在补充源码，现在先写一下thunk的作用就是其实让dispatch可以传入函数，然后进行操作而已。并且还写在了actionCreators里面，本质上就这些，但是这些肯定是不够！！

于是下面的saga闪亮登场！

## 7 redux-saga

其实saga比thunk先进在哪里呢？

就是`dispatch(还是对象)`，同时中间件的详情可以写在别的文件里面。

学习这个首先要有generator的基础知识

基础知识如下

```javascript
```

于是saga的实现就要靠

## 8 中间件实现原理

先引入一个案例，比如说你要在一个函数之前之后打印一个日志。如何实现？

其实我以前学习python也做过这个，就是@增加一个功能。

但是js貌似不是这样。

```javascript
// 现在有个需求需要你前后打印

// 1. 基本做法
console.log('====dispatch之前====', addAction(10));
store.dispatch(addAction(10));
console.log('====dispatch之后====', store.getState());

console.log('====dispatch之前====', addAction(8));
store.dispatch(addAction(8));
console.log('====dispatch之后====', store.getState());
```

上面肯定是不行的

```javascript
// 2. 封装一个函数 参数是函数
function dispatchAndLogging(action) {
  console.log('====dispatch之前2====', action);
  store.dispatch(action);
  console.log('====dispatch之后2====', store.getState());
}

dispatchAndLogging(addAction(10));
dispatchAndLogging(addAction(80));
```

这样也不好，每次调用还要包裹一层别的函数

所以实现3

```javascript
// 3. 函数的基础之上进行优化: 修改原有的dispatch
// monkey patch 猴补丁

const next = store.dispatch; // 相当于暂存函数体
function dispatchAndLogging(action) {
  console.log('====dispatch之前3====', action);
  next(action); // 这里调用的是暂存的
  console.log('====dispatch之后3====', store.getState());
}
store.dispatch = dispatchAndLogging; // 这里暂存个store.dispatch

store.dispatch(addAction(10)); // 本质上执行的dispatchAndLogging()
store.dispatch(addAction(5)); // 但是内部是next()也就是执行的store.dispatch()

```

但是这样也不够好 于是出现了4 

```javascript
// 4. 继续封装
// 和3比起来整体相当于都放进去一个函数里
// 只要先调用一下函数 就相当于为store增加了功能
function patchLogging(store) {
  const next = store.dispatch;
  function dispatchAndLogging(action) {
    console.log('====dispatch之前4====', action);
    next(action); // 这里调用的是暂存的
    console.log('====dispatch之后4====', store.getState());
  }
  store.dispatch = dispatchAndLogging;
}

patchLogging(store);

store.dispatch(addAction(10));
store.dispatch(addAction(18));
```

但是这个时候只是增加了一个功能，如果想要增加多个呢

```javascript
// 4. 继续封装1
// 和3比起来整体相当于都放进去一个函数里
// 只要先调用一下函数 就相当于为store增加了功能
function patchLogging(store) {
  const next = store.dispatch;
  function dispatchAndLogging(action) {
    console.log('====dispatch之前4====', action);
    next(action); // 这里调用的是暂存的
    console.log('====dispatch之后4====', store.getState());
  }
  store.dispatch = dispatchAndLogging;
}

patchLogging(store);
store.dispatch(addAction(10));
store.dispatch(addAction(18));

// 4. 继续封装另一个功能函数2
// 如果传入一个函数，就执行那个函数
function patchThunk(store) {
  const next = store.dispatch;
  function dispatchAndThunk(action) {
    if (typeof action === 'function') {
      action(store.dispatch, store.getState);
    } else {
      next(action);
    }
  }
  store.dispatch = dispatchAndThunk;
}

function foo(dispatch, getState) {
  console.log(dispatch, getState);
}
patchThunk(store);
store.dispatch(foo);
```

如果上面增加的两个功能想一起来呢？

```javascript
// 5. 关于多个中间件合并
function applyMiddlewares(...middlewares) {
  // 每一次遍历的都是函数
  middlewares.forEach((middleware) => {
    // 相当于依次调用
    store.dispatch = middleware(store);
  });
}

applyMiddlewares(patchLogging, patchThunk);
```

## 9 为什么叫redcuer

redux官方说的来自于js的`reduce()`(这个函数

https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#reducers

>##### INFO
>
>"Reducer" functions get their name because they're similar to the kind of callback function you pass to the [`Array.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method.

```js
["hdhd", "huddew"].reduce((pre,item) => {},0 )
// 这个就叫 reducer(pre,item) => {}
```

因为太像，所以模仿。

## 10 reducer肥大化，臃肿！

怎么办呢？

拆解`reducer()`

每个模块就拆解一个reducer，然后用一个函数合并起来就好了。

```javascript
aaReducer(aaState, action)
bbReducer(bbState, action)
// 
```

