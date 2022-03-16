import store from './store/index.js';

import { addAction, subAction } from './store/actionCreator.js';

store.subscribe(() => {
  console.log(store.getState());
});

// 现在有个需求需要你前后打印

// 1. 基本做法
// console.log('====dispatch之前1====', addAction(10));
// store.dispatch(addAction(10));
// console.log('====dispatch之后1====', store.getState());

// console.log('====dispatch之前1====', addAction(8));
// store.dispatch(addAction(8));
// console.log('====dispatch之后1====', store.getState());

// console.log('============华丽的分割线==============');

// // 2. 封装一个函数 参数是函数
// function dispatchAndLogging(action) {
//   console.log('====dispatch之前2====', action);
//   store.dispatch(action);
//   console.log('====dispatch之后2====', store.getState());
// }

// dispatchAndLogging(addAction(10));
// dispatchAndLogging(addAction(80));

// 3. 函数的基础之上进行优化: 修改原有的dispatch
// monkey patch 猴补丁

// const next = store.dispatch; // 相当于暂存函数体
// function dispatchAndLogging(action) {
//   console.log('====dispatch之前3====', action);
//   next(action); // 这里调c用的是暂存的
//   console.log('====dispatch之后3====', store.getState());
// }
// store.dispatch = dispatchAndLogging; // 这里暂存个store.dispatch

// store.dispatch(addAction(10)); // 本质上执行的dispatchAndLogging()
// store.dispatch(addAction(5)); // 但是内部是next()也就是执行的store.dispatch()

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
  // store.dispatch = dispatchAndLogging;
  return dispatchAndLogging;
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
  // store.dispatch = dispatchAndThunk;
  return dispatchAndThunk;
}

function foo(dispatch, getState) {
  dispatch(subAction(10));
}
patchThunk(store);
store.dispatch(foo);

// 5. 关于多个中间件合并
function applyMiddlewares(...middlewares) {
  // 每一次遍历的都是函数
  middlewares.forEach((middleware) => {
    // 相当于依次调用
    store.dispatch = middleware(store);
  });
}

applyMiddlewares(patchLogging, patchThunk);
