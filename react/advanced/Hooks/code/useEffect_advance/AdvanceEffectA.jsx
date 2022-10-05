import { useEffect, useState } from 'react';

// 接下来用定时器写一个测试
// 版本1 一个及其普通的定时器
const AdvanceEffectA = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setNumber((pre) => pre + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '30px' }}>number is {number}</h2>
    </div>
  );
};

export default AdvanceEffectA;
