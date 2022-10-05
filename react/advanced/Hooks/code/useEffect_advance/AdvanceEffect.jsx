import { useEffect, useState } from 'react';

const AdvanceEffect = () => {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('');
  console.count('component render渲染了');

  // 每一次渲染都会被后执行
  // 且会发现title的number会稍微晚于页面的nubmer 这是因为useEffect总是在页面渲染之后被调用
  //总结说就是 component:render → component:useEffect→ react dom → brower dom
  //   useEffect(() => {
  //     console.count('useEffect 被调用了');
  //     document.title = `${number} times`;
  //   });

  // 因为上面的代码会导致没有修改number也会被修改
  // 于是我增加了依赖
  useEffect(() => {
    console.count('useEffect 被调用了');
    document.title = `${number} times`;
  }, [number]);

  return (
    <div>
      <span>number is {number}</span>
      <button onClick={() => setNumber(number + 1)}> +1</button>
      <button onClick={() => setNumber((pre) => pre + 2)}> +2</button>
      <hr />
      <div>name is {name}</div>
      <label htmlFor="">输入姓名</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default AdvanceEffect;
