# JS 提高 Tips

## 1 作用域提升问题

什么是作用域，就是定义了变量的访问范围。

- 全局作用域
- 函数作用域
- 块状作用域

![image-20220519202001259](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519202001259.png)

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

## 2 代码在内存的执行

加载到内存 → CPU 执行 → 根据 CPU 可能会在开辟空间

内存的生命周期

- 申请空间
- 使用空间 存放啥的
- 不用销毁释放

## 3 具体函数的执行

Execution Context Stack 执行上下文调用栈 【保证 js 代码按照一定顺序执行】

Global Execution Context 全局执行上下文 【全局代码整体要执行 就要有上下文】

Functional Execution Context 函数执行上下文 【和全局代码一样 同理】

Activation Object AO AO 中包含形参、arguments、函数定义和指向函数对象、定义的变量

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
> 其实就是上面的在**解析阶段**，代码还没执行的时候。你可以看到 GO 里面已经有当前全局所有的变量初始化了。虽然都是 undefined 的吧。重要的事情说三遍！解析阶段解析阶段解析阶段！！！
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

编译阶段 → 又叫词法解析，词法解析的时候确定了父级作用域。

那么什么是词法解析，其实我感觉这个定义就是和运行相对的，**词法解析的意思就是一个函数的变量跟在哪里定义有关。** 和运行无关的。又不是 this！

![image-20220326232628199](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220326232628199.png)

## 4 闭包函数又是什么呢？

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

![image-20220327231220222](/Users/chin/Library/Application Support/typora-user-images/image-20220327231220222.png)

我说一下吧，因为这也涉及到回调函数的问题。

> **所有的回调函数都会产生闭包，因为回调函数每一次都是在某个函数里面诞生的！！！**

回调函数其实就是用的闭包来实现访问内部的数据的。

回调函数传入的参数是函数 → 函数打入内部拿你的财产（这就是闭包的作用） → 你拿到了

这里有一个例子你给解释一下，为什么 header 的 dom 无需重新获取?

![image-20220519150756550](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519150756550.png)

下面直接写几个闭包吧。

其实下面这就是一个函数柯里化，但也会产生闭包。函数柯里化必然产生闭包！！

![image-20220519231357886](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519231357886.png)

其实参数也可以是一个函数的。

![image-20220519232208136](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220519232208136.png)

那么闭包在内存中是如何表现的呢？

### 闭包内存执行顺序

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

### 一些闭包的案例

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

### 闭包经常和立即执行函数一起来搞插件

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

### 闭包和柯里化也有渊源

因为柯里化

## 5 什么是闭包的内存泄漏？

其实就是**闭包函数地址**和**周围环境的那个函数地址**互相指向对方，导致迟迟不会被销毁！

```javascript
closureFn = null; // 这样就可以手动销毁
```

## 6 this 在 nodejs 里为什么是{}？

module → 加载 → 编译 → 放到一个函数 → 执行这个函数（`function.call({}`)）

源码可以看到的！

[源码地址 lib/internal/modules/cjs/loader.js](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js)

![image-20220328013823562](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220328013823562.png)

## 7 this 什么时候确定？

只有在**执行**的时候才能确定，动态绑定！解析的时候是啥谁也不知道，在函数执行上下文 FEC 真正执行的时候才能被确定。

就是上面的内存执行不是有一块是函数的 FEC（**F**unctional **E**xecution **C**ontext ）

FEC 主要三个板块组成

- VO 形参
- Scope Chain VO + Parent 的 VO（大部分都是 GO）
- **this** → 就是在这个时候确定的
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

## 8 this 的指向问题

- 默认绑定
- 隐式绑定
- 显示绑定
- new

默认绑定来一波

```javascript
// 1.案例一:
function foo() {
  console.log(this);
}
foo();

// 2.案例二:
function foo1() {
  console.log(this);
}
function foo2() {
  console.log(this);
  foo1();
}
function foo3() {
  console.log(this);
  foo2();
}
foo3();

// 3.案例三:
var obj = {
  name: 'why',
  foo: function () {
    console.log(this);
  },
};

var bar = obj.foo;
bar(); // window

// 4.案例四:
function foo() {
  console.log(this);
}
var obj = {
  name: 'why',
  foo: foo,
};

var bar = obj.foo;
bar(); // window

// 5.案例五:
function foo() {
  function bar() {
    console.log(this);
  }
  return bar;
}

var fn = foo();
fn(); // window
```

- 隐式绑定

隐式绑定: `Object.fn()`
Object 对象会被 js 引擎绑定到 fn 函数的中 this 里面

```javascript
var obj = {
  age: 99,
  eating: function () {
    // 这里即可一些obj也可以写this
    // 但是考虑到通用性 还是this
    console.log('age is', this.age);
  },
};

obj.eating(); // 因为是obj调用，所以this就是obj
// 下面这样就拿不到了，因为调用的根本不是obj
var fn = obj.eating;
fn();

// 下面虽然函数是调用的obj1里面的
var obj1 = {
  id: 'obj1',
  foo: function () {
    console.log(this);
  },
};
var obj2 = {
  id: 'obj2',
  bar: obj1.foo,
};

obj2.bar(); // 但结果还是obj2
```

- 显示绑定

call 和 apply 在执行函数时,是可以明确的绑定 this, 这个绑定规则称之为显示绑定！

- `call()` → 参数单独
- `apply()` → 参数是数组
- `bind()` → 返回一个新函数 永久！

```javascript
// 1.foo直接调用和call/apply调用的不同在于this绑定的不同
foo直接调用指向的是全局对象(window);
foo();

var obj = {
  name: 'obj',
};

// call/apply是可以指定this的绑定对象
foo.call(obj);
foo.apply(obj);
foo.ap;

// 2.
function foo() {
  console.log(this);
}

// foo.call("aaa")
// foo.call("aaa")

// 默认绑定和显示绑定bind冲突: 优先级(显示绑定)
var newFoo = foo.bind('aaa');
newFoo();
newFoo();

var bar = foo;
console.log(bar === foo); // true
console.log(newFoo === foo); // false
```

- new 绑定

这里的 this 就是 new 出来的实例

```javascript
// 我们通过一个new关键字调用一个函数时(构造器), 这个时候this是在调用这个构造器时创建出来的对象
// this = 创建出来的对象
// 这个绑定过程就是new 绑定

function Person(name, age) {
  this.name = name;
  this.age = age;
}

var p1 = new Person('why', 18);
console.log(p1.name, p1.age);

var p2 = new Person('kobe', 30);
console.log(p2.name, p2.age);

var obj = {
  foo: function () {
    console.log(this);
  },
};
```

## 9 this 特殊的一些情况

`setTimeout()`绑定的哪里？→ window

```javascript
setTimeout(function () {
  // 关于这个this指向是谁，其实主要看的是
  // setTimeout 这个函数的实现内部是如何被调用的
  console.log(this);
}, 2000);

// setTimeout 是window
```

关于监听实现 → dom 对象

```javascript
const btn = document.querySelector('button');
btn.onclick = function () {
  console.log(this);
  // 其实这里就相当于内部给你做了一个操作
  // btn.onclick
};
```

操作数组的函数 forEach/filter/map/find

内部很有可能是独立的函数调用，所以结果就是 window

```javascript
var array = ['foo', 'bar', 'baz'];
array.forEach(function () {
  console.log(this);
});
// 但是你也可以修改
array.forEach(function () {
  console.log(this);
}, 这里可以写一下你想绑定的this指向);
```

## 10 关于 this 优先级问题

其实这个优先级理论性的感觉比较强。死记硬背一下。

```
1.默认规则的优先级最低
	→ 毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this
2.显示绑定优先级高于隐式绑定
3.new绑定优先级高于隐式绑定
4.new绑定优先级高于bind
	→ new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高
	→ new绑定可以和bind一起使用，new绑定优先级更高
```

## 11 this 特例若干

如果你 call/apply/bind 绑定的是 `null undefined `这样的

那么这个**显示绑定会被忽略，使用默认规则**

```javascript
function foo() {
  console.log(this);
}
var obj = {
  id: 'yes',
};
foo.call(obj); // obj
foo.call(null); // window
foo.call(undefined); // window

var bar = foo.bind(null);
bar(); // window
```

还有个间接函数引用 → 独立函数调用

```javascript
function foo() {
  console.log(this);
}

var obj1 = {
  id: 'obj1',
  foo: foo,
};

var obj2 = {
  id: 'obj2',
};
obj2.bar = obj1.foo;
obj2.bar(); // obj2

obj1.foo();
// 真正的代码 绝对不会这样写
// 这里的赋值操作
// 死记硬背就可以了
(obj2.foo = obj1.foo)(); // window 会被认为独立函数调用
// (这个会被当成一个整体)()
```

## 12 箭头函数 this 的特殊性

- 没有 this 和 arguments

- 箭头函数不适用前面的 this 规则 → 不进行 this 绑定 → 根据外层作用域来定

  所以以下的情况都是被无视的

```javascript
var id = 'chin';
var foo = () => {
  console.log(this);
};

foo(); // 直接调用无视 {}

var obj = {
  foo: foo,
};

obj.foo(); // 隐式调用无视 {}
foo.call('abc'); // 显示绑定无视 {}
```

## 13 箭头函数的特殊性带来的好处

下面来对比一下

- 没有箭头函数的时候

```javascript
var obj = {
  data: [],
  getData: function () {
    setTimeout(function () {
      var res = ['a', 'b', 'c'];
      // setTimeout这个的this其实是window
      // 结果就是window.data = res
      // 这尼玛怎么会有push方法呢
      this.data.push(res);
    }, 2000);
  },
};
obj.getData(); // 出错因为找不到这个push方法

/*==========那则么办，一般都是这样解决的==========*/

var obj = {
  data: [],
  getData: function () {
    // 其实这里就是形成了一闭包，set取得了_this这个自由变量
    var _this = this;
    setTimeout(function () {
      var res = ['1', 't', 'd'];
      console.log(_this);
      _this.data.push(...res);
    }, 2000);
  },
};
console.log(obj.data); // 这里打印不出来是因为setTimeout异步调用问题
```

- 有箭头函数的之后

```javascript
var obj = {
  data: [],
  getData: function () {
    // 因为是箭头函数，自然就去找了那个上层的函数也就是function的obj了
    setTimeout(() => {
      var res = ['a', 'av'];
      this.data.push(...res);
    }, 2000);
  },
};
console.log(obj.data); // 这里打印不出来是因为setTimeout异步调用问题
```

下面是如果 getData 也是一个呢？

```javascript
var obj = {
  data: [],
  getData: () => {
    var _this = this;
    setTimeout(() => {
      var res = ['1', 't', 'd'];
      this.data.push(...res); // 这里是会出错的，因为getData也是箭头函数之后 this就成了window 自然找不到push
    }, 2000);
  },
};
obj.getData();
console.log(obj.data);
```

## 14 自己实现一个 call/apply/bind

首先在自己实现以前先要理解一下什么是这三个的用法。

这 3 个其实刚开始学习的时候肯定会懵逼，但是现在我先说一下`call()` ，只要解决了这个就差不多解决了其他 2 个。

首先要明白几点，就是我们的 js 和 java 这些语言不一样，没有私有属性，谁都能访问。同时刚开始也没有为面向对象触发，导致类的继承等等比较难。

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

- 直接调用函数

```java
function foo() {
  console.log('hello');
}

foo.call(); // console.log('hello');
// 这里虽然我没写foo()，但就是调用了
```

- 改变 this 指向

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

- 借用人家方法

比如，aruguments 这个其实是一个类数组。因为不是数组，所以没有 push 的方法。但是我就想用 push 的方法怎么办。于是就借用一下`Array.prototype.push()`的 push 方法

```javascript
Array.prototype.push.call(类数组);
Array.prototype.push.call(arguments);
```

- 实现继承

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

本质其实用就用了 this 的隐式绑定

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
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  // 3.调用需要被执行的函数
  thisArg.fn = fn;
  var result = thisArg.fn(...args);
  delete thisArg.fn;
  // 为什么删呢？因为你既然增加了一个fn属性，这个属性用完之后就没用了是多余的肯定是要删除的

  // 4.将最终的结果返回出去
  return result;
};
```

## 15 关于 arguments

这个其实是 AO 里面的

- 是全局的。
- 你不用定义也是会存在的。
- 是一个类数组（本质是对象） ArrayLike

```javascript
function foo(a, b, c) {
  console.log(arguments);
}
foo();
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]0: 11: 22: 3callee: ƒ // foo(a, b, c)length: 3Symbol(Symbol.iterator): ƒ values()[[Prototype]]: Object
```

常用操作也有三个

- 获取长度

```javascript
// 常见的对arguments的操作是三个
// 1.获取参数的长度
console.log(arguments.length);
```

- 通过 index 获取某个参数

```javascript
// 2.根据索引值获取某一个参数
console.log(arguments[2]);
console.log(arguments[3]);
console.log(arguments[4]);
```

- callee 获取当前 arguments 所在的函数

```javascript
// 3.callee获取当前arguments所在的函数
console.log(arguments.callee);
// arguments.callee() 千万不能直接调用 因为会无限loop
```

## 16 arguments 转成数组

因为他是对象，所以想转换成数组。这里有几个方法，其中一个方法有关于 this 的一个应用场景！

方法感觉还是很多的，现在一个个看。

```javascript
// 第1种 直接遍历
function foo(num1, num2) {
  var newArr = [];
  for (var i = 0; i < arguments.length; i++) {
    newArr.push(arguments[i]);
  }
  return newArr;
}

// 第2种 使用Array对象
// 这里需要注意的就是，为什么要用call的问题
function foo(num1, num2) {
  // 因为这里根据谁调用this是谁的原则 如果不加call
  // 那么this就是Array原型链这里的，真正执行slice的时候就取不到这个 arguments 这也是很多人使用call
  // var newArr = Array.prototype.slice.call(arguments);
  var newArr = [].slice.call(arguments); // 一样的
  return newArr;
}

// 第3种 直接使用es6的语法
function bar(num1, num2) {
  // ①
  // var newArr = Array.from(arguments);
  // ... 这里只要放入的是可迭代对象就可以
  // 这里相当于用...把可迭代对象复制一份，然后放进了[]里面
  // ②
  var newArr = [...arguments];
  return newArr;
}
console.log(bar(2, 8));
```

这里就第 2 种方法在做一下说明，就是明明可以直接调用为什么要用 call 的原因。

```javascript
Array.prototype.myslice = function (start, end) {
  // 主要是这里 this要拿到的是原来的对象
  // 如果不写call 这里的this就是原来的Array.prototype
  var arr = this;
  start = start || 0;
  end = end || arr.length;
  var newArr = [];
  for (var i = start; i < end; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};

var newArray = Array.prototype.myslice.call(['1', 'b']);
console.log(newArray);
```

## 17 纯函数问题

这个是函数式编程的一种范畴，Pure Function

- 相同的输入必定有相同的输出
- 不会产生副作用（不会修改其他的数据，不会产生多余的 IO）

```javascript
// 相同的输入一定是相同的输出
function foo(num1, num2) {
  return num1 + num2;
}

// 这样就改变了foo的值，这肯定不是纯函数
var foo = 'chin';
function bar() {
  foo = 'yes';
}

// 改变了obj的信息 不是纯函数
function baz(info) {
  info.id = '2';
}
var obj = {
  id: '1',
  age: 99,
};
baz(obj);
console.log(obj);

// 跟上一个产生了强烈对比
// 这个就是纯函数 因为info这是会被复制一份然后return到新对象
// 并不是说修改了obj本身 而且每次调用函数 都会有同样的输出
function baz2(info) {
  return {
    ...info,
    age: 199,
  };
}
var obj = {
  id: '1',
  age: 99,
};
baz2(obj);
console.log(obj);
```

React 其实就用这个思想，不能随意的去直接修改 props 的数值。

## 18 柯里化 Currying

这个也是函数式编程的一个特色，说的刚开始我还以为是咖喱呢？

其实就是

- 一个函数只传递一部分参数来处理，另一部分参数由这个函数的返回值来处理！
- 这个过程就是柯里化

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

## 19 柯里化的好处？

- 单一职责
- 复用参数（其实就是在现有的函数上可以直接自己造函数）

单一职责不用说了，一个萝卜一个坑，一个函数内部写的清晰点。

```javascript
// 箭头函数
var foo = (m) => {
  // 在这里你可以写点别的
  return (n) => {
    // 在这里你可以写点别的
    return (x) => {
      // 在这里你可以写点别的
      return (y) => {
        // 在这里你可以写点别的
        return m + n + x + y;
      };
    };
  };
};
console.log(foo(2)(3)(3)(4));
```

复用参数，这个听起来貌似高大上其实很简单。

```javascript
function sum(x, y) {
  return x + y;
}
console.log(sum(1, 2));
console.log(sum(1, 3));

// 既然每次都是+1，那么如果用函数的柯里化可以这样写
function sum1(x) {
  return function (y) {
    return x + y;
  };
}
// 自己造一个函数
var sumCurryAddOne = sum1(1);
console.log(sumCurryAddOne(2));
console.log(sumCurryAddOne(3));
```

在比如打印日志，可以通过一个基础函数，造出来新的 2 个函数。

```javascript
var log = (date) => (type) => (msg) => {
  console.log(`[${date.getHours()}:${date.getMinutes()}][${type}][${msg}]`);
};
var logDateCurry = log(new Date());
logDateCurry('DEBUG')('这是bug1');
logDateCurry('DEBUG')('这是bug2');

var logDateBugCurry = log(new Date())('DEBUG');
logDateBugCurry('这是bug1');
logDateBugCurry('这是bug2');
```

## 20 手动实现一个自动把函数进行柯里化的函数

上面每次函数进行柯里化都需要手动进行，那如果自己写一个呢？

```javascript
// 首先in：函数 out：函数
// 因为你也不知道会有多少个参数，所以这种情况首先要想到递归
// 一直把参数无限递归，直到已经接收的参数要大于函数本身的参数
function myCurry(fn) {
  return function curried(...args) {
    // 已经接受到参数 >= 函数本身参数
    if (args.length >= fn.length) {
      // fn(...args);
      // fn.call(this, ...args)
      return fn.call(this, ...args);
    } else {
      // 没有达到个数 需要返回一个新函数，新的函数要继续接收参数
      return function curried2(...args2) {
        // 一样的
        // return curried.apply(this, [...args, ...args2]);
        // 递归调用最外层那个
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(x, y, z) {
  return x + y + z;
}

var curryAdd = myCurry(add);

console.log(curryAdd(10, 20, 30));
console.log(curryAdd(10, 20)(30));
console.log(curryAdd(10)(20)(30));
```

这个比较难实现，主要是因为要考虑一些情况。

- 调用的参数是不定的
- 关于 this 指向问题

→ 参数不定最后用的是**递归调用**解决的！

↓ this 指向的话 为什么每次都要用 call 来定向 this

```javascript
// fn(...args);
// fn.call(this, ...args)
return fn.call(this, ...args);
```

因为从上面的实现的那段代码可以看出来

![image-20220407001212850](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220407001212850.png)

不进行强制绑定的话，其实就是为了保证原函数和柯里化的函数都是同一个 this

```javascript
fn(...args); // this问题，这里会是window
return fn.call(this, ...args); // 这里的fn的this不是{},会变成window
```

## 21 组合函数 Compose

这个也是函数式编程的一些技巧

```
比如我们现在需要对某一个数据进行函数的调用，执行两个函数fn1和fn2，这两个函数是依次执行的;
那么如果每次我们都需要进行两个函数的调用，操作上就会显得重复;
那么是否可以将这两个函数组合起来，自动依次调用呢?
这个过程就是对函数的组合，我们称之为 组合函数(Compose Function);
```

```javascript
/***********使用之前**************/
// 比如一个数字先+10 在乘 2
function add(num) {
  return num + 10;
}
function double(num) {
  return num * 2;
}

var num = 10;
var res = double(add(num));
console.log(res);

/***********使用之后**************/
// ① 先组合起来
function composeFn(x, y) {
  return function (num) {
    return y(x(num));
  };
}
// ② 再生成一个新的函数
var newFn = composeFn(add, double);
console.log(newFn(10));
```

那么如何手动实现自动让函数进行组合？

```javascript
// 把所有fns放在一起
function myCompose(...fns) {
  // 以下只是测试参数错误
  var length = fns.length;
  for (var i = 0; i < length; i++) {
    // 如果传入的不是函数，直接报错
    if (typeof fns[i] !== 'function') {
      throw new TypeError('参数错误');
    }
  }
  // 这里的参数就是新函数的所有参数
  return function compose(...args) {
    var index = 0;
    // 没有参数 or 多个参数
    // 先执行1次
    var res = length ? fns[index].apply(this, args) : args;
    // index刚开始是0 先拿到一个在开始
    while (++index < length) {
      // 已有的结果传入到res 这里就是接连调用函数了
      res = fns[index].call(this, res);
    }
    return res;
  };
}
var newFn = myCompose(add, double);
console.log(newFn(100));
```

## 22 with 作用域问题

首先 js 的作用域只有 2

- main.js 就是一个模块整体就是一个作用域 → 全局作用域
- 函数是一个作用域 → 函数作用域

主要就是这两个作用域，其他都没有。

```javascript
var msg = 'hello msg';

function foo() {
  function bar() {
    // 先在自己找 → 再去的foo找 → 去的全局找
    // 目前这个作用域的链条是chain是这样的
    console.log(msg);
  }
  bar();
}

foo();

var msg = 'hello msg';

function foo() {
  function bar() {
    // 先在自己找 → 再去的foo找 → 去的全局找
    // 目前这个作用域的链条是chain是这样的
    console.log(msg);
  }
  bar();
}
```

感觉 with 就像一个任意门，可以随便快速传送一个变量到一个位置，便于代码找到自己想要的变量。

```javascript
('use strict');

var message = 'Hello World';
// console.log(message)

// with语句: 可以形成自己的作用域
var obj = { id: 'chin', age: 18, message: 'obj message' };

function foo() {
  function bar() {
    with (obj) {
      console.log(message);
      console.log('------');
    }
  }
  bar();
}

foo();

var info = { id: 'chin' };
with (info) {
  console.log(name);
}
```

**严格模式下是不能使用 with 的**

并且很多也不推荐使用

## 23 eval

这个在 webpack 里打包的时候可能会有这个选项，好多语言都有这个，就是字符串写代码。

- 可读性很差 → 连个缩进高亮都没
- 字符串被篡改开发的话不安全
- eval 执行必须经过 js 解释器，不能被 js 引擎所优化

```javascript
var jsString = 'var message = "Hello World"; console.log(message);';

eval(jsString);
```

## 24 严格模式

strict mode

- 既可以在整个文件里面开启严格模式
- 也可以在某个函数开启严格模式

```
1. 无法意外的创建全局变量
2. 严格模式会使引起静默失败(silently fail,注:不报错也没有任何效果)的赋值操作抛出异常
3. 严格模式下试图删除不可删除的属性
4.严格模式不允许函数参数有相同的名称
5. 不允许0的八进制语法
6. 在严格模式下，不允许使用with
```

严格模式下关于一些函数的 this 指向问题

这里最主要的是默认执行函数和`setTimeout()`

```javascript
// 在严格模式下, 自执行函数(默认绑定)会指向 undefined
function foo() {
  console.log(this);
}
var obj = {
  name: 'why',
  foo: foo,
};
foo(); // 严格模式下这里就是 undefined

obj.foo(); // 这里还是不变的 obj
var bar = obj.foo;
bar(); // 严格模式下这里就是 undefined
```

setTimeout 　这里需要仔细看

```javascript
// setTimeout的this
// 箭头函数肯定是没有的this 也就是{}
// 严格模式下，普通函数这里指向的是window，并不是想象中的是自执行函数的undefined
// 因为内部调用的时候，fn.apply(this = window)
setTimeout(function () {
  console.log(this);
}, 1000);
```

```
是由于setTimeout()调用的代码运行在与所在函数完全分离的执行环境上。这会导致这些代码中包含的 this 关键字会指向 window (或全局)对象。详细可参考MDN setTimeout
```

## 25 关于 js 的面向对象

1. **创建对象的方式**

- `var obj = new Object()`
- `var obj = {}`

```javascript
// 1.创建方式一: 通过new Object()创建
var obj = new Object();
obj.id = 'chin';
obj.age = 77;
obj.height = 1.88;
obj.running = function () {
  console.log(this.id + '在跑步~');
};

// 2.创建方式二: 字面量形式
var info = {
  id: 'chin',
  age: 40,
  height: 1.98,
  eating: function () {
    console.log(this.id + '在吃东西~');
  },
};
```

2. 关于属性的操作

```javascript
var obj = {
  id: 'yes',
  age: '88',
};
// 获取属性
console.log(obj.id);
// 给属性赋值
obj.location = 'china';
console.log(obj);
// 删除
delete obj.id;
// 遍历
for (var key in obj) {
  console.log(key);
}
```

## 26 属性描述符

为什么可以直接定义属性，还需要属性描述符呢？

因为属性描述符不仅仅可以直接定义属性，还可以对属性进行一些配置。

**数据描述符**

- value
- **configurable**
- **enumerable**
- writable

默认都是 false

`var obj = {}`

```javascript
Object.defineProperty(obj, 'location', {
  // 很多配置
  value: 'China', // 默认值undefined
  // 该特殊不可删除/也不可以重新定义属性描述符
  configurable: false, // 默认值false
  // // 该特殊是配置对应的属性(address)是否是可以枚举
  enumerable: true, // 默认值false
  // // 该特性是属性是否是可以赋值(写入值)
  writable: false, // 默认值false
});
```

**存取属性描述符**

- **configurable** 一样的
- **enumerable** 一样的
- `get()`
- `set()`

```javascript
var obj = {
  name: 'chin',
  age: 18,
  _location: '北京市',
};

// 存取属性描述符
// 1.隐藏某一个私有属性被希望直接被外界使用和赋值
// 2.如果我们希望截获某一个属性它访问和设置值的过程时, 也会使用存储属性描述符
Object.defineProperty(obj, 'address, {
  enumerable: true,
  configurable: true,
  get: function () {
    foo();
    return this._location;
  },
  set: function (value) {
    bar();
    this._location = value;
  },
});

console.log(obj._location);

obj.address = 'china';
console.log(obj.address);

function foo() {
  console.log('获取了一次location的值');
}

function bar() {
  console.log('设置了location的值');
}
```

还可以一次性定义多个属性修饰符

```javascript
var obj = {
  // 私有属性(js里面是没有严格意义的私有属性)
  _age: 18,
  _eating: function () {},
  // 既可以像下面那样直接写一个函数
  // 也可以这样直接写
  set age(value) {
    this._age = value;
  },
  get age() {
    return this._age;
  },
};

// 一次性定义多个
Object.defineProperties(obj, {
  name: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'chin',
  },
  age: {
    configurable: true,
    enumerable: true,
    get: function () {
      return this._age;
    },
    set: function (value) {
      this._age = value;
    },
  },
});

obj.age = 19;
console.log(obj.age);
console.log(obj);
```

获取某个对象的属性修饰符，其实就是俩方法

`Object.getOwnPropertyDescriptor(obj, "具体属性")`

`Object.getOwnPropertyDescriptors(obj)` 直接传入对象就行

限制属性的几种方式

`Object.preventExtensions(obj)` → 禁止对象继续添加新的属性

`Object.seal()` → 禁止对象配置/删除里面的属性

`Object.freeze()` → 让属性不可以修改(writable: false)

## 27 创建 js 对象的几种方式

- 字面量

```javascript
var obj = {};
```

- 工厂模式

缺点 类型过于宽泛，不能获取真实的对象。输出的时候全是 Object，不能具体到 Animal,Person 这种

```javascript
// 工厂模式: 工厂函数
function createPerson(name, age, height, address) {
  var p = {};
  p.name = name;
  p.age = age;
  p.height = height;
  p.address = address;

  p.eating = function () {
    console.log(this.name + '在吃东西~');
  };

  p.running = function () {
    console.log(this.name + '在跑步~');
  };

  return p;
}

var p1 = createPerson('张三', 18, 1.88, '广州市');
var p2 = createPerson('李四', 20, 1.98, '上海市');
var p3 = createPerson('王五', 30, 1.78, '北京市');

// 工厂模式的缺点(获取不到对象最真实的类型)
console.log(p1, p2, p3);
```

- 通过构造函数 new 出来。

## 28 关于 js 的构造函数

其实构造函数就是普通函数，只是被 new 了之后就有了不同的意义。

就像蜘蛛侠也只是个普通人，当他披上战衣的时候他就是蜘蛛侠，人人都可以成为蜘蛛侠，人人又是蜘蛛侠。

```javascript
function foo() {
  console.log('foo');
}
new foo(); // 一旦前面加上了new 这个foo就成了构造函数
new foo(); // 依然会被调用，和上面实际上是一模一样的
```

- 构造函数名并非一定要大写，`foo Foo`都是一样的，只是大写是约定俗成的
- 写`new foo` 也依然会被调用

那么 new 之后发生了什么呢？

```
p1. 在内存中创建一个新的对象(空对象);
p2. 这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性;
p3. 构造函数内部的this，会指向创建出来的新对象;
p4. 执行函数的内部代码(函数体代码);
p5. 如果构造函数没有返回非空对象，则返回创建出来的新对象; return this
```

![image-20220512143625659](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220512143625659.png)

## 29 js 构造函数 new 出来的对象是否为同一个？

每一个都是不同的！每一次都会单独搞出来一份！

因为函数每一次调用，都会单独开辟一段空间，用完之后销毁，然后继续开辟一段空间。

```javascript
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;

  this.eating = function () {
    console.log(this.name + '在吃东西~');
  };

  this.running = function () {
    console.log(this.name + '在跑步');
  };
}

var p1 = new Person('张三', 18, 1.88, '广州市');
var p2 = new Person('李四', 20, 1.98, '北京市');

console.log(p1.eating === p2.eating); // false

// 下一个也同理
function foo() {
  function bar() {}
  return bar;
}

var fn1 = foo();
var fn2 = foo();

console.log(fn1 === fn2); // false
```

那如何解决呢？ 就是通过对象的原型！

## 30 对象原型出来了 → 隐式原型

为了要节省空间，这里先说一下原型的概念。

- 每个对象都是有一个原型的`[[prototype]]` （早期 ECMA 没有规范去查看原型，这个双括号也只是个 es 空泛规定的，在不同的地方有自己不同的实现方式的时候他就这样写
- 后来浏览器为了让大家查看，各家自己规定了一些查看原型的方法，比如 \_\_proto\_\_，默认是一个空对象
- 但是这并不是正规的，ES5 之后提供的 `Object.getPrototypeOf(obj)`

上面的一段话总结一下就是，每个对象都有一个对象原型（又叫**隐式原型**）。浏览器有浏览器的查看，es 有 es 的查看方法。

> 原型有什么用呢？

```javascript
// 当我们从一个对象中获取某一个属性时, 它会触发 [[get]] 操作
// 1. 在当前对象中去查找对应的属性, 如果找到就直接使用
// 2. 如果没有找到, 那么会沿着它的原型链去查找 [[prototype]]
// obj.age = 18
obj.__proto__.age = 18;

console.log(obj.age);
```

![image-20220512145737319](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220512145737319.png)

其实这个隐式原型，就是浏览器为了实现[[prototype]] 搞出来的 \_\_proto\_\_

```javascript
var obj = {
  id: 'chin',
  // 本质就是每一个对象浏览器都给她弄了一个
  __proto__: {},
};
```

## 31 函数原型出来了 → 显式原型

函数也是一个对象，所以上面**对象有的**，**函数这里也有**！！也叫显式原型！

但是函数自己有一个自己的 **显式原型 prototype**！打印出来也是一个空对象！

> 这个显式原型啥作用？

这个只在你的函数成为蜘蛛侠（new）的时候有作用，当你通过 new 让自己成为构造函数的时候，这个时候新建的对象的 \_\_proto\_\_ 就 **指向**了 函数的 prototype。

也就是 `对象.__proto__ = 函数.prototype` （内部自动操作）

```javascript
function foo() {
  console.log('foo');
}
var f1 = new foo();
console.log(f1.__proto__ === foo.prototype);
```

上面一段的内存图感觉

![image-20220411171027390](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220411171027390.png)

## 32 function.prototype 真的为{}空对象？

实际上是不是的，验证一下

之所以打印的是空的，是因为可枚举的那个属性给设置成了 false

- `enumerable:false`

```javascript
function foo() {
  console.log('foo');
}

console.log(foo.prototype); // {}
console.log(Object.getOwnPropertyDescriptors(foo.prototype));
/*
  {
    constructor: {
      value: [Function: foo],
      writable: true,
      enumerable: false, → 枚举属性 false
      configurable: true
    }
  }
*/
```

所以可以验证出来

```javascript
console.log(foo.prototype.constructor); // 指向的是函数本身
console.log(foo.prototype.constructor.name); // 函数名
// 所以有一个骚操作。

console.log(
  foo.prototype.constructor.prototype.constructor.prototype.constructor
); // [Function: foo]
```

## 32 function 给自己添加属性

可以看到，这里可以验证一下的自己是可以重写的

![image-20220512153250700](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220512153250700.png)

JS 内部给 prototype 本来是只有一个 constructor 属性，

```javascript
// 由于一个个添加是在是很麻烦的添加方式
// before
function Foo() {}

Foo.prototype.id = '1';
Foo.prototype.age = 99;
Foo.prototype.eat = function () {
  console.log('eat');
};

// 一股脑的全部添加，完全赋值一个新的对象
// after
function Foo() {}

Foo.prototype = {
  id: '2',
  age: 88,
  eat: function () {
    console.log('eat');
  },
};
```

这里会产生一个问题，就是如果你不写 constructor，就拿不到原来的构造函数（类）

```javascript
// before
function Bar() {}
var b1 = new Bar();
console.log(b1.constructor.name); // Bar

// after
function Bar() {}
Bar.prototype = {
  id: '1',
  age: 88,
};
var b1 = new Bar();
// Object 当然你可以发现这里变成了Object，原本应该是Bar的
console.log(b1.constructor.name);
```

所以说自己写一个，但是自己写的话需要 2 个注意点

- 手动写指向
- 可枚举

![image-20220512155251579](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220512155251579.png)

## 33 对象-函数-原型

**记忆点 1**

```javascript
// obj 是一个对象
var obj = {
  id: 'chin',
};
// 因为obj就是 new Object出来的
// Object 是个构造函数
console.log(obj.__proto__ === Object.prototype); // true
```

**记忆点 2**

```javascript
function Foo() {}
```

> Q: Foo 是什么？
>
> A: 既是函数，也是对象。

看看函数

> Foo 是一个【**函数**】, 那么它会有一个【**显式原型**】对象: `Foo.prototype`
>
> Q: `Foo.prototype`来自哪里?
>
> A: JS 系统内部在创建了一个函数的时候，会自动给你一个 prototype，然后 → `Foo.prototype = { constructor: Foo }`

看看对象

> Foo 是一个【**对象**】, 那么它会有一个【**隐式原型**】对象: Foo.\_\_proto\_\_
>
> Q: Foo.\_\_proto\_\_来自哪里?
>
> A: 既然是对象，就相当于你`new Function()`
>
> 相当于 `var Foo = new Function()`
>
> 相当于系统给了你一个 `Foo.__proto__ = Function.prototype`
>
> Q: `Function.prototype`又来自哪里?
>
> A: 其实就是 JS 系统内部在创建 Function 的时候， 给`Function.prototype = {constructor:Function}`

个人感觉记忆到上面就够了。所谓的原型链，我也是搞懂了。但暂时不在这里总结，等所有课程结束之后进行总结。

## 34 节流

```javascript
// 关于节流
function throttle(fn, delay) {
  // 一开始就是0
  let pre = 0;
  return function () {
    // 记录下现在时间
    let now = new Date();
    let context = this;
    let args = arguments;
    // 如果当前时间 - pre 是大于的肯定就执行
    // 因为第一次肯定就是大于的，那么必定是执行的
    // 所以这一次来思考一下第二次点击
    if (now - pre > delay) {
      fn.apply(context, args);
      pre = now;
    }
  };
}

function test() {
  console.log('test');
}

console.log(throttle(test, 1000));
```

- 目前时间 9 点，第 1 次 0 秒（9:00）点击，间隔时间如果是 1 小时。
- 因为第一次 `now - pre > delay`是肯定成立的，所以第一次**必定执行**
- 目前时间 9 点 30，进行第 2 次点击。但是由于`now - pre > delay`不成立，才 30 分钟。取消。
- 目前时间 9 点 50，进行第 3 次点击。但是由于`now - pre > delay`不成立，才 50 分钟。取消。
- 目前时间 10 点 10，进行第 4 次点击。这个时候`now - pre > delay`成立了，所以开始执行！并且 pre 已经变成了 10 点 10 分了。
- 这个时候是 10 点 30，进行第 5 次点击。这个时候 `now - pre > delay`不成立。所以按兵不动！

重点就在于记录下每次执行的时间间隔！！

## 35 防抖

![image-20220510135729795](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220510135729795.png)

## 36 使用闭包的一些东西

闭包的话看了很多老师讲的了，现在把自己的想法说一下吧。

闭包的话就是外面的变量可以访问到你函数内部的变量。这里就有几个重点

那就是

- 函数 → 如果不存在函数 那么请不要讨论闭包
- 变量 → 作用域（说到变量就有作用域的问题了）
- 立即执行函数问题 → 因为立即执行相当于就是一个函数

搞懂以上的话其实就很难了。

```javascript
// ❌ 怎么可能访问到到呢
function foo() {
  var a = 1000;
}
console.log(a);
```

那我就想访问的到怎么办呢？

```javascript
// ✅ 使用闭包就可以在内部访问到a
function foo() {
  var a = 1000;
  return function () {
    console.log(a);
  };
}
var bar = foo();
console.log(bar());
```

其中昨天有一个老师讲的我感觉我还蛮好理解的

- 只要在执行一个函数的时候
- 另一个函数被定义了 那么就会形成闭包
- 单纯的函数嵌套调用并不是闭包！

```javascript
// ❌ 单纯的函数嵌套调用并不是闭包！
function foo() {
  bar();
}
function bar() {
  console.log('bar');
}
foo();
```

## 37 作用域的一些问题

因为 JavaScript 的历史原因，作用域一般都会有污染问题。

```javascript
// before
(function () {
  var id = '111';
})();

console.log(id); // ❌拿不到的

// after
// 通过立即执行函数执行之后拿到id
var foo = (function () {
  var id = '222';
  var age = 30;
  return {
    id,
    age,
  };
})();

console.log(foo.age); // ✅ 可以拿到
```
