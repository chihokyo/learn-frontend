/**
 * 这个文件主要写逻辑，就是派发实际的动作
 * 还有监听变化，其实逻辑都写在这里
 */
import store from './store/index.js';

import {
  inAction,
  deAction,
  addAction,
  subAction,
} from './store/actionCreators.js';

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(inAction());
store.dispatch(deAction());
store.dispatch(addAction(8));
store.dispatch(subAction(18));
