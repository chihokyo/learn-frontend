/**
 * 这里本质就是写url和需要携带的数据
 */
// import axios from 'axios';
import { GET_BANNERS, GET_RECOMMENDS, FETCH_MULTIDATA } from './constants.js';

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
  // axios({
  //   url: 'http://123.207.32.32:8000/home/multidata',
  // }).then((res) => {
  //   const { banner, recommend } = res.data.data;
  //   // 拿到结果之后
  //   dispatch(getBannersAction(banner.list));
  //   dispatch(getRecommendsAction(recommend.list));
  // });
};

//redux-saga 拦截的action
export const fetchMultiDataAction = {
  type: FETCH_MULTIDATA,
};
