/**
 * 这里其实就是主要写入口了
 */
import { createStore } from 'redux';
import reducer from './reducer.js';

const store = createStore(reducer);
export default store;
