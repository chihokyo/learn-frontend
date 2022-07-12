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
