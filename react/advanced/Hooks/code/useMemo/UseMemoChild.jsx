import React, { memo, useMemo, useState } from 'react';

function calNumTotal(num) {
  console.log('calNumTotal function');
  let total = 0;
  for (let i = 1; i < 50; i++) {
    total += i;
  }
  return total;
}

const Child = memo(() => {
  console.log('Child 渲染啦');
  return (
    <div>
      <h1>我是子组件</h1>
    </div>
  );
});

const UseMemoAfter = memo(() => {
  const [counter, setCounter] = useState(10);

  const memorizeFn = useMemo(() => {
    return calNumTotal(50);
  }, []);

  // 对比1-a 没有被记忆的 在父组件每次+1的时候 子组件会被多次渲染
  // const obj = {
  //   id: 'uuid',
  //   age: 99,
  // };

  // 对比1-b 这里是被记忆了的
  const memorizeObj = useMemo(
    () => ({
      id: 'uuid',
      age: 99,
    }),
    []
  );

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
      <hr />
      <div>渲染子组件了</div>
      <Child memorizeObj={memorizeObj} />
    </div>
  );
});

export default UseMemoAfter;
