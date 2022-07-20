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

### 2-2 7-1 组件化分割

为了让 scss 的结构更加清晰，便于写文件。所以采用语义化分工明确的架构。

又叫做 **7-1 Sass Architecture**

那具体是怎么架构的呢？需要文件是这种形式的

[这篇文章写的还不错 Sass 项目结构之 7-1 模式](https://www.cnblogs.com/lantuoxie/p/8682546.html)

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

## 3 组件

### 3-1 feature

这里没有什么难的，大概难点就是一个

图标的引入。这里用的是 icon 的 css 那种方式

### 3-2 倾斜和补正

这里为了达到一种倾斜的效果，把整体给倾斜了。这就导致了下面的子元素也全部会被倾斜。但是这里使用了一个补正。

```scss
.section-features {
  padding: 20rem 0;
  background-image: linear-gradient(
      to right bottom,
      rgba($color-primary-light, 0.8),
      rgba($color-primary-dark, 0.8)
    ), url(../img/nat-4.jpg);
  background-size: cover;
  // 这里为了做出来斜的效果 整体斜了一下
  // 但是这样里面的子元素也会被倾斜
  transform: skewY(-7deg);
  // 为了向上覆盖住白色的部分
  margin-top: -10rem;
  // 为了解决的话 ✅
  & > * {
    transform: skewY(7deg);
  }
}
```

👆🏻 代码的这个部分就是倾斜 + 补正

```scss
// 整体倾斜了
transform: skewY(-7deg);
// 直系子元素直接补正
& > * {
  transform: skewY(7deg);
}
```

> **直接子代选择器(必须是直接自带)** 选择器之间以 > 分割
>
> **所有的后代(直接/间接的后代)** 选择器之间以空格 分割
>
> **交集选择器** 选择器之间**没有任何**的连接符号 div.text → div 标签 class 为 text
>
> **并集选择器** 选择器之间利用,连接

## 4 卡片

这一组比较细节比较多。总体代码如下

```scss
.card {
  /*=========反转功能============*/
  // 立体视角
  perspective: 150rem;
  position: relative;
  // 因为子元素都是absolute之后会有高度塌陷
  // 所以这里必须重新设置了高度
  height: 52rem;

  &__side {
    color: #fff;
    height: 52rem;
    transition: all 0.8s ease;
    font-size: 2rem;
    top: 0;
    left: 0;
    // 因为这里absolute之后就只有内容的宽度
    // 所以要设置100%
    width: 100%;
    // 先给2个卡片做出来绝对定位
    position: absolute;
    // 为了让后面的直接隐藏，这样不会产生2张卡片重合的现象
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden; /*这里图片会遮盖上面的圆角 所以做了处理*/
    box-shadow: 0 1.5rem 4rem rgba($color-black, 0.15);
    &--front {
      background-color: $color-white;
    }
    &--back {
      // 默认先给反转1-1
      transform: rotateY(180deg);
      &-1 {
        background-image: linear-gradient(
          to right bottom,
          $color-secondary-light,
          $color-secondary-dark
        );
      }
      &-2 {
        background-image: linear-gradient(
          to right bottom,
          $color-primary-light,
          $color-primary-dark
        );
      }
      &-3 {
        background-image: linear-gradient(
          to right bottom,
          $color-tertiary-light,
          $color-tertiary-dark
        );
      }
    }
  }
  &:hover &__side--front {
    transform: rotateY(-180deg);
  }
  &:hover &__side--back {
    // 在恢复到原来位置 形成效果
    transform: rotateY(0deg);
  }

  /*=========样式============*/
  &__picture {
    background-size: cover;
    height: 25rem;
    // CSS 属性定义该元素的背景图片，以及背景色如何混合
    // 相当于把下面的backimage的2个，1个图片，1个渐变融合在一起
    background-blend-mode: screen;
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    // 这里由于设置了clip-path 导致上面设置的overflow hidden失效
    // 所以在这里需要重新设置圆角
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    &--1 {
      background-image: linear-gradient(
          to right bottom,
          $color-secondary-light,
          $color-secondary-dark
        ), url(../img/nat-5.jpg);
    }
    &--2 {
      background-image: linear-gradient(
          to right bottom,
          $color-primary-light,
          $color-primary-dark
        ), url(../img/nat-6.jpg);
    }
    &--3 {
      background-image: linear-gradient(
          to right bottom,
          $color-tertiary-light,
          $color-tertiary-dark
        ), url(../img/nat-7.jpg);
    }
  }
  &__heading {
    // 绝对定位一下
    position: absolute;
    top: 12rem;
    right: 2rem;
    width: 75%;
    font-size: 2.8rem;
    font-weight: 300;
    text-transform: uppercase;
    text-align: right;
    color: $color-white;
  }
  &__heading-span {
    padding: 1rem 1.5rem;
    // box-decoration-break 属性用来定义当元素跨多行、多列或多页时，元素的片段应如何呈现。
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    &--1 {
      background-image: linear-gradient(
        to right bottom,
        rgba($color-secondary-light, 0.85),
        rgba($color-secondary-dark, 0.85)
      );
    }
    &--2 {
      background-image: linear-gradient(
        to right bottom,
        rgba($color-primary-light, 0.85),
        rgba($color-primary-dark, 0.85)
      );
    }
    &--3 {
      background-image: linear-gradient(
        to right bottom,
        rgba($color-tertiary-light, 0.85),
        rgba($color-tertiary-dark, 0.85)
      );
    }
  }

  &__details {
    padding: 3rem;
    color: $color-grey-dark;

    ul {
      list-style: none;
      width: 80%;
      // 居中
      margin: 0 auto;

      li {
        text-align: center;
        font-size: 1.5rem;
        padding: 1rem;

        &:not(:last-child) {
          border-bottom: 1px solid $color-grey-light-2;
        }
      }
    }
  }

  &__cta {
    // 块状元素居中
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 按钮为了适应cta的长度 所以显示成了两行 这里拉伸一下cta长度
    width: 90%;
    // 为了居中
    text-align: center;
  }
  &__price-box {
    color: $color-white;
    margin-bottom: 0rem;
  }
  &__price-only {
    font-size: 1.4rem;
    text-transform: uppercase;
  }
  &__price-value {
    font-size: 6rem;
    font-weight: 100;
  }
}
```

### 4-1 反转功能

为了有一个反转功能这里的思路大概是这样的

- 先写 2 张正反面的卡 用 absolute 定位重叠
- 预先让一张先反转个 180 度。这样 hover 上去之后在返回 0 度。达到一种反转效果。

```scss
.card {
  /*=========反转功能============*/
  // 立体视角
  perspective: 150rem;
  position: relative;
  // 因为子元素都是absolute之后会有高度塌陷
  // 所以这里必须重新设置了高度
  height: 52rem;

  &__side {
    color: #fff;
    height: 52rem;
    transition: all 0.8s ease;
    font-size: 2rem;
    top: 0;
    left: 0;
    // 因为这里absolute之后就只有内容的宽度
    // 所以要设置100%
    width: 100%;
    // 先给2个卡片做出来绝对定位
    position: absolute;
    // 为了让后面的直接隐藏，这样不会产生2张卡片重合的现象
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden; /*这里图片会遮盖上面的圆角 所以做了处理*/
    box-shadow: 0 1.5rem 4rem rgba($color-black, 0.15);
    &--front {
      background-color: $color-white;
    }
    &--back {
      // 默认先给反转1-1
      transform: rotateY(180deg);
    }
  }
  &:hover &__side--front {
    transform: rotateY(-180deg);
  }
  &:hover &__side--back {
    // 在恢复到原来位置 形成效果
    transform: rotateY(0deg);
  }
```

新的属性

`perspective: 150rem;`

`backface-visibility: hidden;`

### 4-2 卡片换行文字整体

为了让换行之后不会出现整体那种锯齿，这里用了一个新的属性

`box-decoration-break: clone;`

### 4-3 absolute 高度塌陷

为了解决子元素都设置成了 absolute 导致父元素会没有高度的问题。

这样手动给父元素设置了一个高度。（以前需要子元素撑开的，后来塌陷之后只能手动设置一下。这个和 float 那种高度塌陷可以清除浮动的不一样）

```scss
.card {
  /*=========反转功能============*/
  // 立体视角
  perspective: 150rem;
  position: relative;
  // 因为子元素都是absolute之后会有高度塌陷
  // 所以这里必须重新设置了高度
  height: 52rem;
}
```

## 5 评价栏

这一章动效比较多

整体如下

```scss
.story {
  width: 75%;
  margin: 0 auto;
  box-shadow: 0 3rem 6rem rgba($color-black, 0.1);
  background-color: rgba($color-white, 0.6);
  border-radius: 3px;
  padding: 6rem;
  // 如果不加这个左内边距 就会发现下面的transform-3rem会无法完全包裹住圆
  // 因为右边是6rem 所以为了让-3rem之后仍然是6，这边设置了一个9
  padding-left: 9rem;
  font-size: $default-font-size;

  // 整体矩形反转
  transform: skewX(-12deg);

  // 这里只会把文本给扶正 但是图片并不会
  // 因为shape也设置了trans，css优先级 不能设置
  // 所以下面的不管用了，需要你单独设置每一个子元素的偏移值
  // & > * {
  //   transform: skewX(12deg);
  // }

  &__shape {
    width: 15rem;
    height: 15rem;
    float: left;
    // 要求很高 需要浮动+高度设定+形状 缺一不可
    // 下面就是一段文字像○一样围绕
    -webkit-shape-outside: circle(50% at 50% 50%);
    shape-outside: circle(50% at 50% 50%);
    // 剪辑成一个原型
    -webkit-clip-path: circle(50% at 50% 50%);
    clip-path: circle(50% at 50% 50%);
    // 单独设置1 skewX(12deg)
    transform: translateX(-3rem) skewX(12deg);
  }
  &__image {
    // 这里必须设置高度为100%而不是宽度，为什么呢
    // 因为你仔细看的话 如果width是100%，那么相当于也就是占据包含块
    // 也就是shape的100%，但是此时shape发生了transform: translateX(-3rem);
    // 宽度是无法撑开全部的，这里用chrome的debug就好
    height: 100%;
    // 解决一下图片并没有居中的问题 因为整体偏移了
    transform: translateX(-4rem) scale(1.4);
    backface-visibility: hidden;
    transition: all 0.5s ease;
  }
  &__text {
    // 单独设置2 skewX(12deg)
    transform: skewX(12deg);
  }
  &__caption {
    // 居中
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 20%); /* 1-a 为了达到从上到下的效果 先放下面*/
    color: $color-white;
    text-transform: uppercase;
    font-size: 1.7rm;
    text-align: center;
    opacity: 0; /* 1-b 为了达到从下到上的效果 先隐形*/
    transition: all 0.5s ease;
    backface-visibility: hidden;
  }

  // 一旦hover，caption就发生变化
  &:hover &__caption {
    opacity: 1; /*1-c*/
    transform: translate(-50%, -50%); /*1-d*/
  }
  &:hover &__image {
    transform: translateX(-4rem) scale(1);
    // 变模糊 变暗色
    filter: blur(3px) brightness(80%);
  }
}

```

### 4-1 圆形环绕效果

主要利用这个属性`shape-outside` 实现的圆形环绕效果

```scss
float: left;
// 要求很高 需要浮动+高度设定+形状 缺一不可
// 下面就是一段文字像○一样围绕
-webkit-shape-outside: circle(50% at 50% 50%);
shape-outside: circle(50% at 50% 50%);
```

### 4-2 transform的各种操作

形变在位移的时候经常使用，这里运用了大量的位移。

但是位移的时候逻辑上一定要清晰一下。

这里直接看👆🏻整体的代码就好

### 4-3 hover图片模糊效果

这里的思路大概是

- 默认下，使用opacity默认为0，等到hover之后显示为1
- 默认下，使用位置靠下，等到hover之后向上，这样就有一种从下到上的效果
- `filter()` 可以让图片变模糊，变暗色。

### 4-4 视频作为背景的操作

```scss
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  // 相当于包含块
  height: 100%;
  width: 100%;
  // 为了让层级
  z-index: -1;
  opacity: 0.15;
  //   隐藏溢出
  overflow: hidden;

  &__content {
    // 为了让视频本题占据整个父元素框 所以就要设置宽高
    height: 100%;
    width: 100%;
    //  CSS 属性指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框。
    // 这样会保持纵横比 这里可以整个拉伸 有点像background
    object-fit: cover;
  }
}

```

注意点

为了让图片能够保持纵横比覆盖住整体

需要让宽度高度都是100%，然后设置`object-fit: cover;`类似于图片背景。
