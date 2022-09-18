/**
 * 这里主要任务存放俩 数据 + 逻辑
 */

import { GET_BANNERS, GET_RECOMMENDS } from './constants.js';

const initialState = {
  banners: [],
  recommends: [],
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BANNERS:
      return { ...state, banners: action.banners };
    case GET_RECOMMENDS:
      return { ...state, recommends: action.recommends };
    default:
      return state;
  }
}

export default homeReducer;
