import { useEffect, useState } from 'react';

const AdvanceEffect4 = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController(); //1-a
    const signal = controller.signal;
    //1-b 增加个option{}
    fetch('https://jsonplaceholder.typicode.com/posts', { signal })
      .then((res) => res.json())
      .then((data) => {
        alert('post are ready');
        setPosts(data);
        console.log(data);
      });
    return () => {
      // 1-c 抛弃
      controller.abort();
    };
  }, []);

  return (
    <div>
      {posts?.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
};

export default AdvanceEffect4;
