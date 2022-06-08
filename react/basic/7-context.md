# conext

说这个的话就要先知道 React 组件间通讯传递数据的方式

- 父子传递 props + 回调函数
- 父孙组件 → context 👈🏻
- 任意组件

这一次就是 context 的方式

## 1 基本流程

- 创作一个 context（装数据） → `React.createContext()`
- 一个提供数据 Provider
- 一个接受数据 Consumer

## 2 类组件

- 制作一个 context

```javascript
// /store/textContext.js
import { createContext } from 'react';

const TestContext = createContext({
  defaultValue: 'defaultValue',
});

export default TestContext;
```

- Provider & Consumer

```jsx
import { Component } from 'react';
import TestContext from './store/textContext';

class AAA extends Component {
  // 也可以写在类外面
  // AAA.contextType = TestContext；
  static contextType = TestContext;
  render() {
    // console.log(this);
    return (
      <>
        <h4>AAA</h4>
        {/* {this.context.App} */}

        <TestContext.Consumer>
          {(value) => {
            return <p>{value.App}</p>;
          }}
        </TestContext.Consumer>
      </>
    );
  }
}

class AA extends Component {
  render() {
    return (
      <>
        <h3>AA</h3>
        <AAA />
      </>
    );
  }
}

class A extends Component {
  render() {
    return (
      <>
        <h2>A</h2>
        <AA />
      </>
    );
  }
}

export default class ContextClas extends Component {
  state = {
    App: '这里是类组件的App数据',
  };

  render() {
    return (
      <div>
        <TestContext.Provider value={this.state}>
          <A />
        </TestContext.Provider>
      </div>
    );
  }
}
```

![image-20220609003019868](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220609003019868.png)

## 3 函数组件

和类组件几乎一样

```jsx
// 我想AAA拿到APP的数据
// 那么如何拿呢？ 使用context
import { useState } from 'react';
import TestContext from './store/textContext';

const AAA = () => {
  return (
    <div>
      <h4>AAA</h4>
      <TestContext.Consumer>
        {(value) => {
          return <p>{value.App}</p>;
        }}
      </TestContext.Consumer>
    </div>
  );
};

const AA = () => {
  return (
    <div>
      <h3>AA</h3>
      <AAA />
    </div>
  );
};

const A = () => {
  return (
    <div>
      <h2>A</h2>
      <AA />
    </div>
  );
};

export default function ContextFunc() {
  const [state] = useState({
    App: '我是App的数据',
  });

  return (
    <>
      <TestContext.Provider value={state}>
        <h1>App</h1>
        <A />
      </TestContext.Provider>
    </>
  );
}
```

## 4 useContext

其实和函数式组件全部都是一样的！只是少了 consumer

如果说用这个省略了什么的话

- 不用 consumer
- 不用老太太裹脚布 又臭又长的 return jsx

```jsx
// 我想AAA拿到APP的数据
// 那么如何拿呢？ 使用context
import { useContext, useState } from 'react';
import TestContext from './store/textContext';

const AAA = () => {
  const appData = useContext(TestContext);
  return (
    <div>
      <h4>AAA</h4>
      <p>{appData.App}</p>
    </div>
  );
};

.... 以下全部一样....

```

前后对比的感觉，代码是独立的。只是作为对比。

```jsx
// 使用之前
<UserContext.Consumer>
  {(user) => {
    return (
      <HobbyContext.Consumer>
        {(hobby) => (
          <p>
            {user.name}({user.age}歳): 趣味：{hobby}
          </p>
        )}
      </HobbyContext.Consumer>
    );
  }}
</UserContext.Consumer>;

// 使用之后
const user = useContext(UserContext);
const hobby = useContext(HobbyContext);
return (
  <p>
    {user.name}
    {user.age}歳: 趣味は{hobby}です。
  </p>
);
```

## 开发应用

暂时不会，遇到再写。
