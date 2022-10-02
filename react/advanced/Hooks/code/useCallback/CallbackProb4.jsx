import React, { useCallback, useState } from 'react';

function CallbackProb1() {
  const [counter, setCounter] = useState(0);

  // 这一次你加了[counter] 终于是对了
  // 闭包陷阱就是这么来的
  const increment = useCallback(() => {
    console.log('increment'); // 这里依然会被多次调用
    setCounter(counter + 1);
  }, [counter]);

  return (
    <div>
      CallbackProb
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default CallbackProb1;
