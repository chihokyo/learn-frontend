/**
 * 这里主要任务存放俩 数据 + 逻辑
 */

import { INCREMENT, DECREMENT, ADD_CREMENT, SUB_CREMENT } from './constans.js';
import { inAction, deAction, addAction, subAction } from './actionCreators.js';

const initialState = {
  counter: 0,
};

function reducer(state = initialState, action) {
  switch (action.ty) {
    case value:
      break;

    default:
      break;
  }
}
