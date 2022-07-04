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

## fixed 固定定位

## absolute 绝对定位 ⭐️

这个经常会被和子绝父相挂钩，其实是没有什么关系的。

这个定位首先是脱离标准流的，就是不会按照顺序排排站。

- 脱离标准流
- 可以用 top/bottom/left/right 进行定位
- 定位参照对象是最邻近的定位祖先元素
  - 重点 1 最邻近的祖先
  - 重点 2 必须是定位元素！！祖先+定位元素，缺一不可。
  - 找不到这样的祖先元素，参照对象是视口（此时和 fixed 一样)

为什么会有子绝父相？

> 在绝大数情况下，子元素的绝对定位都是相对于**父元素**进行定位
>
> 如果希望子元素相对于父元素进行定位，又不希望父元素脱标（只能 relative）。
>
> 1.父元素设置`position: relative`(让父元素成为定位元素，而且父元素不脱离标准流)
>
> 2.子元素设置`position: absolute`。这样就是子绝父相！

来一个例子，证明脱标。

<iframe height="300" style="width: 100%;" scrolling="no" title="position-absolute" src="https://codepen.io/chihokyo/embed/vYROvjL?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/chihokyo/pen/vYROvjL">
  position-absolute</a> by chihokyo (<a href="https://codepen.io/chihokyo">@chihokyo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## absolute/fixed 元素特点

- 随意设置宽高（不需要在继续对`display:inline-block`
- 宽高默认由内容决定
- 没有标准流的约束
  - 不再严格按照从上到下、从左到右排布
  - 不再严格区分块级(block)、行内级(inline)，行内块级(inline-block)的很多特性都会消失
- 不再给父元素汇报宽高数据(其实就是撑不开父元素
- 脱标元素内部默认还是按照标准流布局
