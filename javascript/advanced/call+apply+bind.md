# call + apply + bind

首先在自己实现以前先要理解一下什么是这三个的用法。

这 3 个其实刚开始学习的时候肯定会懵逼，但是现在我先说一下`call()` ，只要解决了这个就差不多解决了其他 2 个。

首先要明白几点，就是我们的 js 和 java 这些语言不一样，没有私有属性，谁都能访问。同时刚开始也没有为面向对象触发，导致类的继承等等比较难。

## call()

### call() 基本定义

[MDN:Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

从上面可以看出来这是一个函数的方法，什么意思的，只有函数才能有的方法。

```javascript
'hello'.call(); // ❌
true.call(); // ❌
111.call(); // ❌
```

那么基本上就可以解释了。只有前面是一个函数才可以调用`call()`方法

- 参数是什么呢？俩参数
  - 参数 1 this 指向 → 严格模式下 undefined 和 null 会被转成全局对象
  - 参数 2 ...参数列表。后面都是参数
- 返回值
  - 使用调用者提供的 `this` 值和参数调用该函数的返回值。若该方法没有返回值，则返回 `undefined`。
  - ↑ 意思就是全看调用者返回啥

### call() 作用

- ### 直接调用函数

```java
function foo() {
  console.log('hello');
}

foo.call(); // console.log('hello');
// 这里虽然我没写foo()，但就是调用了
```

- ### 改变 this 指向

![image-20220520140213875](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220520140213875.png)

这里还有一个改变 this 指向的方法

```javascript
// 假如在一个点击事件函数中有一个内部函数 func，当点击事件被触发时，就会出现如下情况：
// before
document.getElementById('divBox').onclick = function () {
  console.log(this.id); // divBox
  var func = function () {
    console.log(this.id); // undefined，这里的 this 指向了 window
  };
  func(); // 自调用 指向window
};

// after
document.getElementById('divBox').onclick = function () {
  console.log(this.id); // divBox
  var func = function () {
    console.log(this.id); // divBox
  };
  func.call(this); // 改变方向 这里的this是divbox
};
```

- ### 借用人家方法

比如，aruguments 这个其实是一个类数组。因为不是数组，所以没有 push 的方法。但是我就想用 push 的方法怎么办。于是就借用一下`Array.prototype.push()`的 push 方法

```javascript
Array.prototype.push.call(类数组);
Array.prototype.push.call(arguments);
```

- ### 实现继承

```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

// 你Food根本就没有这个初始化操作，但是借用了Product的操作 相当于调用了父类（此处是Product）的构造函数
console.log(new Food('cheese', 5).name);
```

要实现这个，就要给所有的函数都实现一个方法。用的就是所有函数的母亲`Function` 通过原型链来实现

```javascript
// 给所有函数增加属性 mycall 这个属性是一个方法
Function.prototype.mycall = function () {
  console.log('mycall is called');
};

function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}

// 这样就顺利给这俩函数增加了方法 mycall
foo.mycall(); // mycall is called
bar.mycall(); // mycall is called
```

那么如何才能让我自己定义的 `mycall()` 方法实现和 `call()` 一样，能够执行就运行呢？

本质其实用就用了 this 的隐式绑定。`foo.call()`的话，相当于 this 就是 foo。

```javascript
// 给所有函数增加属性
Function.prototype.mycall = function () {
  console.log('mycall is called');
  // 如何才能让函数知道是哪个函数？通用性问题
  // 为什么这样就可以？因为this只跟你谁调用有关 !!!所以这里的this就是 xxx.call()的xxx，即函数体
  var fn = this; // 绑定this ⚠️ 最难理解的地方，如果理解了，就差不多了
  fn(); // 谁调用就指向谁
};

function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}

foo.mycall();
bar.mycall();
```

接下来就是要解决的 this 问题，因为原生的`call(this)` 这样写谁，就可以绑定谁的。

```javascript
// 给所有函数增加属性
Function.prototype.mycall = function (thisArg) {
  console.log('mycall is called');
  // 如何才能让函数知道是哪个函数？通用性问题
  // 为什么这样就可以？因为this只跟你谁调用有关
  var fn = this;
  // fn();
  // 那么如何解决随意指向？
  thisArg.fn = fn; // 那就是给你这个绑定一个同名函数
  thisArg.fn(); // 直接执行

  // 因为是多余的 用完就弃
  delete thisArg;
};
```

this 有可能是其他类型，所以需要你转换一下。接下来的话，我直接上全部的代码吧。

其实代码的书写，尤其是轮子的书写，主要是考虑到好多的 edge case，这些边界条件的考虑会特别多。

```javascript
Function.prototype.mycall = function (thisArg, ...args) {
  // 在这里可以去执行调用的那个函数(foo)
  // 问题: 得可以获取到是哪一个函数执行了 mycall
  // 1.获取需要被执行的函数
  var fn = this;

  // 2.对thisArg转成对象类型(防止它传入的是非对象类型)
  // Object(thisArg)是要看的这里是为了应对string，number,boolean
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  // 3.调用需要被执行的函数
  thisArg.fn = fn;
  // 这里使用的是【展开语法】，上面的放在形参里的是【剩余参数】。
  // 这里展开语法相当于把所有你接收到的参数都给args
  var result = thisArg.fn(...args);
  delete thisArg.fn;
  // 为什么删呢？因为你既然增加了一个fn属性，这个属性用完之后就没用了是多余的肯定是要删除的

  // 4.将最终的结果返回出去
  return result;
};
```

> 我感觉手写实现`call()`最大的麻烦就是关于第一步
>
> `fn = this` 这一步的理解，如果你不懂此时的 this 其实就是你调用的函数。你就很难继续写下去。

## apply()

apply 和 call 的区别就是，

```js
function.apply(thisArg, [argsArray])  // 参数2是数组
function.call(thisArg, arg1, arg2, ...) // 参数2之后都是参数
```

其他用法都一样，直接手写就可以了。

```javascript
Function.prototype.myApply = function (thisArgs, arrParam) {
  fn = this;
  thisArgs =
    thisArgs !== null && thisArgs !== undefined ? Object(thisArgs) : window;

  // 话说三元运算符也可以这样写 当你有一个默认值的时候
  // thisArgs ? thisArgs : [];
  // thisArgs = thisArgs || []
  thisArgs.fn = fn;
  // ...arrParam 这里相当于把arrParam一个个遍历之后存入arrParam
  // 浅复制一份
  const result = thisArgs.fn(...arrParam);
  delete thisArgs.fn;
  return result;
};

console.log(bar.myApply('h', [9, 8]));
```

> ⚠️ 和 call 不一样的地方

```js
Function.prototype.mycall = function (thisArg, ...args) // call
Function.prototype.myApply = function (thisArgs, arrParam) // apply
// 为什么会这样呢？因为本来传入到apply的就是一个数组，而传入call的是一个不定参数。
// 通过使用剩余参数... 把所有的参数打成一个数组的包，传入到args里了
```

## bind()

这个和上面俩最重要的区别就是这个是返回一个**函数**

- 难点 1 返回一个参数，这个很难想到
- 难点 2 因为是两个函数，所以参数要合并
- ⁉️ 本质就是函数的柯里化，仔细想想~

```javascript
Function.prototype.myBind = function (thisArg, ...restParams) {
  fn = this;
  thisArgs =
    thisArgs !== null && thisArgs !== undefined ? Object(thisArgs) : window;
  thisArg.fn = fn;
  // 这里是要返回一个参数的
  function proxyFn(...proxyRestParam) {
    // 最重要的一部，合并2个参数
    const finalParams = [...restParams, ...proxyRestParam];
    const result = thisArg.fn(finalParams);
    delete thisArg.fn;
    return result;
  }
  return proxyFn;
};

function sum(a, b, c) {
  console.log(this);
  console.log(a + b + c);
}

const newSum = sum.bind('111', 3, 4, 5);
newSum();
```
