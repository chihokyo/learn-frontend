# 单位 unit

> ✅ 在学之前起码要明白一个前提就是无论是什么单位，在浏览器显示的时候**最终都会换算成px**



在学习 css 的时候，最常用的长度单位就是 px（pixel），这个表示 1 个像素。也是在写 css 的时候最常用的。

但其实除了 px 之外还有很多单位。👇

![CSS Units — px, em, cm, vw, in, ex, pt, pc — TutorialBrain](https://i0.wp.com/www.tutorialbrain.com/wp-content/uploads/2019/06/CSS-UNITS.png?fit=474%2C790&ssl=1)

关于单位，在官方文档里面其实有一节说明可以看到。

https://www.w3.org/Style/Examples/007/units.en.html

## 1 绝对长度单位（Absolute length units)

绝对单位是什么意思呢？意思就是写什么就是什么，不是像相对那样。还要相对于某某，绝对就是就是与其他东西没关系，到哪里都是相同的大小。

比如最常用的 px，就是最常用的。

在 chrome 浏览器里，字体默认是`font-size:16px`

> 绝对长度单位并不是很难理解的问题，知道这么多就够了。

### 但要来一个补充！pixel 是什么？ ⭐️

首先这个单词的出自就是

```
picture + element ==> pixel
```

那么这个 px 到底是什么呢？

首先像素这个概念其实在不同的地方有不同的解释。

常见的有三种

- 物理像素（电脑，手机这些制造出来的时候是多少就多少，比如你买的是 4K 的电脑，那么就是 4K 的像素。**是真实的显示器的像素**。比如 iPhone 13 在宣传的时候给出的像素！
- 逻辑像素（操作系统会给你的物理像素抽象成显示出来的像素，这个就是逻辑像素。比如我的电脑是 5K 的，但是我系统内部设置成了`2048*1152`。比如我的 Macbook 会自动设置像素。
- css 的像素。**这个其实就是按照逻辑像素**。比如你设置成了`100px`。那么相当于就是系统给你显示出来**逻辑像素 100px**。

如何验证呢？ 去 chrome 的 devtools 去 console.log 出来

```js
screen.width; // 逻辑宽度
screen.height; // 逻辑高度
```

你会发现结果应该和你系统设置的显示器分辨率是一样的。

那么如何看到自己的物理像素呢？😁 请去看自己显示器的参数页。

## 2 相对长度单位（Relative length units)

这个是重点，相对长度最重要的就是**相对的到底是什么**？

是父元素？还是视口呢？这个要具体问题具体分析。

以下有几个需要重点关照的`rem,em,vw,wh`

### em

em 相对的是什么？相对的正确官方给的是

>在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width

其实就是相对的**自身 font-size 的尺寸**，虽然经常有地方说是相对于父类的 font-size。但其实这个说法也并非完全正确。

下面看一个例子吧。

```html
<title>1.关于em的单位</title>
<style>
    .box {
    font-size: 1em;
    }
    .demo {
    /* 其实这里比较倾向于，demo是从box那里继承到了1em也就是计算后的16px*/
    /* font-size:16px 这里其实先继承了*/
    /* 但是你自己相当于又覆盖了 */
    font-size: 20px;
    width: 5em; /*实际上是100px*/
    height: 5em; /*实际上是100px*/
    background-color: gold;
    }
</style>
</head>
<body>
<div class="box">
    <div class="demo">我是demo</div>
</div>
</body>
```

其实这里比较倾向于，demo 首先是从父元素那里继承到了。然后自己又覆盖了，本质都是自己的 font-size。比如下面这个 👇🏻

```html
<title>2.关于em的单位的继承</title>
<style>
  .box {
    font-size: 2em; /*28px*/
  }
  .demo {
    /* font-size: 28px; */
    /*相当于先继承了28px 然后你又在自身了1em，所以结果就是28px*/
    font-size: 1em;
    width: 5em; /*实际上是140px*/
    height: 5em; /*实际上是140px*/
    background-color: gold;
  }
</style>
</head>
<body>
<div class="box">
  <div class="demo">我是demo</div>
</div>
</body>
```

> 这样进行理解 em 就不会出现偏差，本质 font-size 是可以继承的。

### rem

rem 这个更好理解，本质就是相对于**根元素的 font-size**

也就是说

```css
/*这俩都可以*/
::root {
  font-size: 10px;
}
html {
  font-size: 10px;
}
.demo {
  width: 1rem; /*那么就是10px*/
}
```

经常看到有一些网站布局是这样的

```html
<title>3.关于rem</title>
<style>
    /* 都给转换成10px 这样便于rem计算 便于做移动端适配 */
    html {
    font-size: 62.5%; /*相当于这里是10px*/
    }
    .box {
    width: 20rem; /*相当于这里是 20*10px = 200px*/
    height: 30rem;
    background-color: gold;
    }
</style>
</head>
<body>
<div class="box">我是box</div>
</body>
```

> 对于不同的页面显示不同的大小，以前用 rem 是个很好的选择。这样可以自由的伸缩，做响应式很合适。（和媒体查询配合起来这样就不用每次都修改每一个元素的大小，直接修改根元素的`font-size`就可以。

### vw/vh ⭐️

其实这个是视口大小。`viewport width/height`那么她相对于谁呢？

相对于视口的百分比例这种！

viewport width → 视窗宽度的 1%

viewport height → 视窗高度的 1%

> 现在移动端适配都爱用这个，因为根据视口大小伸缩。

```html
<title>4.关于vw_vh</title>
<style>
  /* 其实就是相对于视口宽度2%，高度2% */
  .box {
    font-size: 2vh;
    width: 20vw;
    height: 20vh;
    background-color: gold;
  }
  /* 开发的时候经常 */
  /* 100vh,100vw 这样，就是永远占据整个窗口 */
</style>
</head>
<body>
<div class="box">我是box</div>
</body>
```

## 3 测试

这里有一个小测验，可以检测一下理解的水平。

```html
<title>5.单位小测验</title>
    <style>
      html,
      body {
        font-size: 16px;
        width: 80vw;
      }
      header {
        font-size: 150%; /*父类的计算值也就是 16px * 150% = 24px */
        padding: 2em; /*em相当于自身的font-size，也就是 24px * 2em = 48px */
        margin-bottom: 10rem; /*相当于根元素的font-size 也就是 16px *10rem = 160px*/
        height: 90vh;
        width: 1000px;
      }

      header-child {
        font-size: 3em; /*相对于父类的font-size 此时父类是24px 继承的是计算值 所以答案就是 24px * 3em = 72px*/
        padding: 10%; /*相当于包含块的width 也就是 1000px + 10% = 100px*/
      }
    </style>
  </head>
  <body>
    <!-- 下面就开始连算一下，这些到底是多少 -->
    <div class="header">
      <div class="header-child">header-child</div>
    </div>
  </body>
```

这里考察了很多。建议没事就看两眼👁。
