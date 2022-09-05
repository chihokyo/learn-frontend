# script 标签写在哪里？

刚学 JS 的时候我一直不知道这个改写在哪里，因为我看到各大网站有些写在 head，有些写在 body 里面，有些写在最后。到底写在哪里呢？

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 写在head？
    </script>
  </head>
  <body>
    <script>
      // 写在body前面？
    </script>
    <div class="box">box</div>
    <script>
      // 写在body后面？
    </script>
  </body>
</html>
```

> 1. 事实上，浏览器在解析 HTML 的过程中，遇到了 script 元素是**不能继续**构建 DOM 树的;
> 2. 它会停止继续构建，首先**下载**JavaScript 代码，并且**执行 JavaScript**的脚本
> 3. 只有等到 JavaScript 脚本执行**结束**后，才会继续解析 HTML，构建 DOM 树

```html
<body>
  <script>
    var boxEl = document.querySelector('box');
    console.log(boxEl); // 一辈子都是拿不到的，因为从上到下解析
  </script>

  <div class="box">box</div>
</body>
```

为什么呢？

因为 JS 就是操控 DOM 的，等待 JS 执行完毕才构建 DOM 才符合。不然会造成回流和重绘，影响性能。

但这也会带来新问题 💡

> JS 代码现在越来越大，JS 解析花费的时间越来越长，那么在 JS 解析完成之前，页面都是白屏！

于是出来了 defer 和 async 属性。

首先看一个总图

可能一开始看比较难以理解

![script async defer | Neil coding之路- 點部落](https://cdn-images-1.medium.com/max/800/1*dlGnynXsR0YTJiLr62AC4Q.png)

## defer

> **defer** 属性告诉浏览器**不要等待脚本**下载，而继续解析 HTML，构建 DOM Tree。

- 不会阻塞 DOM Tree，如果提前下载好了，等待 DOM Tree 构建。
- defer 会在**DOMContentLoaded**之前执行 【DOM Tree → defer → DOMContentLoaded】
- 多个 defer 保持顺序
- defer 可以提高页面性能，因为不会阻塞，建议放在 head，可以让浏览器提前下载
- 只能适用于引入外部文件

```html
<body>
  <div class="app">app</div>
  <div class="title">title</div>

  <!-- <script src="./js/test_defer.js" defer></script> 没有加是会阻塞 下面的box不会显示出来-->

  <script src="./js/test_defer.js" defer></script>

  <script defer>
    console.log('在这里写是没有任何效果的，必须像👆🏻导入外部文件才行');
  </script>
  <div class="box">box</div>
</body>
```

## async

- 不会造成阻塞。
- 不能保证顺序，独立下载，下载完就执行。有可能是在 DOM Tree 构建之前，也有可能之后。
- 不能保证多个文件顺序
- 不能保证会在**DOMContentLoaded**之前 or 之后执行

> defer 通常用于需要在文档解析后操作 DOM 的 JavaScript 代码，并且对多个 script 文件有顺序要求的
>
> async 通常用于独立的脚本，对其他脚本，甚至 DOM 没有依赖的
