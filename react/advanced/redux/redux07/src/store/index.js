/**
 * 这里其实就是主要写入口了
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer.js';

// 你想使用什么中间件，你就当做参数放进去
// const storeenhancer = applyMiddleware(中间1，中间2...);
const storeenhancer = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, storeenhancer);
export default store;
