# ES6

## 类

本质还是用的原型链的东西。

```javascript
// 类的声明
class Person {}
// 类的表达式
var Animal = class {};

// 反正本质就是原型链那一套
console.log(Person.prototype.constructor); // class Person
var p = new Person();
console.log(p.__proto__ === Person.prototype); // true
console.log(Object.getOwnPropertyDescriptors(Person.prototype)); // 所有的属性描述符
```

## contructor

构造方法，new 的时候用的。和以前的旧版本差别就是多了个`contructor()`而已，new 的时候自动调用这个函数

```javascript
class Person {
  // 类的构造方法
  // !!!!注意: 一个类只能有一个构造函数!!!!
  // 1.在内存中创建一个对象 moni = {}
  // 2.将类的原型prototype赋值给创建出来的对象 moni.__proto__ = Person.prototype
  // 3.将对象赋值给函数的this: new绑定 this = moni
  // 4.执行函数体中的代码
  // 5.自动返回创建出来的对象

  // 这个只要一new就执行，有时候虽然你会看到不写constructor，
  // 那个时候就系统会自动调用constructor(){}
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

var p1 = new Person('chin', 18);
console.log(p1);
```

## 类的方法

```javascript
var names = ['foo', 'bar', 'baz'];

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._address = '广州市';
  }

  // ① 普通的实例方法
  // 创建出来的对象进行访问
  // var p = new Person()
  // p.eating()
  // 这里相当于 Person.prototype.eating
  eating() {
    console.log(this.name + ' eating~');
  }

  running() {
    console.log(this.name + ' running~');
  }

  // ② 类的访问器方法
  get address() {
    console.log('拦截访问操作');
    return this._address;
  }

  set address(newAddress) {
    console.log('拦截设置操作');
    this._address = newAddress;
  }

  // ③ 类的静态方法(类方法)
  // Person.createPerson()
  static randomPerson() {
    var nameIndex = Math.floor(Math.random() * names.length);
    var name = names[nameIndex];
    var age = Math.floor(Math.random() * 100);
    return new Person(name, age);
  }
}

var p = new Person('chin', 18);
p.eating();
p.running();

console.log(p.address); // 拦截访问操作 广州市
p.address = '北京市'; // 拦截设置操作

// console.log(Object.getOwnPropertyDescriptors(Person.prototype))

// 随机创建50个实例
for (var i = 0; i < 50; i++) {
  console.log(Person.randomPerson());
}
```

## 继承

本质用的是原型链，寄生组合式继承

这里实现一个 **寄生组合式继承**

```javascript
function inheritPrototype(SubType, SuperType) {
  // 通过父类创建子类
  SubType.prototype = Object.create(SuperType.prototype);
  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: 'false',
    configurable: true,
    writable: true,
    // 内容就是子类
    value: SubType,
  });
}
```

反正 ES6 之后就是 就可以了

```javascript
class Student extends Person {}
```

## 类的混入

其实本质是为了实现多继承

```javascript
// 类的混入
class Person {
  constructor(id) {
    this.id = id;
  }
}

class Student extends Person {
  constructor(id) {
    super(id);
  }
  study() {
    console.log(`${this.id} is studying`);
  }
}

var s1 = new Student('chin');
s1.study();

function mixinRunnder(BaseClass) {
  class NewClass extends BaseClass {
    running() {
      console.log('running');
    }
  }
  return NewClass;
}
// 混入起来
var NewStudent = mixinRunnder(Student);
new NewStudent().running();

// 属性和构造函数比较难以混入，所以很少使用
```

## 多态

JavaScript 虽然没有严格意义上的多态，但是 JavaScript 是实现了多态的。

```javascript
// obj对象
var obj = {
  id: 'chin',
  getArea: function () {
    console.log('obj getArea...');
  },
};
class Person {
  getArea() {
    console.log('Person getArea...');
  }
}
// Person 对象
var p = new Person();

function calcArea(Fn) {
  console.log(Fn.getArea());
}
calcArea(obj);
calcArea(p);
```

## 字面量增强

```javascript
// ① property shorthand(属性的简写)
var id = 'chin';
var age = 88;
var obj = {
  // id: id,
  // age: age,
  // kv一样 可以简写成
  id,
  age,
};

// ②③ method shorthand(方法的简写)
var obj = {
  foo1: function () {
    console.log('foo1', this); // this → obj
  },
  // 可以直接写成下面这样子
  foo2() {
    console.log('foo2', this); // this → obj
  },
  // 但是跟箭头函数不一样，因为箭头函数不包含this
  foo3: () => {
    console.log('foo3', this); // 只有这里this → {}
  },
};

// ③ computed property name(计算属性名)
var id = 'chin';
var obj = {
  [id + '111']: 'yes',
};
console.log(obj); // { chin111: 'yes' }
```

## 解构

### 数组解构

```javascript
// ********① 基础解构********
var arr = ['chin', 'foo', 'bar'];
console.log(arr[0]); // chin
console.log(arr[1]); // foo
console.log(arr[2]); // bar
// 这里相当于从
var [one, two, three] = arr;
// ↓
var arr = ['chin', 'foo', 'bar'];
var one = arr[0],
  two = arr[1],
  three = arr[2];

// ② ********解构后面的********
var arr = ['chin', 'foo', 'bar'];
var [, , item] = arr;
console.log(item); // bar

// ③ ********解构出一个元素,后面的元素放到一个新数组中********
var arr = ['chin', 'foo', 'bar'];
var [itemx, ...itemy] = arr;
console.log(itemy); // [ 'foo', 'bar' ]

//  ④ ********给个默认值********
var arr = ['chin', 'foo', 'bar'];
var [itema, itemb, itemc, itemd] = arr;
console.log(itemd); // undefined
var [itema, itemb, itemc, itemd = 'yes'] = arr;
console.log(itemd); // yes
```

### 对象结构

其实这个比较常用，比起数组来说。

```javascript
// ********① 基础解构********
var obj = {
  id: 'uu1',
  age: 99,
  hobby: ['swim', 'movie'],
};

var { id, age, hobby } = obj;
console.log(id); // uu1
console.log(age); // 99
console.log(hobby); // ['swim', 'movie']

// ********② 重命名********
var obj = {
  id: 'uu1',
  age: 99,
  hobby: ['swim', 'movie'],
};
var { id: uuid } = obj;
console.log(id); // uu1

// ********③ 默认值********
var obj = {
  id: 'uu1',
  age: 99,
  hobby: ['swim', 'movie'],
};
var { location: newLocation = 'china' } = obj;
console.log(newLocation);

// ********④ 在函数里一直这样用，在参数里直接解构了********
var obj = {
  id: 'uu1',
  age: 99,
  hobby: ['swim', 'movie'],
};
function foo({ id }) {
  console.log(id);
}

foo(obj);
```

## let/const

说到这个还是先说一下 var 的作用域提升问题吧，这个要看 JavaScript 代码执行起来时候的内存图，因为 var 声明的变量

```javascript
// ✅ 可以的
// 但是obj是一个引用类型，是一个地址，所以本质上可以修改的
const obj = {
  id: 'chin',
};

obj.id = 'nchi';
console.log(obj);

// ❌ 不可以
const foo = 'chin';
foo = 'nchin'; // Assignment to constant variable.
```

并且 let 和 const，不能重复声明

```javascript
const a = 1;
let b = 11;
const a = 2; // 已经声明过一次了
let b = 22; // 已经声明过一次了
```

## var/let/const 到底用哪个？

说个结论吧

就是不要在用 var，var 现在只用于考验你对作用域提升，window 全局对象，块级作用域的理解。并且现在的打包工具(webpack,babel)，都会给你 ES6→ES5

> 对于 let 和 const 用哪个？
>
> 优先使用 const，如果需要修改了再改成 let，因为 const 更安全！保证你的 变量不能随便被修改。

## 作用域提升问题

let 和 const 是没有作用域提升的（这句话有争议）

因为代码都是先创建一个执行上下文（词法环境+环境变量）

**变量其实是在，执行上下文之前创建的，但是不能被访问！！**

**直到被真正赋值之前！**

> 网上很多人说在执行上下文的时候变量本身没有被创建出来
>
> 其实是不对的，因为变量在执行上下文之前就是被创建出来的。
>
> 但是不能被访问而已！！！
>
> 【作用域提升】这个老师的意思是，可以被访问的就是作用域提升，不可以访问的就不是作用域提升。作用域提升的目的是**提前被访问**，但是确实是有被创建出来的。红宝书说是叫【暂时性死区】

```javascript
// ✅ var 可以
console.log(foo); // undefined
var foo = '11';

// ❌ let/const 不可以
console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
let foo = '11';
```

这里还有一个**暂时性死区问题**

```javascript
// 这里不是声明foo，为什么 不可以
// 因为一旦有了let，就不可以在声明前进行使用
// if(){这里面就称之为暂时性死区}
var foo = 'foo';
if (true) {
  console.log(foo); // 走到这里还是可以访问的
  let foo = 'abc'; // ❌不可以！
}

function bar() {
  console.log(foo);
  let foo = 'abc';
}
bar(); // 同理 ❌不可以！
```

## window 里面的变量

首先 window 只有在浏览器里有

你在 JavaScript 设置的变量，最终都将转换成 window 的变量，就是 GO。这是老的版本。现在新版本叫 VE，而且不保证你在 js 里面写的变量就和 window.变量。这样能取到的，因为 window 具体是浏览器定义的，和 V8 没太大关系的。

## 块级作用域

在 ES5 以前是没有块级作用域的，只有俩作用域。

- 全局作用域
- 块级作用域

```javascript
function foo() {
  var bar = 'bar';
}
// 访问不到
console.log(bar); // ❌ ReferenceError: Cannot access 'foo' before initialization
```

比如下面的函数就是有 3 块作用域

```javascript
// 1.最外面一层全局作用域
function foo() {
  // 2.foo函数作用域
  function bar() {
    // 3.bar函数作用域
    console.log('bar');
  }
}
```

但是 ES6 之后就有了块级作用域

```javascript
// 块级作用域
{
  var foo = 'foo';
  let bar = 'bar';
}
console.log(foo); // ✅ 外面可以访问
console.log(bar); // ❌ 外面不能访问
```

name

```javascript
// ES6的代码块级作用域
// 对let/const/function/class声明的类型是有效
{
  let foo = 'foo';
  function demo() {
    console.log('demo function');
  } // ✅ 部分浏览器为了兼容，所以让function没有块级作用域
  class Person {}
}

// console.log(foo) // foo is not defined
// 不同的浏览器有不同实现的(大部分浏览器为了兼容以前的代码, 让function是没有块级作用域)
// demo()
var p = new Person(); // Person is not defined
```

那么还有什么是块级作用域呢？

- if

```javascript
if (true) {
  var foo = 'foo';
  let bar = 'bar';
}
console.log(foo); // ✅ 外面可以访问
console.log(bar); // ❌ 外面不能访问
```

- switch

```javascript
var season = 'summer';
switch (season) {
  case 'summer':
    var foo = 'foo';
    let bar = 'bar';
  default:
    break;
}
console.log(foo); // ✅ 外面可以访问
console.log(bar); // ❌ 外面不能访问
```

- for 语句

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i); // 0,1,2...9
}
console.log(i); // ❌根本不能访问到

for (var i = 0; i < 10; i++) {
  console.log(i); // 0,1,2...9
}
console.log('var' + i); // 10
```

> 为什么上面的 var 的 i 是 10 呢？
>
> 就相当于其实是下面这种感觉的。也就是 var 根本没块级作用域。

```javascript
for (var i = 0; i < 10; i++) {
  var i = 0; // ← 这种感觉
  i++; // ← 这种感觉
  console.log(i);
}
```

块级作用域的应用

```javascript
/*
html这里有4个按钮
*/
// 这里你会发现一直是第4个，函数在执行onclick操作向上走的时候，会先找for，因为这里for的var没有块级作用域
// 所以最后去的全局找的i，也就是最后的结果。
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    // 访问自己函数没有i，那么就向上一层作用域，也就是全局
    // 这时的i已经是4了
    console.log('第' + i + '个按钮被点击');
  };
}
console.log(i); // 4 可以验证是第4个

// *******以前的解决方法 使用立即执行函数*******

for (var i = 0; i < btns.length; i++) {
  // 因为函数会形成一个作用域，所以是可以保住这个n的
  // 本质就是通过函数形成一个作用域
  // 闭包原理
  (function (n) {
    btns[i].onclick = function () {
      console.log('第' + n + '个按钮被点击');
    };
  })(i);
}
```

但是现在直接升级了。

```javascript
// 此处的let是有块级作用域的
for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    console.log('第' + i + '个按钮被点击');
  };
}
console.log(i); // ❌根本不能访问到
```

一个小 Tips 吧

```javascript
const arr = ['foo', 'bar', 'baz'];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// 上面的代码相当于形成了3个块级作用域
{
  let i = 0;
  console.log(arr[i]);
}
{
  let i = 1; // let的话每一次自增之后都是用的新的i，也就是说3个i都是不一样的
  console.log(arr[i]);
}
{
  let i = 2;
  console.log(arr[i]);
}
/***********那为什么const不可以，因为const不可以自增const++错的************/

// 但是forof可以，可以遍历数组or对象。只要是可遍历对象
const arr = ['foo', 'bar', 'baz'];
for (const item of arr) {
  console.log(item);
}
for (let item of arr) {
  console.log(item);
}
// 为什么可以？
//  因为每次const都不是++操作,而是赋予一个新的变量 类似于下面这种感觉↓
{
  const item = 'foo';
  console.log(item);
}

{
  const item = 'bar';
  console.log(item);
}
```

## 模板字符串&标签模板字符串

模板字符串真的太 easy 了。`${}` 一把梭

```javascript
const id = 'chin';
const time = 5;
const activity = 'eating';

console.log(`${id} in ${time} was ${activity}`);
```

主要是标签模板字符串这个比较难以理解

```javascript
// 日常调用一个函数是这样的
function foo(x, y) {
  return x + y;
}
console.log(foo(1, 2));
```

但是事实上这样也是可以调用函数的

```javascript
const id = 'chin';
const time = 5;
const activity = 'eating';

function foo(x, y) {
  return x + y;
}
// 他会把所有被切割的字符串，当成第一个参数[1,2,3]
// 然后剩下的按照顺序排列
// 比如下面这个第2个参数$:{id},第3个${time},${activity}
console.log(foo`1${id}2${time}3${activity}`);
```

应用在哪里呢？`styled-components`

```javascript
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// 这里就相当于在styled库里有个函数叫 h1()
```

## 函数的默认参数

以前的话如何解决默认参数？

```javascript
/**
 * 缺点:
 *  1.写起来很麻烦, 并且代码的阅读性是比较差
 *  2.这种写法是有bug
 */
function foo(m, n) {
  m = m || 'aaa';
  n = n || 'bbb';

  console.log(m, n);
}
foo(0, '');
// 因为在js里如果你输入的0，""
console.log(0 === false); // true
console.log('' === false); // true
```

关于 bug 这里可以用 babel 编译器来验证。

```javascript
function foo(m = 'aaa', n = 'bbb') {
  console.log(m, n);
}
// 下面才是无bug版本
function foo() {
  var m =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'aaa';
  var n =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bbb';
  console.log(m, n);
}
```

所以 ES6 可以这样写

有默认值的参数最好放**最后**

```javascript
function foo(m = 'aaa', n = 'bbb') {
  console.log(m, n);
}

// foo()
foo(0, '');

// 如果不放在最后，那么length计算会出错
```

而且还支持解构的默认参数

```javascript
// 写法1
function foo(info = { id: '001', age: 18 }) {
  console.log(info.id, info.age);
}
foo();
// 写法2
function foo({ id, age } = { id: '001', age: 18 }) {
  console.log(id, age);
}
foo();
// 写法3
function foo({ id = '001', age = 18 } = {}) {
  console.log(id, age);
}
foo();
```

## 函数的剩余参数

rest parameter → 首先这个`...`不是前面说的展开运算符，是**前缀**。

相当于把剩余的参数放入`args`这个变量里，成为数组。

※而且必须放在最后

```javascript
function foo(x, y, ...args) {
  console.log(args);
}
foo(10, 20, 30, 40); // [ 30, 40 ]
```

> arguments 区别是什么呢？
>
> - 是类数组的对象（伪数组），剩余参数是真输入
> - arguments 包含所有参数，而剩余参数只有剩余参数

## 箭头函数

箭头函数没有 this，也没有显式原型，prototype

```javascript
const foo = () => {
  console.log(this); // 1.箭头函数本身没this 从上层作用域找this
  console.log(arguments); // 2.箭头函数也没有arguments
};
foo();
console.log(foo.prototype); // undefined
// 3.所以箭头函数没办法new
```

> 但是箭头函数作为一个函数 是有\_\_proto\_\_的

## 展开语法 Spread Syntax

**首先她和剩余参数完全不是一个系统！**

参考链接：[剩余语法（剩余参数）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax#剩余语法（剩余参数）)

展开语法的本质是一个浅拷贝。

首先展开语法不是什么时候都可以用到的。主要用于下面几个场景。

```javascript
// 1.函数调用的时候 为了分别传入参数
const arr = ['foo', 'bar', 'baz'];
const str = 'chin';
function foo(x, y, z) {
  console.log(x, y, z);
}
// 如果为了达到在调用foo函数顺便把arr当做参数传进去，可以使用下面的方法
// 使用apply的目的不是为了调用函数，而是为了改变this的指向。
foo.apply(null, arr);
// 在调用函数使用展开运算符
foo(...arr);
foo(...str); // 还可以展开字符串 c h i

// 2.构造数组
const arr = ['yes', 'abc', 'xyz'];
const newArr = [...arr, 'yes'];
console.log(newArr); // [ 'yes', 'abc', 'xyz', 'yes' ]

const str = 'my'; // 甚至可以拆分字符串为数组
console.log([...arr, ...str]); // [ 'yes', 'abc', 'xyz', 'm', 'y' ]

// 3.ES9之后
const info = {
  id: 'uuid',
  age: 19,
};
// 3-1 构造新对象字面量
const newInfo = { ...info, location: 'Tokyo' };
const arr = ['yes', 'abc', 'xyz'];
console.log(newInfo);
// 3-2 甚至可以成为数组（会添加索引值）
const newInfo2 = { ...info, ...arr };
console.log(newInfo2); // { '0': 'yes', '1': 'abc', '2': 'xyz', id: 'uuid', age: 19 }
```

为什么说展开运算符本质是一个浅拷贝呢？

```javascript
const info = {
  id: 'uu1',
  hobby: ['swim', 'run'],
};

const newInfo = { ...info };
newInfo.hobby[0] = ['sleep'];
console.log(newInfo);
console.log(info);
```

这里说一些结论

当你想简单拷贝一个对象的时候，直接可以

```javascript
const obj = {
  id: 'uu1',
  hobby: ['swim', 'run'],
};
const newObj = { ...obj };
```

## Symbol

代表独一无二！！

```javascript
const s1 = Symbol();
const s2 = Symbol();
console.log(s1 === s2);

// 1.经常用于在各种变量赋值上，因为可以保证独一无二性
// 1.1 比如对象
const obj = {
  [s1]: 'uu1',
  age: 19,
};
// 1.2 比如数组
const arr = [1, 2, 3];
const s1 = Symbol();
arr[s1] = 5;

console.log(arr); // [ 1, 2, 3, [Symbol()]: 5 ]

// 2.还能给她增加一个描述，用来描述
const s3 = Symbol('1');
const s4 = Symbol('2');

// 2.1 当是同一个描述符的时候是回复覆盖掉的
// const s4 = Symbol('1');

console.log(obj.s1); // 不能被点
console.log(obj[s1]); // uu1
```

如果想获取 Symbol 定义的属性名，`Object.keys()`不管用。需要有特殊的 API。

```javascript
const s1 = Symbol('1');
const obj = {
  [s1]: 'uu1',
  age: 19,
};
const s5 = Symbol();
// 3. 定义一个新的属性
Object.defineProperty(obj, s5, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 'mba',
});
// 这个时候想要取得key的话，Object.keys()拿不到
console.log(Object.keys(obj)); // 会发现只有 [ 'age' ]
// 只有通过
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(1), Symbol() ]

// 4. Symbol.key() Symbol.keyFor()
const sx = Symbol.for('x');
const sy = Symbol.for('y');
console.log(sx === sy); // false
// 获取key
const key = Symbol.keyFor(sx);
console.log(key); // x

// 5. 那么如果我们现在就是想创建相同的Symbol应该怎么 来做呢?
const s1 = Symbol.for('x');
const s2 = Symbol.for('x');
console.log(s1 === s2); // true
```

## Set/WeakSet

其实也就是存储数据的形式。

`数组 + 不能重复 = Set`

Set 的本质感觉就是给你去重的。

```javascript
// 1.去重
const set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(2);
console.log(set); // Set(3) { 1, 2, 3 }
// 2.但是对象，数组这种不是这样。因为存储的地址
const set = new Set();
set.add({});
set.add({});
console.log(set); // Set(2) { {}, {} }
```

这里可以简单做个对比

```javascript
// 🌚做个对比
const set = new Set();
set.add([1, 2, 3]);
set.add([1, 2, 3]);
console.log(set); // Set(2) { [ 1, 2, 3 ], [ 1, 2, 3 ] }
// 🌝
const set2 = new Set();
const arr = [1, 2, 3];
set2.add(arr);
set2.add(arr);
console.log(set2); // Set(1) { [ 1, 2, 3 ] }
```

这里主要说一下强引用和弱引用的区别吧。

## Map/WeakMap

## Proxy 代理 主要用来监听的感觉（类）

在编程里是经常要监听对象的改变的，以前用的属性描述符。

```javascript
// 1.以前都是这样监听的
const obj = {
  id: 'chin',
  age: 19,
};

Object.defineProperty(obj, 'id', {
  get: function () {
    console.log('get id');
  },
  set: function () {
    console.log('set id');
  },
});
console.log(obj.id); // get id
console.log((obj.id = 'chin2')); // set id chin2

// 2.但这样的弊端只能监听到id一个，想全部监听呢？
// Object.keys(obj)取得所有属性
const obj = {
  id: 'chin',
  age: 19,
};
Object.keys(obj).forEach((key) => {
  let value = obj[key];
  Object.defineProperty(obj, key, {
    get: function () {
      console.log(`get里面的:${key}属性被访问了`);
    },
    set: function (newValue) {
      console.log(`set里面的:${key}属性被被设置成:${newValue}`);
      value = newValue;
    },
  });
});

obj.id = 'yes';
obj.age = 100;
console.log(obj.id);
```

但属性描述符的本职任务并不是为了监听对象的变化的，所以 Proxy 就应运而生了。下面主要是`get(),set()`

![image-20220421132007942](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220421132007942.png)

> 本质就是通过 Proxy 在不改变元 obj 的情况下，对原来的 obj 进行增强，进行监听

```javascript
const objProxy = new Proxy(obj, {
  // 获取值时的捕获器
  get: function (target, key) {
    console.log(`监听到对象的${key}属性被访问了`, target);
    return target[key];
  },

  // 设置值时的捕获器
  set: function (target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置值`, target);
    target[key] = newValue;
  },

  // 监听in的捕获器
  has: function (target, key) {
    console.log(`监听到对象的${key}属性in操作`, target);
    return key in target;
  },

  // 监听delete的捕获器
  deleteProperty: function (target, key) {
    console.log(`监听到对象的${key}属性in操作`, target);
    delete target[key];
  },
});
```

还有剩下 9 个捕获器，这里先演示下

```javascript
function foo() {}
const fooProxy = new Proxy(foo, {
  apply: function (target, thisArg, argArray) {
    console.log('使用的apply进行调用的');
    return target.apply(thisArg, argArray);
  },
  construct: function (target, argArray, newTarget) {
    // 进行展开
    console.log('使用了new调用');
    return new target(...argArray);
  },
});

fooProxy.apply({}, [1, 2]); // 使用的apply进行调用的
new fooProxy('x', 'y'); // 使用了new调用
```

这里稍微有一个使用场景

```javascript
// 1️⃣
const rows = dataList.map(data => {
  return `
    <tr>
      <td>${data.A !== null ? data.A : '-'}</td>
      <td>${data.B !== null ? data.B : '-'}</td>
      <td>${data.C !== null ? data.C : '-'}</td>
      <td>${data.D !== null ? data.D : '-'}</td>
    </tr>
  `
})
// 2️⃣ 函数普通封装
const formatter = value => value !== null ? value : '-'
const rows = dataList.map(data => {
  return `
    <tr>
      <td>${formatter(data.A)}</td>
      <td>${formatter(data.B)}</td>
      <td>${formatter(data.C)}</td>
      <td>${formatter(data.D)}</td>
    </tr>
  `
})
// 3️⃣ 使用了proxy
const rows = dataList.map(data => {
  const p = new Proxy(data, {
    get(target, name) {
      if (target[name] === null) return '-'
      return target[name]
    }
  })
  return `
    <tr>
      <td>${p.A}</td>
      <td>${p.B}</td>
      <td>${p.C}</td>
      <td>${p.D}</td>
    </tr>
  `
```

## Reflect 反射（对象）

```javascript
const obj = {
  id: 'chin',
  age: 199,
};

console.log(Object.getPrototypeOf(obj));
console.log(Reflect.getPrototypeOf(obj));
console.log(Object.getPrototypeOf(obj) === Reflect.getPrototypeOf(obj)); //true
```

Object 本身就是一个构造函数，生命不可承受之重！

因为是对象，所以没有 new！

- 和 Object 的方法很相似，几乎差不读。
- 和 Proxy 一样有 13 个常见方法。
- 为了避开对元对象的操作

Proxy 的操作会直接操作原来的 obj，所以 Proxy 是有缺点的。

## receiver

![image-20220421191550443](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220421191550443.png)

上面的 this 指向了 obj，如果用了 receiver 之后

`Reflect.get(参数1，参数2，receiver)` receiver 其实可以改变 this 的指向

![image-20220421191854178](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220421191854178.png)

差不多上面就是 receiver 的用法，接下来是`Reflect.construct()`

```javascript
function Dog(id, legs) {
  this.id = id;
  this.legs = legs;
}

function Animal() {}

// 执行的是 Dog 面的内容，但是创造出来的实例对象是 Animal 里面的
const animal = Reflect.construct(Dog, ['uuid', 4], Animal);
console.log(animal.__proto__ === Animal.prototype); // true
```

## 响应式

vue 里面的，关于原理。

就是说一个数据，当它发生了变化 → 会自动触发某个函数。这就是响应式的。

大概就是 ↓ 这个效果。

```java
const foo = 'foo';
function bar() {
  console.log('bar');
}
// 只要这个 foo 一旦发生变化就自动执行bar()
foo = '111';
```

这个响应式原理是一个渐变的过程。

先搁浅一下。TODO

## Promise

历史问题。那么 JavaScript 是为了解决什么问题呢？

JS 是单线程的，就是排队上厕所。但是有时候等不了怎么办，比如说大的文件的下载，成功了还失败了？我难道必须等你全部下载完（成功失败未定）才能干其他事情吗？这些都是好耗时的，等不起的！

![image-20220422132526348](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422132526348.png)

`Promise` 是一个类（构造函数）

- 给调用者一个承诺（新建一个`new Promise()`）
- 创建的时候需要放进去一个回调函数 `new Promise(exector)`

![image-20220422134458062](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422134458062.png)

然后就可以把上面那段代码用`Promise`来重构了

![img](https://raw.githubusercontent.com/chihokyo/image_host/develop/sp20220422_135735_489.png)

然后就可以直接用了

```javascript
const promise = requestData('request1');

promise
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('failed');
  });

// 这样写也可以 then里面2个回调函数，1个成功，1个失败
promise.then(
  () => {
    console.log('success');
  },
  () => {
    console.log('failed');
  }
);

// 这样直接写也可以
new requestData((resolve, reject) => {
  console.log('------');
  resolve();
  reject();
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

于是差不多最后的结果就是

```javascript
const p1 = new Promise((resolve, reject) => {
  const data = [
    { id: 'uuid1', age: 99 },
    { id: 'uuid2', age: 10 },
  ];
  const errMsg = 'failed';
  let flag = false;
  if (flag) {
    resolve(data);
  } else {
    reject(errMsg);
  }
});

p1.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```

一般 Promise 也有几个状态

![image-20220422140804125](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422140804125.png)

状态一旦确定，就无法更改，就是被锁住的。

```javascript
new requestData((resolve, reject) => {
  console.log('------');
  resolve(); // fulfilled状态
  // reject(); ❌ 这个时候已经敲定了 resolve ，在来 reject 是没意义的
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

关于`resolve()`的参数问题

![image-20220422151915827](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422151915827.png)

### then()

关于`then()`方法

首先 then 是一个 Promise 对象上的方法，然后可以验证出来

```javascript
// 直接打印是出不来的 ，因为可以看到 enumerable: false,
console.log(Object.getOwnPropertyDescriptors(Promise.prototype));
```

结果就是

```json
{
  length: { value: 1, writable: false, enumerable: false, configurable: true },
  name: {
    value: 'Promise',
    writable: false,
    enumerable: false,
    configurable: true
  },
  prototype: {
    value: Object [Promise] {},
    writable: false,
    enumerable: false,
    configurable: false
  },
  all: {
    value: [Function: all],
    writable: true,
    enumerable: false,
    configurable: true
  },
  allSettled: {
    value: [Function: allSettled],
    writable: true,
    enumerable: false,
    configurable: true
  },
  any: {
    value: [Function: any],
    writable: true,
    enumerable: false,
    configurable: true
  },
  race: {
    value: [Function: race],
    writable: true,
    enumerable: false,
    configurable: true
  },
  resolve: {
    value: [Function: resolve],
    writable: true,
    enumerable: false,
    configurable: true
  },
  reject: {
    value: [Function: reject],
    writable: true,
    enumerable: false,
    configurable: true
  },
  [Symbol(Symbol.species)]: {
    get: [Function: get [Symbol.species]],
    set: undefined,
    enumerable: false,
    configurable: true
  }
}
```

当 `resolve()` 方法被回调时, 所有的 `then()` 方法传入的回调函数都会被调用

```javascript
const thenPromise = new Promise((resolve, reject) => {
  resolve('then test');
});

thenPromise.then((res) => {
  console.log('res1', res);
});
thenPromise.then((res) => {
  console.log('res2', res);
});
thenPromise.then((res) => {
  console.log('res3', res);
});
```

那么再来比较一下下面这两者

![image-20220422233031775](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422233031775.png)

于是就引出了新的问题，就是第二段 Promise 的问题。

`then()` 有没有返回值的问题。结论就是有的，返回值是一个新的`new Promise()`但是分三种情况。

先说一下原理+第一种情况

![image-20220422233703276](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422233703276.png)

然后是剩下 2 种

![image-20220422234853081](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422234853081.png)

### catch()方法的使用

关于 `catch()` 有几个需要注意的地方

![image-20220424225510796](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220424225510796.png)

另外这就产生了独立调用的问题

```javascript
const cPromise = new Promise((resolve, reject) => {
  // resolve(11);
  reject(22);
});

cPromise.then((res) => {});
// 这里会报错 为什么？
// 因为如果相对独立的话，想当 👆 根本没有实现 reject() 时候的处理
cPromise.catch((err) => {
  console.log(err);
});
```

并且 catch 会捕获从上到下的全部异常。兜底一样。

```javascript
const cPromise = new Promise((resolve, reject) => {
  resolve();
});

cPromise
  .then((res) => {})
  .then((res) => {
    throw new Error('then error message');
  })
  .catch((err) => {
    console.log('err:', err); // err: Error: then error message
  });
```

那么 `catch()` 有没有返回值？

```javascript
const cPromise = new Promise((resolve, reject) => {
  reject('111');
});

cPromise
  .then((res) => {
    console.log('res:', res);
  })
  .catch((err) => {
    console.log('err:', err); // err: 111
    // 答案就是有的 原理和上面一样
    // return 回来的其实一个Promise新的resolve
    return 'catch return value';
  })
  .then((res) => {
    console.log('res result:', res); // res result: catch return value
  })
  .catch((err) => {
    console.log('err result:', err);
  });
```

### finally()

没啥好说的，无论成功失败都会执行的

```javascript
const finallyPromise = new Promise((resolve, reject) => {
  // resolve(11);
  reject(22);
});

finallyPromise
  .then((res) => {
    console.log('res', res);
  })
  .catch((err) => {
    console.log('err', err); // err 22
  })
  .finally(() => {
    console.log('无论成功失败我都会执行的！'); // 无论成功失败我都会执行的！
  });
```

### all()/allSettled()

`all()` 只要有 1 个 `reject()`，整体结果就是 `reject()`，其他的都拿不到结果。

`allSettled()`

### race()/any()

`race()` 谁最快用谁的状态，无论这个 race 是 `resolve()` 还是 `reject()`

`any()` 无论是谁，我都要一个能 `resolve()`

## 手写 Promise

因为早期大家写 Promise 的时候都各自为政，为了统一实现规范，promiseplus 应运而生。[Promises/A+](https://promisesaplus.com)

```javascript
// 第1版本
class MyPromise {
  constructor(executor) {
    executor();
  }
}

const myPromise = new MyPromise(() => {
  console.log('我已被执行了');
});
```

```javascript
// 第2版本
class MyPromise {
  constructor(executor) {
    // 因为这里要有函数
    const resolve = () => {
      console.log('resolve');
    };
    const reject = () => {
      console.log('reject');
    };
    executor(resolve, reject);
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  console.log('我已被执行了');
});
```

```javascript
// 第3版本
// 为了存储状态。因为调用了 reject 肯定就不能搞 resolve 了
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    // 初始化状态
    this.status = PROMISE_STATUS_PENDING;

    const resolve = () => {
      // 不为 pending 才调用
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        console.log('resolve');
      }
    };
    const reject = () => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        console.log('reject');
      }
    };
    executor(resolve, reject);
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  resolve();
  reject();
});
```

```javascript
// 第4版本
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    // 初始化状态
    this.status = PROMISE_STATUS_PENDING;
    // 保留value和reason
    this.value = undefined;
    this.reason = undefined;

    // value 和 reason 都是一种规范
    const resolve = (value) => {
      // 不为 pending 才调用
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        this.value = value;
        console.log('resolve');
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        this.reason = reason;
        console.log('reject');
      }
    };
    executor(resolve, reject);
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  resolve(111); // 拿到参数
  reject(222);
});

// 为了让res和err都拿到上面的参数 初始化 value/reason
myPromise.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
```

以上就是一个基本的框架，但是这里有一个问题，就是如何让`then()`里面的函数进行回调呢？

```javascript
// 第5版本
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    // 初始化状态
    this.status = PROMISE_STATUS_PENDING;
    // 保留value和reason
    this.value = undefined;
    this.reason = undefined;

    // value 和 reason 都是一种规范
    const resolve = (value) => {
      // 不为 pending 才调用
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        this.value = value;
        console.log('resolve');
        // 执行then传进来的第1个回调函数
        this.onfulfilled();
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        this.reason = reason;
        console.log('reject'); //
        // 执行then传进来的第2个回调函数
        this.onrejected();
      }
    };
    executor(resolve, reject);
  }

  // 为什么写方法会要加on 一般表示 当某个事件发生会执行
  then(onfulfilled, onrejected) {
    this.onfulfilled = onfulfilled;
    this.onrejected = onrejected;
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  resolve(111); // 拿到参数
  reject(222);
});

// 为了让res和err都拿到上面的参数 初始化 value/reason
myPromise.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
```

但是这里的问题，就是延迟执行的问题。

![image-20220425134641359](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220425134641359.png)

所以以下有 2 种方案，`setTimeout()` 这种宏任务，或者微任务！

先写一个 setTimeout 非推荐的用法，然后写一个 `queueMicrotask()` 用法

![image-20220425135502746](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220425135502746.png)

但是目前的版本

- 只能单独调用一个 `then()` → 用数组
- 不能进行链式调用
- `then()` 里面裹个 `then()`

```javascript
// 第6版本
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onfulfilledFns = [];
    this.onrejectedFns = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onfulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onrejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };

    executor(resolve, reject);
  }

  then(onfulfilled, onrejected) {
    // 如果在then调用的时候 状态已确定（解决setTimeout里面的调用）
    if (this.status === PROMISE_STATUS_FULFILLED && onfulfilled) {
      onfulfilled(this.value);
    }
    // 如果在then调用的时候 状态已确定（解决setTimeout里面的调用）
    if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
      onrejected(this.reason);
    }
    if (this.status === PROMISE_STATUS_PENDING) {
      this.onfulfilledFns.push(onfulfilled);
      this.onrejectedFns.push(onrejected);
    }
  }
}

const myp = new MyPromise((resolve, reject) => {
  resolve(222);
});

myp.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

myp.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

// 为什么这里不能继续调用 因为延迟之后 ↓ 并没有加进去
//  this.onfulfilledFns.push(onfulfilled);
setTimeout(() => {
  myp.then(
    (res) => {
      console.log('res3:', res);
    },
    (err) => {
      console.log('err3:', err);
    }
  );
}, 1000);
```

有一个确定状态的情况下

```javascript
// 第7版本
    const resolve = (value) => {
    };
    .....
          if (this.status == PROMISE_STATUS_PENDING) return; // New 如果不是pennding状态 就没必要执行微任务
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onfulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
    };
    .....
          if (this.status == PROMISE_STATUS_PENDING) return; // New
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onrejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };
.....
```

为了可以进行链式调用

```javascript
// 第6版本
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onfulfilledFns = [];
    this.onrejectedFns = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onfulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onrejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };

    // 为了处理代码new的时候就有的异常
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onfulfilled, onrejected) {
    return new MyPromise((resolve, reject) => {
      // 如果在then调用的时候 状态已确定（解决setTimeout里面的调用）
      if (this.status === PROMISE_STATUS_FULFILLED && onfulfilled) {
        try {
          const value = onfulfilled(this.value);
          resolve(value);
        } catch (err) {
          reject(err);
        }
      }
      // 如果在then调用的时候 状态已确定（解决setTimeout里面的调用）
      if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
        try {
          const reason = onrejected(this.reason);
          resolve(reason);
        } catch (err) {
          reject(err);
        }
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        // 为了拿到结果
        this.onfulfilledFns.push(() => {
          try {
            const value = onfulfilled(this.value);
            resolve(value);
          } catch (err) {
            reject(err);
          }
        });
        this.onrejectedFns.push(() => {
          try {
            const reason = onrejected(this.reason);
            resolve(reason);
          } catch (err) {
            reject(err);
          }
        });
      }
    });
  }
}

const myp = new MyPromise((resolve, reject) => {
  resolve(222);
});

myp
  .then(
    (res) => {
      console.log('res1', res);
      throw new Error('err message');
    },
    (err) => {
      console.log('err1', err);
    }
  )
  .then(
    (res) => {
      console.log('res2', res);
    },
    (err) => {
      console.log('err2', err);
    }
  );
```

稍微优化，手写结束。

```javascript
// 第6版本
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

// 工具函数 执行
function execFuncWithErr(execFn, value, resolve, reject) {
  try {
    const res = execFn(value);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onfulfilledFns = [];
    this.onrejectedFns = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onfulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onrejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };

    // 为了处理代码new的时候就有的异常
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onfulfilled, onrejected) {
    return new MyPromise((resolve, reject) => {
      // 如果在then调用的时候 状态已确定（解决setTimeout里面的调用）
      if (this.status === PROMISE_STATUS_FULFILLED && onfulfilled) {
        // try {
        //   const value = onfulfilled(this.value);
        //   resolve(value);
        // } catch (err) {
        //   reject(err);
        // }

        execFuncWithErr(onfulfilled, this.value, resolve, reject);
      }
      // 如果在then调用的时候 状态已确定（解决setTimeout里面的调用）
      if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
        // try {
        //   const reason = onrejected(this.reason);
        //   resolve(reason);
        // } catch (err) {
        //   reject(err);
        // }

        execFuncWithErr(onrejected, this.reason, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        // 为了拿到结果
        this.onfulfilledFns.push(() => {
          //   try {
          //     const value = onfulfilled(this.value);
          //     resolve(value);
          //   } catch (err) {
          //     reject(err);
          //   }
          execFuncWithErr(onfulfilled, this.value, resolve, reject);
        });
        this.onrejectedFns.push(() => {
          //   try {
          //     const reason = onrejected(this.reason);
          //     resolve(reason);
          //   } catch (err) {
          //     reject(err);
          //   }

          execFuncWithErr(onrejected, this.reason, resolve, reject);
        });
      }
    });
  }
}

const myp = new MyPromise((resolve, reject) => {
  resolve(222);
});

myp
  .then(
    (res) => {
      console.log('res1', res);
      return '111';
      //   throw new Error('err message');
    },
    (err) => {
      console.log('err1', err);
    }
  )
  .then(
    (res) => {
      console.log('res2', res);
    },
    (err) => {
      console.log('err2', err);
    }
  );
```

`catch()` 方法实现

本质就两句代码

```javascript
then(onfulfilled, onrejected) {
    // 🆕
    // onrejected =
    //   onrejected === undefined
    //     ? (err) => {
    //         throw err;
    //       }
    //     : onrejected;

    // 🆕 跟上面一样
    onrejected =
      onrejected ||
      ((err) => {
        throw err;
      });
    return new MyPromise((resolve, reject) => {
      // 如果在then调用的时候 状态已确定（解决setTimeout里面的调用）
      if (this.status === PROMISE_STATUS_FULFILLED && onfulfilled) {
        // try {
        //   const value = onfulfilled(this.value);
        //   resolve(value);
        // } catch (err) {
        //   reject(err);
        // }

        execFuncWithErr(onfulfilled, this.value, resolve, reject);
      }
      // 如果在then调用的时候 状态已确定（解决setTimeout里面的调用）
      if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
        // try {
        //   const reason = onrejected(this.reason);
        //   resolve(reason);
        // } catch (err) {
        //   reject(err);
        // }

        execFuncWithErr(onrejected, this.reason, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        // 为了拿到结果
        this.onfulfilledFns.push(() => {
          //   try {
          //     const value = onfulfilled(this.value);
          //     resolve(value);
          //   } catch (err) {
          //     reject(err);
          //   }
          execFuncWithErr(onfulfilled, this.value, resolve, reject);
        });
        this.onrejectedFns.push(() => {
          //   try {
          //     const reason = onrejected(this.reason);
          //     resolve(reason);
          //   } catch (err) {
          //     reject(err);
          //   }

          execFuncWithErr(onrejected, this.reason, resolve, reject);
        });
      }
    });
  }
	// 🆕
  catch(onrejected) {
    this.then(undefined, onrejected);
  }
```

实现 `finally()`

```javascript

```

## 迭代器 iterator

就是一个光标，一直往下走。

只要你的数据实现了这种规范（iterator protocol）的就是迭代器。

```javascript
next()
1.无参 or 1个参数
2.返回值 对象 {done,value}
```

于是下面就是一个迭代器

```javascript
// 对象
const iterator = {
  next() {
    return {
      done: true,
      value: 1,
    };
  },
};
```

自己实现一个迭代器

```javascript
const arr = ['foo', 'bar', 'baz'];
// 实现一个简单的迭代器
let index = 0;
const arrIterator = {
  next: function () {
    if (index < arr.length) {
      // 先输出 再++
      return { done: false, value: arr[index++] };
    } else {
      return { done: true, value: undefined };
    }
  },
};

console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());

// { done: false, value: 'foo' }
// { done: false, value: 'bar' }
// { done: false, value: 'baz' }
// { done: true, value: undefined }
// { done: true, value: undefined }
```

可是上面的迭代器只能是 arr 的，那么想让所有的数据结构都可以呢？

```javascript
const names = ['1', '3', '5'];
// 通用迭代器
function createIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { done: false, value: arr[index++] };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}

const nameIterator = createIterator(names);
console.log(nameIterator.next());
console.log(nameIterator.next());
console.log(nameIterator.next());
console.log(nameIterator.next());
console.log(nameIterator.next());
```

那什么是可迭代对象呢？

当一个对象实现了 `iteratale protocol` 就是可迭代对象。和迭代器不一样

- 必须要实现[Symbol.iterator]属性

```javascript
// 既然你现在的3个东西联系紧密
// 完全可以封装成一起成一个新的对象
// 那么这个对象就是【可迭代对象】
const obj = {
  // 有了迭代器
};
```

他们的关系就是

可迭代对象的属性`[Symbol.iterator]`用的是迭代器实现的

```javascript
const iterableObj = {
  arr: ['foo', 'bar', 'baz'],
  [Symbol.iterator]: function () {
    let index = 0;
    return {
      // 但是由于next内部其实是访问不到arr这些的
      // 所以就一定要用 箭头函数
      next: function () {
        if (index < this.arr.length) {
          return { done: false, value: this.arr[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  },
};
const iterableObj2 = {
  arr: ['foo', 'bar', 'baz'],
  // 这里用的是可计算属性的写法 [Symbol.iterator]
  [Symbol.iterator]: function () {
    let index = 0;
    return {
      // 但是由于next内部其实是访问不到arr这些的
      // 所以就一定要用 箭头函数
      next: () => {
        if (index < this.arr.length) {
          return { done: false, value: this.arr[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  },
};

// 这里的最后的 [Symbol.iterator]()的() 不能少
// 并且这样每次都是一个新的【iterator2 迭代器】
const iterator2 = iterableObj2[Symbol.iterator]();
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
```

那么迭代器有什么用呢？ `for ...of` 必须用在可迭代对象上

如果你没有实现属性 `[Symbol.iterator]:function` 那么你就不能用 ` for ...of`

` for ...of`

常见的 Array/Map/Set/arguments(函数中的) 都是实现了 属性 `[Symbol.iterator]:function`

### 可迭代对象有啥用

```javascript
const names = [];
const newName = [...names]; // 因为names是可迭代器

// 对象除外 → 对象没实现可迭代对象 但是可以展开 ES9新增
const newObj = { ...obj };

// 那么迭代器有什么用呢？
// 1.for of场景

// 2.展开语法(spread syntax)
const iterableObj = {
  names: ['abc', 'cba', 'nba'],
  [Symbol.iterator]: function () {
    let index = 0;
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  },
};

const names = ['abc', 'cba', 'nba'];
const newNames = [...names, ...iterableObj];
console.log(newNames);

const obj = { name: 'why', age: 18 };
// for (const item of obj) {

// }
// ES9(ES2018)中新增的一个特性: 用的不是迭代器
const newObj = { ...obj };
console.log(newObj);

// 3.解构语法
const [name1, name2] = names;
// const { name, age } = obj 不一样ES9新增的特性

// 4.创建一些其他对象时
const set1 = new Set(iterableObj);
const set2 = new Set(names);

const arr1 = Array.from(iterableObj);

// 5.Promise.all
Promise.all(iterableObj).then((res) => {
  console.log(res);
});
```

## 生成器 generator

为什么会有生成器的问题？

一个函数在执行的时候，只有发生了问题 or return or throw new Error 才会暂停。

如果想让一个函数在执行的时候暂停一下，先休息一下，在从原来断的地方开始呢？

**生成器函数**

```javascript
function foo() {} // 普通函数
function* foo() {} // 生成器函数
```

生成器的函数里面有个关键字 ,是一个特殊的迭代器。

- `next()` → 返回值是 `{ value: undefined, done: false }`

![image-20220426162545212](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220426162545212.png)

那么 yield 有没有返回值呢？ 一旦 done 为 true，当遇到 yeild 之后，生成器就

- 暂停函数执行
- 你如果想返回值 `yield 你想返回的值`

![image-20220426163208964](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220426163208964.png)

如果不仅仅想有返回值，还想有参数呢？

下面是参数问题

![image-20220426225940570](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220426225940570.png)

但是如果你想要第一个值也传入呢？因为 `next()` 总是从第 2 个开始的。

那建议从函数调用开始

```javascript
function* foo(num) {
  value = num * 10;
}

const fgenerator = foo(5);
```

如果在生成器函数里面有 return 代表着什么

代表着中止执行

![image-20220426230940032](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220426230940032.png)

同时如果第一次在生成器就直接调用 return

```javascript
function* foo() {
  console.log('函数开始执行~');

  const value1 = 100;
  console.log('第一段代码:', value1);
  const n = yield value1;

  const value2 = 200 * n;
  console.log('第二段代码:', value2);
  const count = yield value2;

  const value3 = 300 * count;
  console.log('第三段代码:', value3);
  yield value3;

  console.log('函数执行结束~');
  return '124';
}

const fgenerator = foo();
console.log(fgenerator.return(1)); // 相当于直接返回了这个参数 { value: 1, done: true }
```

用的很少，除非你对上一次的值不太满意，可以终止。

### throw 用法呢？

![image-20220426232017813](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220426232017813.png)

```javascript
function* foo() {
  console.log('start');
  console.log('first code starting...');
  const v1 = 100;
  yield v1;
}

const g = foo();
console.log(g.next()); // { value: 100, done: false }

function* foo2() {
  console.log('start');
  console.log('1 code starting...');
  const v1 = 100;
  try {
    yield v1; // 这样捕获 代码会正常执行
  } catch (error) {
    console.log(error);
  }
  console.log('2 code starting...'); // 这里也会执行
  const v2 = 200;
  yield v2; // 会执行到这里！！
  console.log('end!!!');
}

const g1 = foo2();
console.log(g1.next());
console.log(g1.throw('ops!err!'));
```

生成器替代迭代器

```javascript
// 1️⃣ before
function createArrayIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { done: false, value: arr[index++] };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}

// 2️⃣ after
const arr = ['foo', 'bar', 'baz'];
// 生成器替代迭代器
function* createArrayIterator(arr) {
  for (const item of arr) {
    yield item;
  }
}

const arrGene = createArrayIterator(arr);
console.log(arrGene.next());
console.log(arrGene.next());
console.log(arrGene.next());

// 3️⃣ 语法糖 yield*
const arr = ['foo', 'bar', 'baz'];
// 生成器替代迭代器
function* createArrayIterator(arr) {
  // 后面接一个可迭代的对象 就可以自己取出来 然后yield出去
  yield* arr;
}
const arrGene2 = createArrayIterator(arr);
console.log(arrGene2.next());
console.log(arrGene2.next());
console.log(arrGene2.next());
```

## 异步函数方案

1 回调地狱

```javascript
// 现在模拟一个请求方案
// 发送3次，每一次都是基于上一次的结果进行调用

function requestDemo(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 100);
  });
}

// 1️⃣回调地狱模式
requestDemo('chin').then((res) => {
  requestDemo(res + ' aaa').then((res) => {
    requestDemo(res + ' bbb').then((res) => {
      console.log(res); // chin aaa bbb
    });
  });
});
```

2 then 返回值模式

```javascript
// 2️⃣ then模式返回值模式
requestDemo('chin2')
  .then((res) => {
    // 因为这个就相当于搞了一个 newPromise.resolve()
    return requestDemo(res + ' aaa');
  })
  .then((res) => {
    return requestDemo(res + ' bbb');
  })
  .then((res) => {
    return requestDemo(res + ' ccc');
  });

// 异步代码的处理方案
function requestDemo(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 100);
  });
}
```

3 生成器

```javascript
// 3️⃣  Promise+ generator
function* getData() {
  const res1 = yield requestDemo('chin3');
  const res2 = yield requestDemo(res1 + 'bbb');
  const res3 = yield requestDemo(res2 + 'ccc');
  console.log(res3);
}

const ge = getData(); // 第一次只是返回生成器
// requestDemo('chin3');的返回值给了next
// 由于requestDemo返回值是一个Promise 所以下面的返回值也有个Promise
ge.next().value.then((res) => {
  ge.next(res).value.then((res) => {
    ge.next(res).value.then((res) => {
      console.log(res);
    });
  });
});
```

3-1 生成器自动化

```javascript
// 3️⃣-1  Promise+ generator 自动化一下
// 这尼玛太难写了
function generatorFn(getFn) {
  const generator = getFn();
  function exec(res) {
    const result = generator.next(res);
    if (result.done) return result.value;
    result.value.then((res) => {
      exec(res);
    });
  }
  exec();
}
generatorFn(getData);
```

3-2 有个包叫 co

TJ 大神写的

4 await/async 实现

```javascript
// 本质就是上面的
async function getData() {
  const res1 = await requestDemo('chin3');
  const res2 = await requestDemo(res1 + 'bbb');
  const res3 = await requestDemo(res2 + 'ccc');
  console.log(res3);
}

const ge = getData();
```

## async/await

- 单独执行的时候 没区别

```javascript
async function foo() {
  console.log('start');
  console.log('1');
  console.log('2');
  console.log('3');
  console.log('4');
  console.log('end');
}

foo();
```

- 这样也是没区别

```javascript
async function foo() {
  console.log('start');
  console.log('1');
  console.log('2');
  console.log('3');
  console.log('4');
  console.log('end');
}

console.log('script1');
foo();
console.log('script2');
```

那么有什么区别呢？

- 返回值有区别 → 返回一个 Promise
- 异常处理有区别 → 异步函数里的异常，会被作为 promise 里面的 reject 值
- 可以使用 await （普通函数不能用）

```javascript
async function foo() {
  console.log('start');
  console.log('end');
  // 相当于默认 return undefined
}

console.log(foo()); // Promise { undefined }

const p = foo();
p.then((res) => {
  console.log('promise!');
  console.log('promise res is', res); // promise res is undefined
});

// 为什么是undefined？
// 因为异步函数async调用这里默认返回的是一个Promise
// 但是foo这个异步函数目前没有返回值 就相当于返回了 undefined
```

![image-20220502012131457](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220502012131457.png)

异步函数里面的异常要特殊处理（被当成 `reject`）

```javascript
// 😄
function foo() {
  console.log('start');
  throw new Error('original');
}
foo();
console.log('我不能执行'); // 并不会被打印

// 😣
async function foo() {
  console.log('start');
  throw new Error('async');
}
foo(); // 为什么还能执行？ 因为这里是异步函数 异常会被当成reject来处理
foo().catch((err) => {
  console.log(err);
});
console.log('我还能执行');
```

await 问题

```javascript
function requestData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('chin');
    }, 1000);
  });
}

async function foo() {
  // await 表达式(Promise)
  await requestData();
  // 下面无论多少代码，只要上面await没结果
  // 就统统不会执行
  console.log('foo1');
  console.log('foo2');
  console.log('foo3');
  console.log('foo4');
}
```

![image-20220502013809816](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220502013809816.png)

所以才会有看似异步，事实上是同步执行的效果。

```javascript
function requestData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('chin');
    }, 1000);
  });
}
async function foo2() {
  const res1 = await requestData();
  console.log('foo1', res1);
  const res2 = await requestData();
  console.log('foo2', res2);
}

foo2(); // 按照顺序执行 第一个res1没出来，第二个res2也不会执行
```

可不可以跟普通的值呢？

可以的，相当于立即执行

```javascript
// 普通值 相当于立即执行
async function foo() {
  const res1 = await 111; // 立即会执行
  console.log(res1);
}

foo(); // 111

// 实现then 那就根据resolve的值
async function foo() {
  const res1 = await {
    then: function (resolve, reject) {
      resolve('abc');
    },
  };
  console.log(res1);
}

foo(); // abc
```

如果 await 不是 resolve，而是 reject 呢？

![image-20220502014811815](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220502014811815.png)

上面红框圈错了，应该是`foo()` 整体的 reject
