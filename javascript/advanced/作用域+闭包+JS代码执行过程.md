# 闭包+作用域 Closure + Scope

为什么要这样写呢？

最近在重新学习 JavaScript 我说一下吧。比如说闭包，为什么很难理解呢？因为我原来用的都是面向对象的思维，面向对象是啥思维，就是封装的时候有**私有变量**，有**公共变量**。

> 但是 JavaScript 很不幸的没有私有变量这个玩意儿。

其实再谈闭包之前这些都是需要理解的，如果这些不理解其实很难去理解闭包。

- 作用域是什么
- 作用域的提升
- 函数在内存中的执行
- 闭包是什么
- 闭包在内存中的执行
- 闭包实际使用场景

## 1 作用域

### 1-1 什么是作用域？

什么是作用域，就是定义了**变量**的**访问**范围。 简单的说就是谁能碰到你，谁能访问到你的问题。

> 什么是作用域，就是定义了变量的访问范围。

什么是作用域，就是定义了变量的访问范围。

- 全局作用域
- 函数作用域
- 块状作用域（ES6 之前没有块状作用域的）

![image-20220519202001259](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519202001259.png)

👇🏻 有一部分是出自 javascript info 上的解释

```js
/**
 * 在外面无法访问的
 */
{
  let msg = 'hello';
  console.log(msg);
}
console.log(msg); // ReferenceError: msg is not defined

/**
 * 所以就独自美好
 */
{
  let msg = 'hello';
  console.log(msg);
}

{
  let msg = 'world';
  console.log(msg);
}

/**
 * 如果我们使用 let 对已存在的变量进行重复声明，如果对应的变量没有单独的代码块，则会出现错误：
 */
let msg = 'hello';
let msg = 'world'; // variable already declared
```

对于 `if`，`for` 和 `while` 等，在 `{...}` 中声明的变量也仅在内部可见

```js
for (let i = 0; i < 3; i++) {
  // 变量 i 仅在这个 for 循环的内部可见
  alert(i); // 0，然后是 1，然后是 2
}

alert(i); // Error, no such variable
```

这里和 php 对比一下,php 是不可能在外面定义一个普通变量然后被访问到的。

```js
/**
 * JS是可以访问cname
 */
let cname = 'chin';
function show() {
  console.log(cname);
}
show(); // chin

/**
 * PHP根本不可以访问
 */
$cname = 'chin';
function show() {
  var_dump($cname);
}
show(); // undefined variable:cname
```

### 1-2 var 的特殊性

var 只有函数作用域和全局作用域，没有块状作用域。

```js
if (true) {
  var cname = 'chin';
}
console.log(cname); // ✅ chin 因为var这个时候就是全局作用域

if (true) {
  let cname = 'chin';
}
console.log(cname); // ❌ 显示错误 因为let就是块级作用域 而var没有
```

但是在函数级别的作用域上是一样的

```js
// 在函数作用域的表现上 var和let都是一样的
function show() {
  var cname = 'chin';
  console.log(cname);
}
console.log(cname); // ReferenceError: cname is not defined

function show() {
  let cname = 'chin';
  console.log(cname);
}
console.log(cname); // ReferenceError: cname is not defined
```

其实这个作用域提升的问题怎么说呢？

这里有 MDN 关于这段问题的解释 [Hoisting：变量提升](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

```javascript
// 函数是可以被变量提升的
// 没定义就提前调用？瓦特？我们JavaScript当然可以！🤪
catName('Tiger');

function catName(name) {
  console.log("My cat's name is " + name);
}
```

其实上面就是一个变量提升问题，一个变量在你声明之前，你就调用了，这当然就是提升了！

比如下面

```js
// 验证一下

//  ✅ 提前调用OK的
foo(); // Statement
function foo() {
  console.log('Statement');
}

// ❌ 不可以提前调用
foo(); // ReferenceError
const foo = () => {
  console.log('Expressions');
};
```

但是这个问题是怎么产生的呢？这就涉及到 JavaScript 代码在内存中是如何进行执行的问题了。

## 2 具体函数的执行

首先要明白几个单词概念吧。

**【1】Execution Context Stack** 执行上下文调用栈 【保证 JS 代码按照一定顺序执行】

> 基本上函数执行都需要 stack 这个数据结构，为什么？因为他是 LIFO，先进后出。

![Stack Data Structure and Implementation in Python, Java and C/C++](https://cdn.programiz.com/sites/tutorial2program/files/stack.png)

**【2】Global Execution Context** 全局执行上下文

👆 只要有 JS 代码 【全局代码整体要执行 就要有上下文】

**【3】Functional Execution Context** 函数执行上下文 【和全局代码一样 同理】

**【4】Activation Object** AO AO 中包含形参、arguments、函数定义和指向函数对象、定义的变量。

> 上面的概念在下面都有解析。

### 代码段 1 无函数

> 引擎会在执行代码之前，会在堆内存中创建一个全局对象:Global Object(GO)
>
> → 该对象 所有的作用域(scope)都可以访问
>
> → 里面会包含 Date、Array、String、Number、setTimeout、setInterval 等等
>
> → 其中还有一个 window 属性指向自己

![image-20220519160333160](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519160333160.png)

> 什么是作用域提升呢？
>
> 其实就是上面的在**解析阶段**，代码还没执行的时候。你可以看到 GO 里面已经有当前全局所有的变量初始化了。虽然都是 undefined 的吧。重要的事情说三遍！**解析阶段解析阶段解析阶段**！！！
>
> 所以这就解释了下面的代码

```javascript
var name = 'chin';
console.log(foo); // 虽然还没声明 却有了。这就是作用域提升
var foo = 1;
```

顺便 GO 也是可以确认的 在 `console.log(window)` 就可以找到。

### 代码段 2 有函数

下面一段代码是怎么执行的呢？

这里先引入一个定义 Functional Execution Context 函数执行上下文 ，FEC 包括

- **A**ctivation **O**bject 对象（包形参、arguments、函数定义和指向函数对象、定义的变量）
- **S**cope **C**hain 作用域链 （自身 AO + parentScope 父级作用域，如果父级没有，就继续沿着上一层继续，直到找到为止，没找到就是未定义错误 ）
- this 指向（这个是运行才知道的，这个可以先无视掉）

```javascript
// 2️⃣ 代码的执行过程（有函数）
var id = 'chin';

foo(123);
function foo(num) {
  console.log(m);
  var m = 10;
  var n = 20;

  console.log(id);
}

console.log(aa);
```

- 编译阶段

  这里函数的 AO 也依然是在编译阶段的，只是是在`foo()`执行之后，此时一旦执行就生成了一个 FEC 押入到 stack 里面，然后进行编译创建 AO，此时 `foo()`还没有执行。

  ![image-20220519171647105](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519171647105.png)

下面开始执行，执行阶段有点复杂。直接也写了编译。

![image-20220519173657455](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519173657455.png)

> 更新，函数要优先于所有变量进行解析。所以即使变量写在前面，函数也不会覆盖变量。但是变量会覆盖函数。

```js
var foo = 'foo';
function foo() {
  console.log('function foo');
}

// 虽然foo定义在前面，但是函数foo是一定会提前被解析的
// 所以函数最后被覆盖掉了
```

### 代码段 3 有函数（嵌套 1）

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

总体说 1 就是编译阶段生成的，其他都是陆续生成的。

编译阶段 → 又叫**词法解析**，词法解析的时候确定了父级作用域。

那么什么是词法解析，其实我感觉这个定义就是和运行相对的，一个为动，一个为静。

**词法解析的意思就是一个函数的变量跟在哪里定义有关。** 是静止的状态，一个程序静止的时候怎么看关系呢，还不是出生在哪里就是哪里的人。完全和运行无关的。又不是 this！

![image-20220326232628199](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220326232628199.png)

## 3 闭包函数又是什么呢？

这里在经过我又看了几个视频之后，我对闭包又有了新的认识。首先你要知道闭包的含义就要知道 JavaScript 里面函数的执行顺序，作用域，作用域链这些内容。知道这些内容你才能懂得。

- 闭包一定跟函数有关（没有函数就没有闭包）
- 闭包是基于变量作用域无法从外访问到内的变量的特性决定，你只能通过**函数**访问！无法直接访问变量！
- 闭包产生跟**函数**出生地有关。

```javascript
let f; // 虽然f之前就声明了，但是你没【诞生】
const g = function () {
  const a = 23;
  // f函数的出声就伴随着他一系列的环境，此时就是a
  // 因为f这个函数跟a这个变量在a是函数就绑定了
  f = function () {
    console.log(a * 2);
  };
};

g(); // g执行完之后所有玩意儿应该消失才对？
f(); // 利用了闭包，你才能从外到内访问到一个变量，也就是a。那通过什么访问呢？诞生一个新函数f
```

如果实在不懂，可以问自己几个问题

- 我如何从外部（全局）拿到内部的一个变量 a？※ 按照常理说 ⚠️ 从外不能到内的！
- `g()`函数都执行完了，怎么后面的`f()`还能访问到变量 a？？？
- 为什么 f 明明提前就声明了，但是里面还能绑定变量 a 形成一个闭包？

这里同时在给一段代码，证明了闭包永远不会断连他的出生地，即使已经重生。

```javascript
let f;
const g = function () {
  const a = 23;
  // 因为f这个函数跟a这个变量在a是函数就绑定了
  f = function () {
    console.log(a * 2); // 46
  };
};

const h = function () {
  const b = 888;
  // 永远跟自己出生地有关，即使被重新赋值了
  // 也依然跟b有关联
  // 🆕 重生了 重新赋值
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

h();
f(); // 1776
console.dir(f);
```

### 3-1 回调函数

![image-20220519150756550](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220327231220222.png)

我说一下吧，因为这也涉及到回调函数的问题。

> **所有的回调函数都会产生闭包，因为回调函数每一次都是在某个函数里面诞生的！！！**

回调函数其实就是用的**闭包来实现访问内部的数据**的。

回调函数传入的参数是函数 → 函数打入内部拿你的财产（这就是闭包的作用） → 你拿到了

这里有一个例子你给解释一下，为什么 header 的 dom 无需重新获取?

![image-20220519150756550](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519150756550.png)

下面直接写几个闭包吧。

其实下面这就是一个函数柯里化，但也会产生闭包。函数柯里化必然产生闭包！！

![image-20220519231357886](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519231357886.png)

其实参数也可以是一个函数的。

![image-20220519232208136](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519232208136.png)

那么闭包在内存中是如何表现的呢？

### 3-2 闭包内存执行顺序

```javascript
function foo() {
  var id = 100;
  return function bar() {
    console.log(id);
  };
}

var newBar = foo(); // ← 下面的图到这里截止
newBar();
```

![image-20220520001419295](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220520001419295.png)

接下来再看最后一行代码的执行，发现是运行了`newBar()`

```javascript
function foo() {
  var id = 100;
  return function bar() {
    console.log(id);
  };
}

var newBar = foo();
newBar(); // ← 开始执行这里
```

下面这幅图是`newBar()`之后的执行情况

下面的图片完全就可以解释到，为什么`foo()`执行完了之后`newBar()`还能保存变量，

因为全局的 GO 里面一直有作用域引用指向了这个 AO 对象，所以它不会被释放掉。

![image-20220520002908688](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220520002908688.png)

在这里补充一些小问题。函数嵌套就一定有闭包吗？

```javascript
// 这里可以很明显的看到确实是【函数嵌套】
// 但是你执行之后能拿到n吗？
// 如果按照函数嵌套就会产生闭包的理论 n 就能拿到
function foo(fn) {
  var n = 0;
  fn(); // 这里只是调用，fn这个函数的诞生并非是因为foo的执行！！
}

function bar() {
  console.log(n);
}

foo(bar);
```

### 3-3 一些闭包的案例

使用`done`这个变量来实现记录一下函数有没有被多次执行。

```javascript
// 一段代码只能执行一次
function once(fn) {
  let done = false;
  return function () {
    if (!done) {
      done = true;
      return fn.apply(this, arguments);
    }
  };
}
let pay = once(function (money) {
  console.log(`${money} RMB`);
});

pay(2);
pay(3); // 这一次不会被执行
```

### 3-4 闭包经常和立即执行函数一起来搞插件

为什么呢，因为以前是没有块级作用域。只有函数作用域，都写在立即函数里面可以保证**不会污染全局变量**

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

### 3-5 闭包和柯里化也有渊源

因为柯里化利用的就是闭包，才能拿到上一个函数的结果。

```javascript
// 没→柯里化
function foo(m, n, x, y) {
  return m + n + x + y;
}
console.log(foo(1, 2, 3, 4));

// 有→柯里化
// 其实这里也有闭包，可以使用外面的参数数据
function foo1(m) {
  return function foo2(n) {
    return function foo3(x) {
      return function foo4(y) {
        return m + n + x + y;
      };
    };
  };
}
console.log(foo1(1)(2)(3)(4));

// 箭头函数
var foo = (m) => {
  // ⚠️ 这里就是闭包 ⚠️
  // m能在n的地方被拿到。并且一直到最后。
  return (n) => {
    return (x) => {
      return (y) => {
        return m + n + x + y;
      };
    };
  };
};
console.log(foo(2)(3)(3)(4));

// 箭头函数进一步简化
var fooMini = (m) => (n) => (x) => (y) => {
  return m + n + x + y;
};
console.log(fooMini(1)(2)(3)(4));
```

## 4 什么是闭包的内存泄漏？

其实就是**闭包函数地址**和**周围环境的那个函数地址**互相指向对方，导致迟迟不会被销毁！

此时需要一张图。

```javascript
closureFn = null; // 这样就可以手动销毁
```
