import React, { useState } from 'react';

export default function Hooks() {
  console.log('组件被渲染了');
  const [count, setCount] = useState(0);
  // 这样直接写肯定是会被无限循环渲染的的
  // 为什么呢？按理说都是0，为什么会被无限重新渲染？
  // setCount(0);

  // 渲染阶段 不会检查state值是否相同
  // 非渲染阶段

  /**
   * 1 渲染阶段，不会检查state值是否相同。就一直重新渲染。
   * 2 非渲染阶段(已渲染) 检查值是否相同
   *  2-1 不同在继续重新渲染。
   *  2-2 相同不会渲染
   *    (如果相同，React会继续执行当前渲染
   *    但不会触发其他子组件渲染，也不会产生实际效果)
   */

  const clickHandler = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h2>Hooks</h2>
      <p>{count}</p>
      <button onClick={clickHandler}>+1</button>
    </div>
  );
}
