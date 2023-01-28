# this 问题一网打尽

为什么在 JS 里面 this 这么难搞？

因为 JS 天残，跟 Java 那种一出生就是面向对象的语言不一样。JS 的 this 不运行不知道是在哪里出生的。

## 1. 前置知识 this 什么时候确定？

只有在**执行**的时候才能确定，**动态绑定**！解析的时候是啥谁也不知道，在**函数执行上下文 FEC** 真正执行的时候才能被确定。

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

> 有了这个前置知识之后，接下来就具体看一下 this 是怎么指向的。

## 2. 总体图

大概总体心里有个数，接下来仔细写。

![image-20220901223704284](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220901223704284.png)

## 3. this 的指向问题

- 默认绑定
- 隐式绑定
- 显式绑定
- new

### 3-1 默认绑定

默认绑定来一波

```javascript
// 1.案例一: 直接调用
function foo() {
  console.log(this);
}
foo();

// 2.案例二: 嵌套
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

// 3.案例三:对象内赋值调用（写在里面）
var obj = {
  name: 'why',
  foo: function () {
    console.log(this);
  },
};

var bar = obj.foo;
bar(); // window

// 4.案例四:对象赋值（写在外面）
function foo() {
  console.log(this);
}
var obj = {
  name: 'why',
  foo: foo,
};

var bar = obj.foo;
bar(); // window

// 5.案例五:函数内嵌套
function foo() {
  function bar() {
    console.log(this);
  }
  return bar;
}

var fn = foo();
fn(); // window

// 6 案例六：高阶函数
const obj = {
  bar: function () {
    console.log(this); // window
  },
};
function test(fn) {
  fn();
}

test(obj.bar);
```

> ⚠️ 严格模式下，独立调用 this 都是**undefined**！！

### 3-2 隐式绑定

隐式绑定: `Object.fn()`
Object 对象会被 js 引擎绑定到 fn 函数的中 this 里面

```javascript
var obj = {
  age: 99,
  eating: function () {
    // 这里既可写obj也可以写this
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

### 3-3 显式绑定

> **为什么需要显式绑定？**
>
> 因为可以看这个 👇🏻 案例。如果我们想要下面的函数的 this 指向 obj 的。

before

```js
const obj = {
  id: 'chin',
};

function foo() {
  console.log(this);
}

// 想要foo调用的时候是指向obj的，before怎么做呢？
obj.foo = foo; // 1️⃣ 需要你给obj赋值一个变量上去
obj.foo(); // 2️⃣ 调用

// ⚠️ 痛点！！
// ⚠️ 为了让this指向obj，竟然还要给obj增加一个属性？！
```

after，那么接下来就是解决方法，登场！call ， apply ，bind！

```js
// after
const obj = {
  id: 'chin',
};

function foo() {
  console.log(this); // obj
}

foo.call(obj);
```

`call()`实现了 2 个功能，① 绑定 this ② 立刻调用函数

call 和 apply 在执行函数时,是可以明确的绑定 this, 这个绑定规则称之为显式绑定！

> 那么这 3 个有什么不同的？以后分开详细说。先粗略记忆一下。

- `call()` → 参数单独
- `apply()` → 参数是数组
- `bind()` → 返回一个新函数 永久！

```javascript
// 1️⃣ foo直接调用和call/apply调用的不同在于this绑定的不同
// foo()直接调用指向的是全局对象(window);

var obj = {
  name: 'obj',
};

// call/apply是可以指定this的绑定对象
foo.call(obj);
foo.apply(obj);

// 2️⃣
function foo() {
  console.log(this);
}

// foo.call("aaa")
// foo.call("aaa")

// 默认绑定和显示绑定bind冲突: 优先级(显式绑定)
var newFoo = foo.bind('aaa');
newFoo();
newFoo();

var bar = foo;
console.log(bar === foo); // true
console.log(newFoo === foo); // false
```

### 3-4 new

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

## 4. 优先级

记下来

> **new > bind > call/apply > 隐式 > 默认**

一些验证代码

```js
// 1️⃣ 显式 > 隐式
function foo() {
  console.log(this);
}
const obj = {
  foo: foo,
};

obj.foo.apply('aaa'); // [String: 'aaa']

// 2️⃣ new > 隐式
const obj2 = {
  id: 'chin',
  foo: function () {
    console.log(this); // 空对象 {}
    console.log(this === obj2); // false
  },
};

new obj2.foo();

// 3️⃣ new > 显示
function foo() {
  console.log(this); // 空对象 {}
}
const bindFn = foo.bind('aaa');

new bindFn();

// bind > apply

function foo() {
  console.log(this); // 空对象 {}
}

const bindFn2 = foo.bind('aaa');
bindFn2.apply('bbb'); // [String: 'aaa']
```

## 5. 特例

### 5-1 箭头函数

箭头函数比较特殊

- 没有 this 和 arguments

- 箭头函数**不适用前面的 this 规则 → 不进行 this 绑定 → 根据外层作用域来定**

  所以以下的情况都是被无视的

```js
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

这里可以对比下 2 段代码的不同，加深一下箭头函数下 this 的表现差异。

```js
// 👉🏻 没有箭头函数
const obj4 = {
  id: 'obj',
  foo: function () {
    const bar = () => {
      console.log(this); // obj4
    };
    return bar;
  },
};

const fn = obj4.foo();
fn.apply('aaa');

// 👉🏻 有箭头函数
const obj5 = {
  id: 'obj',
  foo: () => {
    const bar = () => {
      console.log(this); // window
    };
    return bar;
  },
};

const fn2 = obj5.foo();
fn2.apply('aaa');
```

下面是图解

![image-20220901184248401](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220901184248401.png)

#### 使用场景

下面来对比一下

- before 没有箭头函数的时候

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

- after 有箭头函数的之后

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

下面是如果 getData 也是一个呢？那么就会自己按照作用域寻找~~

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

### 5-2 严格模式

严格模式下没有 this，默认都是指向 undefined

### 5-3 call(null/undefined)

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

### 5-4 间接函数

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

### 5-5 setTimeout/事件回调函数/forEach 等内置函数

> 有些时候，我们会调用一些 JavaScript 的内置函数，或者一些第三方库中的内置函数
>
> 这些内置函数会要求我们传入另外一个函数
>
> 我们自己并不会显示的调用这些函数，而且 JavaScript 内部或者第三方库内部会帮助我们执行;  这些函数中的 this 又是如何绑定的呢?

以上都需要具体问题，具体分析。自己写代码验证比较好。

```js
setTimeout(function () {
  console.log(this);
}, 2000);

const arr = ['a', 'b', 'c'];
arr.forEach(function (i) {
  console.log(this);
});

box.onclick = function () {
  console.log(this);
};
```
