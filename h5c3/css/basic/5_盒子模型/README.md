# 盒子模型 Box Model

> CSS 盒子模型是一个用于设计和布局网页的基本概念。在盒子模型中，每个 HTML 元素都可以视为一个盒子，这个盒子包含了几个不同的部分：
>
> - 内容（content）
> - 内边距（padding）
> - 边框（border）
> - 外边距（margin）

这个盒子模型差不多只要是 html 都有一个盒子。**包括 html 和 body 标签也是一个盒子。**

![CSS Box Model explained](https://iq.opengenus.org/content/images/2020/03/css_box_model.png)

下面是一个宽度表示

![File:Css box model.svg - Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Css_box_model.svg/1280px-Css_box_model.svg.png)

对于内容 content 主要会设置 width/height （只有 block 和 inline-block 级别可设置 width/height）！

重点，设置是内容。IE 的话，width 包括到了 padding，如果不是 IE 呢？基本上会设置 width/height。

### 组成

1. **内容（Content）**：
   - 这是盒子的主体部分，包含实际的文本和图像。
   - 在盒子模型中，**内容区域的大小可以通过设置 `width` 和 `height` 属性来控制**。
2. **内边距（Padding）**：
   - 内边距是内容区域周围的空间。
   - 它位于内容区域和边框之间。
   - 内边距可以通过 `padding` 属性设置，并且可以为盒子的每一边（上、右、下、左）分别设置。
3. **边框（Border）**：
   - 边框环绕在内边距和内容之外。
   - 它的大小、样式和颜色可以通过 `border` 属性来定义。
   - 同样，可以为盒子的每一边单独设置边框。
4. **外边距（Margin）**：
   - 外边距是盒子与其他元素之间的空间。
   - 它位于边框外侧。
   - 通过 `margin` 属性设置，并且可以为每一边单独设置。

## 1 盒子大小

### 1-1 标准盒模型 （不是重点）

在这个模型中，元素的最终宽度和高度是内容的 `width`/`height` 加上 `padding` 和 `border` 的大小。

```css
.box {
  width: 300px;
  padding: 10px;
  border: 5px solid black;
  margin: 15px;
  box-sizing: border-box; /* 标准盒模型会将盒子总宽度计算为 340px (300 + 10*2 + 5*2) */
}
```

### 1-2 CSS3 ⭐️

- **盒模型的 CSS3 属性** `box-sizing` 🔥
  - `content-box`（默认）：遵循标准模型，`width` 和 `height` 只包括内容。
  - `border-box`：`width` 和 `height` 包括内容、内边距和边框。

```css
box-sizing: border-box; /* 除了margin其他都算在里面 🔥 都用这个*/
box-sizing: content-box; /* 【默认的】 包括content+padding+border 😣会被撑大*/
```

#### content-box 默认

- **行为**：这是 CSS 的默认盒子模型。在这个模型中，元素的宽度和高度只包括内容区域。内边距（padding）和边框（border）的宽度不包括在内。

- **计算方式**：总宽度 = 内容宽度 content + 左右内边距 padding + 左右边框宽度 border；总高度同理。

```css
.box {
  box-sizing: content-box;
  width: 300px;
  padding: 10px;
  border: 5px solid black;
}
```

在这个例子中，盒子的实际宽度将是 330px（300px 内容宽度 + 20px 内边距 + 10px 边框）。

#### border-box 常用

- **行为**：在 `border-box` 模型中，元素的宽度和高度包括内容区域、内边距和边框。

- **计算方式**：总宽度 = 内容宽度；任何内边距和边框的宽度都包含在盒子的宽度内。

```css
.box {
  box-sizing: border-box;
  width: 300px;
  padding: 10px;
  border: 5px solid black;
}
```

在这个例子中，盒子的实际宽度仍然是 300px，内边距和边框的宽度包含在这 300px 内。

小 demo 验证

```html
<style>
  .box1 {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    border: solid #5b6dcd 10px;
    padding: 5px;
  }

  .box2 {
    width: 100px;
    height: 100px;
    /* 明明设置一样的border和padding会发现这里比较大，因为撑开了 */
    box-sizing: content-box;
    border: solid #333 10px;
    padding: 5px;
  }
</style>
<title>1验证box-sizing</title>
</head>
<body>
  <div class="box1">border-box</div>
  <div class="box2">content-box 会被撑开的</div>
</body>
```

> ### 使用场景
>
> - **`content-box`**：适用于当你希望盒子的宽高严格控制内容区域时。这在某些精确布局设计中很有用。
> - **`border-box`**：在构建响应式设计时非常有用，因为它简化了尺寸计算。当设置百分比宽度时，你不必担心内边距和边框会使元素超出其容器。
>
> ### 选择建议
>
> 大多数现代的 CSS 框架和开发者倾向于使用 `border-box`，因为它使得布局的计算更直观且易于管理，特别是在处理复杂的布局和响应式设计时。通过在全局样式中设置 `* { box-sizing: border-box; }`，可以确保所有元素都使用这种更直观的盒子模型。

## 2 content 内容

block 级别可是设置宽高**width/height**，主要是给内容设置的。

> **没有设置的情况下，默认是 auto，不是 100%。100%是相当于父元素占据 100%。**
>
> **auto 的意思是交给浏览器做。**

行内非替换元素是无效的。比如 span，a。

### `min-width`/`max-width`

这里说一下这个，先不说高度。因为用的不多，现在无论是浏览器还是手机端

max-width:750px 最大就是 750px，超过也只是会显示到 750px 而已。哪怕你浏览器窗口已经拉到 1000px，也只是 750px。

min-width:500px 不可以小于 500px， 如果继续缩小到 400，就会出现滚动条。

> img 这种宽度，不设置的话就是 auto，也就是图片本身的大小。

`max-width` 和 `min-width` 是 CSS 中用于控制元素宽度范围的属性。这两个属性确保元素的宽度不会超过或低于指定的值，无论容器或视口（viewport）的大小如何变化。

`max-width`

- **定义**：`max-width` 属性定义元素的最大宽度。如果内容的自然宽度小于 `max-width`，则使用内容的自然宽度；如果内容的自然宽度大于 `max-width`，则元素宽度会被限制为 `max-width`。
- **使用场景**：非常适合用于响应式设计，确保元素在大屏幕上不会变得过大。

假设我们有一个元素设置了 `max-width: 750px`：

```css
.box {
  max-width: 750px;
  background-color: lightblue;
  margin: auto; /* 为了在页面中居中 */
  padding: 20px;
}
```

- **大于 750px 的情况**：如果容器或浏览器窗口宽度大于 750px，`.box` 元素的宽度将被限制为最大 750px，不会继续增长。
- **小于 750px 的情况**：如果容器或浏览器窗口宽度小于 750px，`.box` 元素的宽度将调整为小于或等于容器的宽度，但不会超过 750px。

`min-width`

- **定义**：`min-width` 属性定义元素的最小宽度。如果内容的自然宽度大于 `min-width`，则使用内容的自然宽度；如果内容的自然宽度小于 `min-width`，则元素宽度会被扩展到 `min-width`。
- **使用场景**：用于确保元素（如导航栏、侧边栏）即使在小屏幕上也保持一定的宽度。

假设我们有一个元素设置了 `min-width: 300px`：

```css
.box {
  min-width: 300px;
  background-color: lightblue;
  margin: auto;
  padding: 20px;
}
```

- **大于 300px 的情况**：如果容器或浏览器窗口宽度大于 300px，`.box` 元素的宽度将根据内容自然增长，但不会小于 300px。
- **小于 300px 的情况**：如果容器或浏览器窗口宽度小于 300px，`.box` 元素的宽度将被固定为 300px，不会缩小。会出现进度条。

总结

> `max-width` 控制元素的最大宽度，常用于响应式布局，防止元素在大屏幕上过宽。
>
> `min-width` 控制元素的最小宽度，确保元素在小屏幕上仍具有足够的宽度。
>
> 这两个属性在响应式设计中非常有用，特别是结合媒体查询使用时，可以为不同屏幕尺寸提供更好的布局控制。

## 3 padding 内边距

> 内容 → 边框 的距离，就是内边距。

要注意区分 line-height 和 padding，**但是行高这个不是内边距。设置内边距还要是 padding**。

> 小 TIPS，如何缩小。因为是按照顺时针顺序。
>
> 上 右 下 左 （少些的话，少的那个就是对面的）

```css
padding: 10px 20px 30px 40px; /* 上 右 下 左 */
```

如果写 2 个的话。

```css
padding: 20px, 30px; /*上下就是20px，左右就是30px*/
padding: 20px, 30px; /*上下就是20px，左右就是30px*/
```

最近发现一个小的 TIPS，就是关于百分比的原因。padding 的百分比%是相对于谁呢？

[MDN：padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding)的说法

> 相对于包含块的 width，以**百分比值为内边距**。

其实就是以包含块的 width 为基准。

## 4 border 边框

这个和其他最大的区别，border 是有样式的。有宽度。有颜色。

> 其他只有大小

[MDN:border](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)

```css
border: 4mm ridge rgba(211, 220, 50, 0.6);
```

![image-20231213233553503](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20231213233553503.png)

## 5 margin 外边距 ⭐️⭐️

上面说的 content，padding，border 都是盒子内部的问题。不是说盒子和盒子之间的问题。

而 margin 说的是盒子和盒子之间的问题。

首先外边距，这个坑特别多。

### 5-1 上下折叠 collapse

这个的话，父子和兄弟都有可能发生。

垂直方向相邻 2 个折叠，只有上下折叠。水平方向的 margin-left/margin-right 不会折叠。

```html
<style>
  .parent {
    width: 200px;
    height: 200px;
    background-color: gold;
    /*现象1 就是上下设置 父子*/
    /* 父子都设置了10px 但是最后不是20px 而是10px */
    margin-top: 10px;
  }
  .child {
    width: 100px;
    height: 100px;
    background-color: yellowgreen;
    /* 父子都设置了10px 但是最后不是20px 而是10px */
    margin-top: 10px;
  }

  .mario {
    width: 100px;
    height: 100px;
    background-color: gold;
    /* 马里奥设置了10px向下 路易设置了10px向上 最后不是20 而是10*/
    margin-bottom: 10px;
  }
  .luigi {
    width: 100px;
    height: 100px;
    background-color: yellowgreen;
    margin-top: 10px;
  }
</style>
</head>
<body>
  <h2>父子元素</h2>
  <div class="parent">
    <div class="child">child</div>
  </div>
  <h2>兄弟</h2>
  <div class="mario">mario</div>
  <div class="luigi">luigi</div>
</body>
```

首先只有上下才有折叠，左右没有。

```html
<style>
  /* 测试上下外边距 */
  /* 会发现margin上下会有折叠，最后不是60px 而是30px */
  .box {
    width: 100px;
    height: 100px;
    background-color: gold;
    margin-bottom: 30px;
  }

  .container {
    width: 100px;
    height: 200px;
    background-color: greenyellow;
    margin-top: 30px;
  }

  /* 测试左右外边距 */
  /* 由于这个div是块级元素，所以想要左右排列，比如转换成inline-block */
  /* 左右外边距不会发生折叠 */
  .box2 {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: bisque;
    margin-right: 30px;
  }

  .container2 {
    display: inline-block;
    width: 100px;
    height: 200px;
    background-color: blueviolet;
    margin-left: 30px;
  }
</style>
</head>
<body>
  <div class="box"></div>
  <div class="container"></div>
  <br />
  <div class="box2">box2</div>
  <div class="container2">container2</div>
</body>
```

> 为什么会发生？
>
> 因为系统认为你是错的，2 个紧挨着的东西，怎么俩都设置呢？
>
> 如何解决？你只设置一个不就好了。谁让你设置俩。本来按照正常情况怎么可以同时设置一个 top/bottom。我们正常肯定只会设置一个 top。

### 5-2 父子上下传递

这个现象。验证 demo。

```html
<title>4父子margin上下传递</title>
    <style>
      .parent {
        width: 200px;
        height: 200px;
        background-color: gold;
      }
      .child {
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        /* 只是下移子元素而已，父元素也一起下垂了 */
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="child"></div>
    </div>
  </body>
```

解决方案

- 父元素使用 padding （因为根据语义化本来这种都该使用 padding 【此处有例子 推荐】
- 设置 border （虽然可以解决，但是多了个 border 很不雅观。也不是最佳解决方案。
- BFC 设置（有点麻烦，以后说。其实相当于给某个盒子设立空间。触发外面盒子 BFC，比如。overflow:auto)

> 这里要注意，padding 一般用于父子之间。margin 一般用于兄弟之间。所以父子元素的时候，就不要想用 margin。

## 6 block 元素水平居中 ⭐️

居中是一个老生常谈的问题。很多东西都有居中。

block 默认情况下是独占一行的。独占一行肯定没有居中这一说法的，如果你设置了宽度了呢？

一旦设置了宽度之后，就有了居中问题。

下面是一个例子。

```html
<title>5block级别不能用text-align</title>
<style>
  .box {
    width: 500px;
    height: 500px;
    background-color: gold;
    /* 根本没用 因为子元素根本不是inline */
    text-align: center;
  }

  .container {
    /* 这样才可以 */
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: greenyellow;
  }
</style>
</head>
<body>
  <div class="box">
    <div class="container">container</div>
  </div>
</body>
```

所以如何居中呢？使用 margin:0,auto

原理，**block box width = width + padding + border +margin**

由于没有设置其他的。所以现在就是 ↓

原理，block box width = 100 + 0 + 0 +margin

虽然本来是占据一行，当你给她设置距离的时候就没办法占据一行，那么当你写 width 之后，会优先给 width，然后在给了 margin-left。由于 margin-left 设置为 0，所以默认情况下就是 0，那么为了让 block 依旧占据了一整行。在即使 margin-right 默认为 0 的情况下，就变成了 auto。

> 结论 ↓
>
> margin 上下设置 0，设置 auto 之后。margin-left/margin-right 默认值都是 0，这个时候你设置 auto，2 个都是 auto 的情况下，会自动居中。
>
> **这也解释了 height 的垂直方向无法设置居中的原因！**

block 居中 → 给自己设置`margin:0, auto`

inline 非替换元素 居中 → 给父亲设置 `text-align:center`

> 以后居中用 flex 布局就好。

## 7 outline 外轮廓

不占据大小，也有样式，很少用。主要是 input 框选中框& a 元素轮廓这种。

所以基本上开发的时候会这样设置。

```css
outline: none;
/*a给总体设置了这个，它的active等状态都是*/
```

## 8 注意事项

### 行内非替换特殊性(span/i/a/strong)

什么是行内非替换元素呢？

> - **行内（Inline）**：这部分指的是元素的显示类型。行内元素不会开始新的行，它们通常出现在文本流中，与其他行内元素或文本内容并排显示。行内元素只占据其内容所需的空间。
> - **非替换（Non-replaced）**：这部分描述了元素的内容来源。非替换元素的内容直接包含在文档中，不是从外部资源引入的。它们的内容是文档内部的，如文本或子元素。

#### 举例和特点

- **举例**：常见的行内非替换元素包括 `<span>`、`<a>`、`<strong>` 和 `<em>`。

- 特点

  ：

  - 它们的宽度和高度由内容决定，不能通过 CSS 明确设置。
  - 垂直方向的 `margin` 和 `padding` 对这些元素的布局影响有限（不会影响元素的高度）。
  - `line-height`、`vertical-align` 和 `text-align` 这类属性对行内元素非常重要。

以上盒子模型对所有的**行内非替换**元素都不会生效

比如 a/strong/i/span 如果你想生效请记得`display:inline-block`

但是要注意！！

> span 设置 padding/border 看起来会设置成功，但是不占据空间。
>
> 就是看起来会撑起来，但是不占据空间
>
> span 设置 margin 上下根本不生效。左右生效。

一个小 demo 验证

```html
<title>6inline设置padding上下 生效但不占据空间</title>
<style>
  /*
  padding 生效 不占据空间
  border 生效 不占据空间
  margin 压根不生效
  */
  .content {
    color: black;
    background-color: gold;
    /* 不生效的 只是被内容撑开 */
    width: 300px;
    height: 300px;
    /* 左右生效的 上下也是看起来生效的
    但是上下不占据 如果占据的话，div应该不会贴着才对*/
    padding: 50px;
  }
</style>
</head>
<body>
  <span class="content">我是span</span>
  我在外面了
  <div>我是div</div>
</body>
```

为什么呢？

因为 W3C 在设置这些元素的时候，是面向一个文本的，文本内如果设置这些会很不美观。行内是不单独占据一行的，所以对于上下这样乱排，很不好。

## 一些案例

**1 如何设置一个子元素向右偏移父元素 20px？**

```html
<style>
  .box {
    width: 400px;
    height: 400px;
    background-color: gold;
  }
  .child {
    width: 100px;
    height: 100px;
    background-color: greenyellow;
    /* 会发现子元素向下50px 父元素也会被传递向下50px */
    margin-top: 50px;
  }
</style>
</head>
<body>
  <div class="box">
    <div class="child"></div>
  </div>
</body>
```

上面的解决方案？

```html
<style>
      .box {
        width: 300px;
        height: 300px;
        background-color: gold;
        /* ==============解决方案1=================- */
        /* 弊端！虽然确实小盒子右移了20px */
        /* 弊端！会发现盒子整体都大了20px 变成了 120px */
        /* padding-left: 20px; */
        /* 虽然下面这个解决这个弊端 */
        /* box-sizing: border-box; */

        /* ===============================- */
        /* 解决方法2的弊端 */
        /* overflow: auto; */
      }
      .container {
        width: 100px;
        height: 100px;
        background-color: greenyellow;
        /* ==============解决方案2=================- */
        /* 这种方法不用设置  box-sizing: border-box */
        /* margin-left: 20px; */

        /* 这种也有弊端 就是设置左右可以，但是设置上下的时候会发生 margin上下父元素传递问题
            这是左右没，设置上下有问题，解决方案就是给父元素增加 overflow:auto
        */
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="container"></div>
    </div>
    <!-- 此时如果我想让内部的小盒子 距离 大盒子 右移20px 怎么办？ -->
    <!-- 是小盒子的动margin?  -->
    <!-- 还是大盒子的移动padding? -->
  </body>
```

方案 1️⃣ 使用 padding，但是会被撑开

解决：`box-sizing:border-box`

方案 2️⃣ 使用 marigin，左右没问题。上下父子会被传递。

解决：对父元素使用 `overflow:auto`

子元素走，父元素也走了。`margin-top/bottom` 会出现传递。

> 子元素如果距离父元素有间距，那么还是采用 padding 好。**为什么呢？因为元素和元素之间用 margin 比较好。很多网站不区别这种，但还是要有这种想法。**
>
> - 兄弟之间用 margin
> - 父子之间用 padding

**2 独占一行如何居中？**

- block → 子元素使用`margin:0 auto`
- inline → 父元素`text-align:center`

> 其实学完布局之后就知道用的都是`display:flex;`
