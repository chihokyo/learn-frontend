import React, { memo, useCallback, useRef, useState } from 'react';

// 这里开始定义一个子组件，而且必须用memo包裹起来
const Child = memo((props) => {
  console.log('Child被渲染了');
  const { increment } = props;
  return (
    <div>
      <h1>Child counter:</h1>
      <button onClick={increment}>child给父组件 +1</button>
    </div>
  );
});

function CallbackSolve3() {
  const [counter, setCounter] = useState(0);
  const [msg, setMsg] = useState('hello');

  // 修改成[] 里面的回调函数确实是不会修改了 但是函数整体也没办法啊用力
  // 这里就需要useRef来解决了
  const countRef = useRef(); // 这个对象有个属性
  countRef.current = counter; // count这个对象保存到了 countRef.current
  // 也就是说对象咱不会变化，但是current里的值 一直都是最新的counter
  const increment = useCallback(() => {
    setCounter(countRef.current + 1); // 最新的值
  }, []);

  return (
    <div>
      <h1>父组件：CallbackSolve</h1>
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
      <div>{msg}</div>
      <button onClick={(e) => setMsg('react')}>
        修改msg → 修改我子组件不会重新渲染
      </button>
      <h1>子组件：Child</h1>
      <Child increment={increment} />
    </div>
  );
}

export default CallbackSolve3;
