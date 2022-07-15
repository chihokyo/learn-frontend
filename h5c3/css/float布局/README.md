# float 浮动

## 1. 基础

为什么都有了定位还要浮动？因为定位会覆盖掉，float 会一字排开。便于做一些布局。

现在有了新的 flex 之后，用 float 的会很少，但为了**兼容性**还依然去做的。

> **历史背景**
>
> float 属性最初只用于在一段文本内浮动图像，实现文字环绕的效果。后来 css 并没有左右布局方案，因此在一段时间里面它成为网页多列布局的最常用工具。

最基本写法

[MDN:float](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)

```css
float:none/left/right;
  none：默认值不浮动
  left 向左浮动
  right 向右浮动
```

## 2. 特点

下面会直接写一些结论，但其实有些是表达一个意思的。

- absolute/fixed，float 都会脱离标准流，达到布局效果
- **会一直以自己的边界紧贴着包含块(一般是父元素)或者其他浮动元素的边界为止（有例子）**
- 定位元素会层叠在浮动元素上面（简而言之，定位元素>浮动元素)
- **如果元素是向左(右)浮动，浮动元素的左(右)边界不能超出包含块的左(右)边界 → 其实和上面的特点 2 差不多，相对于内容 conent 进行。**
- 浮动元素之间不能层叠 （一字排开，有例子
- 浮动动元素不能与行内级内容层叠，行内级内容将会被浮动元素推出。（其实就是浮动效果。
- 只能左右浮动，不能选择浮动到上下。

## 3. 证明

下面是一些证明的小 demo，写这些是为了证明上面的特点。

### 证明一下 float 的脱标不会覆盖掉

```html
<title>1.float的特点1</title>
<style>
  .item1,
  .item2 {
    background-color: gold;
  }
  .item1 {
    /* 可以发现脱离了标准流 并且不会覆盖掉后面的item2 */
    /* 这点不同于position:fixed 等绝对元素 会被覆盖掉 */
    float: left;
    background-color: yellowgreen;
  }

  /* 对比用 */
  .item3,
  .item4 {
    background-color: gold;
  }
  /* 这里会被浮动 */
  .item3 {
    position: absolute;
  }
  /* ===========结论=========== */
  /* 定位的脱标会覆盖，float的脱标不会被覆盖 */
</style>
</head>
<body>
  <h2>下面是float</h2>
  <div class="item1">1</div>
  <div class="item2">2</div>

  <h2>下面是绝对定位元素(absolute/fixed)对比</h2>
  <!-- 对比用 -->
  <div class="item3">3</div>
  <div class="item4">4</div>
</body>
```

### 证明只是包含父类的块

```html
<title>2.float证明包裹块</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      .box {
        height: 200px;
        width: 200px;
        background-color: gold;
        margin: 0 auto;
      }

      /* 可以看到这个是相对于自己的父元素，不是相对于视口 */
      .item1 {
        float: left;
      }
      .item2 {
        float: right;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="item1">1</div>
      <div class="item2">2</div>
    </div>
  </body>
```

### 证明定位 position 优先级高于 float

```html
<title>3.float定位元素层叠大于浮动</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      .item1 {
        width: 100px;
        height: 100px;
        float: left;
        background-color: greenyellow;
      }
      /* 可以看出来这是盖在上面的 */
      .item2 {
        width: 80px;
        height: 80px;
        position: absolute;
        margin-left: 20px;
        background-color: gold;
      }
    </style>
  </head>
  <body>
    <div class="item1">1</div>
    <div class="item2">2</div>
  </body>
```

### 证明 float 元素之间不能重叠

```html
<title>4.float元素之间不能层叠</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      .item1,
      .item2,
      .item3 {
        width: 100px;
        height: 100px;
        border: 1px solid;
        /* 浮动会依次进行浮动，不会覆盖 */
        /* 如果父元素的宽度撑不过，那么就会被换行 */
        float: left;
        background-color: greenyellow;
      }

      .item4,
      .item5,
      .item6 {
        width: 100px;
        height: 100px;
        position: absolute;
        background-color: gold;
      }
    </style>
  </head>
  <body>
    <div class="item1">1</div>
    <div class="item2">2</div>
    <div class="item3">3</div>

    <!-- 对比用 -->
    <br />
    <h2>这里会发现456层叠在一起了</h2>
    <div class="item4">4</div>
    <div class="item5">5</div>
    <div class="item6">6</div>
  </body>
```

### 证明父元素宽度不够会换行

```html
<title>5.float的父元素不够就会换行</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      .box {
        width: 350px;
        height: 550px;
        background-color: gold;
      }

      .item1,
      .item2,
      .item3,
      .item4 {
        width: 100px;
        height: 100px;
        border: 1px solid;
        /* 如果父元素的宽度撑不过，那么就会被换行 */
        float: left;
        background-color: greenyellow;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="item1">1</div>
      <div class="item2">2</div>
      <div class="item3">3</div>
      <div class="item4">4</div>
    </div>
  </body>
```

### 证明 inline 等级的也不能层叠

```html
<title>6.float元素和行内inline级也不能重叠</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      .box {
        width: 1000px;
        height: 400px;
        background-color: gold;
      }
      /* 会发现不会重叠，而是把其他的给挤出去，挤到后面的 */
      strong {
        float: left;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <span>我是span</span>
      <strong>我是strong</strong>
      <i>我是i元素</i>
    </div>
  </body>
```

### 证明 float 元素只能在水平浮动

```html
<title>7.float元素只能在水平浮动</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      .box {
        width: 1000px;
        height: 400px;
        background-color: gold;
      }
      /* 会发现不会重叠，而是把其他的给挤出去，挤到后面的 */
      strong {
        float: left;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <span>我是span</span>
      <strong>我是strong</strong>
      <i>我是i元素</i>
    </div>
  </body>
```

## 4. 问题

### 间隙

在 inline 级别进行摆放的时候，会出现一些空隙。这是由于浏览器默认的行为。

```html
<style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <span>我是span</span>
      <strong>我是strong</strong>
    </div>
  </body>
```

这种空隙是多余的，所以需要进行清除。那么如何清除呢？其实清除有很多方案

1. 删除换行符（不推荐
2. 将父元素 font-size 设置为 0，但是需要子元素设置回来
3. **浮动起来 float**
4. flex 布局

```html
<title>8.清除空隙</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      /* 重置父元素字体为0，子元素重复设置一下
      不推荐的方案 */
      /* .box {
        font-size: 0;
      }
      .box span,
      .box strong {
        font-size: 16px;
      } */

      /* 浮动float起来 */
      span,
      strong {
        float: left;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <span>我是span</span>
      <strong>我是strong</strong>
    </div>
  </body>
```

### 高度塌陷

因为浮动的元素会脱离标准流，不会汇报给父元素。

所以导致你父元素没办法写一个固定的高度 or 宽度。

比如

```html
 <title>9.高度塌陷</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      /*
      你会发现这个时候父元素撑不起来
      因为作为float的所有子元素并没有汇报给父类
      所有的子元素都是浮动的，那么就全部脱离标准流
      那么父元素那么就没有高度 相当于压根不存在这也就是【高度塌陷】
      */
      .box {
        height: 200px;
        width: 200px;
        background-color: blue;
      }

      span {
        float: left;
        height: 300px;
        background-color: gold;
      }
      strong {
        float: left;
        height: 100px;
        background-color: yellowgreen;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <span>我是span</span>
      <strong>我是strong</strong>
    </div>
  </body>
```

那么如何撑起来呢？**清除浮动**

### clear 清除浮动

clear 属性可以指定一个元素**是否必须移动**(清除浮动后)到在它之前的**浮动元素**下面

其实就是指定一个元素，你把它搞到浮动元素的下面。指谁移动谁。

```css
clear: left; /*移动到包括最后一个left*/
clear: right; /*移动到包括最后一个right*/
clear: both; /*移动到包括left和right的最后一个浮动*/
```

```html
<style>
      body {
        margin: 0;
        padding: 0;
      }
      /*
      你会发现这个时候父元素撑不起来
      因为作为float的所有子元素并没有汇报给父类
      所有的子元素都是浮动的，那么就全部脱离标准流
      那么父元素那么就没有高度 相当于压根不存在这也就是【高度塌陷】
      */
      .box {
        height: 200px;
        width: 200px;
        background-color: blue;
      }

      span {
        float: left;
        height: 300px;
        background-color: gold;
      }
      strong {
        float: left;
        height: 100px;
        background-color: yellowgreen;
      }

      /* 这里看到line直接是在最上面的，因为她没有浮动
      */
      .line {
        background-color: brown;
        height: 20px;
        /* 如果想指定她在浮动的下面，那么就clear:left
        表明他将被转移到float:为left的地方下面 */
        clear: both;
      }
      .random {
        height: 20px;
        background-color: aquamarine;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <span>我是span</span>
      <strong>我是strong</strong>
      <div class="line">line</div>
      <!-- 清除浮动之后相当于标准流就在这条线上了，那么接下来就会按照顺序排列了 -->
      <div class="random">random</div>
    </div>
  </body>
```

这里的弊端就是无缘无故的增加了一个无意义的元素。

而且 css 的问题需要增加一个 html 的元素。所以不如用**伪元素**！

`.clear-fix::after` 这里已然成了一个固定用法。

```html
<title>11.高度塌陷解决清除浮动2</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      /*
      你会发现这个时候父元素撑不起来
      因为作为float的所有子元素并没有汇报给父类
      所有的子元素都是浮动的，那么就全部脱离标准流
      那么父元素那么就没有高度 相当于压根不存在这也就是【高度塌陷】
      */
      .box {
        height: 150px;
        width: 150px;
        background-color: green;
      }

      span {
        float: left;
        height: 100px;
        background-color: gold;
      }
      strong {
        float: left;
        height: 100px;
        background-color: yellowgreen;
      }

      .clear-fix::after {
        content: '';
        clear: both;
        /* ！！因为伪元素是inline级别，根本不是块级，所以根本不占据高度 */
        /* 所以需要添加↓
        还有一些兼容性解决。所以就是固定写法
         */
        display: block;
        visibility: hidden;
        height: 0;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <span>我是span</span>
      <strong>我是strong</strong>
      <div class="line clear-fix">line</div>
      <div class="random">random</div>
    </div>
  </body>
```
