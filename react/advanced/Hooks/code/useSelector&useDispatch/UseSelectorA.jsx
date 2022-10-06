import { memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import counterSlice from './modules/counter';

// 这里为了演示一下父组件的 UseSelectorA counter改变了
// 但是子组件按照常理说用了memo应该不会发生再次渲染的 但是却渲染了
// 演示了一下这个过程
const Child = memo((props) => {
  console.log('Child render');
  const { msg } = useSelector((state) => {
    return {
      msg: state.counter.msg,
    };
  }, shallowEqual); // 添加shallowEqual 这个的作用就是只要不是检测整个state 而是检测到state.msg发生变化才渲染

  return <div>message is :{msg}</div>;
});

const UseSelectorA = memo((props) => {
  const { counter } = useSelector((state) => {
    return {
      counter: state.counter.counter,
    };
  }, shallowEqual); // 我们也要给这里加上，否则上面的msg变化也会引起这里的变化了

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
      <Child />
    </div>
  );
});

export default UseSelectorA;
