# true VS Truthy （真值）

## true

就是 Boolean 的类型，俩值。true、false。

表示一种真假。主要用于 if 和 for 等判断。

```js
if (true) {
}
```

## truthy

> 在 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 中，**truthy**（真值）指的是在[布尔值](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)上下文中，转换后的值为 `true`的值。被定义为[假值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)以外的任何值都为真值。（即所有除 `false`、`0`、`-0`、`0n`、`""`、`null`、`undefined` 和 `NaN` 以外的皆为真值）。

比如下面全是 true！因为在判断的时候会强制转换`Boolean()`

```js
if (true) {
  console.log(1);
}
if ({}) {
  console.log(1);
}
if ([]) {
  console.log(1);
}
if (42) {
  console.log(1);
}
if ('0') {
  console.log(1);
}
if ('false') {
  console.log(1);
}
if (new Date()) {
  console.log(1);
}
if (-42) {
  console.log(1);
}
if (12n) {
  console.log(1);
}
if (3.14) {
  console.log(1);
}
if (-3.14) {
  console.log(1);
}
if (Infinity) {
  console.log(1);
}
if (-Infinity) {
  console.log(1);
}
/*======会被强制转换成boolean值======*/
console.log(Boolean(true));
console.log(Boolean({}));
console.log(Boolean([]));
console.log(Boolean(42));
console.log(Boolean('0'));
console.log(Boolean('false'));
console.log(Boolean(new Date()));
console.log(Boolean(-42));
console.log(Boolean(12n));
console.log(Boolean(3.14));
console.log(Boolean(-3.14));
console.log(Boolean(Infinity));
console.log(Boolean(-Infinity));
```

## 隐式转换

其实就是在当我们用 if 这种判断真伪的时候，js 内部会被做转换。

最后实际上执行的大概是这样的感觉。

```js
if (value) {
  // value is truthy
} else {
  // value is falsy
  // it could be false, 0, '', null, undefined or NaN
}
```

参考文章

[这篇文章写的不错 Truthy and Falsy Values: When All is Not Equal in JavaScript](https://www.sitepoint.com/javascript-truthy-falsy/)
