# 元素特性

> 这个也是非常重要的一个点。经常容易错的，下面的概念傻傻分不清楚。
>
> **块级 block level**
>
> **行内级 inline level**
>
> 其实这个吧。是有历史的

## 1 历史渊源

在说 css 之前先说一下 html 的小历史，就是当初 html 造出来的时候是为了你让你网上购物的吗？nonono，并不是的。当初 html 出来是**代替报纸的一种媒介存在**，大家都是为了看信息，没有交互的。这就是最早的历史。

所以说到传统媒介的报纸的话，那么一段信息最重要的就是什么？是标题！是文本内容！这些都是重点，至于那些什么 span 的花拳绣腿并不是报纸的重点。根本没必要独自占据一行。于是就诞生了元素不同的特性。

h1/p/div 这种很**重要**的，就是**占据整整一行**的 block 元素。

那么 a/strong/span 这种相对不是特别重要，并非**独占一行**的就是 inline 元素。

> 上面就是最初分等级的原因。

但其实所有的元素本质上都是一个元素而已，其实啥等级，只跟 display 有关。你设置了啥，说你是啥你就是啥。只是我们设计 h1 这种只是为了语义化。本质可以用任意元素实现 h1，只要你的 css 属性写对。

例如 👇🏻 **html 标签本质都是一样的验证**

```html
<style>
  /* 特性都可以是被改变的 */
  .block {
    display: inline;
    background-color: gold;
  }

  .inline {
    display: block;
    background-color: greenyellow;
    width: 200px;
    height: 200px;
  }
</style>
<title>Document</title>
</head>
<body>
  <div>
    <div class="block">我是div1 我竟然可以多个占据一行了</div>
    <div class="block">我是div2 我竟然可以多个占据一行了</div>
    <span class="inline">我是span 我独占！还能设置宽高</span>
  </div>
</body>
```

## 2 display

其实这个直接结论会更好点。就是所有 css 元素都有自身的一些特性。

比如 display 这个特性。

所以先记住 👇🏻 这几个特性

- **block Block-level Elements**

  - 无论内容是啥 水平都占据**父元素一整行**，严格意义上都是父元素一行
  - 块级元素会在新的一行开始，其后的元素也会在新行开始，这意味着块级元素之间不会并排显示
  - 垂直的高度看内容决定 设置宽高之后也是独占一行
  - 可以设置宽高 width height ✅
  - 例如：<div>、<p>、<h1> 等。

- **inline Inline-level Elements**

  - 多个元素占据同一行父元素
  - 行内元素不会导致文本换行，可以在一行中并排显示。
  - 默认宽度高度完全由内容决定
  - 不可以设置宽高 width height ❌
  - 所以伪元素::after/::before 是行内级元素 所以设置宽高无效
  - **部分盒模型属性不适用**：垂直方向的外边距（`margin-top`、`margin-bottom`）和内边距（`padding-top`、`padding-bottom`）不会影响行内元素的布局。

- **inline-block Inline-block Elements**

  - ⚠️ 重点 默认情况下没有元素天生就是 inline-block 是 css 专门为 display 的值。

  - 我不想独占一行，但我想改变宽高。默认是内容撑起宽高。

  - > （经常见到 div 改成 inline-block，为什么不直接就成 inline 呢？因为我只是不想独占一行而已，我还是想改变自己的宽高的。

  - 可以转换各种元素

- **none 直接隐藏** （如何让元素隐藏这个也是一个 css 的重点。可以在外面单独写的。

## 3 img/input/video 是什么？

来自 MDN 的重要信息

> <img> is a replaced element; it has a display value of inline by default, but its default dimensions are defined by the embedded image's intrinsic values, like it were inline-block. You can set properties like border/border-radius, padding/margin, width, height, etc. on an image.

结论就是

很多人都说是不是行内级！但官方说是叫 行内替换元素`inline-replace`！

- 不独占一行
- 还可以设置宽高 ✅
- video/input 标签其实也是。看起来跟`inline-block`一样，但其实是`inline-replace`元素

在官方的分类中，`<img>` 元素被视为一个 `replaced inline`（替换行内）元素。这个术语指的是那些内容不是由 CSS 渲染的外部对象或元素，如图片、视频和表单元素。

### 替换行内元素（Replaced Inline Element）

- **定义**：替换元素的内容不是由文档内容直接表示，而是由外部资源决定。例如，`<img>` 元素的内容由其 `src` 属性指向的图像决定。
- **行为**：虽然它们是行内元素，但在某些方面（如尺寸设置）表现得更像块级元素。
- **特点**：
  - 可以设置宽度和高度。
  - 可以应用部分外边距、内边距和边框样式。

```html
<img src="image.jpg" alt="描述" />
```

在这个例子中，`<img>` 是一个替换行内元素，其显示的图像来自 "image.jpg"。

### 与普通行内元素的区别

- **内容**：对于普通行内元素（如 `<span>` 或 `<a>`），内容直接由文档中的文本或子元素决定。而对于替换行内元素，内容由外部源决定。
- **样式**：替换行内元素在某些样式属性上的应用，如宽度和高度的设置，与普通行内元素有所不同。

### 其他替换

类似于 `<img>` 的 `replaced inline`（替换行内）元素包括那些其内容由外部资源定义，而不是由文档内容直接表示的元素。这些元素在布局和样式上表现出与常规行内元素不同的特点。以下是一些常见的替换行内元素：

1. **`<iframe>`**：用于在当前文档中嵌入另一个 HTML 页面。
2. **`<video>`**：用于嵌入视频内容。
3. **`<audio>`**：用于嵌入音频内容。
4. **`<canvas>`**：提供一个画布，可以用 JavaScript 动态绘制图形（如图表和其他图像）。
5. **`<object>`**：用于嵌入各种类型的多媒体，包括 Flash 动画、PDF 和 Java applets。
6. **`<embed>`**：用于嵌入各种类型的内容，如视频、音频、Flash 动画等。
7. **`<applet>`**（已废弃）：用于嵌入 Java applets。由于安全和兼容性问题，已被现代 Web 标准弃用。
8. **表单元素**：
   - **`<input>`**：特定类型的 `<input>`（如 `type="image"`）。
   - **`<textarea>`**：用于多行文本输入。
   - **`<select>`** 和 **`<option>`**：用于创建下拉选择菜单。

替换行内元素的共同特点是，它们通常有**固有的尺寸（由外部内容决定），可以设置宽度和高度，并在某些方面表现得类似于块级元素**。这些元素在 Web 设计和布局中发挥着重要作用，特别是在嵌入多媒体和其他外部内容时。

## 4 各种验证

为了验证上面直接给的结论，下面直接上代码验证。

**inline 元素无法更改宽高验证**

```html
<style>
  span {
    width: 300px;
    height: 300px;
    background-color: gold;
  }
</style>
</head>
<body>
  <span>我是span 改我的宽高默认无效的</span>
</body>
```

**独占一行验证**

```html
<style>
  /* 这里可能要思考为什么要用background-color 验证呢？ */
  /* 因为默认背景是没有颜色，只有加上背景，可以验证 */
  h2 {
    background-color: gold;
  }
  div {
    background-color: greenyellow;
  }
</style>
</head>
<body>
  <h2>我是h2 我独占一行</h2>
  <div>我是div 我独占一行</div>
</body>
```

**inline-block 有什么特性的验证**

```html
<style>
  div {
    display: inline-block;
    height: 100px;
    background-color: gold;
  }

  span {
    display: inline-block;
    width: 300px;
    height: 300px;
    background-color: greenyellow;
  }
</style>
</head>
<body>
  <div>虽然我是div1，但是我现在可以多个占据一行了！</div>
    <div>虽然我是div2，而且此时依然可以设置宽高</div>
    <span>虽然我是span，我可以在不独占一行的情况下设置宽高</span>
</body>
```

## 5 注意点

**1 p 元素内部不能放 div**

> p 作为一个文本，但是 div 是一个 block，显示上会乱七八糟。

可以在浏览器上验证，这个时候显示的曾经不是 span → div。而是平级的。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>p元素内部不能放div</title>
  </head>
  <body>
    <p>我是p <div>我是div</div>后面的p</p>
  </body>
</html>
```

**2 inline 里面最好不要放 block。其实和 👆🏻 上面的差不多**

下面给的是 ChatGPT 的讲解

## 6 ChatGPT

其实这个主要说的就是一个属性，display

```css
display: ;
```

CSS 中元素的显示类型定义了元素如何在页面上布局，每种类型都有其特定的布局和行为特性。

| 显示类型             | 描述                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| `block`              | 块级元素占据父元素的完整宽度，每个块级元素前后都有换行。                  |
| `inline`             | 行内元素不导致换行，只占据内容所需的空间。不可以设置宽高。                |
| `inline-block`       | 结合了行内元素和块级元素的特性，即不导致**换行且可以设置宽度和高度。**    |
| `none`               | 元素不显示，并从文档布局中移除（不占空间）。                              |
| `flex`               | 元素将成为一个灵活的容器，其子元素可以使用 Flexbox 模型布局。             |
| `inline-flex`        | 行内元素表现的灵活容器，其子元素使用 Flexbox 布局，但本身在文本行内。     |
| `grid`               | 元素成为一个网格容器，其子元素可以使用网格布局放置。                      |
| `inline-grid`        | 行内元素表现的网格容器，其子元素使用网格布局，但本身在文本行内。          |
| `table`              | 使元素表现得像 `<table>`，即表格布局。                                    |
| `inline-table`       | 使元素表现得像行内 `<table>` 元素，如 HTML 中的 `<table>`，但为行内显示。 |
| `table-row`          | 使元素表现得像 `<tr>`，即表格行。                                         |
| `table-cell`         | 使元素表现得像 `<td>` 或 `<th>`，即表格单元格。                           |
| `table-column`       | 使元素表现得像 `<col>`，即表格列。                                        |
| `table-column-group` | 使元素表现得像 `<colgroup>`，即表格列组。                                 |
| `table-header-group` | 使元素表现得像 `<thead>`，即表格头部区域。                                |
| `table-row-group`    | 使元素表现得像 `<tbody>`，即表格主体区域。                                |
| `table-footer-group` | 使元素表现得像 `<tfoot>`，即表格脚注区域。                                |
| `list-item`          | 使元素表现得像列表项，通常伴有列表标记和列表项格式。                      |
| `run-in`             | 根据上下文决定元素是块级元素还是行内元素。此类型很少使用且支持度不广。    |
| `contents`           | 元素本身不生成盒子，但其子元素会正常显示，即元素“消失”但内容存在。        |
| `flow-root`          | 创建一个新的块格式化上下文，类似于块级元素，但具有清除浮动的效果。        |

每种显示类型都有特定的用途，选择合适的显示类型可以帮助开发者实现期望的布局效果和组件功能。在实际应用中，经常会根据布局需求选择合适的类型，如使用 `flex` 或 `grid` 以实现复杂的布局设计。

CSS 中的块级元素（Block-level elements）和行内元素（Inline elements）是两种基本的元素显示类型，它们在页面布局和内容流中表现不同。

### 块级元素 (Block-level Elements)

块级元素特点：

1. **占据完整宽度**：默认情况下，块级元素会占据其父元素的完整宽度，即使其内容并未填满整个宽度。
2. **换行显示**：块级元素会在新的一行开始，其后的元素也会在新行开始，这意味着块级元素之间不会并排显示。
3. **可设置宽高**：可以设置宽度（`width`）和高度（`height`）。
4. **盒模型属性**：可以应用外边距（`margin`）、内边距（`padding`）、边框（`border`）等盒模型属性。

常见的块级元素包括：

- `<div>`
- `<p>`
- `<h1>` 至 `<h6>`
- `<ul>`、`<ol>`、`<li>`
- `<table>`

### 行内元素 (Inline Elements)

行内元素特点：

1. **内容决定宽度**：行内元素只占据它需要的宽度（由内容决定），不会填满整个父元素宽度。
2. **不换行显示**：行内元素不会导致文本换行，可以在一行中并排显示。
3. **不可设置宽高**：默认情况下，行内元素不能设置宽度和高度。
4. **部分盒模型属性不适用**：垂直方向的外边距（`margin-top`、`margin-bottom`）和内边距（`padding-top`、`padding-bottom`）不会影响行内元素的布局。

常见的行内元素包括：

- `<span>`
- `<a>`
- `<img>`
- `<strong>`、`<em>`

### 行内块级元素 (Inline-block Elements)

行内块级元素是介于块级元素和行内元素之间的一种类型：

1. **并排显示**：像行内元素一样，并排显示，不会导致换行。
2. **可设置宽高**：可以像块级元素一样设置宽度和高度。
3. **盒模型属性适用**：所有盒模型属性都适用，包括外边距、内边距和边框。

常见的行内块级元素场景：

- 通过将元素的 `display` 属性设置为 `inline-block`，可以使其获得行内块级元素的特性。

### 总结

- Block 块级元素适用于需要占据一整行的场景，如段落、标题、列表等。
- Inline 行内元素适用于文本流中的小部分内容，如超链接、强调文本。
- Inline-block 行内块级元素兼具行内元素和块级元素的特性，适用于需要并排显示但又需要设置宽高的元素，如按钮。

理解这些基本概念对于掌握 CSS 布局和页面设计至关重要。
