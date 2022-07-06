# 定位 position

这个也是学习 css 的一大难点，有时候也分不清楚。

先来一下结论吧。

|          | 脱离标准流 | 定位元素（可用 left/right/top/bottom) | absolutely positioned element | 参照对象                                         |
| -------- | ---------- | ------------------------------------- | ----------------------------- | ------------------------------------------------ |
| static   | ❌         | ❌                                    | ❌                            | ❌                                               |
| relative | ❌         | ✅                                    | ❌                            | 元素自己原来位置                                 |
| absolute | ✅         | ✅                                    | ✅                            | 最邻近的**定位祖先元素**（找不到就是自己）       |
| fixed    | ✅         | ✅                                    | ✅                            | 视口                                             |
| sticky   | ✅         | ✅                                    | ❌                            | 刚开始 relative，到了一定阈值直接变身成 absolute |

**Q:什么叫标准流 normal flow ?**

A:平常不设置的情况下，写的那些代码就是默认就是标准流。其实什么都不写就是标准流，比如 block 块级的占一整行，inline 行内元素和别人在一起并列内容撑开这种。

- 从左到右，从上到下，互相之间不层叠。

![image-20220704174708725](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220704174708725.png)

```css
 <body>
    <!-- 兄弟元素永远不会出现层叠，父子可能会出现 -->
    <div>我是div</div>
    <img
    src="https://kansai.weblab.co.jp/blog/wp-content/uploads/2020/08/img_management_img_category-order-and-taxonomy-terms-order.jpg"
    width=" alt="">
    <strong>我是strong</strong>
    <span></span>
  </body>
```

缺陷有什么？

- 如果想排布怎么办？使用 margin/padding，但是会影响其他元素。
- 没有层叠，但是在做 css 的时候很多时候是有层叠的。

**Q:什么是定位元素？**

A:就是设置成了`relative,absolute,fixed,sticky`，可以使用 top/bottom/left/right 这样。可以自己写位置了。

**Q:什么是 absolutely positioned element（绝对定位元素类）？**

A:其实就是`absolute,fixed`，这个有一些特点。下面会写。

## 1 static

这个就是默认，你什么都不写，就是这个，这个就是默认的标准流。

平常没人写，因为默认就是这个。主要用于取消特定的定位，自己本身没人会写这个定位。

- 不能用 top/bottom/left/right z-index 也无效
- 默认使用 normal flow
- 默认所有元素都是 static（根本不会用。

使用场景 → 重置定位

## 2 relative 相对定位

相对于谁呢？

参照位置是原来的位置。并且不会影响其他元素，（跟 margin/padding 这种不一样)

自己原来的标准流，自己原来在哪里的，现在也还在那里。

```css
position: relative; /*相当于原地不动*/
```

但是增加了 top/bottom/left/right

```css
position: relative;
left: 10px; /* 开始就有了变化 */
right: 10px; /* 开始就有了变化 */
```

可以验证一下

小 demo

```html
<style>
      div {
        position: relative;
        /* 依然按照标准流布局，还在标准流里面。但是相对自己原来的位置有了移动 */
        /* 就可以设置了top/bottom/left/right */
        top: 10px;
        left: 70px;
        background-color: gold;
      }
    </style>
  </head>
  <body>
    <div>我是div</div>
    <img
    src="https://kansai.weblab.co.jp/blog/wp-content/uploads/2020/08/img_management_img_category-order-and-taxonomy-terms-order.jpg"
    width=" alt="">
    <strong>我是strong</strong>
    <span></span>
  </body>
```

### 使用场景

在不影响其他元素位置的前提下，对当前元素位置进行微调。

一个小 demo

```html
<style>
  div {
    font-size: 50px;
  }
  span {
    font-size: 30px;
    /* 微调位置 */
    position: relative;
    bottom: 30px;
  }
</style>
</head>
<body>
  <div>3<span>2</span> + 2<span>3</span> = 17</div>
</body>
```

## 3 fixed 固定定位

固定就是相当于**视口**总是固定。参照对象是视口。

特点如下

- 元素脱离**normal flow**(脱离标准流 脱标)
- 可以通过 top/bottom/left/right 进行定位
- 参照对象是视口 viewpoint

小案例

```html
<title>5.fixed初体验</title>
    <style>
      .box {
        /* 手动个滚动 */
        height: 2000px;
      }

      button {
        /* 这样无论怎么滚动 相对视口总是固定住的 */
        position: fixed;
        top: 10px;
        right: 200px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <button>我是按钮</button>
    </div>
  </body>
```

下面写一个点赞，评论，转发小案例

```html
<title>6.fixed小案例</title>
<style>
  body {
    /* 为了让滚动 */
    height: 2000px;
  }
  .box {
    position: fixed;
    right: 30px;
    bottom: 30px;
  }

  .box .item {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px; /*设置和height一样 就可以达到居中*/
    background-color: greenyellow;
    color: red;
    margin-top: 10px;
    cursor: pointer;
  }

  .box .item:hover {
    background-color: red;
    color: white;
  }
</style>
</head>
<body>
  <div class="box">
    <div class="item">点赞</div>
    <div class="item">转发</div>
    <div class="item">评论</div>
  </div>
</body>
```

> 只要理解相对于视口+脱标，几乎就没问题。

## 4 absolute 绝对定位 ⭐️

这个经常会被和子绝父相挂钩，其实是没有什么关系的。

这个定位首先是脱离标准流的，就是不会按照顺序排排站。

- 脱离标准流
- 可以用 top/bottom/left/right 进行定位
- 定位参照对象是**最邻近**的**定位祖先**元素
  - 重点 1 最邻近的祖先
  - 重点 2 必须是定位元素！！祖先 + 定位（可用 top..）元素，缺一不可。
  - 找不到这样的祖先元素，参照对象是视口（此时和 fixed 一样)

初体验一下。

```html
<title>7.absolute初体验</title>
<style>
  strong {
    /* 脱离标准流 所以strong不再占据空间 */
    /* 相对于谁呢？相对于最临近祖先+定位元素 */
    /* 没有最临近的就是视口 和fixed就很像了*/
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
</head>
<body>
  <span>我是span</span>
  <strong>我是strong</strong>
  <img
       src="https://kansai.weblab.co.jp/blog/wp-content/uploads/2020/08/img_management_img_category-order-and-taxonomy-terms-order.jpg"
       width=" alt="">
  </body>
```

那么如何验证只是最近的定位？而不一定是父元素！

```html
<title>8.absolute验证最近定位祖先</title>
<style>
  /* 这个时候会发现虽然祖先是box，但是由于不是定位元素。
  所以还是会以视口为基准进行设置位置 */
  .box {
    height: 600px;
    width: 600px;
    background-color: gold;
  }
  strong {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
</head>
<body>
<div class="box">
  <span>我是span</span>
  <strong>我是strong</strong>
  <img
  src="https://kansai.weblab.co.jp/blog/wp-content/uploads/2020/08/img_management_img_category-order-and-taxonomy-terms-order.jpg"
  width=" alt="">
</div>
</body>
```

### 为什么会有子绝父相？

> 在绝大数情况下，子元素的绝对定位都是相对于**父元素**进行定位
>
> 如果希望子元素相对于父元素进行定位，又不希望父元素脱标（只能 relative）。因为 fixed 也是脱标，absolute 也是脱标。
>
> 1.父元素设置`position: relative`(让父元素成为定位元素，而且父元素不脱离标准流)
>
> 2.子元素设置`position: absolute`。这样就是子绝父相！

那么继续来一个子绝父相

```html
<title>9.absolute子绝父相</title>
<style>
  /* 这个时候会发现虽然祖先是box，但是由于不是定位元素。
  所以还是会以视口为基准进行设置位置
  那么定位元素有哪几个呢？（除了 static
    relative
    fixed
    absolute
    这里面只有 relative 既是定位元素又不会脱标，所以首选了relative
  */
  .container {
    height: 800px;
    width: 800px;
    background-color: yellowgreen;
    /* 这里就是最近的祖先定位元素！！ */
    position: relative;
  }
  .box {
    height: 600px;
    width: 600px;
    background-color: gold;
    /* 这里也可以，想测试的话互相切换一下就好 */
    /* position: relative; */
  }
  strong {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
</head>
<body>
<div class="container">
  <div class="box">
    <span>我是span</span>
    <strong>我是strong</strong>
    <img
    src="https://kansai.weblab.co.jp/blog/wp-content/uploads/2020/08/img_management_img_category-order-and-taxonomy-terms-order.jpg"
    width=" alt="">
  </div>
</div>
</body>
```

来一个案例 box 相对于 container 右下角，然后 strong 在 box 的左上角，证明脱标。

<iframe height="300" style="width: 100%;" scrolling="no" title="position-absolute" src="https://codepen.io/chihokyo/embed/vYROvjL?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/chihokyo/pen/vYROvjL">
  position-absolute</a> by chihokyo (<a href="https://codepen.io/chihokyo">@chihokyo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
## 5 absolute/fixed 元素特点

首先这俩叫 绝对定位元素(**absolutely positioned element**)

为什么叫这个呢？因为只有这俩符合脱标+ 可定位。relative 不能脱标。

- 随意设置宽高（不需要在继续对`display:inline-block`
- 宽高默认由内容决定
- 没有标准流的约束
  - 不再严格按照从上到下、从左到右排布
  - 不再严格区分块级(block)、行内级(inline)，行内块级(inline-block)的很多特性都会消失
- 不再给父元素汇报宽高数据(其实就是撑不开父元素
- 脱标元素内部默认还是按照标准流布局

那么接下来一个个验证。

随意这是宽高+宽高默认又内容决定

```html
<title>11.绝对定位元素特点1</title>
<style>
  .container {
    height: 800px;
    width: 800px;
    background-color: yellowgreen;
    position: relative;
  }
  .box {
    height: 600px;
    width: 600px;
    background-color: gold;

    position: absolute;
    right: 0;
    bottom: 0;
  }
  strong {
    position: absolute;
    bottom: 0;
    left: 0;
    /* 这里strong作为一个行内元素 是没办法设置宽高的 */
    /* 但是由于你是一个绝对定位元素，就是可以设置宽高 */
    /* display: inline-block; 所以这个就没必要写的 */
    width: 200px;
    height: 30px;
    background-color: red;
  }
</style>
</head>
<body>
<div class="container">
  <div class="box">
    <span>我是span</span>
    <strong>我是strong</strong>
    <img
    src="https://kansai.weblab.co.jp/blog/wp-content/uploads/2020/08/img_management_img_category-order-and-taxonomy-terms-order.jpg"
    width=" alt="">
  </div>
</div>
</body>
```

不在给父类汇报宽高

这是什么意思呢？就是父类不会撑起来你了。

```html
<title>12.绝对定位元素特点2不在给父类汇报宽高</title>
  <style>
    .container {
      background-color: yellowgreen;
    }
    /* 这里你会看到strong脱标之后就看不到父类的背景色了 */
    /* 为什么看不到背景色？因为根本没有撑起来 */
    .container strong {
      position: absolute;
    }
  </style>
</head>
<body>
  <div class="container">
    <strong>我是strong</strong>
  </div>
</body>
```

脱标元素内部默认还是按照标准流布局

```html
<style>
      .container {
        background-color: yellowgreen;
      }
      /* 这里你会看到strong脱标之后就看不到父类的背景色了 */
      /* 为什么看不到背景色？因为根本没有撑起来 */
      .container strong {
        position: absolute;
        height: 200px;
        width: 200px;
        background-color: gold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <strong>
        <!-- 可以发现虽然strong脱标了，但是i和span依旧按照标准流 -->
        <i>我是i</i>
        <span>我是span</span>
      </strong>
    </div>
  </body>
```

## 6 absolute/fixed 元素特点 2 ⭐️

对于以上两个元素来说，

`定位参照对象的宽度 = left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度`

`定位参照对象的高度 = top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度`

上面的意思就是说是这样的

![image-20220705010400701](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220705010400701.png)

那么下面问自己几个问题，

**Q:为什么在不写 width 的情况下，设置 left:0,right:0 会占满整整一行？**

top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度

因为这些元素的默认都是 0，宽度默认是 auto，浏览器表现为占满。

所以就是

```
top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度
0 + 0 + 0 + 0 + width(auto)
```

你也可以直接写`width:100%`，那么结果一样的。

验证

```html
<title>14.绝对定位元素特点四占据整行</title>
<style>
  .container {
    width: 800px;
    height: 800px;
    position: relative;
    background-color: yellowgreen;
  }
  .box {
    height: 100px;
    position: absolute;
    background-color: gold;

    /* 不写width的情况下 按照公式 实现了占据整行 */
    /* 定位参照对象的宽度 = left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度 */

    left: 0;
    right: 0;

    /* 写100%效果一样 */
    /* width: 100%; */
  }
</style>
</head>
<body>
<div class="container">
  <div class="box">我是内部的box</div>
</div>
</body>
```

**Q: 为什么在不写 height 的情况下，设置 top:0,bottom:0 会占满整整一个？**

和上面 width 同理。

**Q:为什么写了 width 的情况下，会有什么表现？**

比如父元素 800px，子元素 200px。那么就按照

```
top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度
0 + 0 + 0 + 0 + 200px
这个时候浏览器会自动给靠左进行margin-left:auto分配，所以会靠左。
但是最好不要交给浏览器，你要自己写。
```

验证

```html
<title>15.绝对定位元素特点不写就浏览器</title>
    <style>
      .container {
        width: 800px;
        height: 800px;
        position: relative;
        background-color: yellowgreen;
      }
      .box {
        height: 100px;
        position: absolute;
        background-color: gold;

        /* 写了宽度的情况下 按照公式 其实浏览器默认会给margin-left:auto */
        /* 定位参照对象的宽度 = left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度 */
        width: 100px;
        left: 0;
        right: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box">我是内部的box</div>
    </div>
  </body>
```

**Q:绝对元素的居中原理是不是这里**

对的，根据公式，你完全可以设置垂直和水平方向的全居中。

```
top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度
0 + 0 + auto + auto + 200px 【垂直方向居中！】

left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度
0 + 0 + auto + auto + 200px 【水平方向居中！】
```

验证

```html
<title>16.绝对定位元素完全居中原理</title>
    <style>
      .container {
        width: 800px;
        height: 800px;
        position: relative;
        background-color: yellowgreen;
      }
      .box {
        position: absolute;
        background-color: gold;

        /*先给个高度宽度 */
        width: 100px;
        height: 100px;

        /* 居中原理在此 */
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        /* 设置上下左右 */
        margin: auto;
      }
    </style>
  </head>
```

## auto 到底是什么？

> ◼ **auto -> 交给浏览器决定**
>
> ◼ **width: auto**
>
> width 的 auto 不是 100%！！
>
> 行内非替换元素 -> width: 包裹内容
>
> 块级元素 ->width: 包含块的宽度
>
> 绝对定位元素 -> width: 包裹内容

## 7 sticky 粘性定位

其实这个属性就是一个混合体。

相对定位 + 达到阈值 → 变身成为fixed or absolute 相对于视口就是fixed，

必须要有方向的！（必须写top/bottom/left/right)

sticky是相对于最近的滚动祖先包含滚动视口的(the nearest ancestor scroll container’s scrollport )

其实这段意思就是不一定相当于视口，而是滚动视口。谁能滚动，才以谁为参照。
