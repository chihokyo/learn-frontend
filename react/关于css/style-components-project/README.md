# styled-component 练手项目

每次只学习了理论，不实践总是记不住的。这里根据最新的这个油管视频做了一个很小的练手。[Styled Components Crash Course & Project](https://www.youtube.com/watch?v=02zO0hZmwnw)

使用的 sc 的特性如下

- ThemeProvider → 主题（通用的变量等等）
- createGlobalStyle → 全局样式（reset 也可以写在这里）
- 解构赋值的理解 → 原来 sc 里面也可以用 sc
- 组织架构 → 以前 class 为中心，现在 components 为中心。
- 响应式 → 这个也利用了 ThemeProvider 的变量，把需要响应的 breakpoint 给搞成了变量值。

## 1. ThemeProvider 主题

这里主要写变量，包裹在最外层，这样以下全部的组件都可以用。

```jsx
import React, { memo } from 'react';
// 1-a 引入
import { ThemeProvider } from 'styled-components';
// 1-b 这里就可以定义所有的主题颜色
const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#000333',
  },

  mobile: '769px',
};

const App = memo(() => {
  return (
    // 1-c 直接传入 这里是主题样式 【主要写一些变量和共通的东西】
    <ThemeProvider theme={theme}>
      <></>
    </ThemeProvider>
  );
});

export default App;
```

上面是传入的方法，那怎么用呢？

很简单的，直接在需要的地方。

```jsx
body {	// 在这里使用
        background: ${({ theme }) => theme.colors.body};
        color:hsl(192,100%,9%);
        font-family: 'Poppins', sans-serif;
        font-size:1.15em;
}
```

## 2. createGlobalStyle 全局样式

这里主要写的一下 reset.css 那种，全局都可以用的。

```jsx
// 引入 先新建一个Global.js
import { createGlobalStyle } from 'styled-components';

// 把你想全局设置的就放在这里
const GlobalStyles = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ....此处省略全局样式

    p {
       opacity: 0.6;
       line-height: 1.5;
    }

    img {
        max-width: 100%;
    }
`;

export default GlobalStyles;
```

> 这样的话就可以了，这里注意是 `createGlobalStyle` + `ThemeProvider`组合起来用。可以把`ThemeProvider`放在最外面包裹。这样全局也可以用样式。

## 3. props 解构赋值的理解

首先这里传递的都是 props，这个就是 props 的穿透。这个是基础中的基础。是前提。

没想到在这里又对解构赋值多了一层理解。

关于传值的时候一些技巧
目前两种实现

```jsx
// 传过去
<Card key={item.id} {...item} />
// 接收 直接给解构了
const Card = memo(({ id, title, body, image }) => {}

// 第二种是那种传递过去的是item的对象
// 但是用了双重解构
<Card key={item.id} item={item} />
// 双重结构
const Card = memo(({ item: { id, title, body, image } })

// 相当于是
const {item} = props;
const { id, title, body, image } = item;
```

下面是一个图示。差不多就是对比了一下传递数据类型的不同。

![image-20221027135648126](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221027135648126.png)

## 4. 组织架构(用组件替代 classname)

以前不是写 css 的时候经常这样么

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .container {
        display: flex;
        max-width: 1400px;
      }
    </style>
  </head>
  <body>
    <div class="container"></div>
  </body>
</html>
```

现在的话使用组件这种，如果你有一个想跟以前 class 的感觉的。可以写一个组件，使用的时候包裹起来就好。

```jsx
// 新建组件
import styled from 'styled-components';

export const Container = styled.div`
  width: 1000px;
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

// 使用的时候直接你想用哪里，包裹哪里就可以。
const Header = memo(() => {
  return (
    <StyleHeader>
      {/*这样就有了以前class的效果*/}
      <Container>
        <Flex>
          <div>我是一个p</div>
        </Flex>
      </Container>
    </StyleHeader>
  );
});

export default Header;
```

> 这种方法最大的缺点就是需要一层层包裹。
>
> 但是这样以后就不用写很长很长的 `<div className='不用写又臭又长的这个了'></div>`

## 5. 给组件传递参数

这里为了实现那种奇数从左到右 偶数从右到左的效果。就利用了 props 穿透的一个特性

```jsx
// 1-a 在这里 如果是偶数传递一个layout变量row-reverse 先给组件传递一个数字
<StyledCard layout={id % 2 === 0 && 'row-reverse'}>

{/*1-b 在这里传递进行接受，如果是偶数*/}
{/* 在这里你想是先一个偶数就是reverse的效果*/}
{/* 两种写法 任选其一*/}
flex-direction: ${({ layout }) => (layout ? 'row-reverse' : 'row')};
flex-direction: ${({ layout }) => layout || 'row'};
```

> 这样就可以了。&& 替代了判断，|| 就是提供了默认值。

## 6. 响应式 breakpoint 用 theme 来表示

这里设置断点用的也是变量的那种感觉，达到了以后随时都可以更换的目的。

```js
// 1-a 设置
const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#000333',
  },
  // 在这里设置断点
  mobile: '769px',
};

// 1-b 使用
export const Flex = styled.div`
  display: flex;
  align-items: center;
  🔥
    在这里使用（这里也用了解构赋值）
    @media
    (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;
```

## 7. 文件夹组织架构

这个又是一个方法想法，不一定完全照抄。

```js
src/
├── App.js
├── components
│   ├── Card.js
│   ├── Footer.js
│   ├── Header.js
│   ├── SocialIcons.js
│   └── styles // 就是在组件文件下设置了一个专门写styles的文件夹 这样就可以把【样式组件】都写在这里
│       ├── Button.style.js
│       ├── Card.style.js
│       ├── Container.style.js
│       ├── Flex.style.js
│       ├── Footer.style.js
│       ├── Global.js
│       ├── Header.style.js
│       └── SocialIcons.style.js
├── content.js
└── index.js
```

## 结束

非常小的一个项目，属于基础的基础。但是蛮有启发的。
