/**
 * 这里其实就是主要写入口了
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'; // thunkMiddleware是对象
import createSagaMiddleware from 'redux-saga';
import saga from './saga'; // 1-3 这里saga相当于是生成器函数

import reducer from './reducer.js';

// 你想使用什么中间件，你就当做参数放进去
// 这里使用thunk插件和redux devtools
// const storeenhancer = applyMiddleware(中间1，中间2...);
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
  }) || compose;

// 创建saga的中间件( 这里对比一下thunk，thunk导入之后可以直接添加到中间件)
// 1-1 但是sage这里需要使用导入的函数，生成中间件
const sagaMiddleware = createSagaMiddleware();

// 应用中间件
const storeenhancer = applyMiddleware(thunkMiddleware, sagaMiddleware);
const store = createStore(reducer, composeEnhancers(storeenhancer));

sagaMiddleware.run(saga); // 1-2 从dispatch → reducer之间中saga进行拦截请求
// 所以无论是什么dispacth，都会在run这里被拦截
// run(生成器函数) 这里相当于返回的是迭代器对象，然后用next进行不断的调用
export default store;
