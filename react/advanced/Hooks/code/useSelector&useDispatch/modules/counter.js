import { createSlice } from '@reduxjs/toolkit';

// 每个slice都有自己的 reducer 和 actions
const counterSlice = createSlice({
  // 以前没有 就是给你的片段命名
  name: 'counter',
  // 以前都是统一的 现在分开 是数据
  initialState: {
    counter: 99,
    msg: 'hello redux',
  },
  // 以前是统一写的 现在直接写在这里了reducer
  // 而且数据统一给你做了可变数据，你不用每次..在复制一份了
  reducers: {
    addNumberAction(state, { payload }) {
      state.counter = state.counter + payload;
    },
    subNumberAction(state, { payload }) {
      state.counter = state.counter + payload;
    },
  },
});

export default counterSlice;
