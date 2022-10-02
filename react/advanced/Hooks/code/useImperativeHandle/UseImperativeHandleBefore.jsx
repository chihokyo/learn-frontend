import React, { forwardRef, useRef } from 'react';

// 这里目前不涉及useImperativeHandle 是设计forwordref

// 必须要有forwardRef 才能包裹到ref这个参数
const Child = forwardRef((props, ref) => {
  // 1-c 这里就是拿到了父组件传过来的ref
  return (
    <div>
      <h1>子组件：Child</h1>
      {/* 1-d 拿到ref之后放在子组件的身上 */}
      <input ref={ref} type="text" name="" id="" />
    </div>
  );
});

const UseImperativeHandleBefore = () => {
  // 1-a 定义ref
  const inputRef = useRef();
  return (
    <div>
      <h1>我是父组件</h1>
      {/* 1-e 成功拿到聚焦！ */}
      <button onClick={(e) => inputRef.current.focus()}>点击聚焦子组件</button>
      {/* 1-b 给子组件传递一下ref */}
      <Child ref={inputRef} />
    </div>
  );
};

export default UseImperativeHandleBefore;
