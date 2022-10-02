import React, { useCallback, useState } from 'react';

function CallbackProb1() {
  const [counter, setCounter] = useState(0);

  // 只是这样写，那么里面的回调函数依然会被重新定义 没意义
  const increment = useCallback(() => {
    console.log('increment'); // 这里依然会被多次调用
    setCounter(counter + 1);
  });

  return (
    <div>
      CallbackProb
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default CallbackProb1;
