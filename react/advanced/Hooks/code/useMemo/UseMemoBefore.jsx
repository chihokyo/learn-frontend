import React, { memo, useState } from 'react';

function calNumTotal(num) {
  console.log('calNumTotal function');
  let total = 0;
  for (let i = 1; i < 50; i++) {
    total += i;
  }
  return total;
}

const UseMemoBefore = memo(() => {
  const [counter, setCounter] = useState(10);

  return (
    <div>
      <div>这里的结果是固定的</div>
      <h1>结果：{calNumTotal(50)}</h1>
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

export default UseMemoBefore;
