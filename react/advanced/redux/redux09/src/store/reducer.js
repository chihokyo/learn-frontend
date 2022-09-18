/**
 * 这里主要任务存放俩 数据 + 逻辑
 */

import { reducer as homeReducer } from './home';
import { reducer as counterReducer } from './counter';
import { combineReducers } from 'redux';

// before
// function reducer(state = {}, action) {
//   return {
//     counterInfo: counterReducer(state.counterInfo, action),
//     homeInfo: homeReducer(state.homeInfo, action),
//   };
// }

// after
const reducer = combineReducers({
  counterInfo: counterReducer,
  homeInfo: homeReducer,
});
export default reducer;
