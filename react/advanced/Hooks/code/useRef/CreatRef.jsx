import React, { useRef } from 'react';

// 这里演示一下普通的ref用法
function CreatRef() {
  const demoRef = useRef(); // 1️⃣ReactAPI可以获取
  //   const demoRef = React.createRef(); // 2️⃣hooks获取

  const getDomByRef = () => {
    console.log(demoRef.current);
    const demo = document.getElementById('demo');
    console.log(demo === demoRef.current); // 可以推导出来是同一个
  };

  return (
    <div>
      <h2 id="demo" ref={demoRef}>
        我是h2元素
      </h2>
      <button onClick={getDomByRef}>点击我获取ref</button>
    </div>
  );
}

export default CreatRef;
