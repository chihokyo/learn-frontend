# JS提高 Tips

## 1 作用域提升问题

首先要知道这个ES规范的说法问题，本质上没有变化，只是在说法上可能会有些许变化，但是意思是基本上差不多的。

JS在执行的时候，首先全局会有一个GO的作用域。

这个需要一些图来辅助理解。明天整理。

## 2 代码在内存的执行

加载到内存 → CPU执行 → 根据CPU可能会在开辟空间

内存的生命周期

- 申请空间
- 使用空间 存放啥的
- 不用销毁释放

## 3 具体函数的执行

下面一段代码的奇幻旅程（执行过程）。

```javascript
var msg = 'hello global';
function foo() {
  console.log(msg);
}
function bar() {
  var msg = 'hello bar';
  foo();
}
bar(); // hello global
```

> 这里我只是先画一个整体流程图，不包含细节。

总体说1就是编译阶段生成的，其他都是陆续生成的。

![image-20220326232628199](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220326232628199.png)

## 4 闭包函数又是什么呢？

![image-20220327231220222](/Users/chin/Library/Application Support/typora-user-images/image-20220327231220222.png)

## 5 什么是闭包的内存泄漏？

其实就是**闭包函数地址**和**周围环境的那个函数地址**互相指向对方，导致迟迟不会被销毁！

```javascript
closureFn = null // 这样就可以手动销毁
```

## 6 this在nodejs里为什么是{}？

module → 加载 → 编译 → 放到一个函数 → 执行这个函数（`function.call({}`)）

源码可以看到的！

[源码地址lib/internal/modules/cjs/loader.js](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js)

![image-20220328013823562](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220328013823562.png)

## 7 this什么时候确定？

只有在执行的时候才能确定，动态绑定！解析的时候是啥谁也不知道，在函数执行上下文FEC真正执行的时候才能被确定。

- 不同的绑定规则，不同的调用方法，结果也就不一样。

![image-20220328014727949](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220328014727949.png)

```javascript
/**
 * this的指向，和你的函数在哪里定义的根本无关
 * 跟谁调用的，调用的方式才有关系！
 */

// 1.直接调用
function foo() {
  console.log(this);
}
foo(); // window对象 → 一大坨

// 2.创建对象，对象中的函数指向foo
var obj = {
  id: '1',
  foo: foo,
};
obj.foo(); // obj的对象 → { id: '1', foo: [Function: foo] }

// 3.apply 调用
foo.apply('demo'); // 字符串 → [String: 'demo']
```

## 8 this的指向问题

## 9

## 10 自己实现一个call/apply/bind

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

本质其实用就用了this的隐式绑定

```javascript
// 给所有函数增加属性
Function.prototype.mycall = function () {
  console.log('mycall is called');
  // 如何才能让函数知道是哪个函数？通用性问题
  // 为什么这样就可以？因为this只跟你谁调用有关 !!!
  var fn = this; // 绑定this
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

接下来就是要解决的this问题，因为原生的`call(this)` 这样写谁，就可以绑定谁的。

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

this有可能是其他类型，所以需要你转换一下。

