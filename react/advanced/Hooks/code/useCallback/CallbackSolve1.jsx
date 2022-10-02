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

  const increment = useCallback(() => {
    console.log('increment'); // 这里依然会被多次调用
    setCounter(counter + 1);
  }, [counter]);

  return (
    <div>
      CallbackSolve
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
      <h1>接下来是Child</h1>
      <Child increment={increment} />
    </div>
  );
}

export default CallbackSolve1;
