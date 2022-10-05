import { useRef, useState } from 'react';

// 接下来用定时器写一个测试
const AdvanceEffectC = () => {
  const [number, setNumber] = useState(0);
  const intervalRef = useRef(null); // 1-a 设置一个ref

  const start = () => {
    console.log('start 调用了');
    //  1-b 防止start被重复点
    if (intervalRef.current != null) {
      return;
    }
    // 1-c 每次的结果都给current 因为intervalRef对象不变的(useRef特性)
    // 所以每次记录的都是最新的
    intervalRef.current = setInterval(() => {
      console.log('setInterval 计时开始');
      setNumber((pre) => pre + 1);
    }, 1000);
  };

  const stop = () => {
    console.log('stop 调用了');
    // 1-d 防止多次stop
    if (intervalRef.current == null) {
      return;
    }
    // 1-e 这样清除的肯定就是最新的id
    clearInterval(intervalRef.current);
    intervalRef.current = null; // 1-f 最后记得给清空
  };

  return (
    <div>
      <h2 style={{ fontSize: '30px' }}>number is {number}</h2>

      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
    </div>
  );
};

export default AdvanceEffectC;
