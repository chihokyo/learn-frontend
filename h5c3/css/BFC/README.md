# BFC

这个概念经常在各种面试题被问到。

每一次看起来都好难理解的样子。其实本质是很简单的。

首先在了解这个问题之前要明白一些基础概念

## 1. 基础概念

- block level element 块级元素
- inline level element 行内元素

这个不懂的话可以直接去看**元素特性**。这里有严格的区分这俩到底有什么不一样。

然后在看

> 什么是 FC？任天堂的 famicon😁？当然不是！
>
> 是这个 格式上下文 → **Formatting Context**。类似于 JS 的上下文的概念。这个意思就是一个元素和他周围环境的一些法则的感觉。

那么到底什么是 BFC？其实就是块级元素的上下文。

- **Block Formatting Context**
  - block level box 都是在 BFC 中布局的
- **Inline Formatting Context**
  - inline level box 都是在 IFC 中布局的

## 2. BFC 详解

那么 BFC 就是代表块级元素咯。那么哪一些是 BFC？

### 2-1. MDN

[MDN:块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

> 下列方式会创建块格式化上下文：
>
> - 根元素（`<html>`）
> - 浮动元素（[`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 值不为 `none`）
> - 绝对定位元素（[`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 值为 `absolute` 或 `fixed`）
> - 行内块元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `inline-block`）
> - 表格单元格（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table-cell`，HTML 表格单元格默认值）
> - 表格标题（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table-caption`，HTML 表格标题默认值）
> - 匿名表格单元格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table`、`table-row`、 `table-row-group`、`table-header-group`、`table-footer-group`（分别是 HTML table、tr、tbody、thead、tfoot 的默认值）或 `inline-table`）
> - [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible`、`clip` 的块元素
> - [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
> - [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content` 或 `paint` 的元素
> - 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flex` 或 `inline-flex` 元素的直接子元素），如果它们本身既不是 [flex](https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container)、[grid](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Container) 也不是 [table](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Table) 容器
> - 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `grid` 或 `inline-grid` 元素的直接子元素），如果它们本身既不是 [flex](https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container)、[grid](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Container) 也不是 [table](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Table) 容器
> - 多列容器（[`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) 值不为 `auto`，包括`column-count` 为 `1`）
> - `column-span` 值为 `all` 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中 ([规范变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51), [Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362))

### 2-2. W3C

那么在 W3C 里的说法是啥？

[9.4.1 Block formatting contexts](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)

> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.
>
> In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the ['margin'](https://www.w3.org/TR/CSS2/box.html#propdef-margin) properties. Vertical margins between adjacent block-level boxes in a block formatting context [collapse](https://www.w3.org/TR/CSS2/box.html#collapsing-margins).
>
> In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box's _line boxes_ may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself [*may*become narrower](https://www.w3.org/TR/CSS2/visuren.html#bfc-next-to-float) due to the floats).
>
> For information about page breaks in paged media, please consult the section on [allowed page breaks](https://www.w3.org/TR/CSS2/page.html#allowed-page-breaks).

这说的总结一下呗？

- 在 BFC 中，box 会在垂直方向上一个挨着一个的排布。👉🏻 其实这个就是 block 级别的特征。
- 垂直方向的间距由 margin 属性决定。👉🏻 意思就是说可以设置间距。
- 在同一个 BFC 中，相邻两个 box 之间的 margin 会折叠(collapse)。👉🏻 这个就是**margin 折叠现象。**
- 在 BFC 中，每个元素的左边缘是紧挨着包含块的左边缘的。👉🏻 其实就是默认从左到右。

我自己的理解就是 BFC，规定了 block 元素在网页上的规则。比如从左到右排布，默认占据一行，margin 会折叠。这样的一些规定都是 BFC 决定的。

## 3. 能解决什么问题？

### 3-1. 折叠问题

那么 BFC 能解决什么问题呢？为什么可以解决折叠问题？

> **在同一个 BFC 中，相邻两个 box 之间的 margin 会折叠(collapse)**
>
> ✅ 那么只要两个元素不是同一个 BFC 不就可以解决咯？

before + after

```html
<title>1.BFC解决折叠问题</title>
    <style>
      .item1 {
        width: 100px;
        height: 100px;
        background-color: gold;
        /* 这里会被折叠 */
        margin-bottom: 50px;
      }
      .item2 {
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        /* 这里会被折叠 */
        margin-top: 50px;
      }

      .item3 {
        width: 100px;
        height: 100px;
        background-color: brown;
        margin-bottom: 50px;
      }
      .item4 {
        width: 100px;
        height: 100px;
        background-color: yellow;
        margin-top: 50px;
      }

      /* ✅ 形成一个新的BFC */
      .container {
        overflow: auto;
      }
    </style>
  </head>
  <body>
    <h1>before</h1>
    <div class="box1">
      <div class="item1">item1</div>
      <div class="item2">item2</div>
    </div>

    <h1>after</h1>
    <div class="box2">
      <!-- ✅ 这样就造成了item3的BFC是container -->
      <div class="container">
        <div class="item3">item3</div>
      </div>
      <!-- ✅ 这样就造成了item4的BFC是box2 -->
      <!-- ✅ 两个不是一个bfc那就不可能折叠 -->
      <div class="item4">item4</div>
    </div>
  </body>
```

> 包含的块元素的 BFC 不一样就可以解决。
>
> 包含块一定是父元素吗？不一定！在**脱离标准流**的时候，包裹块就变成了自己的最近的定位元素。而**不一定是父元素**，虽然写的时候依然写在父元素的地方。

### 3-2. 解决塌陷问题

首先要知道为什么会有塌陷问题。

> 因为元素在设置 float 之后就脱离了标准流，无法撑起来父元素。就造成了高度无法汇报的情况。比如 👇🏻
>
> ⚠️ 其实不仅仅是 float，只要是脱离标准流的。比如说子绝父相也可以触发这个塌陷。所以说这个不是 float 独有的。

高度塌陷就是这样的

```html
<title>2.高度塌陷问题</title>
    <style>
      .box {
        background-color: gold;
      }
      .item {
        /* 开启float 脱离了标准里 无法撑开父元素 导致背景没了 */
        float: left;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="item item1">item1</div>
      <div class="item item2">item2</div>
      <div class="item item3">item3</div>
    </div>
  </body>
```

![image-20220712003448545](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220712003448545.png)

上面的 float 解决方案如下

```html
<style>
      .box {
        background-color: gold;
      }
      .item {
        float: left;
        height: 100px;
        width: 100px;
        background-color: purple;
      }

      /* 解决方案 */
      .clear_fix::after {
        content: '';
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <div class="box clear_fix">
      <div class="item item1">item1</div>
      <div class="item item2">item2</div>
      <div class="item item3">item3</div>
    </div>
  </body>
```

> 但是这个无法解释子绝父相的高度塌陷问题

比如 👇🏻 这个 也会产生一个高度塌陷。

```html
<title>3.高度塌陷问题子绝父相</title>
    <style>
      .box {
        position: relative;
        background-color: gold;
      }
      .item {
        position: absolute;
        height: 100px;
        width: 100px;
        background-color: purple;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="item item1">item1</div>
      <div class="item item2">item2</div>
      <div class="item item3">item3</div>
    </div>
  </body>
```

> 本质就是 BFC 这个东西本质上其实是无法解决高度塌陷的问题的。

### 3-3. overflow: auto 能解决的本质原因

本质是什么？为什么`overflow: auto;`可以解决呢？

```html
<title>5.使用overflow解决</title>
    <style>
      .box {
        background-color: gold;
        /* 这里可以解决！！ */
        /* 难道形成了一个新的BFC？ */
        /* 其实不是的！ */
        /* BFC解决这个问题需要
        需要height是auto。不设置默认就是auto
        当一个bfc的告诉是auto的时候
        1 当只有inline-level的时候，是行盒高度+底部距离
        2 当有block的时候，margin包含在内算高度
        3 如果有绝对定位(absolute/fixed)元素 会被忽略 所以才产生了告诉塌陷
        4 如果有浮动元素，那么会增加高度以包括浮动元素的下边缘
        */
        overflow: auto;
      }
      .item {
        float: left;
        height: 100px;
        width: 100px;
        background-color: purple;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="item item1">item1</div>
      <div class="item item2">item2</div>
      <div class="item item3">item3</div>
    </div>
  </body>
```

因为根据的是

> 如果有浮动元素，那么会增加高度以包括浮动元素的下边缘

也就是高度在 height:auto 的情况下，会包括浮动元素的下边缘告诉。而不是汇报给父元素。所以 BFC 是解决不了告诉塌陷的。
