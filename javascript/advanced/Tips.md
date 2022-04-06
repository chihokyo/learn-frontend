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

先说几个名词

> Execution Context Stack 执行上下文调用栈
>
> Global Execution Context 全局执行上下文
>
> Functional Execution Context 函数执行上下文
>
> Activation Object AO  AO中包含形参、arguments、函数定义和指向函数对象、定义的变量

![image-20220326232628199](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220326232628199.png)

## 4 闭包函数又是什么呢？

![image-20220327231220222](/Users/chin/Library/Application Support/typora-user-images/image-20220327231220222.png)

我说一下吧，因为这也涉及到回调函数的问题。

回调函数其实就是用的闭包来实现访问内部的数据的。

回调函数传入的参数是函数 → 函数打入内部拿你的财产（这就是闭包的作用） → 你拿到了

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

只有在**执行**的时候才能确定，动态绑定！解析的时候是啥谁也不知道，在函数执行上下文FEC真正执行的时候才能被确定。

就是上面的内存执行不是有一块是函数的FEC（**F**unctional **E**xecution **C**ontext ）

FEC主要三个板块组成

- VO 形参
- Scope Chain VO + Parent的VO（大部分都是GO）
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

## 8 this的指向问题

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
Object对象会被js引擎绑定到fn函数的中this里面

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
var fn = obj.eating
fn()

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

call和apply在执行函数时,是可以明确的绑定this, 这个绑定规则称之为显示绑定！

- `call()` → 参数单独
- `apply()` →  参数是数组
- `bind()` → 返回一个新函数 永久！

```javascript

// 1.foo直接调用和call/apply调用的不同在于this绑定的不同
foo直接调用指向的是全局对象(window)
foo()

var obj = {
  name: "obj"
}

// call/apply是可以指定this的绑定对象
foo.call(obj)
foo.apply(obj)
foo.ap

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

- new绑定

这里的this就是new出来的实例

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



## 9 this特殊的一些情况

`setTimeout()`绑定的哪里？→ window

```javascript
setTimeout(function () {
  // 关于这个this指向是谁，其实主要看的是
  // setTimeout 这个函数的实现内部是如何被调用的
  console.log(this);
}, 2000);

// setTimeout 是window
```

关于监听实现 → dom对象

```javascript
const btn = document.querySelector('button');
btn.onclick = function () {
  console.log(this);
  // 其实这里就相当于内部给你做了一个操作
  // btn.onclick
};
```

操作数组的函数 forEach/filter/map/find

内部很有可能是独立的函数调用，所以结果就是window

```javascript
var array = ['foo', 'bar', 'baz'];
array.forEach(function () {
  console.log(this);
});
// 但是你也可以修改
array.forEach(function () {
  console.log(this);
},这里可以写一下你想绑定的this指向);
```

## 10 关于this优先级问题

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

## 11 this特例若干

如果你call/apply/bind 绑定的是 `null undefined `这样的

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

## 12 箭头函数this的特殊性

- 没有this和arguments

- 箭头函数不适用前面的this规则 → 不进行this绑定 → 根据外层作用域来定

  

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

下面是如果getData也是一个呢？

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

## 14 自己实现一个call/apply/bind

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

this有可能是其他类型，所以需要你转换一下。接下来的话，我直接上全部的代码吧。

其实代码的书写，尤其是轮子的书写，主要是考虑到好多的edge case，这些边界条件的考虑会特别多。

```javascript
Function.prototype.mycall = function(thisArg, ...args) {
  // 在这里可以去执行调用的那个函数(foo)
  // 问题: 得可以获取到是哪一个函数执行了 mycall
  // 1.获取需要被执行的函数
  var fn = this

  // 2.对thisArg转成对象类型(防止它传入的是非对象类型)
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg): window

  // 3.调用需要被执行的函数
  thisArg.fn = fn
  var result = thisArg.fn(...args)
  delete thisArg.fn 
  // 为什么删呢？因为你既然增加了一个fn属性，这个属性用完之后就没用了是多余的肯定是要删除的

  // 4.将最终的结果返回出去
  return result
}
```

## 15 关于arguments

这个其实是AO里面的

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
console.log(arguments.length)
```

- 通过index获取某个参数

```javascript
// 2.根据索引值获取某一个参数
console.log(arguments[2])
console.log(arguments[3])
console.log(arguments[4])
```

- callee获取当前arguments所在的函数

```javascript
// 3.callee获取当前arguments所在的函数
console.log(arguments.callee)
// arguments.callee() 千万不能直接调用 因为会无限loop
```

## 16 arguments转成数组

因为他是对象，所以想转换成数组。这里有几个方法，其中一个方法有关于this的一个应用场景！ 

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

这里就第2种方法在做一下说明，就是明明可以直接调用为什么要用call的原因。

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
- 不会产生副作用（不会修改其他的数据，不会产生多余的IO）

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

React 其实就用这个思想，不能随意的去直接修改props的数值。

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

在比如打印日志，可以通过一个基础函数，造出来新的2个函数。

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
- 关于this指向问题

→ 参数不定最后用的是**递归调用**解决的！

↓  this指向的话 为什么每次都要用call来定向this

```javascript
// fn(...args);
// fn.call(this, ...args)
return fn.call(this, ...args);
```

因为从上面的实现的那段代码可以看出来

```javascript
var curryAdd = myCurry(add); 

console.log(curryAdd(10, 20, 30)); 
// 这里相当于this是柯里化后的，并不是原来的函数 add的那个this
// 这样就拿不到原来的函数对象
```

