# TS Tips

## 1. 类型注解 type annotion

啥是类型注解啊，我感觉就是给你的数据弄个类型罢了。但是 ts 里就叫注解

```typescript
let msg: string = 'hello';
// msg都叫标识符 string叫类型注解
```

> 类型注解的类型有很多，接下来仔细说。

## 2. TS 到底多少数据类型

以前我总是纠结于 TS 的复杂数据类型和基本数据类型之间。

因为按照 JS 的思维

### 2-1 JS 里的数据类型

- 基本数据类型 primitive data types
  - [string](https://developer.mozilla.org/en-US/docs/Glossary/String)
  - [number](https://developer.mozilla.org/en-US/docs/Glossary/Number)
  - [bigint](https://developer.mozilla.org/en-US/docs/Glossary/BigInt)　 ES2020 年之后新增
  - [boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)
  - [undefined](https://developer.mozilla.org/en-US/docs/Glossary/undefined)
  - [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
  - [null](https://developer.mozilla.org/en-US/docs/Glossary/Null)
- 复杂数据类型 也叫引用数据类型 看英文就知道 refrence data types
  - array 数组
  - object 对象
  - function 函数
  - Collection/Date 其实这些都属于 Object 的一种了。

> [MDN:Primivive ](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 这里也说明了一下基本数据类型是没有方法的，但偶尔会表现有方法一样，是因为有一个**自动装箱**的行为。
>
> [Primitive vs Reference Data Types in JavaScript](https://www.freecodecamp.org/news/primitive-vs-reference-data-types-in-javascript/) 这篇文章写了引用数据类型的不同

```js
'foo'.include('f'); // 本来字符串是没有的，但是这里会自动装箱成String

// 举个例子

let name: string = 'chin';
console.log(name.toUpperCase()); // CHIN
// 为什么string作为一个普通类型 却可以使用方法 因为这是自动装箱
// 内部在使用的时候会给你这样做的
console.log(new String(name).toLowerCase()); //chin
export {};
```

### 2-2 那么 TS 到底多少呢？

这个我还真不知道，找了一下，TS 貌似基本都是按照 JS 的规则来的。但是自己也有自己的类型，具体可以看官方给的 cheat sheet

![image-20221201173047094](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221201173047094.png)

那么按照上面的顺序，搞一下 TS 的类型吧。我本来是这样想的，但是别人给出了一个新的分类类型。那就是

- JS 有的
  - boolean
  - string
  - number （bigint）
  - symbol
  - undefined (其他类型的子类型 strictNullChecks 为 true 不行
  - null (其他类型的子类型 strictNullChecks 为 true 不行
  - symbol
  - array
- TS 特有
  - tuple
  - enum
  - any
  - void
  - never
  - unknown

> 按照上面这种分类 感觉自己理解起来也蛮顺畅的，只要聚焦在 TS 特有的类型上可能会更好。但注意上面貌似没有 object 和 function 这些复杂类型。总之，焦点要聚焦在**TS 新的类型上。**

## 3. TS 新增类型

这里主要就写 TS 新增的数据类型

### 3-1 tuple 元组

介于对象和数组的感觉，使用场景，主要用于函数的参数。

要求就是**各个位置上的元素类型都要对应 元素个数也要一致**

```typescript
const t1: [string, number, boolean] = ['hello', 99, true]; // 必须要按照这个顺序来

t1[0] = 'world'; // 你也可以单独用数组的方式赋值
console.log(t1); // [ 'world', 99, true ]
```

好处在哪里呢？

元祖数据结构可以存放不同的数据类型，**取出来的也是有明确的类型。**

```typescript
// 好处在哪里呢？
// 元祖数据结构可以存放不同的数据类型 取出来的也是有明确的类型
const t2: [string, number, number] = ['chin', 22, 178];
const t22 = t2[0]; // 这样t22也是有数据类型的

// 比如数组要好一点 数组的数据类型要统一 介于【数组和对象之间】
// 主要使用场景在哪里呢？其实对象也可以替代 主要用于函数
// 向数组里放两种数据类型 最好办法就是元素 下面还配合了泛型
function myUseState<T>(init: T): [T, (newValue: T) => void] {
  let value = init;
  function setValue(newValue: T) {
    value = newValue;
  }
  // 这就是一个元祖 特别是函数返回值 使用场景最多
  return [value, setValue];
}
const [first, setfirst] = myUseState<number>(20);
```

### 3-2 enum 枚举

这个没啥好说的，Java 也有，极其相似。

```typescript
enum Roles {
  SUPER,
  ADMIN,
  USER,
}

enum Seasons {
  SPRING = 2, // 默认从0开始 你也可以按照顺序自定义
  SUMMER,
  AUTUMN,
  WINTER,
}

console.log(Roles.ADMIN); // 1
console.log(Seasons.AUTUMN); // 4
```

### 3-3 any

当你不知道一个类型是什么的时候，就用 any。

**但是请注意，不要滥用 any 如果任何值都指定为 any 类型那么 TypeScript 将失去它的意义。**

> 但对于一些特殊数值的类型 嵌套层级很多 不得已可以使用 any 的

- 特点 1 可以随意赋值
- 特点 2 可以随意调用不存在属性方法 相当于和 JS 一模一样了

```typescript
const arr: any[] = [1, 56, 'yes', true, { id: 'uu1', age: 99 }];
console.log(arr); // [ 1, 56, 'yes', true, { id: 'uu1', age: 99 } ]

let value: any;
value = 123;
value = 'foo'; // 可以被任意赋值
console.log(value); // foo
```

### 3-4 void

就是什么类型都不是，定义函数没有返回值时会用到，当一个函数没有返回值的时候使用的。

- void 可以被赋值成为 undefined 跟 null 其他不可以
- 其实最主要的用法就是在明确一个函数的类型的时候 `() => void` 用来表明函数返回值

```typescript
const foo = (str: string): void => {
  console.log(str);
};

const fooFunc = (str: string): undefined => {
  console.log(str);
  // 虽然函数默认返回的就是 undefined
  // 你也可以写undefined 也可以写void 都可以的
  return undefined;
};
// 表示 FuncType 是一个函数
type FuncType = (str: string) => void;

const fooF: FuncType = (str) => {
  console.log(str);
};
fooF('hello');
```

这里有一个细节

> 基于上下文推导类型的时候 可以返回 void 之外的
>
> 那什么叫什么叫什么叫 基于上下文？

```typescript
// 这里有一个细节 基于上下文推导类型的时候 可以返回void之外的
// 什么叫基于上下文？
function bar(x: number, y: number): void {
  // return x + y; 这种自己定义的函数 不允许返回void之外的类型
}
const arrs = ['aa', 'bb', 'cc'];

// 虽然forEach的第一个参数要求是只能返回void
// 但此时的类型item等等都是由上下文推导出来的 所以你返回其他的也可以
arrs.forEach((item, index, arr) => {
  return item.length; // 这里返回number 也不会报错
  // 因为forEach这个函数本身就是以遍历为目的 所以你返回也没任何意义
});
```

### 3-5 never

类型指那些永不存在的值的类型，开发很少实际会主动定义。大多数都是自动推导出来的类型。

- 开发框架会用到
- 封装类型工具会用到
- 死循环用到
- 抛出异常用到

异常如下

```typescript
// 因为这个函数总会抛出异常 所以返回值是never
// 用来表明她的返回值是永远不存在的
const errFunc = (msg: string): never => {
  throw new Error(msg);
};
errFunc('foo');
```

死循环的话

```typescript
// 这个是一个死循环
// 和之前返回void不同，一个是没有返回值，never是根本不会有返回值
// never可以使任何类型的子类型，可以赋值给任何类型
const infiniteFunc = (): never => {
  while (true) {}
  // 死循环 代表下面用于不会执行
};
infiniteFunc();

// 但是任何类型都不能复制给never any也不行
// 自执行函数
let neverFunc = (() => {
  while (true) {}
})();
// neverFunc = any; 错误

function parse() {
  return []; // 这里永远用不到 也是never ❓ 这里没理解
}
const a = parse();
```

封装工具

```typescript
// 还有一种永远来不到的
// 意义在于 其他人调用这个函数的时候 比如说新增加了一个类型
// 但是上面的类型没问题 下面的逻辑就会漏掉一个case
// 防止你少写逻辑 其他人在扩展工具的时候 对于一些没有处理的case 可以报错
function handleMsg(msg: string | number) {
  switch (typeof msg) {
    case 'string':
      console.log(msg.length);
      break;
    case 'number':
      console.log(msg);
      break;
    default:
      // 这里永远不会走到 所以是never
      const check: never = msg;
  }
}
// 此时如果有个人加了个参数类型 boolean 如果不写下面的case逻辑
// 就会报错 为了保持健壮性
// function handleMsg(msg: string | number | boolean);
// handleMsg(true)
```

感觉就是那种程序永远都不会走的到

> void 和 never 区别
>
> void 代表没有任何类型，如果一个函数没有返回值就是 void，undefined 兼容这个。
>
> - void 可以被赋值成为 null /undefined 。never 不行。
> - 返回 void 函数还能正常执行。never 不行，要么异常要么死循环。
>
> **※ strictNullCheck= false 的情况下 可以把 null 赋值成为 void。true 不行。**

### 3-6 unknown

相对安全，用于描述不确定的类型。为什么说安全？因为只有进行类型缩小判断后才能用。

> 和 any 区别 any 有个情况就是可以赋值为任何类型 **unknown 进行任何操作都不合法**
>
> - any 是什么都可以 叫任意
> - unknown 是不确定 所以什么都不行 需要类型缩小

- any 可以使用方法 但是 un 啥都不行

```typescript
let fooA: any = 'aaa';
fooA = 123; // ✅ 就可以赋值了

let fooB: unknown = '111';
fooB = 22; // ✅ 可以赋值
fooB.length  ❌ 任何方法都是非法的 因为不确定是啥类型 所以有安全隐患

```

> 那我们为什么要使用？类型缩小后可使用 un 要求必须校验后才能使用

下面是一个类型缩小的例子

```typescript
function foo(): string {
  return 'foo';
}
function bar(): number {
  return 123;
}
const flag = true;
let resA: unknown;

if (flag) {
  resA = foo();
} else {
  resA = bar();
}

if (typeof resA === 'string') {
  console.log(resA.length);
}
```

### bigint 补充

这是 ES2020 之后新增的，之前的版本都不会识别*BigInt*这个类的。

```typescript
const max = BigInt(Number.MAX_SAFE_INTEGER);
// 这俩是false，因为这已经是最大的了。加多少都不行了
console.log(max + 1 === max + 2); // true
// 如果是es2020之前的就是false 因为不支持

export {};
```

number 不是 Number，bigint 也不是 BigInt。前者是一个数据类型，后者是类。

## 4. 类型断言 Type Assertion

类型断言（Type Assertion）可以用来手动指定一个值的类型。

首先要搞清楚为什么要有类型断言，这个话适用于当类型不确定你手动需要确定。很想把一个模糊的东西，具体了。可以看这一篇文章，写的很具体。看这个也行。[类型断言](https://ts.xcatliu.com/basics/type-assertion.html)

要注意断言只是把模糊的断言成具体的，指鹿为马这种肯定是不可以的。

```typescript
let id: string | number;
id = 67552;
console.log((id as number).toFixed(2)); // 67552.00

id = 'hello';
console.log((id as string).length); // 5
```

双重断言

```typescript
console.log(id! as any as boolean);
```

```typescript
// 以达到提示会正确的效果
//  document.querySelector("div") // 这种有类型 HTMLImageElement  直接写标签选择
//  document.querySelector(".img") // 这种就没有 只是一个泛泛的 Element

const imgEl = document.querySelector('img');
const imgEL = document.querySelector('.img') as HTMLImageElement; // 这种就直接给断言了
```

## 5. 类型推导 type inference

```typescript
const msg = 'hello'; // 推导出来的是字面量类型
let msg = 'hello'; // 推导出来的是string类型
```

> 结论 let 推导出来的都是通用类型 const 推导出来的基本上都是**字面量类型**
>
> （为什么呢 我想是因为 const 不可变的原因吧

你并需要每次都写类型注解，大多数情况下 ts 都会推导出来类型的

```typescript
let num = 123;
// Type 'string' is not assignable to type 'number'
num = 'hello';
```

## 6. 关于函数

首先函数本身是有类型注解的，在 TS 里函数的表达还是比较难的。

基本写法是这样的。

```typescript
// 这里就是定义了一个函数类型 （函数列表） => 返回值
type CalcType = (x: number, y: number) => void;

function calc(fn: CalcType) {
  console.log(fn(10, 20));
}

function sum(x: number, y: number): number {
  return x + y;
}
// 不写也会自动推断
calc((x, y) => {
  return x + y;
});
```

通常我们在 js 里写的函数是这样的

```js
// JS
function sum(x, y) {
  return x + y;
}
// TS里这样写
function sum(x: number, y: number): number {
  return x + y;
}
```

如果是字面量定义的函数

```js
// JS
const sum = (x, y) => {
  return x + y;
};
// TS里这样写
const sum = (x: number, y: number): number => {
  return x + y;
};
```

### 匿名函数

如果是匿名函数呢？需要类型注解吗？

不需要的，该函数会自动指定类型。

```typescript
const names = ['foo', 'bar', 'far'];

// names.forEach(匿名函数);
// 匿名函数是否需要添加类型注解呢？
names.forEach(function (item: string, index, arr) {}); // 无需添加
names.forEach(function (item, index, arr) {});
```

> 匿名函数形参的标识符是已经有类型的，所以是不需要类型注解的。根据上下文是有的。
>
> 而且你有可能是写错了类型，反而会报错。这个过程就是要 contenxtul typing 根据函数执行的上下文帮助确定参数和返回值类型。
>
> **一般情况下你手动写的函数是需要写的**
>
> 系统的匿名函数基本是无需写的。为什么呢，因为 JS 使用匿名函数作为参数的情况实在太多了，无法一个个检验完。省略的参数无所谓，但是多余的会被省略掉，但其实类型是校验的。

关于函数的类型注解，这里有一个小坑，那就是函数作为参数校验的问题。

```typescript
type CalcType = (x: number, number) => number;

function TestCalcA(num: number) {
  return 1;
}
// 虽然少了参数 但依然是true
type resA = typeof TestCalcA extends CalcType ? true : false;

function TestCalcB(x: number, y: number, z: number) {
  return 1;
}
// 这边多了参数 false
type resB = typeof TestCalcB extends CalcType ? true : false;
```

### 调用签名 call signature

这个是干嘛的呢？首先众所周知，在 JS 里的函数也是一个对象

```typescript
// 构造函数
function Foo() {}
```

这样就造成了函数可能有自己的属性，那么如果像下面这种写法是无法表达出函数里面有什么属性的

```typescript
type BarType = (x: number) => number;
const bar: BarType = (x: number): number => {
  return 1;
};

bar.id ❌ // 比如想有个id属性也是无法调用的
```

上面的 BarType 只能表达出这是一个函数，而里面有什么属性，如何表达呢？表达式有局限性的话，于是调用签名就横空出世了。

```typescript
// 这样看起来只是一个普通的对象 完全看不出有函数
interface IBar {
  id: string;
  age: number;
  // 这里就出生了 调用签名
  // (参数列表):返回值类型
  (x: number): number;
}

const barFunc: IBar = (x: number) => {
  return 1;
};
// 这样既有函数 下面的属性也可以调用了
barFunc.id = 'uuid1';
barFunc.age = 99;
```

> 如果只是**单纯描述了一个函数**，就用上面的函数表达式。`()=>void`
>
> 如果还要表明这个**函数（作为对象）有属性**，就要使用调用签名。 `():返回类型`

### 构造签名 construct signatures

按照上面的说法，既然作为构造函数，那么当然可以被 new 调用产生一个新对象。那如何描述一个函数（对象）可以被 new 调用呢？于是构造签名就横空出世了。

```typescript
function foo() {}

// 你会发现TS根本推到不出这个f是什么类型 就写成了Any
// 那如何指定呢？
const f = new foo();

// 比如这里要传入一个构造函数 也就是可以new的函数
function objMaker(fn: () => void) {} // 这样写肯定不行
```

于是就出来了构造签名

```typescript
// 基本写法 （其实就是加了一个new而已
class Animal {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

interface IAnimal {
  // 2 加上new的关键字
  new (id: string): void;
}

// 此时有一个构造函数工厂
// 1 这里就表示fn一定要是一个可以能被new的对象
function objMaker(fn: IAnimal) {
  const a = new Animal('uuid1');
  return a;
}

objMaker(Animal); // 传入一个必须能被new的IAnimal类型 animal正好符合
```

### 可选参数

```typescript
// 一个函数的可选参数
// y就是可选参数
// 可选参数的类型其实是 你指定的类型和undefined的联合类型
function foo(x: number, y?: number) {
  return x + y;
  // 所以需要类型缩小的
  if (y !== undefined) {
    return y + 20;
  }
}

foo(1, 2); // 参数都是number
foo(1); // 没传就默认是undefined
```

默认参数

其实就是给参数添加默认值

```typescript
// 1 有默认值的情况下 类型注解可以省略
function foo(x: number, y: number = 99) {
  return x + y;
}
// 2 实际上默认的参数还可以接受 你传给undefined
foo(10, undefined);
```

### 剩余参数

```typescript
function sum(...nums: number[]) {
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    console.log(element);
  }
}

sum(1, 8, 10);
```

### 重载

这个原来是 java 的，就相当于你传入一个通用的父类，最后具体会执行子类的方法。

比如下面是一段 js 的，js 本身是没有重载的。

```typescript
function add(x, y) {
  return a + y;
}
add(1, 2); // 传入的是number
add('hello', 'ts'); // 传入的是string
```

所以这里需要有重载签名

- 注意一定要写在一起，分开写就报错

```typescript
// 重载签名 无需写实现体 只需要写参数
function add(x: number, y: number): number;
function add(x: string, y: string): string;
// ❌ 在这里如果插入一句 就报错了
function add(x: any, y: any): any {
  return x + y;
}
console.log(add(10, 20));
console.log(add('hello', 'ts'));
// 虽然上面有add可以接受任意的参数any 但是你不能直接调用重载没有的类型
// add(['1'], ['s']); ❌ 比如这样就是错误的
```

可以看出来联合类型貌似也可以和重载一样，实现同样的一样的效果。那怎么选择呢？

官方文档也写了，一般选联合类型。只有联合类型做不到，才选择重载。

## 6. 关于对象

其实对象的类型注解方式总共有 2 种。

- type
- interface

基础使用

```typescript
// JS里是这样的
const obj = {
  id: 'uuid1',
  age: 19,
};

// TS里是这样写的
const objA: { id: string; age: number } = {
  id: 'uuid1',
  age: 19,
};
```

注意点

```typescript
const obj: { id: string; age: number } = {
  id: 'uu1',
  age: 99,
}; // 注意不能写成 const owner:object={} 这样不会有类型解析
const objNg: object = {
  name: 'uu',
  age: 89,
};
// 写成这样不会出错，因为你写成object 就表示是一个空对象类型
// console.log(objNg['name']); ❌ 也会发现根本无法直接获取

// 那什么时候能用到object这个类型呢？
// 当你希望一个值必须是对象而不是数值等类型时
function getKey(obj: object) {
  return Object.keys(obj); // 比如你希望这个obj就是Object
}
```

实际项目中经常配合函数和 type 一起使用

```typescript
type InfoTYpe = { name: string; age: number };
function getInfo(info: InfoTYpe) {
  // 这样你就可以保证info里肯定有name 以前的话可以随便传 现在的话有了炎症
  return info.name.toUpperCase();
}
console.log(getInfo({ name: 'chin', age: 88 })); // CHIN
```

对象也有可选类型和只读类型

### this 的处理

JS 里本身关于 this 就很难。所以 TS 基本上是继承与 JS 里的 this 的用法。那 TS 里的 this 是什么类型呢？

在没有对 TS 进行特殊配置的情况下 this 是一个 any 类型

```typescript
const obj = {
  id: 'uu1',
  // 1 默认情况下this是一个any类型
  study: function () {
    console.log(this.id);
  },
};

obj.study(); // uu1

function foo() {
  // 2随便写一个函数的时候 this也是any类型
  // 在没有对TS进行特殊配置的情况下 this是一个any类型
  console.log(this);
}
export {};
```

但是上面是有缺陷的，因为如果你要这样调用的情况下会发现 this 是没有 id 这个属性的。↓

```typescript
const obj = {
  id: 'uu1',
  // 1 默认情况下this是一个any类型
  study: function () {
    console.log(this.id);
  },
};

obj.study(); // uu1

function foo() {
  // 2随便写一个函数的时候 this也是any类型
  // 在没有对TS进行特殊配置的情况下 this是一个any类型
  console.log(this);
}

// 把this绑定在空对象{}上 这个时候{}没有id这个属性
obj.study.call({}); // ❌ this没有类型情况下 危险
```

那么不要隐式是一个，而是一个明确的类型，所以就需要对 TS 进行配置。`tsconfig.js` ，没有配置的情况下，this 都是 any 所以你可以配置。

默认是关掉的，意思是没有模糊的 any 类型。

```typescript
 "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
```

所以这里现在就有问题了。这个时候 this 会进行推导，能进行推导的就不会报错。不会进行的就会报错。下面这段代码就是不能推导的。

```typescript
function foo() {
  console.log(this); // 这个时候this应该是一个波浪线
}

export {};
```

那究竟怎么指定的？**作为第一个参数然后指定！** 下面就不会报错

- 第 1 个参数名称必须叫 this
- 多余的参数从第 2 个开始按照顺序

```typescript
// 这个时候指定了this是一个id为属性的对象
function fooA(this: { id: string }) {
  console.log(this); //
}
foo(): // 你也不需要传入参数，第一个参数必须叫this
// 后续传入的参数，会从第2个开始传递算起。编译后this这个参数会被抹除。
// 这个时候指定了this是一个id为属性的对象
function fooA(this: { id: string }, name: string) {
  console.log(this); // { id: 'uu1' }
  console.log(name); // hello ts
}
fooA.call({ id: 'uu1' }, 'hello ts');
```

> 总结一下上面说的重点就是
>
> - this 在没配置文件的情况下就是 any
> - 配置后没特殊指定 this 指向 ts 会推导
> - 推导不出来就报错，这个时候你就要明示进行指定。

### this 的内置工具

这个是为了提取一个函数里的 this 类型是什么，感觉这个内置工具的概念特别像类型编程中的函数感觉

#### 只获取 this 类型 →ThisParameterType

```typescript
function foo(this: { id: string }, info: string) {
  console.log(this, info);
}

// 这个时候如果我们想拿到foo的类型该怎么拿的？
// 1 除了我们自己写的
type FooType = (info: string) => void;

// 2 还可以通过type of
/**
 * type FooTypeA = (this: {
    id: string;
    }, info: string) => void
 */
type FooTypeA = typeof foo;

// 3 那么我们只想获取this的类型怎么办？
// 自己写的话会太麻烦，这个时候内置工具就登场了
type FooThisType = ThisParameterType<FooTypeA>; // 这样就顺序拿到了
```

#### 移除 this 的类型 →OmitThisParameter

就是说获取除了 this 之外的 剩余的函数类型

```typescript
type PureFoo = OmitThisParameter<FooTypeA>; // (info: string) => void
```

#### 标记一个上下文的 this 类型 →ThisType

用于绑定上下文的 this

假如现在有一个对象，我们需要在里面获取对象里函数的 this

```typescript
// 1 先写一下俩类型
interface IState {
  id: string;
  age: number;
}
interface IStore {
  state: IState;
  eat: () => void;
}
// 2 这个时候新建一个类型
const store: IStore = {
  state: {
    id: 'uuid1',
    age: 99,
  },

  eat: function () {
    // 3 这里会发现问题， 因为这里根据TS上下文推导
    // 会推导出这个this是一个store 而不是state里的
    console.log(this.id);
    // 4 想要解决的话 会发现只能
    console.log(this.state.id);
  },
};
```

除了上面的解决，还可以直接在 eat 上面指定

```typescript
// 4这样直接指定
eat: function (this: IState) {
  // 3 这里会发现问题， 因为这里根据TS上下文推导
  // 会推导出这个this是一个store 而不是state里的
  console.log(this.id);
},
```

> 但是上面一个个写，如果有 n 个函数呢。那么会十分繁琐。
>
> 于是 ThisType 闪亮登场了

```typescript
function foo(this: { id: string }, info: string) {
  console.log(this, info);
}

// 这个时候如果我们想拿到foo的类型该怎么拿的？
// 1 除了我们自己写的
type FooType = (info: string) => void;

// 2 还可以通过type of
/**
 * type FooTypeA = (this: {
    id: string;
    }, info: string) => void
 */
type FooTypeA = typeof foo;

// 那么我们只想获取this的类型怎么办？
// 自己写的话会太麻烦，这个时候内置工具就登场了
type FooThisType = ThisParameterType<FooTypeA>;

type PureFoo = OmitThisParameter<FooTypeA>; // (info: string) => void

// 1 先写一下俩类型
interface IState {
  id: string;
  age: number;
}
interface IStore {
  state: IState;
  eat: () => void;
  sleep: () => void;
}
// 使用交叉类型 把this绑定过去 🔥
const store: IStore & ThisType<IState> = {
  state: {
    id: 'uuid1',
    age: 99,
  },

  eat: function (this: IState) {
    console.log(this.id);
  },
  sleep: function (this: IState) {
    console.log(this.id);
  },
};
```

```
IStore & ThisType<IState>
```

写法就是上面的

## 7. 面向对象

JS 从 ES6 开始用 class 类实现面向对象等等特性了。比如继承。以前都是原型链的。

最基本使用

```typescript
class Info {
  // 这个可以初始化也可以不初始化 tsconfig可配置
  name: string = 'hello';
  age: number = 100;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

成员修饰符

- private 私有的 **同一类中可见**
- protected **自身以及子类可见**
- public 公有的 **默认就是这个**

public 不说了 都是默认的了。

演示下 private

```typescript
class InfoPrivate {
  name: string = 'hello';
  private age: number = 100;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  // 私有的
  private eat() {
    console.log(this);
  }
}

const i1 = new InfoPrivate('chin', 88);
// i1.age = 100 ❌ 不可见 错误
// i1.eat() ❌ 不可见 错误
```

protected 仅在自身 or 子类

```typescript
class InfoProtected {
  name: string = 'hello';
  protected age: number = 100;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  protected eat() {
    console.log(this);
  }
}

class Child extends InfoProtected {
  showAge() {
    // 这里可以访问到父类的age
    console.log(this.age);
  }
}

const c1 = new Child('chin', 88);
c1.showAge(); // 88
// 这样可以访问吗
// 当然是不可以，因为已经脱离类内部了 即使是继承
// c1.age;  ❌ 子类才行
```
