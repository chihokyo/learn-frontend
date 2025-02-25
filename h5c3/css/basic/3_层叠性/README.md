# 层叠性 Specificity

CSS 的层叠性是其核心特征之一，它解释了当多个 CSS 规则应用于同一个元素时，哪些规则会生效的问题。"层叠"这个词意味着多个样式可以被应用到同一个元素上，而最终的样式则是通过一定的规则确定的。

> css 其实就叫做层叠样式表。

首先 css 是一个层叠样式表。是有优先度的。⁉️

> 对于同一个元素上，有不同的 css 属性。会显示谁的呢？

选择器谁**权重高**最后显示的效果就是谁的。

**同一个权重，就看顺序。后来的先显示。**

- 看权重（有表格）
- 看先后 后来者居上

## 特点

### 1. 重要性 (Importance)

- **用户样式表和作者样式表**：浏览器允许用户设置自己的样式表，这些样式表的优先级通常低于网页作者定义的样式。
- **`!important` 规则**：在样式声明后添加 `!important` 会使该声明具有最高优先级。但过度使用 `!important` 可能会导致维护困难，因为它打破了正常的层叠规则。

### 2. 专用性 (Specificity)

- **专用性的计算**：CSS 选择器的专用性是基于选择器类型计算的。简单来说，ID 选择器的专用性高于类选择器，类选择器的专用性高于标签选择器。更具体的选择器（如 `#navbar li.active a`）将覆盖更通用的选择器（如 `a`）。
- **专用性的规则**：如果两个规则具有相同的重要性，那么专用性更高的规则将被应用。

### 3. 源代码顺序 (Source Order)

- **规则的顺序**：如果两条规则的重要性和专用性相同，则定义在后面的规则将覆盖先前定义的规则。

## 权重

其实这个权重是有一些表的。计算起来感觉也蛮麻烦，真正项目的时候最后都是 class 一把梭！

MDN 可以看这个[优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

| 选择器                                    | ID  | 类  | 元素 | 优先级 |
| :---------------------------------------- | :-- | :-- | :--- | :----- |
| `h1`                                      | 0   | 0   | 1    | 0-0-1  |
| `h1 + p::first-letter`                    | 0   | 0   | 3    | 0-0-3  |
| `li > a[href*="en-US"] > .inline-warning` | 0   | 2   | 2    | 0-2-2  |
| `#identifier`                             | 1   | 0   | 0    | 1-0-0  |
| `button:not(#mainBtn, .cta)`              | 1   | 0   | 1    | 1-0-1  |

下图是一个示例。记住这些差不多就够了。

![CSS Specificity - Cheat Sheet | Cheat sheets, Cheating, Css](https://i.pinimg.com/originals/28/47/82/2847829e32c5d626f4413076201ec570.png)

![一次弄懂CSS选择器权重问题- 知乎](https://pic3.zhimg.com/v2-fc467ae9254e881b8c0d4278f170db7e_b.jpg)

练习的小 demo，超级简略。反正实际项目中很少这样计算，几乎就是 class 选择器一把梭

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 这个的权重是 10 + 1 = 11 */
      .box span {
        color: brown;
      }
      /* 这个的权重是 10 */
      /* 所以这个即使在后面 也要看权重的 */
      .item {
        color: blue;
      }
    </style>
  </head>
  <body>
    <div class="box item">
      <span>span</span>
    </div>
  </body>
</html>
```

## 好处

### 层叠性的好处

- **灵活性**：允许多重来源的样式共存，例如浏览器默认样式、用户自定义样式和开发者定义的样式。
- **可维护性**：通过控制选择器的专用性，可以轻松覆盖先前定义的样式，这对于大型项目或框架尤其重要。
- **可定制性**：用户可以通过用户样式表覆盖作者的样式，增加了网页的可访问性和个性化。
