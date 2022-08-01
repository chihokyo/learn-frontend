# IIFE

_IIFE_(Immediately Invoked Functions Expressions)

立即执行函数

## 1 why

既然有了普通函数，为什么要用立即执行函数呢？

这是因为历史的作用域问题。js 在 es5 之前是没有块级作用域的，只有函数作用域和全局作用域。在 for/if 这种语句里就会产生污染全局作用域的问题。

```js
var id = 1;
for (var id = 0; id < 10; id++) {}
console.log(id); // 10
// 明明在外部定义的id，却被for里面给更改了。
```

为了解决这个问题，就出来了 IIFE。直接包裹起来，形成函数作用域。

```js
(function () {
  var id = 99;
})();

console.log(id); // ReferenceError: id is not defined
```

## 2 基本情况

立即执行函数和普通函数一样，也可以接受参数，一样也有返回值。

```js
// 1️⃣ 一样可以接受参数
(function (id) {
  // 形参：id
  console.log(id); // 2
})(2); // 实参：2

// 2️⃣ 一样可以有返回值
var res = (function (id) {
  console.log(id); // 2
  return 'IIFE';
})(2);
console.log(res); // IIFE
```

## 3 调用机制

在 JS 里的立即执行函数会有以下几种调用方式。但是仔细看，这里**调用的机制**都是不一样的。

```javascript
// 由于vscode自动给我格式化了。所以看起来几乎是一样的。

// 1️⃣ 这里其实就是小括号把函数当整体 + 函数调用组合
(function sum(a, b) {
  console.log(a + b);
})(1, 2);

// 2️⃣ 当出现()的时候里面会被强制求值，就触发了函数调用
(function sum(a, b) {
  console.log(a + b);
})(1, 2);

// 3️⃣这里要必须加上运算符，虽然+-/* void都可以
// 一元运算符可以强制函数执行
+(function sum(a, b) {
  console.log(a + b);
})(1, 2);
```

![image-20220531173629137](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220531173629137.png)

## 4 实际运用

### 4-1 防止多个模块全局变量命名冲突

这里的模块可以简单理解成不同的 js

使用前

```js
// a.js
var id = 1;
// b.js
var id = 9;
// main.js
console.log(id); // 根据导入的前后顺序打印出来的就是9
```

> 这样很不好，会随便覆盖别人写的代码。

使用后

```js
/****a.js******/
// 4 用变量接收
var aModul = (function () {
  // 1 先写一个对象
  var aModul = {};
  var id = 1;
  // 2 赋值给这个对象
  aModul.id = id;
  // 3 直接暴露出去
  return aModul;
})();

/****b.js******/
// 4 用变量接收
var bModul = (function () {
  // 1 先写一个对象
  var bModul = {};
  var id = 9;
  // 2 赋值给这个对象
  bModul.id = id;
  // 3 直接暴露出去
  return bModul;
})();

/****main.js******/
// 想用谁的就打印谁的
console.log(aModul.id); // 1
console.log(bModul.id); // 9
```

### 4-2 DOM 对象操作问题

有一个经典的 dom 操作问题。

就是点击哪个 li，哪个高亮。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IIFE</title>
  </head>
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </body>
  <script>
    var liEls = document.querySelectorAll('li');
    for (var i = 0; i < liEls.length; i++) {
      liEls[i].onclick = function () {
        console.log(`第${i}个被onclick了`);
      };
    }
    /* 这里将永远都会是5第5个被onclick了
     * 为什么呢？
     * 因为在代码执行onclick事件，也就是在你点击之前for的代码块已经执行完毕了
     * 而且又由于var没有块级作用域，是全局的，此时的i已经是5了。
     * 那么无论怎么点击都将会是5！
     */

    // 修改方案1️⃣ var改成let
    var liEls = document.querySelectorAll('li');
    for (let i = 0; i < liEls.length; i++) {
      liEls[i].onclick = function () {
        console.log(`第${i}个被onclick了`);
      };
    }
    // 修改方案2️⃣ IIFE保证函数作用域
    var liEls = document.querySelectorAll('li');
    for (var i = 0; i < liEls.length; i++) {
      (function (m) {
        // m作为实参，实际传入的i就保存下来了
        liEls[i].onclick = function () {
          console.log(`第${m}个被onclick了`);
        };
      })(i); // 这里传入的i就是每一次for穿进去的i
    }
  </script>
</html>
```

### 4-3 写插件

IIFE 和闭包合作可以写插件的问题

```javascript
// 创建一个立即执行的匿名函数
// 该函数立即之后返回一个对象，return包含你要暴露的属性
// 如下代码如果不使用立即执行函数，就会多一个属性i
// 如果有了属性i，我们就能调用counter.i改变i的值
// ↑ 这里利用了一定的闭包
// 对我们来说这种不确定的因素越少越好

var counter = (function () {
  var i = 0;
  return {
    get: function () {
      return i;
    },
    set: function (val) {
      i = val;
    },
    increment: function () {
      return ++i;
    },
  };
})();

// counter其实是一个对象

counter.get();
counter.set(3);
counter.increment();
counter.increment();

counter.i; // undefined i并不是counter的属性
i; // ReferenceError: i is not defined (函数内部的是局部变量)
```
