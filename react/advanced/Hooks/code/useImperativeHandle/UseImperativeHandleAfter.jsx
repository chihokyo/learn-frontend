import React, { forwardRef, useImperativeHandle, useRef } from 'react';

// 这里就是具体的使用，就是我子组件暴露了什么方法你才能用
const Child = forwardRef((props, ref) => {
  // 1-a 想创建子组件内部的ref
  const inputChildRef = useRef();

  // 参数1 就是ref
  // 参数2 是一个回调函数 这个回调函数里暴露你想要暴露的方法
  // 1-c 使用useImperativeHandle
  useImperativeHandle(ref, () => {
    return {
      // 1-d 暴露你想暴露的具体操作方法
      focus: () => {
        inputChildRef.current.focus();
      },
    };
  });
  return (
    <div>
      <h1>子组件：Child</h1>
      {/* 1-b 这里传入 */}
      <input ref={inputChildRef} type="text" name="" id="" />
    </div>
  );
});

const UseImperativeHandleAfter = () => {
  const inputRef = useRef();
  return (
    <div>
      <h1>我是父组件</h1>
      <button onClick={(e) => inputRef.current.focus()}>点击聚焦子组件</button>
      <button onClick={(e) => (inputRef.current.value = '')}>
        点击清除（不能用的，因为没暴露
      </button>
      <Child ref={inputRef} />
    </div>
  );
};

export default UseImperativeHandleAfter;
