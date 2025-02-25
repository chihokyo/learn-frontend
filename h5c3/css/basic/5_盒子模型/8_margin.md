# margin

这边文章主要讲的是margin外边距的问题，

## 基本用法

- **单边设置**：可以单独设置每一边的外边距（`margin-top`, `margin-right`, `margin-bottom`, `margin-left`）。
- **缩写形式**：可以使用缩写形式同时设置四个方向的外边距。例如，`margin: 10px 15px 20px 25px;` 分别设置上、右、下、左的外边距。
- **相等的外边距**：如果四个方向的外边距相同，可以简写为一个值，如 `margin: 10px;`。
- **百分比值**：可以使用百分比，基于包含块的宽度来计算外边距。

## 1 关于传递 

通常指的是垂直外边距（margin）的传递问题，尤其是在嵌套元素之间。当一个子元素的上（或下）外边距比其父元素更大时，这个外边距会“传递”给父元素，影响父元素的布局。这种现象被称为外边距折叠（margin collapsing）。

>  这个就是说，子元素设置的玩意儿，竟然在父元素这里也有了传递。

比如下面这种

```html
<style>
  .parent {
    width: 200px;
    height: 200px;
    background-color: gold;
  }
  .child {
    width: 100px;
    height: 100px;
    background-color: yellowgreen;
    margin-top: 30px;
  }
</style>
```

### 如何解决呢？

#### 1. 使用内边距（Padding）
在父元素上添加内边距可以防止外边距传递。
```css
.parent {
  padding-top: 1px; /* 或任意小值 */
}
```

#### 2. 添加边框（Border）
即使是透明的或非常细的边框也可以阻止外边距传递。
```css
.parent {
  border-top: 1px solid transparent; /*注意这里用的是透明的*/
}
```

> 这种不是很好，也要占据距离。

#### 3. 使用溢出（Overflow）非 `visible`

设置父元素的 `overflow` 属性为 `auto`, `scroll`, 或 `hidden` 也可以阻止外边距传递。
```css
.parent {
  overflow: auto; /* 或 hidden, scroll */
}
```

#### 4. 利用伪元素
使用 `::before` 或 `::after` 伪元素清除外边距。
```css
.parent::before {
  content: "";
  display: table;
}
```

#### 5. Flexbox 或 Grid 布局
使用 Flexbox 或 Grid 布局，因为这些现代布局模型不会发生外边距折叠。
```css
.parent {
  display: flex; /* 或 grid */
  flex-direction: column;
}
```

解决方案

```css
.parent {
  width: 200px;
  height: 200px;
  background-color: gold;
  overflow: auto; /* 防止外边距传递 */
}

.child {
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
  margin-top: 30px;
}
```

在这个例子中，通过在 `.parent` 上设置 `overflow: auto;`，可以防止 `.child` 的 `margin-top` 传递到 `.parent`。

>  上面说的都是margin-top。那么margin-bottom会不会传递呢？

## margin-bottom

不同于margin-top，bottom如果子元素和父元素的底部重叠线，并且父元素的高度是auto的话，那么这个块级元素就会传递给父元素。

## 2 关于折叠 margin collapsing

- 垂直方向相邻 2 个折叠，只有上下折叠。（父子和兄弟都有可能发生）
- 水平方向的 margin-left/margin-right **不会**折叠。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>2margin上下折叠</title>
    <style>
      .parent {
        width: 200px;
        height: 200px;
        background-color: gold;
        /* 父子都设置了10px 但是最后不是20px 而是10px */
        margin-top: 10px;
      }
      .child {
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        /* 父子都设置了10px 但是最后不是20px 而是10px */
        margin-top: 10px;
      }

      .mario {
        width: 100px;
        height: 100px;
        background-color: gold;
        /* 马里奥设置了10px向下 路易设置了10px向上 最后不是20 而是10*/
        margin-bottom: 10px;
      }
      .luigi {
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <h2>父子元素</h2>
    <div class="parent">
      <div class="child">child</div>
    </div>
    <h2>兄弟</h2>
    <div class="mario">mario</div>
    <div class="luigi">luigi</div>
  </body>
</html>

```

CSS 中的外边距折叠（Margin Collapsing）是一个特定的现象，发生在块级元素的垂直外边距之间。当两个垂直外边距相遇时，它们不是简单地相加，而是取两者之中的较大值。这种行为影响了元素的最终布局。

### 外边距折叠的取值规则
1. **相邻元素间的外边距**：
   - 当两个相邻元素的垂直外边距相遇时（例如，一个元素的 `margin-bottom` 和紧随其后的元素的 `margin-top`），实际应用的外边距是两者之间较大的一个。

2. **父子元素间的外边距**：
   - 当父元素没有顶部边框（`border-top`）、顶部内边距（`padding-top`）和内部元素时，父元素的 `margin-top` 和第一个子元素的 `margin-top` 会发生折叠，取较大者。
   - 类似地，如果父元素没有底部边框、底部内边距和内部元素，那么父元素的 `margin-bottom` 和最后一个子元素的 `margin-bottom` 也会发生折叠。

3. **空块级元素的外边距**：
   - 对于没有内容、内边距、边框、内联内容或清除浮动的块级元素，其 `margin-top` 和 `margin-bottom` 也可能发生折叠。

### 示例
```css
.element1 {
    margin-bottom: 20px;
}

.element2 {
    margin-top: 30px;
}
```
在这个例子中，如果 `.element1` 和 `.element2` 是相邻的块级元素，它们之间的实际外边距将是 30px，而不是 50px（20px + 30px）。这是因为 30px（较大的外边距）将被应用。

### 注意事项
- 外边距折叠只适用于垂直外边距，水平外边距（左右）不会折叠。
- 外边距折叠通常发生在普通文档流的块级元素上。浮动元素、绝对定位元素或内联块级元素不参与外边距折叠。
- 清除浮动（例如使用 `clear: both;`）可以防止相关元素的外边距折叠。

理解这些规则有助于更好地掌握 CSS 布局，尤其是在处理复杂的文档结构时。

### 如何解决呢？

其实和上面写的解决方法是一致的。
