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

构造方法，new的时候用的。和以前的旧版本差别就是多了个`contructor()`而已，new的时候自动调用这个函数

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

反正 ´ES6 之后就是 就可以了

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

说到这个还是先说一下var的作用域提升问题吧，这个要看JavaScript代码执行起来时候的内存图，因为var声明的变量

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

并且let和const，不能重复声明

```javascript
const a = 1;
let b = 11;
const a = 2; // 已经声明过一次了
let b = 22; // 已经声明过一次了
```

## var/let/const到底用哪个？

说个结论吧

就是不要在用var，var现在只用于考验你对作用域提升，window全局对象，块级作用域的理解。并且现在的打包工具(webpack,babel)，都会给你ES6→ES5

>对于let和const用哪个？
>
>优先使用const，如果需要修改了再改成let，因为const更安全！保证你的 变量不能随便被修改。

## 作用域提升问题

let和const是没有作用域提升的（这句话有争议）

因为代码都是先创建一个执行上下文（词法环境+环境变量）

**变量其实是在，执行上下文之前创建的，但是不能被访问！！**

**直到被真正赋值之前！**

>网上很多人说在执行上下文的时候变量本身没有被创建出来
>
>其实是不对的，因为变量在执行上下文之前就是被创建出来的。
>
>但是不能被访问而已！！！
>
>【作用域提升】这个老师的意思是，可以被访问的就是作用域提升，不可以访问的就不是作用域提升。作用域提升的目的是**提前被访问**，但是确实是有被创建出来的。红宝书说是叫【暂时性死区】

```javascript
// ✅ var 可以
console.log(foo); // undefined
var foo = "11";

// ❌ let/const 不可以
console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
let foo = "11";

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



## window里面的变量

首先window只有在浏览器里有

你在JavaScript设置的变量，最终都将转换成window的变量，就是GO。这是老的版本。现在新版本叫VE，而且不保证你在js里面写的变量就和window.变量。这样能取到的，因为window具体是浏览器定义的，和V8没太大关系的。

## 块级作用域

在ES5以前是没有块级作用域的，只有俩作用域。

- 全局作用域
- 块级作用域

```javascript
function foo() {
  var bar = 'bar';
}
// 访问不到
console.log(bar); // ❌ ReferenceError: Cannot access 'foo' before initialization
```

比如下面的函数就是有3块作用域

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

但是ES6之后就有了块级作用域

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

- for语句

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

> 为什么上面的var的i是10呢？
>
> 就相当于其实是下面这种感觉的。也就是var根本没块级作用域。

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
console.log(i) // 4 可以验证是第4个


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
console.log(i) // ❌根本不能访问到
```

一个小Tips吧

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

模板字符串真的太easy了。`${}` 一把梭

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

关于bug这里可以用babel编译器来验证。

```javascript
function foo(m = 'aaa', n = 'bbb') {
  console.log(m, n);
}
// 下面才是无bug版本
function foo() {
  var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'aaa';
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bbb';
  console.log(m, n);
}
```

所以ES6可以这样写

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
> - arguments包含所有参数，而剩余参数只有剩余参数

## 箭头函数

箭头函数没有this，也没有显式原型，prototype

```javascript
const foo = () => {
  console.log(this); // 1.箭头函数本身没this 从上层作用域找this
  console.log(arguments); // 2.箭头函数也没有arguments
};
foo();
console.log(foo.prototype); // undefined
// 3.所以箭头函数没办法new
```

> 但是箭头函数作为一个函数 是有\__proto__的

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

如果想获取Symbol定义的属性名，`Object.keys()`不管用。需要有特殊的API。

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

Set的本质感觉就是给你去重的。

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

但属性描述符的本职任务并不是为了监听对象的变化的，所以Proxy就应运而生了。下面主要是`get(),set()`

![image-20220421132007942](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220421132007942.png)

> 本质就是通过Proxy在不改变元obj的情况下，对原来的obj进行增强，进行监听

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

还有剩下9个捕获器，这里先演示下

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
  id:"chin",
  age:199
}

console.log(Object.getPrototypeOf(obj));
console.log(Reflect.getPrototypeOf(obj));
console.log(Object.getPrototypeOf(obj) === Reflect.getPrototypeOf(obj)); //true
```

Object本身就是一个构造函数，生命不可承受之重！

因为是对象，所以没有new！

- 和Object的方法很相似，几乎差不读。
- 和Proxy一样有13个常见方法。
- 为了避开对元对象的操作

Proxy的操作会直接操作原来的obj，所以Proxy是有缺点的。

## receiver

![image-20220421191550443](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220421191550443.png)

上面的this指向了obj，如果用了receiver之后

`Reflect.get(参数1，参数2，receiver)` receiver其实可以改变this的指向

![image-20220421191854178](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220421191854178.png)

差不多上面就是receiver的用法，接下来是`Reflect.construct()`

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

vue里面的，关于原理。

就是说一个数据，当它发生了变化→会自动触发某个函数。这就是响应式的。

大概就是↓这个效果。

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

JS是单线程的，就是排队上厕所。但是有时候等不了怎么办，比如说大的文件的下载，成功了还失败了？我难道必须等你全部下载完（成功失败未定）才能干其他事情吗？这些都是好耗时的，等不起的！

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

一般Promise也有几个状态

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

于是就引出了新的问题，就是第二段Promise的问题。

`then()`  有没有返回值的问题。结论就是有的，返回值是一个新的`new Promise()`但是分三种情况。

先说一下原理+第一种情况

![image-20220422233703276](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422233703276.png)

然后是剩下2种

![image-20220422234853081](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422234853081.png)

