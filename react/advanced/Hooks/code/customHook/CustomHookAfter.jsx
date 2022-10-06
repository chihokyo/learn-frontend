import { memo, useEffect } from 'react';

/**
 * 下面这个案例是实时获取Home和About组件的滚动高度
 *
 * 用自定义hook来封装一下重复的逻辑
 */

const useScrollLog = (name) => {
  useEffect(() => {
    // 监听逻辑
    const handleScroll = () => {
      console.log(`${name} at ${window.scrollX}, ${window.scrollY}`);
    };

    // 监听开始
    document.addEventListener('scroll', handleScroll);
    // 组件卸载的时候监听结束
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

const Home = memo(() => {
  useScrollLog('Home');
  return <div>Home</div>;
});

const About = memo(() => {
  useScrollLog('About');
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
