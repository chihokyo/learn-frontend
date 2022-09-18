/**
 * 这里主要任务存放俩 数据 + 逻辑
 */

import { INCREMENT, DECREMENT, ADD_CREMENT, SUB_CREMENT } from './constans.js';

const initialState = {
  counter: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case ADD_CREMENT:
      return { ...state, counter: state.counter + action.num };
    case SUB_CREMENT:
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}