import { useState } from 'react';

function CallbackProb1() {
  const [counter, setCounter] = useState(0);

  // 但是这样是没有意义的，因为counter这里发生变化之后
  // setCounter会被重新运行 那么整个函数组件都会被重新渲染CallbackProb
  // 所以本质还是一样的 increment 也会被重新再次定义

  const increment = () => {
    console.log('increment');
    setCounter(counter + 1);
  };

  return (
    <div>
      CallbackProb
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default CallbackProb1;
