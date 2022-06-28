# 元素特性

> 这个也是非常重要的一个点。经常容易错的，下面的概念傻傻分不清楚。
>
> **块级 block level**
>
> **行内级 inline level**
>
> 其实这个吧。是有历史的

## 历史渊源

在说 css 之前先说一下 html 的小历史，就是当初 html 造出来的时候是为了你让你网上购物的吗？nonono，并不是的。当初 html 出来是**代替报纸的一种媒介存在**，大家都是为了看信息，没有交互的。这就是最早的历史。

所以说到传统媒介的报纸的话，那么一段信息最重要的就是什么？是标题！是文本内容！这些都是重点，至于那些什么 span 的花拳绣腿并不是报纸的重点。根本没必要独自占据一行。于是就诞生了元素不同的特性。

h1/p/div 这种很**重要**的，就是**占据整整一行**的 block 元素。那么 a/strong/span 这种相对不是特别重要的就是 inline 元素。

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

## 直接上结论

其实这个直接结论会更好点。就是所有 css 元素都有自身的一些特性。比如 display 这个特性。

所以先记住 👇🏻 这几个特性

- block

  - 无论内容是啥 水平都占据**父元素一整行**，严格意义上都是父元素一行
  - 垂直的高度看内容决定
  - 可以设置宽高 width height ✅

- inline

  - 多个元素占据同一行父元素
  - 完全由内容决定
  - 不可以设置宽高 width height ❌
  - 所以伪元素::after/::before 是行内级元素 所以设置宽高无效

- inline-block ⚠️ 重点 默认情况下没有元素天生就是 inline-block 是css专门为display的值。

  - 我不想独占一行，但我想改变宽高。

  - > （经常见到 div 改成 inline-block，为什么不直接就成 inline 呢？因为我只是不想独占一行而已，我还是想改变自己的宽高的。

  - 可以转换各种元素

- none 直接隐藏

## img 是什么？

来自 MDN 的重要信息

> <img> is a replaced element; it has a display value of inline by default, but its default dimensions are defined by the embedded image's intrinsic values, like it were inline-block. You can set properties like border/border-radius, padding/margin, width, height, etc. on an image.

结论就是

很多人都说是不是行内级！但官方说是叫 行内替换元素`inline-replace`！

- 不独占一行
- 还可以设置宽高 ✅
- video/input 标签其实也是。看起来跟`inline-block`一样，但其实是`inline-replace`元素

## 各种验证

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

## 注意点

**p 元素内部不能放 div**

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

**inline 里面最好不要放 block。其实和 👆🏻 上面的差不多**
