/**
 * 这里主要任务存放俩 数据 + 逻辑
 */

import {
  INCREMENT,
  DECREMENT,
  ADD_CREMENT,
  SUB_CREMENT,
  GET_BANNERS,
  GET_RECOMMENDS,
} from './constans.js';

const initialState = {
  counter: 0,
  banners: [],
  recommends: [],
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
    case GET_BANNERS:
      return { ...state, banners: action.banners };
    case GET_RECOMMENDS:
      return { ...state, recommends: action.recommends };
    default:
      return state;
  }
}
