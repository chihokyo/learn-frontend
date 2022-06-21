# 继承性 inherit

> 继承性。这个特性可以让你省事。

## 1 省事在哪里？

修改前 before

```html
<style>
  /* 如果想要左右的元素字体，难道你要这样一个个指定吗？ */
  h1,
  p,
  span,
  strong {
    color: aquamarine;
  }
</style>
</head>
<body>
  <div class="box">
    <h1>我是H1元素</h1>
    <p>
      p元素
      <span>span元素</span>
      <strong>strong元素</strong>
    </p>
    <span>span元素2</span>
  </div>
</body>
```

利用默认继承，只要自己写了，自己的子元素全部都默认继承了。

修改后 after

```html
<style>
  /* 由于color具有继承性 所以可以下面的元素都可以继承 */
  .box {
    color: greenyellow;
  }
</style>
</head>
<body>
  <div class="box">
    <h1>我是H1元素</h1>
    <p>
      p元素
      <span>span元素</span>
      <strong>strong元素</strong>
    </p>
    <span>span元素2</span>
  </div>
</body>
```

## 2 如何确认属性有没有继承性？

方式 1 查看 MDN 的文档
有一列就是

[Formal definition](https://developer.mozilla.org/en-US/docs/Web/CSS/color#formal_definition)

| [Initial value](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value)   | `canvastext`                                                                                                                                                                                                       |
| :-------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Applies to                                                                        | all elements and text. It also applies to [`::first-letter`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter) and [`::first-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line). |
| [Inherited](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance)         | yes ⭐️ 这个就是啦！                                                                                                                                                                                               |
| [Computed value](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) | computed color                                                                                                                                                                                                     |
| Animation type                                                                    | by computed value type                                                                                                                                                                                             |

方式 2 通过 chrome 的 devtools

![image-20220621233139002](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220621233139002.png)

## 3 强制继承

不是所有元素都可以被继承的，text 和 font 属性几乎都可以继承。如果一个属性不具备继承性，我就是想继承那怎么办？😰

比如 border ，使用 inherit ↓

```html
<style>
  .box {
    border: 2px solid gray;
  }
  /* 这里会发现span和p都没有继承border */
  /* 因为boder本身就不是可以被继承的属性 */
  /* 但是你可以强制继承*/
  span {
    border: inherit;
  }
  p {
    border: inherit;
  }
</style>
</head>
<body>
  <div class="box">
    <span>span元素</span>
    <p>p元素</p>
  </div>
</body>
```

## 4 只会继承计算值

这是什么意思呢？就是说一些经过计算得出的属性，子元素在继承的时候，只会继承你计算后的数值。

👇🏻 一个小 demo 可以验证一下这个结论。

```html
<style>
  .box {
    /* 这里相当于自身的字体的父元素  目前没有也就是浏览器默认字体16px  */
    font-size: 2em; /*此时32px*/
  }
  /* 不写的话就默认继承2em */
  /* 逻辑上应该是64px */
  /* 但其实是32px 而不是64 */
  p {
    /* 继承过来的fon-size 是32px */
    font-size: 2em; /*这样写就是64px了*/
  }
  p {
    /* 不写就是32px */
  }
</style>
</head>
<body>
  <div class="box">
    我是box
    <p>我是p</p>
  </div>
</body>
```

其实也就是说 p 继承的不是

```css
p {
  font-size: 2em; /* ❌ 不是继承的2em这个计算前的 */
}

p {
  font-size: 32px; /* ✅ 而是继承这个计算后的也就是32px */
}
```

## 总结

- 属性有继承性的，后代可继承。
- 属性不具备继承性的，后代可强制继承。使用`inherit`
- 后代有自己的属性，自己的优先级高。
- 继承的计算后的计算值，而不是设置值。
