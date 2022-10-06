import { memo, useEffect } from 'react';

/**
 * 下面这个案例是实时获取Home和About组件的滚动高度
 * 获取滚动高度肯定是要写在 useEffect 里的
 * 因为写在渲染里每次渲染发生之后都要监听多次
 * 肯定是不行的 所以就要用 useEffect
 */
const Home = memo(() => {
  useEffect(() => {
    // 监听逻辑
    const handleScroll = () => {
      console.log(window.scrollX, window.scrollY);
    };

    // 监听开始
    document.addEventListener('scroll', handleScroll);
    // 组件卸载的时候监听结束
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <div>Home</div>;
});

const About = memo(() => {
  useEffect(() => {
    // 监听逻辑
    const handleScroll = () => {
      console.log(window.scrollX, window.scrollY);
    };

    // 监听开始
    document.addEventListener('scroll', handleScroll);
    // 组件卸载的时候监听结束
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <div>About</div>;
});

const CustomHookBefore = memo(() => {
  return (
    // 把高设置成很大 可以滚动
    <div style={{ height: '2000px' }}>
      <Home />
      <About />
    </div>
  );
});

export default CustomHookBefore;
