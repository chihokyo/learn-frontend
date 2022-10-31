# Lazy & Suspense

## 原理

- webpack 的代码分隔 code spliting
- import 动态导入模块 （用到才导入，在 React 就是渲染才用到。封装的只是导入行为，而且会发出新的请求。
- 因为使用 lazy 之后会出现一个空挡，不知道是什么的时候就用`Suspense`这个包裹。

## 使用

```Jsx
import React, { memo, lazy } from 'react';
import { Suspense } from 'react';

// 1-a 需要引入
const About = lazy(() => import('About.jsx'));
const App = memo(() => {
  return (
    <div>
      {/*1-b 需要有一个占位符 不然不显示的时候不知道是什么*/}
      <Suspense fallback={<div>loading</div>}>
        <About />
      </Suspense>
    </div>
  );
});

export default App;

```

> 补充一个小知识，Suspense 原本的意思是悬而未决。

[这篇文章写的蛮不错，还实现了一个小 demo](https://web.dev/code-splitting-suspense/)

我把上面的 demo，用 hooks 改了一下。

主要组件 _Demo.jsx_

```jsx
import React, { memo, lazy, Suspense } from 'react';
import { useState } from 'react';

import './Demo.css';
// 1-a 这里引入你想要缓存的
const AvatarComponent = lazy(() => import('./AvatarComponent'));

const Demo = memo(() => {
  const [detail, setDetail] = useState(false);

  const showDetails = () => {
    setDetail(!detail);
  };
  // 1-c 自定义了一个显示loading的小组件
  const renderLoader = () => <div className="loader"></div>;
  return (
    <div className="App">
      {!detail && <button onClick={() => showDetails()}>CLICK ME</button>}
      {detail && (
        // 1-b 这里进行组件显示
        <Suspense fallback={renderLoader()}>
          <AvatarComponent />
        </Suspense>
      )}
    </div>
  );
});

export default Demo;
```

样式 _Demo.css_

```css
button {
  font-size: 18px;
  font-weight: bold;
  border-radius: 3px;
  border: 2px pink solid;
  cursor: pointer;
  color: #fff;
  padding: 25px 37px;
  margin-bottom: 50px;
  min-width: 80px;
  background: transparent;
  text-transform: uppercase;
}

img {
  border-radius: 50%;
  height: 100px;
  width: 100px;
  border: 2px solid white;
}

.App {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.loader {
  display: inline-block;
  width: 40px;
  height: 40px;
}

.loader:after {
  content: ' ';
  display: block;
  width: 30px;
  height: 30px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: loader 1.2s linear infinite;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

你需要缓存的组件*AvatarComponent.jsx*

```jsx
const AvatarComponent = () => {
  return (
    <img
      alt="Puppy"
      src="https://cdn.glitch.com/a84f63e5-62cd-456b-89f4-c2adddc4e575%2Fpupper.jpeg?1552581003517"
    />
  );
};

export default AvatarComponent;
```
