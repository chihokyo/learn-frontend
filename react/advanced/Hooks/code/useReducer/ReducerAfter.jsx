import { useReducer } from 'react';

// 这里和before实现了一样的东西，却简单了很多
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
    case 'decrement':
      return { ...state, counter: state.counter - 1 };
    case 'add':
      return { ...state, counter: state.counter + action.num };
    case 'sub':
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}

function ReducerAfter() {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });
  return (
    <div>
      ReducerAfter
      <h1>{state.counter}</h1>
      <button onClick={(e) => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={(e) => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={(e) => dispatch({ type: 'add', num: 5 })}>+5</button>
      <button onClick={(e) => dispatch({ type: 'sub', num: 8 })}>-8</button>
    </div>
  );
}

export default ReducerAfter;
