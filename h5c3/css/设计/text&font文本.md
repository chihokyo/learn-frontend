# text-align

在 CSS 中，有许多以 `text` 开头的属性，这些属性主要用于设置文本的样式。下面是一张包含常见 `text` 开头样式属性的表格，以及一个将这些样式集合应用在 HTML 中的示例。

### `text` 开头的 CSS 属性

| 属性              | 描述                                                        | 示例值                                          |
| ----------------- | ----------------------------------------------------------- | ----------------------------------------------- |
| `text-align`      | 设置文本的水平对齐方式                                      | `center`, `left`, `right`, `justify`            |
| `text-decoration` | 设置文本的装饰（如下划线、删除线等）                        | `underline`, `overline`, `line-through`, `none` |
| `text-indent`     | 设置文本首行的缩进                                          | `20px`, `3em`                                   |
| `text-justify`    | 设置文本的对齐方式（仅当 `text-align` 为 `justify` 时生效） | `inter-word`, `distribute`                      |
| `text-overflow`   | 设置当文本溢出包含元素时的表现                              | `clip`, `ellipsis`                              |
| `text-shadow`     | 设置文本的阴影效果                                          | `1px 1px 2px black`, `none`                     |
| `text-transform`  | 设置文本的大小写转换                                        | `uppercase`, `lowercase`, `capitalize`, `none`  |

以下是一个 HTML 示例，演示了如何使用这些属性：

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .text-align {
        text-align: center;
      }
      .text-decoration {
        text-decoration: underline;
      }
      .text-indent {
        text-indent: 20px;
      }
      .text-justify {
        text-align: justify;
        text-justify: inter-word;
      }
      .text-overflow {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .text-shadow {
        text-shadow: 2px 2px 2px #888888;
      }
      .text-transform {
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <p class="text-align">This text is centered.</p>
    <p class="text-decoration">This text is underlined.</p>
    <p class="text-indent">This text has an indentation on the first line.</p>
    <p class="text-justify">
      This text is justified and words are evenly spaced.
    </p>
    <div class="text-overflow">
      This is a very long text that will be truncated with an ellipsis when
      overflowing.
    </div>
    <p class="text-shadow">This text has a shadow.</p>
    <p class="text-transform">This text is in uppercase.</p>
  </body>
</html>
```

在这个示例中，每个段落 (`<p>`) 或 `div` 元素应用了一个不同的 `text` 属性，展示了各自的效果。这种方式可以直观地理解每个属性的具体作用。

## 关于 text-align 的坑 ⭐️

其实这个不是让文字居中，其实是，让其内部的 inline-level 元素居中。

其实 inline-level 就可以，行内级元素可以 ✅。块级不可以 ❌。所以 div 不可以。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>验证text-aligh只能居中inline level</title>
  </head>
  <style>
    .demo1 {
      background-color: yellowgreen;
      height: 500px;
      width: 500px;
      /* text-align */
      text-align: center;
    }

    .inline1 {
      background-color: rebeccapurple;
      height: 50px;
      width: 50px;
    }

    .demo2 {
      background-color: yellowgreen;
      height: 500px;
      width: 500px;
      /* text-align */
      text-align: center;
    }

    .inline2 {
      background-color: rebeccapurple;
      height: 50px;
      width: 50px;
      /* display: inline-block; 改成这个就能居中了 */
      /* display: inline; 为什么不能设置inline？因为inline不能设置高度宽度 */
    }
  </style>
  <body>
    <!-- 可以居中 -->
    <h2>可以居中</h2>
    <div class="demo1">
      <span class="inline1">我是inline level</span>
    </div>
    <h2></h2>
    <!-- 不能居中 -->
    <h2>不能居中</h2>
    <div class="demo2">
      <div class="inline2">我是inline level</div>
    </div>
  </body>
</html>
```

> 下面是 ChatGPT 给的解释
>
> `text-align` 是 CSS 中一个常用的属性，用于设置元素内的文本水平对齐方式。使用时需要注意以下几点，以及一些常见的坑和解决方法：
>
> ### 基本用法
>
> - **取值**：`left`、`right`、`center` 和 `justify`。
>   - `left`：文本左对齐。
>   - `right`：文本右对齐。
>   - `center`：文本居中对齐。
>   - `justify`：文本两端对齐，即调整单词间距以填满整行。
>
> ### 注意点
>
> 1. **作用范围**：
>
>    - `text-align` 只影响行内内容（如文本和内联元素），不影响**块级元素**的宽度或位置。
>    - 对于块级元素，`text-align` 属性会影响其所有行内内容的水平对齐方式。
>
> 2. **继承性**：
>
>    - `text-align` 是一个可继承属性。如果未在子元素上显式设置，子元素将继承父元素的 `text-align` 值。
>
> 3. **与 `direction` 属性的关系**：
>
>    - 在使用从右到左的文本（如阿拉伯语或希伯来语）时，`text-align` 的行为会受到 `direction` 属性的影响。
>
> 4. **与 `justify` 的特殊情况**：
>    - 当使用 `justify` 对齐时，最后一行文本通常是左对齐的，除非设置了 `text-align-last` 属性。
>
> ### 常见坑及解决方法
>
> 1. **块级元素居中**：
>
>    - 常见误解：尝试使用 `text-align: center;` 来居中一个块级元素。实际上，这只会居中块级元素内的行内内容。
>    - 解决方法：使用 `margin: auto;` 或 Flexbox/CSS Grid 布局来居中块级元素。
>
> 2. **两端对齐的问题**：
>
>    - 使用 `text-align: justify;` 时，某些情况下可能会导致不均匀的空白或单词间距。
>    - 解决方法：使用 `text-justify` 属性调整对齐方式，或者考虑使用其他对齐方式。
>
> 3. **不支持的值**：
>    - 在某些旧浏览器中，某些 `text-align` 的值可能不被支持。
>    - 解决方法：进行浏览器兼容性测试，必要时使用浏览器前缀或提供回退样式。
>
> 总的来说，`text-align` 是一个相对直接的属性，但在复杂的布局中可能需要结合其他 CSS 属性和布局技术来实现期望的对齐效果。

## 关于 justify 的坑

```css
text-align: justify;
```

首先你要知道`text-align`这个属性代表的意义。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>text-align的验证-justify</title>
  </head>
  <style>
    .demo1 {
      background-color: yellowgreen;
      height: 300px;
      width: 300px;
      text-align: center;
    }

    .demo2 {
      background-color: yellowgreen;
      height: 300px;
      width: 300px;
      text-align: justify;
    }
  </style>
  <body>
    <h2>text-align: center;</h2>
    <div class="demo1">
      Gen Nobleza said 11 of its members died in an encounter with the
      Philippine Army last Friday in neighbouring Datu Hoffer Ampatuan town -
      suggesting Sunday's explosion could be a form of retaliation.President
      Ferdinand Marcos Jr condemned the blast as a "senseless and most heinous"
      act, which was "perpetrated by foreign terrorists". He did not elaborate.
    </div>

    <h2>text-align: justify;</h2>
    <div class="demo2">
      Gen Nobleza said 11 of its members died in an encounter with the
      Philippine Army last Friday in neighbouring Datu Hoffer Ampatuan town -
      suggesting Sunday's explosion could be a form of retaliation.President
      Ferdinand Marcos Jr condemned the blast as a "senseless and most heinous"
      act, which was "perpetrated by foreign terrorists". He did not elaborate.
    </div>
  </body>
</html>
```

感觉直接看这个图就好了。

字体默认是 16px

基本上都是 font 开头的，除了 line-height。

浏览器默认的字体是 16px，具体可以到设定去看看。

这样的话。默认。 1em 就是 16px

如果找不到最后显示的 px，直接去 chorme 的 devtoos 的 computed 里面找。

```html
 <style>
      .box {
        font-size: 30px;
      }

      .content {
        /* 相当于先继承了父元素的30px */
        /* 然后*2 这样理解 */
        font-size: 2em;
        /* 因为font-size是相当于父元素的百分比 */
        /* 所以下面2em也可以这样写 */
        font-size: 200%;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="content">1233</div>
      <div>1233</div>
    </div>
  </body>
```

因为字体可以继承，所以一般只会设置一次。
