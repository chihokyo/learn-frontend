import { useEffect, useMemo, useState } from 'react';

const AdvanceEffect2 = () => {
  const [name, setName] = useState(0);
  // 此时我们的格式如果不是name那种，而是包裹在一个对象里呢?
  const [state, setState] = useState({
    name: '',
    selected: false,
  });

  // 解决方案2 1-a 使用useMemo记录函数返回值
  const user = useMemo(
    () => ({
      name: state.name,
      selected: state.selected,
    }),
    [state.name, state.selected]
  );

  // ❓ 你会发现即使你没修改state，也依然会被重新渲染
  useEffect(() => {
    console.log('useEffect 被调用了 state被修改了');
    // 解决方案2 1-b 把依赖改成user
  }, [user]); // 解决方案1 把依赖改成 state→state.name state→state.selected

  // 点击修改输入框名字
  const handleAddName = () => {
    setState((prev) => ({ ...prev, name }));
  };

  // 点击修改selected
  const handleSelect = () => {
    setState((prev) => ({ ...prev, selected: true }));
  };

  return (
    <div>
      {`name is ${state.name}, selected is ${state.selected.toString()}`}
      <br />
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      <button onClick={handleAddName}>点击修改名字</button>
      <br />
      <button onClick={handleSelect}>点击修改select为true</button>
    </div>
  );
};

export default AdvanceEffect2;
