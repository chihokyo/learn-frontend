import { useState } from 'react';

// 接下来用定时器写一个测试
// 下面这段代码为什么不可以的问题
// 只能start，无法stop 根本停不下来
const AdvanceEffectB = () => {
  const [number, setNumber] = useState(0);
  let id = null;
  const start = () => {
    console.log('start 调用了');
    id = setInterval(() => {
      console.log('setInterval 计时开始');
      setNumber((pre) => pre + 1);
    }, 1000);
  };

  const stop = () => {
    console.log('stop 调用了');
    clearInterval(id);
  };

  return (
    <div>
      <h2 style={{ fontSize: '30px' }}>number is {number}</h2>

      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
    </div>
  );
};

export default AdvanceEffectB;
