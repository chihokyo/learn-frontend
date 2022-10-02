import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };

    case 'decrement':
      return { ...state, count: state.count - 1 };

    default:
      return state;
  }
};

function Hooks() {
  // 验证最基本操作
  const [state, dispatch] = useReducer(reducer, { count: 1 });
  // 精简操作 返回值是字符串 yes
  const [state2, dispatch2] = useReducer(
    () => {
      console.log('dispatch2');
      return { num: 'yes' };
    },
    { num: 88 }
  );
  const { count } = state;
  return (
    <div>
      <h2>useReducer</h2>
      <p>{count}</p>
      <button
        onClick={(e) => {
          dispatch({ type: 'increment' });
        }}
      >
        +1
      </button>
      <button
        onClick={(e) => {
          dispatch({ type: 'decrement' });
        }}
        style={{ marginLeft: '20px' }}
      >
        -1
      </button>
      <h2>number</h2>
      {state2.num}
      <button onClick={dispatch2}>+99</button>
    </div>
  );
}

export default Hooks;
