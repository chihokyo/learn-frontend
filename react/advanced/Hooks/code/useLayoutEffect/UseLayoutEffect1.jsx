import React, { useEffect, useLayoutEffect } from 'react';

// 这里测试下执行时机
// render
// useLayoutEffect
// useEffect

function UseLayoutEffect1() {
  useEffect(() => {
    console.log('useEffect');
  });
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  });
  console.log('render');
  return <div>UseLayoutEffect1</div>;
}

export default UseLayoutEffect1;
