import React, { useState } from 'react';

// useState最基础用法
function App() {
  const arr = useState(0);
  const [counter, setCounter] = useState(10);
  console.log('App组件渲染了');
  return (
    <div>
      <h1>简单计数器</h1>
      <h3>超级原始：数组原理</h3>
      {/* 因为本质是一个数组，所以这里可以用解构赋值 */}
      <h4>{arr[0]}</h4>
      <button onClick={(e) => arr[1](arr[0] + 1)}>+1</button>
      <button onClick={(e) => arr[1](arr[0] - 1)}>-1</button>
      <h3>正常写法</h3>
      <h4>{counter}</h4>
      <button onClick={(e) => setCounter(counter + 1)}>+1</button>
      <button onClick={(e) => setCounter(counter - 1)}>-1</button>
    </div>
  );
}

export default App;
