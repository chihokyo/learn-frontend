/**
 * 这里本质就是写url和需要携带的数据
 */

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
