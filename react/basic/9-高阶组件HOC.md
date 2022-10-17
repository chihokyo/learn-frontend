# 高阶组件 HOC

## 1 定义

其实就是高阶函数了啦。

- 高阶函数 in 函数 out 函数
- 高阶组件 in 组件 out 组件 （组件本身的本质其实也是一个函数）

```jsx
import React, { Component, PureComponent } from 'react';

export class Hoc extends Component {
  render() {
    return <div>Hoc</div>;
  }
}

// 实名制
function enhanceComponent(WrappedComponet) {
  return class NewComponent extends PureComponent {
    render() {
      return <WrappedComponet />;
    }
  };
}

// 匿名class制
function enhanceComponent2(WrappedComponet) {
  return class extends PureComponent {
    render() {
      return <WrappedComponet />;
    }
  };
}

const Enhanced = enhanceComponent(Hoc);
const Enhanced2 = enhanceComponent2(Hoc);

export default Enhanced3;
```

## 2 改名

觉得包裹着的名字你想自己取名咋办？

`NewComponent.displayName = 'MyName';`

但其实这个名字也只是 dev 开发阶段为了便于开发才能看到，生产环境看不到的，没多大意义。

```jsx
/**
 * 但其实无论是实名制，还是匿名
 * 其实都可以通过 组件名.dispal
 */

function NamedComponent(WrappedComponet) {
  class NewComponent extends PureComponent {
    render() {
      return <WrappedComponet />;
    }
  }
  NewComponent.displayName = 'MyName';
  return NewComponent;
}
```

![image-20220614185855092](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220614185855092.png)

## 3 拆分一下（函数组件）

AA 是一个 A 加强型的组件

![image-20220614193244143](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220614193244143.png)

## 4 应用问题
