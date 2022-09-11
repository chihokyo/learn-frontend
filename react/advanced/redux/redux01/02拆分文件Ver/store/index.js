/**
 * 这里其实就是主要写入口了
 */
import redux from 'redux';
import reducer from './reducer.js';

const store = redux.createStore(reducer);
export default store;
