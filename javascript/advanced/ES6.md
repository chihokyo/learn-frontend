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

