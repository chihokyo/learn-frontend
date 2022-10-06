import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from './modules/counter';

const ReduxHookBefore = memo((props) => {
  //  1-a 将redux中store的数据映射到了这里
  // 替代以前的mapStateTopProps 主要拿到最新的state
  // 然后返回你想要的数据 然后这里做了解构
  const { counter } = useSelector((state) => {
    return {
      counter: state.counter.counter,
    };
  });

  // const addNumberHandle = (num) => {
  //   addNumber(num);
  // };
  // const subNumberHandle = (num) => {
  //   subNumber(num);
  // };

  // 1-b dispatch直接用这个hook就可以拿到了
  const dispatch = useDispatch();
  const addNumberHandle = (num) => {
    dispatch(counterSlice.actions.addNumberAction(num));
  };

  const subNumberHandle = (num) => {
    dispatch(counterSlice.actions.subNumberAction(num));
  };

  return (
    <div>
      <h1>counter is {counter}</h1>
      <button onClick={(e) => addNumberHandle(1)}>+1</button>
      <button onClick={(e) => addNumberHandle(5)}>+5</button>
      <button onClick={(e) => subNumberHandle(-5)}>-5</button>
    </div>
  );
});

// // =====useSelector 主要是为了替换你的=====
// const mapStateToProps = (state) => ({
//   counter: state.counter.counter,
// });
// //=====useSelector 主要是为了替换你的=====

// //=====useDispatch 主要是为了替换你的=====
// const mapDispatchToProps = (dispatch) => ({
//   addNumber(num) {
//     dispatch(counterSlice.actions.addNumberAction(num));
//   },
//   subNumber(num) {
//     dispatch(counterSlice.actions.subNumberAction(num));
//   },
// });
// //=====useDispatch 主要是为了替换你的=====

// export default connect(mapStateToProps, mapDispatchToProps)(ReduxHookBefore);
export default ReduxHookBefore;
