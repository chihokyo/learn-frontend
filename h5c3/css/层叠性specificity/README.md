# 层叠性 Specificity

> 继承性。这个特性可以让你省事。

首先 css 是一个层叠样式表。是有优先度的。⁉️

> 对于同一个元素上，有不同的 css 属性。会显示谁的呢？

选择器谁权重高最后显示的效果就是谁的。

同一个权重，就看顺序。后来的先显示。

- 看权重（有表格）
- 看先后 后来者居上

## 权重

其实这个权重是有一些表的。计算起来感觉也蛮麻烦，真正项目的时候最后都是 class 一把梭！

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
