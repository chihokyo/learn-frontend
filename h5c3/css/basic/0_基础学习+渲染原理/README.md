# CSS 基础学习

Cascading Style Sheets 层叠样式表

> 学习 css 推荐的网站
>
> - 这是一个免费的视觉指南，它展示了最受欢迎的 CSS 属性，并通过带有插图和动画的示例来解释它们。这个网站提供了一个互动式的学习体验，您可以直观地看到不同 CSS 属性的实际效果，这对于理解和学习 CSS 非常有帮助。[cssreference](https://cssreference.io)

## Q1 css 是在浏览器的什么阶段运行的？

直接看下面这个图

![image-20220826145349658](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220826145349658.png)

![image-20220826151314549](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220826151314549.png)

总结

> - 下载单个 html
> - 逐行解析
>   - 遇到 **link 里的 css 之后另起一个线程下载 + 解析** 🔥 不会阻塞
>   - 遇到 script 标签直接阻塞，直到 js 下载解析完才行 🔥 会阻塞
> - 构建 DOM Tree
> - **css 解析完成之后 构建 CSSOM Tree**
> - DOM Tree + CSSDOM Tree = Render Tree 此时有了这个 Render Tree。**这个时候信息是整体很全的（包括节点以及样式，但没节点的尺寸和位置信息）**。还有由于一些`display:none`等等。此时是不会显示页面上的
> - Layout 闪亮登场，来计算一下位置和尺寸信息，layout 里面包含很多位置信息，Render Tree 只有节点和样式而已。
> - Layout + Render Tree = Painting 了
> - 最后 Display（Painting 绘制到像素点之上，就会 display）

下面是 ChatGPT 的回答。

> CSS 在浏览器的渲染过程中起着关键作用。理解这个过程，包括 CSSOM（CSS Object Model）和 DOM（Document Object Model）是如何结合来渲染网页的，对于深入理解前端开发非常重要。这个过程可以分为几个主要阶段：
>
> ### 1. 解析 HTML 生成 DOM
>
> - 当浏览器加载 HTML 文件时，它首先解析 HTML 代码来构建 DOM。
> - DOM 是网页的结构化表示，表示页面上的所有元素和它们之间的关系。
>
> ### 2. 解析 CSS 生成 CSSOM
>
> - 同时，浏览器解析遇到的所有 CSS（无论是外部文件、`<style>` 标签内的样式，还是行内样式）来构建 CSSOM。
> - CSSOM 是 CSS 的对象模型，它表示所有 CSS 规则及其与 DOM 元素的关系。
>
> ### 3. 渲染树的构建
>
> - 接下来，浏览器将 DOM 和 CSSOM 结合起来创建渲染树。
> - 渲染树只包含需要显示的元素及其样式信息。
> - 在这个阶段，不可见的元素（如设置了 `display: none;` 的元素）不会被包含在渲染树中。
>
> ### 4. 布局（Reflow）
>
> - 创建渲染树后，浏览器会进行布局（也称为重排或回流），确定每个元素的确切大小和位置。
>
> ### 5. 绘制（Paint）
>
> - 布局阶段完成后，浏览器继续进行绘制（Paint）阶段，将每个元素绘制到屏幕上。
>
> ### 6. 合成（Compositing）
>
> - 最后，可能还会进行合成阶段，尤其是当页面包含复杂的效果如 3D 变换或阴影时，合成可以优化性能。
>
> ### 关于线程和渲染
>
> - 通常，浏览器的主渲染过程是在单个主线程上完成的，而不是开启新的线程来处理 CSS。这就是为什么长时间的 JavaScript 执行会阻塞页面渲染的原因。
> - 但是，现代浏览器可能会使用后台线程来处理一些如图像解码或一些网络请求等任务。
>
> 整个过程是一连串的步骤，CSSOM 和 DOM 的结合是这个渲染过程的核心部分。这解释了为什么更改 CSS 或 DOM 会触发重排和重绘，以及为什么优化 CSS 和 JavaScript 对提高网页性能至关重要。

### 关于 render tree ➡️ layout 细节

Render Tree 的构建和 Layout（布局）阶段。我将详细解释每个阶段以及“节点的尺寸和位置信息”这一点如何与重排（Reflow）优化相关联。

**Render Tree 构建**

- **渲染树的内容**：渲染树结合了 DOM 和 CSSOM，包含了页面上将要显示的所有节点及其样式信息。
- **不包含的信息**：此时，渲染树中的节点尚未包含具体的尺寸和位置信息。换句话说，我们知道哪些元素需要显示以及它们的样式（如颜色、字体等），但还不知道它们在页面上的确切位置或大小。
- **对 `display: none;` 的处理**：设置为 `display: none;` 的元素不会包含在渲染树中，因为它们不需要显示，也不占据页面上的空间。

**Layout 阶段**

- **计算尺寸和位置**：在布局阶段，浏览器计算渲染树中每个节点的确切位置和大小。这个过程也称为重排或回流（Reflow）。
- **涉及的因素**：布局计算考虑了多种因素，包括元素的大小、屏幕的大小、文本的大小等。
- **页面准备**：完成这些计算后，浏览器才能准确地知道每个元素在页面上的位置，从而正确地绘制它们。

**重排（Reflow）优化**

- **触发重排的操作**：当元素的大小、布局或位置发生变化时，会触发重排。例如，添加或删除元素、更改元素的大小、更改窗口的大小等。
- **优化策略**：
  - **最小化 DOM 操作**：批量进行 DOM 更新，例如使用 `documentFragment` 或先将元素设为 `display: none;` 进行多次修改后再显示。
  - **避免不必要的复杂样式**：复杂的 CSS 选择器或布局可能增加布局计算的负担。
  - **使用合适的 CSS 属性**：某些属性如 `transform` 和 `opacity` 可以触发合成而不是重排，因为它们不影响布局。

> 差不多就是这种感觉 render tree ➡️ layout【reflow】➡️ 像素点绘制

## Q2 重绘和重排是什么？有什么区别？

重排和重绘在 CSS 和网页渲染过程中是两个关键的性能考量。它们在英文中分别称为 "Reflow"（重排）和 "Repaint"（重绘）。了解它们的区别、发生的阶段以及影响因素对于优化网页性能非常重要。

**Reflow (重排)**

- **定义**：当元素的尺寸、结构或某些属性变化时，浏览器重新计算元素的位置和大小。这个过程称为 Reflow。
- **发生阶段**：
  - 当添加或删除 DOM 元素时。
  - 当元素位置改变，或者其可见性（visibility）改变。
  - 当使用 JavaScript 动态改变样式时。
  - 当用户在页面上进行操作，如调整窗口大小、滚动页面等。

**Repaint (重绘)**

- **定义**：当元素的外观改变，但不影响其布局时，浏览器会重新绘制元素。这个过程称为 Repaint。
- **发生阶段**：
  - 改变元素颜色、背景色等不影响布局的属性。
  - 更改元素的可见性（如更改 `opacity`）。

**重排和重绘的不同**

- **影响范围**：重排通常比重绘更昂贵，因为它可能会影响页面的整个布局。而重绘通常只影响元素的外观，不涉及布局的变化。
- **性能成本**：重排总是伴随着重绘，但重绘不一定伴随着重排。因此，**重排通常比重绘更消耗资源**。

**影响重排和重绘的属性**

- **触发重排的属性**：涉及元素布局的属性，如 `width`、`height`、`margin`、`padding`、`border`、`top`、`left`、`right`、`bottom`、`position` 等。
- **触发重绘的属性**：不影响布局但改变外观的属性，如 `color`、`background-color`、`visibility`、`background-image` 等。

**性能优化**

- **最小化重排和重绘**：通过优化 CSS 和 JavaScript，减少触发重排和重绘的操作。
- **合并 DOM 和样式更改**：批量进行 DOM 操作和样式更改，而不是逐个更改。
- **使用现代 CSS 特性**：例如使用 `transform` 和 `opacity` 进行动画，这些属性可以通过合成器而非通过主渲染线程来处理，从而提高性能。

了解并优化重排和重绘对于构建流畅、响应迅速的网页至关重要。

## Q3 css 写在哪里？

- 内联 inline `<div style="color:red"></div>`
- 内部 internal `<style></style>`
- 外部 external `xxx.css`文件导入进来就行

外部引入有两种

```html
<link rel="stylesheet" href="./style.css" />
```

另一种在 css 文件内用 import

```css
@import url(./style.css); /*url函数引入*/
@import './style.css'; /*直接导入*/
```

ChatGPT 给的答案

> 在 CSS 中，有多种方式可以将样式应用到 HTML 元素上。这些方法各有其适用场景和优缺点。下面是所有主要方法的列表和示例：
>
> **1. 外部样式表 (External Stylesheet)**
>
> - 使用单独的 `.css` 文件来编写样式，并通过 `<link>` 标签在 HTML 中引入。
> - 示例：
>   ```html
>   <link rel="stylesheet" type="text/css" href="styles.css" />
>   ```
>
> **2. 内部样式表 (Internal Stylesheet)**
>
> - 在 HTML 文档内部的 `<head>` 部分使用 `<style>` 标签来包含 CSS 规则。
> - 示例：
>   ```html
>   <head>
>     <style>
>       body {
>         background-color: lightblue;
>       }
>       p {
>         color: navy;
>       }
>     </style>
>   </head>
>   ```
>
> **3. 行内样式 (Inline Styles)**
>
> - 直接在 HTML 元素上使用 `style` 属性来添加样式。
> - 示例：
>   ```html
>   <p style="color: red; font-size: 20px;">This is a paragraph.</p>
>   ```
>
> **4. 导入样式表 (@import)**
>
> - 在 CSS 文件或 `<style>` 标签内部使用 `@import` 规则来导入另一个 CSS 文件。
> - 示例：
>   ```css
>   @import url('another-styles.css');
>   ```
>
> 这个和上面 link 不同的是这个是在 css 里。link 是在 html 里。
>
> ```css
> /* 可以在主index.css里写上 这样就不必在html里写上link3行导入了*/
> @import url('a.css');
> @import url('b.css');
> ```
>
> **5. JavaScript**
>
> - 使用 JavaScript 来动态地改变元素的样式。
> - 示例：
>   ```javascript
>   document.getElementById('myElement').style.color = 'blue';
>   ```
>
> **6. CSS 变量 (CSS Variables)**
>
> - 定义 CSS 变量，并在多处使用它们。
> - 示例：
>
>   ```css
>   :root {
>     --main-color: green;
>   }
>
>   body {
>     color: var(--main-color);
>   }
>   ```
>
> **7. CSS 预处理器 (CSS Preprocessors)**
>
> - 使用 CSS 预处理器（如 Sass、Less 或 Stylus）编写样式，然后将其编译为标准 CSS。
> - 示例（使用 Sass）：
>
>   ```scss
>   $text-color: red;
>
>   p {
>     color: $text-color;
>   }
>   ```
>
> 每种方法都有其特定的用途和优势。例如，外部样式表有利于维护和缓存，而行内样式则适用于快速测试或特定元素的单次样式更改。选择合适的方法取决于具体的项目需求和上下文。

## Q4 关于 css 属性编写规则

书写 CSS 属性时遵循一定的顺序可以提高代码的可读性和可维护性。虽然没有绝对的标准，但以下是一个常见的、被广泛认可的顺序示例，通常按照属性类型分组：

1. **定位属性**：与元素定位相关的属性。

   ```css
   position, top, right, bottom, left, z-index
   ```

2. **盒模型属性**：控制元素布局的基础属性。

   ```css
   display, float, width, height, max-width, max-height, min-width, min-height, margin, padding, border, box-sizing
   ```

3. **排版属性**：处理文字排版和字体样式的属性。

   ```css
   font-family, font-size, font-weight, font-style, font-variant, font-stretch, line-height, letter-spacing, text-align, text-transform, text-decoration, text-indent, white-space, word-spacing, color
   ```

4. **视觉效果属性**：改变元素外观的属性，如颜色、背景、阴影等。

   ```css
   background, background-color, background-image, background-position, background-size, background-repeat, background-origin, background-clip, border-radius, box-shadow, opacity
   ```

5. **CSS3 动画与转换属性**：用于动画和视觉效果的高级属性。

   ```css
   transition, animation, transform
   ```

6. **其他属性**：所有其他属性，如光标样式、溢出行为等。
   ```css
   cursor, overflow, list-style, outline, visibility, user-select
   ```

下面是一个应用这种顺序的示例：

```css
.selector {
  /* 定位属性 */
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;

  /* 盒模型属性 */
  display: block;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #333;
  box-sizing: border-box;

  /* 排版属性 */
  font-family: 'Helvetica', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* 视觉效果属性 */
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  /* CSS3 动画与转换 */
  transition: all 0.3s ease;
  transform: scale(1.1);

  /* 其他属性 */
  cursor: pointer;
  overflow: hidden;
}
```

遵循这样的顺序不是强制性的，但它可以帮助其他开发者更容易阅读和理解代码。

当然，重要的是在团队或个人项目中保持一致性。

一些团队可能会使用 CSS 排序工具或插件来自动化这一过程。

## Q5 css 真正的文档在?

[*Cascading Style Sheets*home page](https://www.w3.org/TR/?tag=css)

## Q6 css 全部属性都要学吗？

没有必要，但是一定要记住最最最基础的几个。这些很重要。

## Q7 所有的元素都可以用 div 替代吗？

答案是可以的。理论上来说，所有 HTML 元素，都可以实现相同事情。

只要你设置好了 css，即使你写的是 div，也可以替代成 a。你所有的元素都可以通过 css 给模拟出来。

下面是 ChatGPT 的回答。

> 不是所有元素都可以或应该用 `<div>` 替代。虽然 `<div>` 是一种非常灵活的块级容器，可以用于许多布局和样式化场景，但是使用适当的 HTML 元素对于构建语义化、可访问和搜索引擎友好的网页非常重要。下面是几个关键点来说明为什么不应该总是用 `<div>` 替代其他元素：
>
> 1. 语义化（Semantic Markup）
>
> - **语义化元素**：HTML5 引入了很多语义化元素，如 `<article>`、`<section>`、`<header>`、`<footer>`、`<nav>` 等。这些元素提供了关于其包含内容性质的信息，使得内容结构更加清晰。
> - **可访问性**：使用语义化标记有助于辅助技术（如屏幕阅读器）正确解释页面内容，提高网站的可访问性。
>
> 2. SEO（搜索引擎优化）
>
> - **搜索引擎优化**：语义化标记有助于搜索引擎理解页面内容的结构和重要性，从而可能提高搜索排名。
>
> 3. 维护和可读性
>
> - **代码可维护性**：使用适当的 HTML 元素可以使代码更容易理解和维护。例如，一眼看到 `<nav>`，就知道这是导航部分。
> - **团队协作**：在团队项目中，清晰的语义化标记有助于团队成员快速理解页面结构。
>
> 4. 表单和交互元素
>
> - **功能性元素**：像 `<button>`、`<input>`、`<select>` 这样的表单元素提供了特定的功能，不能仅仅用 `<div>` 替代。例如，`<button>` 自带可以点击的交互性，而 `<div>` 则需要额外的 JavaScript 来模拟这种行为。
>
> 尽管 `<div>` 元素由于其灵活性在很多情况下是有用的，但它不应该被用作所有元素的替代品。恰当地使用各种 HTML 元素对于创建结构良好、语义清晰、易于维护和优化的网页至关重要。

## Q8 浏览器的差异性问题 reset.css

> 如果你在浏览器查看一个元素 看到了是 user agent stylesheets 那么就是浏览器给样式

是的，每个浏览器都有自己的默认样式表，这意味着不同浏览器对于未明确指定样式的 HTML 元素可能会有不同的显示效果。为了确保跨浏览器一致性，通常使用 reset.css 或 normalize.css 来重置或规范这些默认样式。

**reset.css**

- **作用**：reset.css 的目的是重置浏览器的默认样式。它通过为大多数 HTML 元素设置默认样式规则（如移除外边距、内边距、字体大小等）来减少浏览器间的差异。
- **示例**：Eric Meyer 的 Reset CSS 是一个流行的例子，可在 [https://meyerweb.com/eric/tools/css/reset/](https://meyerweb.com/eric/tools/css/reset/) 获取。

**normalize.css**

- **作用**：与 reset.css 略有不同，normalize.css 保持了有用的默认值，而不是移除所有的默认浏览器样式。它修正了浏览器的差异，同时保留了有意义的默认样式。
- **优点**：normalize.css 通常更适合项目，因为它只修改了需要修正的样式，并保留了有用的默认值。
- **获取方式**：可以在 [https://necolas.github.io/normalize.css/](https://necolas.github.io/normalize.css/) 找到。

> **项目需求**：选择 reset.css 或 normalize.css 取决于你的项目需求。如果你希望从完全一致的基线开始，并完全控制所有元素的样式，reset.css 可能更适合。如果你更倾向于保持某些默认样式并在此基础上构建，那么 normalize.css 可能是更好的选择。
>
> **个人偏好**：考虑你的工作流程和团队的偏好。一些开发者更喜欢使用 reset.css 并根据需要添加样式，而另一些则偏好 normalize.css 提供的默认样式保持。

## Q9 link 元素主要是用于什么？可以详细讲解一下吗？

`<link>` 元素在 HTML 中主要用于定义一个**文档与外部资源**之间的关系。

- 它最常见的用途是用来链接 CSS 样式表
- `<link>` 元素位于文档的 `<head>` 部分。
- 站点的图标也可以使用`<link>`元素进行链接

**重要属性**

- `rel`：指定当前文档与被链接资源之间的关系类型。
- `href`：指定外部资源的 URL。
- `type`：指定资源的 MIME 类型。
- `media`：定义样式表应用于的设备类型或屏幕尺寸。

**1. 链接外部样式表**

- 最常见的用途之一。

- 通过指定 `rel="stylesheet"` 和 `href` 属性来包含外部 CSS 文件。

- 示例：

  ```html
  <link rel="stylesheet" type="text/css" href="styles.css" />
  ```

**2. 定义图标（如网站图标）**

- 用于定义浏览器标签页或书签中显示的图标。

- 常见于网站的 "favicon"。

- 示例：

  ```html
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  ```

**3. 预先加载资源（Preloading）**

- 用于告诉浏览器预先加载页面中稍后将用到的资源。

- 可以提高页面加载性能。

- 示例：

  ```html
  <link
    rel="preload"
    href="font.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
  ```

**4. 预链接（Prefetching）**

- 类似于预加载，但用于加载用户可能在将来访问的资源。

- 帮助提高用户体验。

- 示例：

  ```html
  <link rel="prefetch" href="next-page.html" />
  ```

**5. 设置 DNS 预解析（DNS-Prefetch）**

- 允许浏览器提前解析外部域名的 DNS，减少用户访问该域名时的延迟。（其实就是先帮你解析一下 DNS，从域名变成 DNS 地址）

- 示例：

  ```html
  <link rel="dns-prefetch" href="//example.com" />
  ```

**6. 定义搜索引擎关系和提供搜索查询**

- 可以用于指定搜索引擎的连接。

- 示例：

  ```html
  <link
    rel="search"
    type="application/opensearchdescription+xml"
    href="/opensearch.xml"
    title="Search Title"
  />
  ```

**7. 其他用途**

- 还可用于定义样式表之间的依赖关系、指定替代样式表等。

**定义样式表之间的依赖关系**

- 在某些情况下，一个样式表的样式可能依赖于另一个样式表中的定义。

- 通过使用多个 `<link>` 元素，你可以确保这些样式表按照正确的顺序加载。

- 例如，如果你有一个基础的样式表和一个进阶的样式表，**后者依赖于前者**的定义，你可以先链接基础样式表，然后链接进阶样式表。

  ```html
  <!-- 基础样式表 -->
  <link rel="stylesheet" href="base.css" />

  <!-- 依赖于基础样式表的进阶样式表 -->
  <link rel="stylesheet" href="advanced.css" />
  ```

**指定备选样式表**

- `<link>` 元素还可以用来定义备选样式表，允许用户从不同的样式选项中选择。

- 为了创建备选样式表，你需要在 `<link>` 元素中使用 `rel="alternate stylesheet"` 并提供一个标题。

- 用户可以在浏览器中选择使用这些备选样式表，这是一种提供主题或样式偏好选项的方法。

  ```html
  <!-- 默认样式表 -->
  <link rel="stylesheet" href="default-style.css" />

  <!-- 备选样式表 -->
  <link
    rel="alternate stylesheet"
    title="High contrast"
    href="high-contrast.css"
  />
  <link rel="alternate stylesheet" title="Large text" href="large-text.css" />
  ```

在这个例子中，用户可以在支持此功能的浏览器中选择【高对比度】或【大文本】样式作为页面的显示样式。

> 这些高级用法允许开发者为网站的样式提供更多的灵活性和用户自定义选项，从而提高网站的可用性和用户体验。
>
> 总的来说，`<link>` 元素是 HTML 中非常强大和多功能的元素，它通过链接外部资源来增强和优化网页。

## Q10 关于 css 里颜色的表示方法

在 CSS 中，颜色可以通过多种方式来表示。每种格式都有其独特的用途和特点。以下是 CSS 中所有主要的颜色表示方法：

**1. 关键字（Named Colors）**

- 使用预定义的颜色名称。
- 示例：`red`, `blue`, `green`, `black`, `white` 等。

**2. 十六进制（Hexadecimal）**

- 使用 `#` 后跟 3、4、6 或 8 位十六进制数。
- **6 位表示：`#RRGGBB`（红色、绿色、蓝色各占两位）。**
- **3 位缩写：`#RGB`（如果每个颜色分量都是相同的两个数字）。**
- 带透明度：`#RRGGBBAA` 或 `#RGBA`。
- 示例：`#ff0000`（红色），`#00ff00`（绿色），`#0000ff`（蓝色）。

**3. RGB（红绿蓝）**

- 使用 `rgb()` 函数，参数为红、绿、蓝色的值（0-255）。
- 示例：`rgb(255, 0, 0)`（红色），`rgb(0, 255, 0)`（绿色）。

**4. RGBA（红绿蓝透明度）**

- 与 RGB 相似，但增加了一个透明度值（alpha），范围从 0（完全透明）到 1（完全不透明）。
- 示例：`rgba(255, 0, 0, 0.5)`（半透明红色）。

**5. HSL（色相、饱和度、亮度）**

- 使用 `hsl()` 函数，参数为色相（0-360）、饱和度（百分比）、亮度（百分比）。
- 示例：`hsl(0, 100%, 50%)`（红色）。

**6. HSLA（色相、饱和度、亮度、透明度）**

- 与 HSL 相似，但增加了一个透明度值（alpha）。
- 示例：`hsla(0, 100%, 50%, 0.5)`（半透明红色）。

**7. 十进制（Decimal/RGBCSS）**

- 在 CSS4 中提出，使用无单位的十进制值表示颜色。
- 示例：`rgb(255 0 0)` 或 `rgba(255 0 0 / 50%)`。

**8. HWB（色相、白度、黑度）**

- CSS4 新增的颜色模型，用于描述色相、白度、黑度。
- 示例：`hwb(0 0% 0%)`（红色）。

**9. LCH（亮度、色度、色相）**

- 另一种 CSS4 新增的颜色模型，用于表示亮度、色度和色相。
- 示例：`lch(53.3% 104.6 40.9)`。

**10. Lab（CIELAB）**

- 基于 CIELAB 色彩空间的颜色表示方法，CSS4 新增。
- 示例：`lab(53.3% 80.9 67.2)`。

**11. 预设系统颜色（System Colors）**

- 用于表示用户操作系统界面中的颜色，例如 `WindowText` 或 `Background`。

这些颜色表示方法在不同的场景下各有优势，例如十六进制在 Web 开发中非常流行，而 HSL 和 HSLA 在调整颜色时更直观。随着 CSS 的发展，新的颜色模型如 LCH 和 Lab 为颜色表示提供了更多的灵活性和准确性。

## Q11 html 和 body 的属性有什么区别吗？

在 CSS 中，某些属性通常被设置在 `html` 选择器上，而另一些则更适合设置在 `body` 选择器上。这主要取决于属性的作用范围和继承规则。

**在 `html` 选择器上设置的属性**

- **字体大小** (`font-size`)：在 `html` 选择器上设置基础字体大小可以使整个页面的字体大小相对于这个基础值进行调整，特别是当使用相对单位（如 `em` 或 `rem`）时。
- **视口相关属性**：有时，可以在 `html` 上设置与视口大小相关的属性，如 `font-size`（用于响应式字体大小）。

  示例：

  ```css
  html {
    font-size: 16px;
  }
  ```

**在 `body` 选择器上设置的属性**

- **字体系列** (`font-family`)：由于 `font-family` 经常被继承，通常在 `body` 上设置。这确保了整个文档中的文本都默认使用这个字体系列，除非特别指定。
- **文本颜色** (`color`)：类似于 `font-family`，文本颜色也经常在 `body` 上设置，以保证整个页面有统一的文本颜色。
- **背景色** (`background-color`) 和 **背景图像** (`background-image`)：这些属性通常在 `body` 上设置，因为 `body` 元素代表了页面的主要部分。

  示例：

  ```css
  body {
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #fff;
  }
  ```

下面给了一个案例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 在 html 上设置基础字体大小，作为整个页面的参考 */
      html {
        font-size: 16px; /* 基础字体大小，也可根据设计需求调整 */
      }

      /* 在 body 上设置字体系列、文本颜色和背景颜色 */
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* 优先使用 Helvetica Neue，如果不可用则回退到其他字体 */
        color: #333; /* 设置基础文本颜色 */
        background-color: #f8f8f8; /* 设置背景颜色 */
        margin: 0; /* 移除默认的 margin */
        padding: 0; /* 移除默认的 padding */
        line-height: 1.6; /* 设置行高，提高文本可读性 */
      }

      /* 其他样式 */
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: #444; /* 设置标题的颜色 */
      }

      a {
        color: #007bff; /* 设置链接颜色 */
        text-decoration: none; /* 移除链接的下划线 */
      }

      a:hover,
      a:focus {
        text-decoration: underline; /* 鼠标悬浮或聚焦时添加下划线 */
      }

      /* 添加其他必要的样式规则... */
    </style>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>
      This is a paragraph of text on my website. <a href="#">This is a link</a>.
    </p>
    <!-- 页面内容 -->
  </body>
</html>
```

**通用规则和建议**

- **继承性**：考虑属性是否具有**继承性**。如果希望一个属性的值应用于整个文档中的大多数元素，那么在 `body` 上设置是合理的。
- **特定性**：如果属性更多地与页面布局或基本大小相关，那么在 `html` 上设置可能更合适。
- **覆盖和具体设置**：特定元素上的设置将覆盖 `body` 或 `html` 上的设置。例如，如果你在 `body` 上设置了字体，但在某个具体的 `<div>` 上又设置了另一种字体，那么这个 `<div>` 会使用它特有的字体设置。

总的来说，选择在 `html` 还是 `body` 上设置属性应基于你的具体需求以及属性的继承和应用规则。对于大多数全局性的视觉属性，如 `font-family` 和 `color`，在 `body` 上设置是一个好的实践。而对于基础布局和大小相关的属性，如基础 `font-size`，则可以考虑在 `html` 上设置。

> 其实就是说布局大小这种都在 html，关于大小的。
>
> 其他字体颜色的 你想要继承的，在 body 上。

## Q12 关于属性缩写，有哪些呢？

在 CSS 中，许多属性都有对应的缩写形式，这些缩写属性允许你在一行中设置多个相关属性值。以下是一些常用的 CSS 缩写属性：

1. **`background`**：

   - 缩写形式可以设置 `background-color`、`background-image`、`background-position`、`background-size`、`background-repeat`、`background-origin`、`background-clip` 和 `background-attachment`。
   - 示例：`background: #fff url('img.jpg') no-repeat center/cover;`

2. **`border`**：

   - 缩写形式可以设置 `border-width`、`border-style` 和 `border-color`。
   - 示例：`border: 1px solid #000;`

3. **`border-radius`**：

   - 缩写形式可以设置四个角的圆角半径。
   - 示例：`border-radius: 10px 5px 20px 0;`

4. **`font`**：

   - 缩写形式可以设置 `font-style`、`font-variant`、`font-weight`、`font-size`、`line-height` 和 `font-family`。
   - 示例：`font: italic normal bold 12px/30px Georgia, serif;`

5. **`margin` 和 `padding`**：

   - 分别用于设置 `margin-top`、`margin-right`、`margin-bottom` 和 `margin-left` 或 `padding` 的四个方向。
   - 示例：`margin: 5px 10px 15px 20px;`

6. **`list-style`**：

   - 缩写形式可以设置 `list-style-type`、`list-style-position` 和 `list-style-image`。
   - 示例：`list-style: square inside url('icon.png');`

7. **`outline`**：

   - 缩写形式可以设置 `outline-width`、`outline-style` 和 `outline-color`。
   - 示例：`outline: 2px dashed #f00;`

8. **`transition`**：

   - 缩写形式可以设置 `transition-property`、`transition-duration`、`transition-timing-function` 和 `transition-delay`。
   - 示例：`transition: opacity 2s ease-in-out 1s;`

9. **`animation`**：

   - 缩写形式可以设置 `animation-name`、`animation-duration`、`animation-timing-function`、`animation-delay`、`animation-iteration-count`、`animation-direction`、`animation-fill-mode` 和 `animation-play-state`。
   - 示例：`animation: slidein 3s ease-in 1s infinite reverse both;`

10. **`flex`**（用于 Flexbox）：

    - 缩写形式可以设置 `flex-grow`、`flex-shrink` 和 `flex-basis`。
    - 示例：`flex: 1 0 auto;`

11. **`grid`**（用于 Grid Layout）：
    - 缩写形式可以设置多个与网格布局相关的属性。
    - 示例：`grid: 'a a a' 100px 'b c c' 100px / 1fr 50px 1fr;`

使用这些缩写可以使 CSS 代码更加简洁和易读。不过，需要注意的是，在使用缩写时要确保不遗漏必要的值，以免产生不期望的效果。
