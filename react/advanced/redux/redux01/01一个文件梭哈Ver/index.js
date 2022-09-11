// 暂时不能通过es6的模式
const redux = require('redux');

/******************************/

// 数据 状态 这个你直接写在下面reducer当参数也可以
const initialState = {
  counter: 0,
};

/**
 * 三剑客 1️⃣ reducer (连接 数据+action)
 */
// 第一次state，没有值，是undefined就会用默认值
// 第二次以及以后，就不是默认值了。
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      // 先拷贝，再覆盖
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'ADD_CREMENT':
      return { ...state, counter: state.counter + action.num };
    case 'SUB_CREMENT':
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}

/**
 * 三剑客 2️⃣ store
 */
// 在最新的redux里面，取消了这个redux.createStore，直接用了 createStore
// const store = redux.createStore(reducer); 💊
const store = redux.createStore(reducer);

//

/**
 * 三剑客 3️⃣ action
 */
const action1 = {
  type: 'INCREMENT',
};
const action2 = {
  type: 'DECREMENT',
};
const action3 = {
  type: 'ADD_CREMENT',
  num: 5,
};
const action4 = {
  type: 'SUB_CREMENT',
  num: 10,
};

// 这个action，最好写成函数的形式
// 因为函数可以传递参数，只要返回是一个对象就好

const inAction = () => {
  return {
    type: 'INCREMENT',
  };
};

const deAction = () => {
  return {
    type: 'DECREMENT',
  };
};

const addAction = (num) => {
  return {
    type: 'ADD_CREMENT',
    num: num, // 这里kv一致的情况下，可以只写num
  };
};
const subAction = (num) => {
  return {
    type: 'SUB_CREMENT',
    num: num, // 这里kv一致的情况下，可以只写num
  };
};

// 💡 如何验证state有没有修改呢？
// 订阅 必须要在发布之前
store.subscribe(() => {
  console.log('state发生了改变');
  console.log(store.getState().counter);
});

// 派发
// store.dispatch(action1); //  一旦派发，立刻就去找reducer
// store.dispatch(action2);
// store.dispatch(action3);
// store.dispatch(action4);

// 由于action用函数改写了，这里派发也会变
store.dispatch(inAction());
store.dispatch(deAction());
store.dispatch(addAction(8));
store.dispatch(subAction(10));
