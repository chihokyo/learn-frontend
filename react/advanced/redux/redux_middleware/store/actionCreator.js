export const ADD_NUMBER = 'ADD_NUMBER';
export const SUB_NUMBER = 'SUB_NUMBER';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const addAction = (num) => ({
  type: ADD_NUMBER,
  num,
});

export const subAction = (num) => ({
  type: SUB_NUMBER,
  num,
});

export const inAction = () => ({
  type: INCREMENT,
});

export const deAction = () => ({
  type: DECREMENT,
});
