import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * 现在要实现一个计数器，每1秒就向前走一下
 * 这里你会发现一个问题就是会无限
 * @returns
 */
const AdvanceEffect3 = () => {
  const [number, setNumber] = useState(0);

  // ① 错误写法1 依赖的number 但是number每一秒都在被更改
  // 造成内存泄漏
  // useEffect(() => {
  //   console.log('useEffect 被调用了');
  //   setInterval(() => {
  //     setNumber(number + 1);
  //   }, 1000);
  // }, [number]);

  // ② 错误写法2 没有依赖 看似没问题
  // 但是只要一旦页面其他地方发生渲染 这个定时器就会混乱起来
  // useEffect(() => {
  //   console.log('useEffect 被调用了');
  //   setInterval(() => {
  //     setNumber((number) => number + 1);
  //   }, 1000);
  // }, []);

  // ③ 这一次终于对了
  useEffect(() => {
    console.log('useEffect 被调用了');
    const id = setInterval(() => {
      setNumber((number) => number + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  // 这里为什么拿不到最新的count 因为每一次render都是最新的值
  // 那么怎么才可以呢，使用useRef
  // const numRef = useRef(number);
  // useEffect(() => {
  //   numRef.current = number;
  // });

  // console.log(`render number:${number}`);
  // useEffect(() => {
  //   let id = setInterval(() => {
  //     // console.log(`useEffect number:${numRef.current}`);
  //     // console.log(`useEffect number:${number}`);
  //     // setNumber((pre) => pre + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);

  return (
    <div style={{ fontSize: '30px' }}>
      <span>number is {number}</span>
    </div>
  );
};

export default AdvanceEffect3;
