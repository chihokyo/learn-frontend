# css in js

由于 react 已经用 js 的方式来写 html 了，所以 ALL in JS 的思想根深蒂固的就在 react 生根发芽了

现在开始写的就是如何实现 css 大问题。

其实吧，你可以把这个当成就是一个组件，一个什么组件呢？样式组件。

```jsx
// Headlline后面接了一个函数，其实就是一个组件啊
const Headline = styled.h1`
  color: red;
`;

const Content = ({ title, children }) => {
  return (
    <section>
      <Headline>{title}</Headline>

      <span>{children}</span>
    </section>
  );
};
```

## 实现原理

模板字符串来进行函数调用的问题。

```js
// 定义一个函数
function demo(...args) {
  console.log(args);
}

// 两种调用方式
demo('a'); // [ 'a' ]
demo`a`; // [ [ 'a' ] ]

// sc的原理就是这里
const gender = 'girl';
const age = 66;
demo`i am ${gender} age is ${age}`; // [ [ 'i am ', ' age is ', '' ], 'girl', 66 ]

// 你甚至可以放进去一个函数
function funDemo(...args) {
  // 1-b 调用这个函数
  args[1]();
}

const fnParam = () => {
  console.log('hello fn');
};
// 1-a 函数放进去了
funDemo`function is ${fnParam} desu`;
```

下面来看看怎么切割的，标签模板字符串就是这么切割的。

只要有规律就可以用正则来解析，匹配一下。

![image-20221021185147250](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221021185147250.png)

比如像下面这种状况，那么 demo\`\`这里内部调用的时候，就会看一下。你这个`$(props => props.color)`传来的是一个函数，那么内部就会调用这个函数，把返回值给 color，如果返回是 yellow。

那么最后就是`color:yellow`

```css
demo`
  font-size:20px;
  color: $(props => props.color) /*传入的是一个函数 系统会自动调用这个函数 并且返回返回值*/
`
```

## 小试牛刀

### 最基础的用法

```jsx
// 最最最基础的使用方法 直接创建一个简单的按钮
const Button = styled.button`
  color: purple;
  padding: 0.25rem 1rem;
  border: solid 2px purple;
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 1rem;
`;

// 本质就是函数，接受了字符串作为参数
const Button2 = styled('button')([
  'color: coral;' +
    'padding: 0.25rem 1rem;' +
    'border: solid 2px coral;' +
    'border-radius: 3px;' +
    'margin: 0.5rem;' +
    'font-size: 1rem;',
]);
const Scomponent2 = memo(() => {
  return (
    <>
      <Button>Button is me</Button> <Button2>Button2 is me</Button2>
    </>
  );
});

export default Scomponent2;
```

### 样式复用

```jsx
import React, { memo } from 'react';
import styled from 'styled-components';

// 复用样式逻辑1
const Button = styled.button`
  padding: 0.25rem 1rem;
  border: solid 2px purple;
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 1rem;
`;

const PrimaryButton = styled(Button)`
  /* 注意这里的green 不用写成字符串 */
  color: green;
`;

const ErrorButton = styled(Button)`
  color: red;
`;

const Scomponent3 = memo(() => {
  return (
    <>
      <Button>Button is me</Button>
      <PrimaryButton>Button is me</PrimaryButton>
      <ErrorButton>Button is me</ErrorButton>
      {/* 重复利用样式 */}
    </>
  );
});

export default Scomponent3;
```

还有一种方法也可以实现复用，上面是用 styled 作为一个函数包裹住的，这个是用的 css 函数

这个 css 函数，你可以想象成，插入进去一段 css 而已。把`css()`这个函数里的东西就当成一个变量，直接插入进去的感觉。

```jsx
import React, { memo } from 'react';
import styled, { css } from 'styled-components';

// 复用样式逻辑2
const Button = styled.button`
  padding: 0.25rem 1rem;
  border: solid 2px purple;
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s;
  :hover {
    transform: translateY(5rem);
  }
  ${(props) =>
    props.primary &&
    css`
      border: solid 2px green;
    `}

  ${(props) =>
    props.error &&
    css`
      border: solid 2px red;
    `}
`;

const Scomponent4 = memo(() => {
  return (
    <>
      <Button>Button is me</Button>
      <Button primary>Button is me</Button>
      <Button error>Button is me</Button>
    </>
  );
});

export default Scomponent4;
```

### 嵌套使用

```jsx
import React, { memo } from 'react';
import styled from 'styled-components';

// 可以跟sass一样进行嵌套使用
const Wrapper = styled.div`
  /* 这俩的区别 一目了然 */

  /* 表示div所有子元素里包含class为active的元素 */
  .active {
    background-color: green;
  }

  /* 表示既是当前div class又是active的元素 */
  &.active {
    background-color: red;
  }

  a {
    border: solid 2px gold;
  }
`;

const Scomponent5 = memo(() => {
  return (
    <>
      <Wrapper className="active">
        我是wrapper
        <span className="active">我是span</span>
        <button className="active">我是button</button>
        <a href="/#" alt="">
          aaa
        </a>
      </Wrapper>
    </>
  );
});

export default Scomponent5;
```

### attrs 的使用

```jsx
import React, { memo } from 'react';
import styled from 'styled-components';

// attr自己是一个函数 返回值也是一个函数 所以可以``调用
const Wrapper = styled.div.attrs({
  fSize: '20px',
  firstColor: 'red',
})`
  /* 不仅仅可以props穿透，甚至可以用自定义的参数 */
  font-size: ${(props) => props.fSize};
  color: ${(props) => props.firstColor};
`;

const Scomponent5 = memo(() => {
  return (
    <>
      <Wrapper>我是Wrapper</Wrapper>
    </>
  );
});

export default Scomponent5;
```

### props 穿透

```jsx
// 这里就是一个穿透，你在下面写的属性
// 上面可以用到
${(props) =>
    props.primary &&
    css`
      border: solid 2px green;
    `}

  ${(props) =>
    props.error &&
    css`
      border: solid 2px red;
    `}

<>
<Button>Button is me</Button>
<Button primary>Button is me</Button>
<Button error>Button is me</Button>
</>
```

有时候为了方面，还会直接解构赋值

```jsx
const Headline = styled.h1`
  color: ${(p) => p.color};
`;

const Text = styled.span`
  padding: ${({ padding }) => padding}px;
`;
```

这里甚至使用了多态，来判定 html

```jsx
const ClickMe = ({ to = '', onClick = () => {} }) => {
  return (
    <ButtonOrLink as={to ? 'a' : 'button'} to={to} onClick={onClick}>
      Click Me
    </ButtonOrLink>
  );
};
```

### props 来设置属性

```jsx
import React, { memo, useState } from 'react';
import styled from 'styled-components';

/**
 * 传入state来设置props
 */
// 这里还可以用state
const Wrapper = styled.div`
  /* 1-c 接收 */
  color: ${(props) => props.cssObj.fColor};
  font-size: ${(props) => props.cssObj.fSize}; ;
`;

const Scomponent7 = memo(() => {
  // 1-a 通过这里设置初始值
  const [cssObj] = useState({
    fColor: 'red',
    fSize: '80px',
  });
  return (
    <>
      {/* 1-b 传递出去 */}
      <Wrapper cssObj={cssObj}>我是Wrapper</Wrapper>
    </>
  );
});

export default Scomponent7;
```

### 全局主题

使用的是

下面直接抄的官方文档案例

```jsx
// 这里设置的颜色其实就是main里设置的颜色
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* 1-d 通过props里用就行 */
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.main};
`;

// 1-c 传递默认值
Button.defaultProps = {
  theme: {
    main: 'palevioletred',
  },
};

// 1-a 传递数据，你想要什么样的
const theme = {
  main: 'mediumseagreen',
};

render(
  <div>
    <Button>Normal</Button>
    {/*1-b 直接传递过去*/}
    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
    </ThemeProvider>
  </div>
);
```

## 官方文档

[styled-components](https://styled-components.com/docs/advanced#theming)

推荐阅读文章[Styled Components Best Practices](https://www.robinwieruch.de/styled-components/)
