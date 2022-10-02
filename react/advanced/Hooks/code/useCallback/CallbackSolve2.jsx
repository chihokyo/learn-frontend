import React, { memo, useCallback, useState } from 'react';

// 这里开始定义一个子组件，而且必须用memo包裹起来
const Child = memo((props) => {
  console.log('Child被渲染了');
  const { increment } = props;
  return (
    <div>
      <h1>Child counter:</h1>
      <button onClick={increment}>child给父组件 +1</button>
    </div>
  );
});

function CallbackSolve1() {
  const [counter, setCounter] = useState(0);
  const [msg, setMsg] = useState('hello');

  // 🔥 对比1
  const increment = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  // 🔥 对比2
  // const increment = () => {
  //   setCounter(counter + 1);
  // };

  return (
    <div>
      <h1>父组件：CallbackSolve</h1>
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
      <div>{msg}</div>
      <button onClick={(e) => setMsg('react')}>
        修改msg → 修改我子组件不会重新渲染
      </button>
      <h1>子组件：Child</h1>
      <Child increment={increment} />
    </div>
  );
}

export default CallbackSolve1;
