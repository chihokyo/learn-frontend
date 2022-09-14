/**
 * 这里本质就是写url和需要携带的数据
 */
import axios from 'axios';
import {
  INCREMENT,
  DECREMENT,
  ADD_CREMENT,
  SUB_CREMENT,
  GET_BANNERS,
  GET_RECOMMENDS,
} from './constans.js';

export const inAction = () => {
  return {
    type: INCREMENT,
  };
};

export const deAction = () => {
  return {
    type: DECREMENT,
  };
};

export const addAction = (num) => {
  return {
    type: ADD_CREMENT,
    num: num, // 这里kv一致的情况下，可以只写num
  };
};
export const subAction = (num) => {
  return {
    type: SUB_CREMENT,
    num: num, // 这里kv一致的情况下，可以只写num
  };
};

export const getBannersAction = (banners) => {
  return {
    type: GET_BANNERS,
    banners: banners, // 这里kv一致的情况下，只写一个
  };
};

export const getRecommendsAction = (recommends) => {
  return {
    type: GET_RECOMMENDS,
    recommends, // 这里kv一致的情况下，只写一个
  };
};

// redux-thunk, 这里的函数会被主动调用
// 这里的参数 dispatch和state也是redux-thunk自己穿进来的
// 不是我们自己定义的参数
export const getMultiDataAction = (dispatch, getState) => {
  axios({
    url: 'http://123.207.32.32:8000/home/multidata',
  }).then((res) => {
    const { banner, recommend } = res.data.data;
    // 拿到结果之后
    dispatch(getBannersAction(banner.list));
    dispatch(getRecommendsAction(recommend.list));
  });
};
