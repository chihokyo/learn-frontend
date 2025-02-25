# 继承性 inherit

CSS 属性的继承是 CSS 设计的一个核心特征，它允许某些样式属性从父元素传递到子元素。这意味着在父元素上设置的某些样式会自动应用到其内部的子元素上，除非子元素有显式的相反定义。

## 为什么存在继承？

继承的主要目的是为了提高效率和一致性

**减少冗余**：避免了为每个元素重复设置相同的样式规则，简化了代码。

**保持一致性**：确保了页面上相似元素的统一外观，使设计更加协调。

## 1 省事在哪里？

> 修改前 before
>
> 比如有一个需求，需要把下面的 div 下面的都设置成一个颜色。

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

这样的缺点就是，你需要使用并集选择器，每一个都指定了颜色。写的东西非常多。

**所以可以利用默认继承，只要自己写了，自己的子元素全部都默认继承了。**

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

并非所有 CSS 属性都是可继承的。

- 通常，与文本相关的属性如 `color`、`font-family`、`font-size` 等会被继承
- 与盒模型相关的属性（如 `width`、`height`、`margin`、`padding` 和 `border`）通常不会被继承。

### 常见可继承的属性示例

- `color`
- `font-family`
- `font-size`
- `line-height`
- `text-align`

### 不可继承的属性示例

- `width` 和 `height`
- `margin`、`padding` 和 `border`
- `background`
- `position`

### 方式 1 查看 MDN 的文档

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

## 3 继承性优先级

继承性的优先级很低，这是什么意思呢？

虽然说子元素可以继承父元素的 css 属性，即是父元素的这个 css 属性优先级非常高。都写成!important 了。但是只要子属性有自己的优先级，那么都优先适用。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>继承性优先级</title>
    <style>
      .main {
        color: brown;
      }
      .makeGreen {
        color: green;
      }
    </style>
  </head>
  <body>
    <!-- 可以看到下面的所有文字颜色都会是brown -->
    <div class="main">
      <ul class="foo">
        <li>1</li>
        <!-- 这个就是绿色的 只要你设置了就是优先级高于继承的-->
        <li class="makeGreen">2</li>
        <li>3</li>
      </ul>
    </div>
  </body>
</html>
```

## 4 强制继承

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

## 5 只会继承计算值

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
- 后代有自己的属性，自己的**优先级高**。
- 继承的计算后的计算值，而不是设置值。

> ### 继承的好处
>
> 1. **简化代码**：减少了需要编写和维护的样式代码量。
> 2. **提高可读性**：使 CSS 更容易阅读和理解，特别是在大型项目中。
> 3. **更容易实现主题**：通过改变少数几个元素的样式，可以影响整个页面，这使得实现和修改主题变得容易。
