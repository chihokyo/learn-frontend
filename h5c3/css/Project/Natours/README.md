# 开始项目

在这里只写关于这个项目写的一些共通性质的。可能在别的项目也就不适用了。

## 1. header

只写学到的一点点 tips。虽然 css 也有注释，这里只写一些概括性质的。

### 1-1 `*和html和:root的区别`

- `*`不怎么建议写 貌似有性能上的问题
- html 和:root 本质上是一样的。

### 1-2 body 基本都写字体性质的

因为字体基本具有**继承**性质，所以基本上都在这里写。那为什么不在 html 里直接写呢？因为 body 下面才是**显示的内容**，才是具有意义的。

### 1-3 clip-path 设置裁剪元素

这个可以直接有专门网站进行裁剪

[Clippy — CSS clip-path maker ](https://bennettfeely.com/clippy/)

### 1-4 transform 的居中方案

- 绝对定位
- 先下移右移到中间
- 然后通过 transform 形变一下

都是固定用法，记住就好

```css
.header .text-box {
  /* 一个居中方案 */
  position: absolute;
  top: 50%;
  left: 50%;
  /* 截止到这里会发现有偏移，下面的变形可以相对于自身进行偏移 */
  transform: translate(-50%, -50%);
}
```

### 1-5 抗动画震动

```css
/* 抗震动 主要是动画的 这个很少见 */
backface-visibility: hidden;
```

第一次看到，还蛮激动的。

### 1-6 关于按钮的动效骚操作

直接看代码吧。

```css
/* 按钮的原始状态 & 按钮按完之后的状态 */
.btn:link,
.btn:visited {
}
/* 悬浮状态 */
.btn:hover {
}
/* 按下去的时候 */
.btn:active {
}
```

### 1-7 利用伪元素给按钮做动效的时候遮盖层

这里利用了伪元素，设置了一个一模一样的按钮，在后面。

```css
.btn::after {
  content: '';
  /* 设置块级 使得可以使用高度和宽度 */
  display: inline-block;
  /* 1-1 这个伪元素相当于就是btn的子元素了，所以这里的高度宽度相当于是btn */
  height: 100%;
  width: 100%;
  /* 1-2 但是走到这里还是不能覆盖 因为位置是不对的 所以需要重置位置 ⚠️ 这里父元素要用 relative 进行定位*/
  position: absolute;
  top: 0;
  left: 0;
  /* 1-3 放在后面 */
  z-index: -1;
}
```

### 1-8 设置动画在被延迟的时候状态

```css
/* 在动画被延迟，开始之前适用于0%的状态 也就是消失的状态*/
animation-fill-mode: backwards;
```

### 1-9 一些微调（rem+BEM）

- 为了适配更多的响应式，把 px 统一转换成了 rem
- 为了让 html 看起来更有层次，使用了 Block Element Modifier 风格记录。

## 2 scss

从这里开始都使用 scss 的语法来进行书写 css。

所以先安装一下

```bash
npm install node-sass -D # 只有开发才使用
```

### 2-1 使用 scss 修改变量+嵌套

全部颜色给变量化

```scss
$color-primary: #55c57a;
$color-primary-light: #7ed56f;
$color-primary-dark: #28b485;

$color-grey-dark: #777;
$color-white: #fff;
$color-black: #000;
```

嵌套大概预览

before

```scss
.heading-primary {
  ...
}
.heading-primary--main {
  ...
}
.heading-primary--sub {
  ...
}
```

after

```scss
.heading-primary {
  ...

  &--main {
    ...
  }
  &--sub {
    ...
  }
}
```

而且还可以重复嵌套一下

```scss
.btn {
  &:link,
  &:visited {
    ...
  }
  &:hover {
    ...
    /*这里替代的就是 .btn.hover 上面.btn的也给嵌套的代替了 */
    &::after {
     ...
    }
  }
  &:active {
    ...
  }
}
```

### 2-2 组件化分割

为了让 scss 的结构更加清晰，便于写文件。所以采用语义化分工明确的架构。

又叫做 **7-1 Sass Architecture**

那具体是怎么架构的呢？需要文件是这种形式的

```bash
styles/
|
|-- base/                  # 包含整个项目最基本的基础样式
|   |-- _reset.scss         # 或者_normalize.scss
|   |-- _typography.scss     # 排版样式（✅比如字体，标题间距）
|   |-- _base.scss          # 一些通用的html标签的样式，比如<body/>, <a/>
|   |-- _animations.scss     # 动画之类的
|   …
|
|-- components/             # 基础组件（✅可通用的组件就放入到这里）
|   |-- _buttons.scss         # 按钮
|   |-- _search.scss          # 搜索按钮
|   …
|
|-- helpers/                 # ✅ 一些功能类的 比如变量，函数，常用的代码块
|   |-- _variables.scss       # Sass Variables
|   |-- _functions.scss       # Sass Functions
|   |-- _mixins.scss          # Sass Mixins
|   …
|
|-- layouts/                # ✅ 通用的一些头尾 这些每个网页都有的
|   |-- _header.scss          # Header
|   |-- _footer.scss          # Footer
|   |-- _sidebar.scss         # Sidebar
|   …
|
|-- pages/										# ✅ 具体到每个页面自己的样式
|   |– _admin.scss            # admin页面的特殊样式
|   |– _login.scss            # login页面的特殊样式
|   |– _main.scss             # main页面的特殊样式
|   …
|
|– themes/
|   |– _theme.scss            # 默认主题
|   …
|
|-- vendor/                   # 来自第三方的CSS或Sass文件，比如Bootstrap, jQuery
|   |-- _hon-dls.min.scss
|   |-- _loadMask.scss
|   |-- _react-bootstrap-table.min.css # 当然可以包含css文件
|   …
|
`-- main.scss                 # 主Sass文件放在最外层目录下 只负责导入
```

_main.scss_ 👇🏻 就是这种感觉

```scss
/* 一些常用的函数 */
@import 'abstracts/functions'; // 函数
@import 'abstracts/mixins'; // 组件
@import 'abstracts/variables'; // 变量

/* 基础类 */
@import 'base/base'; // 基础
@import 'base/animations'; // 动画
@import 'base/typography'; // 排版
@import 'base/utilities'; // 实用性

/* 组件类的 */
@import 'components/buttons'; // 按钮
@import 'components/composition'; // 图像

/* 页面上共通的部分 比如header/footer */
@import 'layout/grid'; // float布局
@import 'layout/header'; // 头部

/* 具体页面 */
@import 'pages/home';
```

### 2-3 字体镂空效果

```scss
.heading-secondary {
  font-size: 3.5rem;
  text-transform: uppercase;
  font-weight: 700;
  // 为了不占据整行 内容撑起
  display: inline-block;
  background-image: linear-gradient(
    to right,
    $color-primary-light,
    $color-grey-dark
  );
  // 就像剪贴画囍字镂空那样
  -webkit-background-clip: text;
  // 背景透明才能表现出镂空 和楼上配合
  color: transparent;
  letter-spacing: 0.2rem;
  transition: all 0.2s;
  // 一个简单的效果
  &:hover {
    transform: skewY(2deg) skewX(15deg) scale(1.1);
    text-shadow: 0.5rem 1rem 2rem rgba($color-black, 0.2);
  }
}
```

###

重点就是`-webkit-background-clip: text;` + ` color: transparent;` 就能做出字体镂空效果。

### 2-4 排版组件一下

这里每一个标题如果都有一个边距的话，或者是一些居中等等通用性很强的一些代码。可以就直接添加一个元素

_\_utilities.scss_

```scss
.u-center-text {
  text-align: center;
}

.u-margin-bottom-small {
  margin-bottom: 1.5rem;
}
.u-margin-bottom-medium {
  margin-bottom: 4rem;
}
.u-margin-bottom-big {
  margin-bottom: 8rem;
}
```

> 这样可以最大实现代码的复用

### 2-5 结构伪类的操作

**这俩要好好区分**

`:last-child` 最后一个子元素

`:last-of-type` 最后一个同类的子元素

**否定伪类的骚操作**

```scss
// 除了当前hover的其他都要缩小
// .composition:hover .composition__photo:not(:hover)
&:hover &__photo:not(:hover) {
  transform: scale(0.95);
}
```

这里最大的操作就是，在同级的有 2 个 class 的情况下。某个 class 在 hover 状态下，而另一个 class 除了自己都没有 hover 的状态如何定义

`.composition:hover .composition__photo:not(:hover)`

- `.composition:hover` → composition:hover 在已经 hover 的状态下
- .composition\_\_photo:not(:hover) → 这个 class（.composition\_\_photo）没有 hover 的元素

这里需要好好 🤔 一下。
