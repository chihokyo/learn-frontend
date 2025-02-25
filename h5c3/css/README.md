# 一网打尽 CSS

这里先写一下我的目录结构。然后写给n年后看到我这篇文章的自己。

```
.
├── advanced # 2.稍微进阶一点可以看
├── basic # 1.基础 从这个开始看最好 可以速度补一下基础
├── project # 3.主要是各种项目
├── tips # 4.难点和一些小技巧
└── 设计 # 5.css和设计密切相关 这里主要说一些设计相关
```



## 学习步骤

这里我只说复习用，啥都不会的小白，可以迅速无视。

- basic 基础知识（建议 2 天全部复习完，有能力的1天也未尝不可以）
- 直接做项目（动手打才是第一生产力）
- 难点重点再学习就可以

## 前言

前端学了这么久，回归到了本质。就是 HTML+CSS+JS 三剑客。但 CSS 其实是很难学习的一门技能，为什么呢？因为属性太多？因为好多技巧？其实都不是。

其实是因为没有什么最佳实践 best practice。一个效果往往都有 n 多种实现的方式，而且好的 CSS 还跟一些设计师的风格息息相关。所以经常感觉人家都很牛，但是自己貌似一看就会，属性也都认识。但是自己就是没办法写出来。因为你即使抄过来现在写出来，换了一个项目就完全不懂了。

而且就是因为上面的 css 写起来很困难，一堆人又搞了 scss/less/tailwind，什么预处理器。什么编译。还有 css in js 的思想，就是用 js 写 css 这样子的玩意儿，更糊涂了。**但是有一点就是万卷不离其宗的！**

> 你无论 css 变出来多少花，最后显示出来的都是浏览器里**最基础的 css**！就是你浏览器点右键会看到的 css！
>
> 所以打好基础比什么都重要。



----

以下内容都是陈年做的草稿，删了可惜，留着也没啥太大用。因为都几乎融合在basic里面了。

---



## ⚠️ 基础

接下来开始从最基础开始说，css 是啥时候在浏览器运行的？

## scss/less

解决了什么难题？

## css in js

解决了什么难题？

## Q&A 自问自答

从这里开始的自问自答都是特别细节的，一定要熟练掌握。

### Q1 css 是在浏览器的什么阶段运行的？

直接看下面这个图

![image-20220826145349658](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220826145349658.png)

![image-20220826151314549](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220826151314549.png)

总结

> - 下载单个 html
> - 逐行解析
>   - 遇到 **link 里的 css 之后另起一个线程下载 + 解析**
>   - 遇到 script 标签直接阻塞，直到 js 下载解析完才行
> - 构建 DOM Tree
> - **css 解析完成之后 构建 CSSOM Tree**
> - DOM Tree + CSSDOM Tree = Render Tree 此时有了这个 Render Tree。**这个时候信息是整体很全的（包裹节点以及样式，但没节点的尺寸和位置信息）**。还有由于一些`display:none`等等。此时是不会显示页面上的
> - Layout 闪亮登场，来计算一下位置和尺寸信息，layout 里面包含很多位置信息，Render Tree 只有节点和样式而已。
> - Layout + Render Tree = Painting 了
> - 最后 Display（Painting 绘制到像素点之上，就会 display）

### Q2 所有的元素都可以用 div 替代吗？

答案是可以的。理论上来说，所有 HTML 元素，都可以实现相同事情。

只要你设置好了 css，即使你写的是 div，也可以替代成 a。你所有的元素都可以通过 css 给模拟出来。

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

### Q3 css 写在哪里？

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

### Q4 css 真正的文档在?

[*Cascading Style Sheets*home page](https://www.w3.org/TR/?tag=css)

### Q5 如何知道 css 的各个浏览器兼容性？

来这里看就行了 https://caniuse.com

### Q6 fontzise 默认是多少？

默认就是 16px，可以在浏览器的设置里修改的。也就是 1rem 就是 16px。所以做自适应的时候经常设置成

```css
font-size: 62.5%; /*本质就是10px/16px=62.5*/
margin: 1rem; /*这里就是10px*/
```

### Q7 background 和 background-color 区别是？

color 首先是前景色，比如字体的。

background-color 是背景色，重点在色。

background 重点在背景，可以是图片等等。

### Q8 div 和 span 有什么区别

其实没什么区别，无非就是一个是`display:block`，而 span 是一个`display:inline`

div 的 width 占据一整行，height 由内容撑起来。没有内容的话，那么高度就是为 0 了。

### Q9 link 可以引入什么

css 可以，站点图标也可以，只要修改下 rel 就可以。

```html
<link rel="icon" href="" />
```

### Q10 text-align 可以让图片居中吗？本质是?

这个原本的意思是相对于**块状父元素**对齐，并且子元素要是行内级 inline 级别。所以 div 的折叠不可以。

- 父元素要是 display:block 。子元素必须是 inline-level 级别。

此处缺少一个对比代码。

<iframe height="300" style="width: 100%;" scrolling="no" title="text-align" src="https://codepen.io/chihokyo/embed/WNJWXya?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/chihokyo/pen/WNJWXya">
  text-align</a> by chihokyo (<a href="https://codepen.io/chihokyo">@chihokyo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

虽然本来是文本的对齐方式，left/right/center/justify。但是图片也属于 inline 级别的，属于 inline-replace 级别。所以图片也可以居中。

### Q11 font-size 的大小是？为什么都爱在 body 设置 font-family？

浏览器模式是 16px。这个可以在浏览器内修改。因为有继承性。设置在 body 就全部可以适配了。

### Q12 line-height 为什么可以做居中？

首先行高是一行的高度，不是多个。

行高的严格定义，两行文字 baseline 之间的间距。

![line-heightとは？基本の設定の仕方やオススメの設定方法について解説！ | ウェブカツBLOG](https://webukatu.com/wordpress/wp-content/uploads/2020/11/line-height%E3%81%A8%E3%81%AF.jpg)

下面这个图比较清晰

看清楚了，行高就是两个 baseline 的距离。

![CSS Inline Layout Module Level 3 （日本語訳）](https://triple-underscore.github.io/css-inline/text-edge.png)

> 根据数学运算，这里的基线之间的高度就是**一行文本的高度**。

![image-20221017225221442](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221017225221442.png)

为什么行高会居中呢？比如行高 20px，文字是 16px，那么 css 就会自动计算

```
(20px - 16px) / 2 = 2px
(行高 - 文本高度) / 2
所以文本就刚好可以居中显示出来。
```

所以有时候我们

<iframe height="300" style="width: 100%;" scrolling="no" title="line-height行高问题" src="https://codepen.io/chihokyo/embed/gOzyoBy?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/chihokyo/pen/gOzyoBy">
  line-height行高问题</a> by chihokyo (<a href="https://codepen.io/chihokyo">@chihokyo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

注意点

- 只适用于文本 如果你想让一个文本居中，就用这个。其他的不行。
- line-height 只能和你设置的高度 height 一样，高的话也不会居中。

### Q13 font 字体属性是可以进行缩写的

具体缩写规则看 MDN
