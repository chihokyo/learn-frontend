# vertical-align

这个属性是干嘛的呢？

## 1. 基本概述

在说这个之前首先说一下这个

```html
<div class="box"></div>
```

上面的代码有没有高度？✅ 没有高度，因为没有内容撑起来。

下面的就有了

```html
<div class="box">
  <span class="small"></span>
</div>
```

那么内容是如何撑起来的呢？

👇🏻 有一段逻辑

内容撑起来的 → 内容有行高 line-height 所以可以撑起来 → 行高因为有 line-boxes 存在 可以撑起来 → 行盒默认要包裹所有的 inline 要素。

## 2. 行盒 line-box

行盒是什么呢？

其实就是撑起来一个高度的要素。**行盒默认会包裹所有的 inline 要素。**

所以下面的代码

```html
<title>2.行盒</title>
<style>
  /* 行盒会把所有东西给包裹进来 所以img和span都包裹了 */
  .box {
    background-color: gold;
  }
  /* 会发现这里有缝隙 */
  .box img {
    width: 200px;
  }
  /* 会发现这里有缝隙 */
  .small {
    display: inline-block;
    height: 400px;
    width: 100px;
    background-color: brown;
  }
</style>
</head>
<body>
  <div class="box">
    Lorem ipsum dolor sit amet consectetur
    <img src="https://pbs.twimg.com/media/EsBtOH2W4AYnT7p.png" alt="" />
    <span class="small"></span>
  </div>
</body>
```

那么你会发现上面的代码会有缝隙这是为什么？

## 3. vertical-align

**vertical-align 会影响 【inline】元素在一个【line-boxed】中垂直方向的位置**

> 注意 `vertical-align` 只对行内元素、行内块元素和表格单元格元素生效：不能用它垂直对齐[块级元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)。
>
> 所以她不是对其元素用的，只是为了行盒用的。

因为行盒默认的对其方式是`vertical-align:baseline`。

并且这个是给元素本身设置的，不是给 box 设置的。它规定了 inline 元素的对齐方式。每一个元素都是独立的。

这就导致了有文本和其他在一起的时候就是会出现问题。

那为什么下面单独一个图片也会有缝隙呢？

```html
<title>2.行盒</title>
<style>
  .box {
    background-color: gold;
  }
</style>
</head>
<body>
  <div class="box">
    <img src="https://pbs.twimg.com/media/EsBtOH2W4AYnT7p.png" alt="" />
  </div>
</body>
```

✅ 因为系统会默认你之后有文本，相当于给你默认添加了一点点文本

```html
<div class="box">
  <img src="https://pbs.twimg.com/media/EsBtOH2W4AYnT7p.png" alt="" />
  .........默认给你来了点
</div>
```

## 4. baseline

那么这个是如何对齐的呢？

- 文本的 baseline 是字母 x 的下方
- Inline-block 默认的 baseline 是 margin-bottom 的底部(没有，就是盒子的底部)
- Inline-block 有文本时，baseline 是最后一行文本的 x 的下方

所以这就解释了下面两段会产生不同的排列的现象

```html
<title>4.block行盒的vertical-align默认对其方式</title>
    <style>
      /* 默认的对齐方式 baseline*/
      .box {
        background-color: gold;
      }
      /* 会发现这里有缝隙 */
      .box img {
        width: 200px;
      }
      /* 会发现这里有缝隙 */
      .small {
        display: inline-block;
        height: 400px;
        width: 100px;
        background-color: brown;
      }

      /* 会发现这里有缝隙 */
      .small2 {
        display: inline-block;
        height: 400px;
        width: 100px;
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div class="box">
      Lorem ipsum dolor sit amet consectetur
      <img src="https://pbs.twimg.com/media/EsBtOH2W4AYnT7p.png" alt="" />
      <span class="small"></span>
    </div>
    <h1>之后</h1>
    <div class="box">
      Lorem ipsum dolor sit amet consectetur
      <img src="https://pbs.twimg.com/media/EsBtOH2W4AYnT7p.png" alt="" />
      <!-- 有了文本之后 就有了基线  -->
      <span class="small2">aaa</span>
    </div>
  </body>
```

会发现第 2 个会排列和第 1 个不一样。那如何解决呢？

## 解决

**解决图片下边缘的间隙方法**

- 设置成 top/middle/bottom
- 将图片设置为 block 元素

```html
title>4.block行盒的vertical-align默认对其方式</title>
    <style>
      /* 默认的对齐方式 baseline*/
      .box {
        background-color: gold;
      }
      /* 会发现这里有缝隙 */
      .box img {
        width: 200px;
        /* 解决方案1 这里默认是基线，所以会有缝隙，改成top就不会有了 */
        /* vertical-align: top; */
        /* 解决方案2 */
        display: block; /*改成一行 就没事了 独占一行 不是inline元素*/
      }
      /* 会发现这里有缝隙 */
      .small {
        display: inline-block;
        height: 400px;
        width: 100px;
        background-color: brown;
      }

      /* 会发现这里有缝隙 */
      .small2 {
        display: inline-block;
        height: 400px;
        width: 100px;
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div class="box">
      Lorem ipsum dolor sit amet consectetur
      <img src="https://pbs.twimg.com/media/EsBtOH2W4AYnT7p.png" alt="" />
      <span class="small"></span>
    </div>
    <h1>之后</h1>
    <div class="box">
      Lorem ipsum dolor sit amet consectetur
      <img src="https://pbs.twimg.com/media/EsBtOH2W4AYnT7p.png" alt="" />
      <!-- 有了文本之后 就有了基线  -->
      <span class="small2">aaa</span>
    </div>
  </body>
```
