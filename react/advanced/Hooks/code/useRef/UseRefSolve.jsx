import React, { memo, useCallback, useRef, useState } from 'react';

// 1-d 因为这里不会引起increment的变化 这里也不会变的
const Child = memo(() => {
  console.log('Child 渲染了');
  return <div>子组件:Child</div>;
});

function UseRefSolve() {
  const [counter, setCounter] = useState(0);
  // 这里是有闭包陷阱的 before
  const cb = useRef(); // 1-a 先设置一个对象（永不变）
  cb.current = counter; // 1-b 把counter最新的值给counter
  const increment = useCallback(() => {
    setCounter(cb.current + 1); // 1-c 这里既可以达到更新，又不会引起increment的变化
  }, []);

  return (
    <div>
      <div>父组件</div>
      <h2>counter:{counter}</h2>
      <button onClick={increment}>+1</button>
      <div>子组件</div>
      <Child increment={increment} />
    </div>
  );
}

export default UseRefSolve;
