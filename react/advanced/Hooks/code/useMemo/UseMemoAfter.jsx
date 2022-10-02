import React, { memo, useMemo, useState } from 'react';

function calNumTotal(num) {
  console.log('calNumTotal function');
  let total = 0;
  for (let i = 1; i < 50; i++) {
    total += i;
  }
  return total;
}

const UseMemoAfter = memo(() => {
  const [counter, setCounter] = useState(10);

  // 你会发现无论点击了多少次，calNumTotal只会执行1次
  const memorizeFn = useMemo(() => {
    return calNumTotal(50);
  }, []); // 这里是要写依赖的，目前这个函数没有依赖，所以啥都没写

  return (
    <div>
      <div>这里的结果是固定的</div>
      <h1>结果：{memorizeFn}</h1>
      <div>counter的结果是不断变化的</div>
      <h1>{counter}</h1>
      <button
        onClick={(e) => {
          setCounter(counter + 1);
        }}
      >
        +1
      </button>
    </div>
  );
});

export default UseMemoAfter;
