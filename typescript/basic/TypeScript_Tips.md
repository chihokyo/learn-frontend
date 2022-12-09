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

never 是 unknown 的子类型

```typescript
// never是unknown的子类型
type isNever = never extends unknown ? true : false;
type keys = keyof unknown; // type keys = never
```

### 3-6 unknown

相对安全，用于描述不确定的类型。为什么说安全？因为只有进行类型缩小判断后才能用。

> 和 any 区别 any 有个情况就是可以赋值为任何类型 **unknown 进行任何操作（主要是方法和属性）都不合法**
>
> - any 是什么都可以 叫任意
> - unknown 是不确定 所以什么都不行 需要类型缩小

- any 可以使用方法 但是 un 啥都不行

```typescript
let fooA: any = 'aaa';
fooA = 123; // ✅ 就可以赋值了

let fooB: unknown = '111';
fooB = 22; // ✅ 可以任意赋值
fooB.length  ❌ 任何方法都是非法的 因为不确定是啥类型 所以有安全隐患

```

> 那我们为什么要使用？类型缩小后可使用 un 要求必须校验后才能使用。类型断言也可以。只要是类型缩小的话，用断言，typeof instanceof

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

## 高级类型

### 联合类型

最基本的使用

联合类型使用 `|` 分隔每个类型。

这里的 `let myFavoriteNumber: string | number` 的含义是，允许 `myFavoriteNumber` 的类型是 `string` 或者 `number`，但是不能是其他类型。

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

注意点

```typescript
// 联合类型中的unknown会吸收所有其他类型
type U1 = unknown | null;
type U2 = unknown | undefined;
type U3 = unknown | number;
type U4 = unknown | string;
```

### 交叉类型

直接看下面代码区分会比较快

```typescript
// 交叉类型（满足双方的条件）
//1-对象
interface A {
  name: string;
}
interface B {
  age: number;
}
type C = A & B;

const c: C = {
  name: 'chin1',
  age: 99,
  // 多少都不行
};
//2-基础类型
type AA = string | number;
type BB = string | boolean;
type CC = AA & BB; //string 都要满足的话 那就只有string 不要简单的拿交集并集理解
```

要注意下面这个，不是简单的并集

```typescript
interface X {
  a: string | number;
  b: string;
}

interface Y {
  a: number | boolean;
  b: string;
}
// 如果是简单的并集
// 那么a的类型就是 string | number | boolean了
// 可是结果只是number而已
type XY = X & Y;

let xy = {
  a: 1,
  b: 'hello',
};
```

主要的应用就是进行混入，感觉好像 `Object.assign()`

```typescript
function mixin<T, U>(one: T, two: U) {
  const res = <T & U>{};
  for (let key in one) {
    (<T>res)[key] = one[key];
  }
  for (let key in two) {
    (<U>res)[key] = two[key];
  }
  return res;
}
// 两个结合成一个
const m = mixin({ id: 'uu1' }, { age: 11 });
console.log(m); // { id: 'uu1', age: 11 }
```

这是官方给的一个例子

```typescript
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!(<T & U>result!.hasOwnProperty(id))) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    // ...
  }
}
var jim = extend(new Person('Jim'), new ConsoleLogger());
var n = jim.name;
jim.log();
```

### typeof

typeof 用法 用于获取一个变量的数据类型，适用于先定义类型，在定义变量的情况。

```typescript
let p = {
  name: 'hello',
};

type p = typeof p;
```

### 映射类型 Mapped Types

记得不能用 interface，而是用 type

这个映射类型是怎么来的呢。有的时候我们想对一个已知的接口进行批量修改，或者在此基础上稍微改变一下。

- 大部分内置类型都是通过映射类型来实现的
- 映射类型建立在索引签名的基础上

```typescript
// 这只是一个普通的索引签名
type Mapeed<T> = {
  // 此时index没有任何约束
  [index: number]: any;
};

// 此时我们假设把IPerson传入到<T>里面
// 但是此时的Property是没有任何类型约束的
interface Mapeed<Type> {
  [Property]: Type[Property];
}
```

所以此时映射类型就横空出世了，为了限制 Property 的类型

```typescript
type Imapped<Type> = {
  [Proper in keyof Type]: Type[Proper];
};

// 1定义原始
interface IAnimal {
  name: string;
  age: number;
  cow: number;
}

// 2这个时候使用映射类型进行赋值一下的话
type IMappedAnimal<T> = {
  [prop in keyof T]: T[prop];
  // 这里的本质就是遍历 相当于是这样的感觉
  // 2-1 keyof T 获取了一个联合类型 type props = "name" | "age" | "cow"
  // 2-2 进行逐个遍历
  // [name] :T[name]
  // [age] :T[age]
  // [cow] :T[cow]
};

// 3 这样IAnimalCopy就是原原本本拷贝过来的了
type IAnimalCopy = IMappedAnimal<IAnimal>;
```

映射类型，就是使用了 PropertyKeys 联合类型的泛型，其中 PropertyKeys 多是通过 keyof 创建，然后循环遍历键名创建一个类型

#### 映射类型修饰符

只是单纯的复制一个类型那是没啥意义的，所以还需要对一些属性进行修改等等。

- 一个是 readonly，用于设置属性只读
- 一个是 ? ，用于设置属性可选;
- **通过前缀** **-** **或者** **+** **删除或者添加这些修饰符，如果没有写前缀，相当于使用了** **+** **前缀。**

```typescript
type PersonCopy = {
  // 通过in keyof 可以拿到所有的属性
  // 这样就可以稍加修改了
  +readonly [key in keyof Person]?: Person[key];
  // 没写就是+ 写了-就是删除掉这个修饰符
  [key in keyof Person]+?: Person[key];
  -readonly [key in keyof Person]-?: Person[key];
};

// 其实上面就是Partial的源码的原型
type PersonCopyB = Partial<Person>;
```

> 重点就在于 key 是一个`in keyof `
>
> in keyof 你可以简单的理解成 in 代表的就是一个遍历，既然 keyof 得到的是一个联合类型。那么最后的 in keyof 就是遍历一个联合类型

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

以下有几个好记忆的

```typescript
// 这属于从右向左判断 ←
let a = 1;
let str = 'hello';

// 这属于从下到上判断 ↑
// 这里你没有给的话 会自动推断add的返回值是一个number
function add(x: number, y: number) {
  return x + y;
}

// 这属于从左到右 →
type Sum = (x: number, y: number) => number;
const fn = (a, b) => a + b;
const sum: Sum = fn;

let person = {
  name: 'chin',
  age: 99,
};
let name = person.name;
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

## 7. 关于对象

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

索引签名

```typescript
/**
 * 索引签名 index signatures
 *
 * 这个是第二次开始写了 说实话 这个理解起来有点难
 * 因为我在其他资料里也看了 这个也叫任意属性 是接口里的
 *  JS里我们定义了一个对象/数组的话 访问的时候用的下标
 * 虽然是一个数字，但是JS内部默认会转换(隐式调用)成一个string的
 * arr[0] → arr["0"]
 *
 * 重点1 索引只能有两种数据类型 [index:number] or [index:string]
 * 重点2 数字类型索引范围一定要小于字符的 [index:number] 范围小 子类
 */

interface Person {
  // [index: number | string]: string; 不能在index写联合类型
  [key: number]: string;
  [index: string]: any; // 这样是可以的

  //*********** */
  // 数字索引的类型 范围一定要小于 字符串类型的索引
  // [index: number]: number|string;❌ 这个太大了
  // [index:string]:string

  // [index: number]: string; ✅
  // [index:string]:number|string
}

const p: Person = ['aa', 'bb', 'cc'];

console.log(p[1]);
export {};
```

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

## 8. 面向对象

JS 从 ES6 开始用 class 类实现面向对象等等特性了。比如继承。以前都是原型链的。面向对象的三个特征，不是说封装，继承，多态么。TS 里都有体现的。

### 类

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

#### **Parameter Properties**

省略语法糖写法，可以直接在里面写上。

```typescript
// before
class Point {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
// after 一下子少写好几行
class Point {
  constructor(public x: number, public y: number) {}
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

看一下这篇文章 关于顺序问题

[TypeScript class 构造函数和成员的初始化顺序](https://cloud.tencent.com/developer/article/1850169)

### 构造函数 PK 类

当我们写一个类的时候，其实会得到 2 个类型。

- 构造函数的函数类型（函数
- 类的实例类型（类

这是为什么呢？这是因为 JS 出生的缺陷啊。类用函数表示的！

没有 new 的话，这个就代表函数类型。

有的 new 的话 就代表 new 之后的实例类型。

```typescript
// 没有new 只是描述一个普通函数类型
interface WithNameClassA {
  // 描述构造函数类型
  (id: string): any;
}

const w1: WithNameClassA = (id: string) => {};

// 此时描述的就是一个构造函数
class Animal {}
interface WithNameClassB {
  // 描述构造函数类型
  new (id: string): Animal;
}
const w2: WithNameClassB = Animal;
```

那么接下来是什么呢

```typescript
// 这是什么呢？这代表一个对象里有a这个属性 a的属性是一个函数
interface WithNameClassC {
  a: (name: string) => any;
}

const w3: WithNameClassC = {
  a: function (name) {
    console.log(name);
  },
};
w3.a('hello');
```

那么接下来这个怎么描述呢

```typescript
// 这样就可以了
const t1: Type1 = (name) => console.log('name');
t1.age = 100;

export {};
```

js 的 typeof 和 TS 的 typeof 不一样。

### 接口 interface

ts 的接口和其他语言最大的不同就是，这里我只说 java，java 的接口标识一个行为。和 java 一样。也是一种 shape，**类型**。

- 可以被实现
- 可以定义一个对象类型 shape

```typescript
// 属性不能多，不能少

interface Iinfo {
  uuid: string;
  age: number;
}

const i1: Iinfo = {
  uuid: 'chin',
  age: 222,
  //   height: 11; 不可以多 不可以少
};
```

任意属性

```typescript
interface IPerson {
  name: string;
  age: number;
  // 加上这个就可以是任意属性了
  // 但是要注意 这个key必须是字符串
  [key: string]: any;
}

const p1: IPerson = {
  name: 'chin',
  age: 99,
  height: 1999,
  11: 11, // 这种看起来不是字符串 内部会转换成字符串
  // Symbol(a):99  ❌ 都不是字符串了
};
```

可选属性

```typescript
interface Iinfo {
  uuid: string;
  age?: number;
}

const i1: Iinfo = {
  uuid: 'chin',
};
```

只读属性

```typescript
interface Iinfo {
  uuid: string;
  readonly age: number;
}

const i1: Iinfo = {
  uuid: 'chin',
  age: 99,
};

// i1.age = 100 只读不能写入
```

#### 函数类型接口

在之前的函数类型定义的时候用的都是 type

现在其实用 interface 也可以表示一个函数类型

```typescript
interface DiscountA {
  // 这就是一个函数类型
  // 表示接受一个number类型的参数price 返回number
  (price: number): number;
}

type DiscountB = (price: number) => number;

const d1: DiscountA = (price: number): number => {
  return price * 0.8;
};

const d2: DiscountB = (price: number): number => {
  return price * 0.5;
};

console.log(d1(100));
console.log(d2(100));
```

索引签名（可索引接口 可以对数组和对象进行约束）

```typescript
interface IUser {
  //表示index是一个数字 返回是一个string
  [index: number]: string;
}

let user: IUser = {
  0: 'hello',
  1: 'ts',
};
```

#### 构造函数类型

这个也可以和上面的**构造签名**一起看，还可以跟

```typescript
// 构造函数类型
class Animal {
  constructor(public id: string) {}
}

// 一个接口类型（包含一个构造函数
interface WithNameClass {
  new (id: string): Animal;
}

// 方法这里要新建一个动物
function createAnimal(clazz: WithNameClass, id: string) {
  return new clazz(id);
}

const a1 = createAnimal(Animal, 'wangwang');
console.log(a1);
```

#### 接口兼容性

为什么会有这个说法呢。因为 TS 的特点吧。传入的变量和声明的类型不匹配，TS 就会进入兼容性检查。（也有个老师说是新鲜度检测。

具体是什么现象呢。这种也被称为是鸭子类型 duckcheck

```typescript
interface Animal {
  name: string;
  age: number;
}
interface Person {
  name: string;
  age: number;
  gender: number;
}

function getName(a: Animal): string {
  return a.name;
}

let p: Person = {
  name: 'chin',
  age: 99,
  gender: 0,
};
// 你可以看到 即使传入的不是animal
// 因为person里面具有了animal所有特性 所以也可以传入
const p1Name = getName(p);
console.log(p1Name); //chin
```

> 只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会，会直接报错

```typescript
let a: Animal = {
  name: 'duck',
  age: 7,
  //   gender: 1, 这里会报错
};
```

> 另一个老师说这是新鲜度问题，因为刚开始赋值的时候这个变量还是新鲜的，等到了传参的时候已经不是最新鲜的状态了。

### 基本类型兼容

鸭子类型

```typescript
// 鸭子类型
class Person {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }

  eat() {
    console.log(`${this.name} is eating...`);
  }
}

// 按理说这里应该接受一个Person类型
function printP(p: Person) {
  console.log(p.name, p.age);
}
printP(new Person('chin', 99));

// 但事实上鸭子类型的话 只要有Person的属性和方法 我们都认为就是Person类型
printP({
  name: 'chin2',
  age: 88,
  eat() {
    console.log('eating... now');
  },
});

export {};
```

#### 基本数据类型兼容

```typescript
let a: Animal = {
  name: 'duck',
  age: 7,
  //   gender: 1, 这里会报错
};

let num: string | number;
let str: string = 'chin';
num = str; // str是字符串类型也可以赋值给number 因为这里联合类型相当于是一个父类了。
```

还有一个例子

```typescript
// 一个对象里面有toString()这个方法
let num: {
  toString(): string;
};
let str: string = 'chin';

num = str; // 这里不会错 因为string也有toString这个方法
```

## 9 泛型 generic

其实这个就是类型编程的一种，把类型当做变量传递出去。

> 学了一周才意识到一个问题，就是泛型里面确实只能传入类型，而不能是随随便的变量
>
> `<只能放进去类型>` 不能是`<aaa>`这样

这种把数据类型给变量话的就是 type variable

基本写法，写在函数名后面。

> 在接口里面定义函数的时候，写在函数名前面。
>
> `interface Cal{ <T>(x:T,y:T):T}`

```typescript
// 这样写 只是单纯的js 编译器会认为arg就是any 返回值也认为是any
// function print(arg) {
//   console.log(arg);
// }

function printA<Type>(arg: Type): Type {
  return arg;
}

// 完整写法
printA<number>(1);
printA<string>('hello');
printA<{ id: string; age: number }>({ id: 'uu1', age: 19 });

// 省略写法 这种属于类型推导的一种 所以叫 type argument inference
const a = printA('a'); // 但会推导出来的事字面量类型
```

两个类型也可以写的

```typescript
// 当然 你也可以写俩类型
function printTwoParam<T, E>(x: T, y: E) {
  console.log(`t is ${x},and e is ${y}`);
}

printTwoParam<number, string>(100, 'yes');
```

### 泛型类

在类名后面写<>

`class MyClass<写泛型>{}`

```typescript
// 泛型类
class MyArray<T> {
  private list: T[] = [];

  add(value: T) {
    this.list.push(value);
  }
  getMax(): T {
    return this.list[0];
  }
}

let arr = new MyArray<number>();
arr.add(1);
arr.add(2);
arr.add(3);

console.log(arr.getMax());
```

构造函数的写法

```typescript
// new
function factory<T>(type: new () => T) {
  return new type();
}

class Person {}
class Man {}

// 需要传入一个可以被new的类型
const p1 = factory<Person>(Person);
const m1 = factory<Man>(Man);
console.log(p1);
console.log(m1);
```

### 泛型接口

其实就是把类型推断用在了接口上，在接口后面写<>

```typescript
// 下面是一个普通的接口
interface IPerson {
  id: string;
  age: number;
  hobby: string;
}

interface IPersonA<Type> {
  id: Type; // 不指定这里的类型 让传入决定
  age: number;
  hobby: Type;
}

const iPerson: IPersonA<string> = {
  id: 'uu1',
  age: 99,
  hobby: 'string',
};
```

在接口里面定义函数的时候，写在函数名前面。

```typescript
interface Sum {
  // 函数接受一个T泛型
  <T>(a: T, b: T): T;
}

const sum: Sum = function <T>(x: T, y: T): T {
  return x;
};

sum<number>(10, 20);
```

下面这种写法也可以，而且也可以相加

```typescript
// 这两者的区别是什么
interface SumA<T> {
  (a: T, b: T): T;
}
// 这样就可以直接相加了
const sum2: SumA<number> = function (x: number, y: number): number {
  return x + y;
};
```

> 那么上面两个的区别是什么呢？
>
> 区别就是一个在前面定义的话 `interface SumA<T>` sum 在定义的时候就一定要确定类型了。
>
> 放在里面的话，在函数调用的时候才确定类型。因为在调用时候才确定类型。所以要检查的多。

下面有一个，定义+调用双重确定

```typescript
// 1
const sum: Sum = function <T>(x: T, y: T): T {
  return x;
};
sum<number>(10, 20); // 调用才写类型

// 2
interface SumA<T> {
  (a: T, b: T): T;
}
const sum2: SumA<number> = function (x: number, y: number): number {
  return x + y;
};
sum2(5, 6); // 无需写类型 定义的时候就写了

// 3
interface SumB<T> {
  <U>(a: T, b: T): T;
}
const sum3: SumB<number> = function <U>(x: number, y: number): number {
  return x as any;
};
sum3<number>(1, 99);
```

### 默认泛型

既然类型可以被编程，那么泛型其实也可以有默认参数的。

```typescript
// 泛型的默认类型
// 传了就用传递的，没有传递就用默认的
function createArray<T = number>(length: number, value: T): Array<T> {
  let res: T[] = [];
  for (let i = 0; i < length; i++) {
    res[i] = value;
  }
  return res;
}

// 不写就是类型推断 推断成string
let res = createArray(3, 'x');
console.log(res);
```

第 2 个例子

```typescript
interface T2<T = string> {}

type T2A = T2;
```

### 泛型约束（很难 重点）

首先类型约束是 TS 里面最难理解的概念。

为什么会有泛型约束 **Generic Constraints**？有什么我们让传进来的泛型不仅仅只是这种 number string 的类型约束。还想有更具体的，比如参数里有 length 属性的泛型才能传递过来。这个时候就需要类型约束，所谓类型约束就是约束类型的。

```typescript
// 1- 首先这是一个不需要泛型的例子
interface Ilength {
  length: number;
}
// 其实这种例子的情况下是没有必要使用泛型的
// 为什么呢？因为你确定args已经是有这个length属性的
function getLength(args: Ilength) {
  return args.length;
}
// 下面这些都是可以的
getLength('aa');
getLength(['a', 'b', 'c']);
getLength({ length: 19 });
```

下面是一个虽然约束了，但是类型最后会丢失的例子。

```typescript
// 2-丢失了
function getInfo(args: Ilength) {
  return args;
}
// 这种情况下 会发生丢失类型的问题
// 下面就是一个Ilength类型 而不是你传入的"aa"是一个字符串
const re1 = getInfo('aa');
getInfo(['a', 'b', 'c']);
getInfo({ length: 19 });
```

这个时候加入类型编程的话虽然可以解决类型丢失问题，但却没办法解决类型约束问题。

```typescript
// 3-这样定义不就好了 但是这里产生的问题就是类型没有约束
// T变成了传入什么都可以的
function getInfo<T>(args: T):<T> {
  return args;
}
getInfo({})
```

所以类型约束就有了。

```typescript
interface Ilength {
  length: number;
}

function logger<T>(value: T) {
  // 这里我们想要这个泛型支持length
  // 怎么办呢？ 泛型约束就来了
  console.log(value.length);
}
```

#### extends

type 相当于是一个变量，用于记录本次调用的类型。所以在整个函数的执行周期中，一直保留参数的属性。

所以自始至终都会有类型约束。

正确解决

```typescript
interface IlengthA {
  length: number;
}

// 使用extends来约束一个泛型
// 要注意这个extends关键字 她不是继承的意思
// 而是一种约束，表示你的类型一定要包含IlengthA所需要的所有要素
function logger<T extends IlengthA>(value: T) {
  console.log(value.length);
}
```

为什么说 extends 不只是单纯继承的意思呢？

```typescript
// 这里有一个继承
class A {}
class B extends A {}
class C extends B {}
// 这里案例说需要T继承的
function foo<T extends B>(value: T): T {
  return value;
}
// 最后你会发现 其实ABC都可以 要知道A可不是呢
// 也就是说TS里这个泛型 不是严格意义上的继承
// 而是一种约束，一种类似的鸭子类型的约束
foo(A);
foo(B);
foo(C);
```

> 此时你可以写一个这样的，验证并非严格的继承。
>
> 判断兼容不兼容跟 extends 继承没有一点关系，只看形状。

```typescript
// 这里有一个继承
class A {
  a: number;
}
class B extends A {
  b: number;
  age: number;
}
class C extends B {
  c: number;
}
// 这里案例说需要T继承的
function foo<T extends B>(value: T): T {
  return value;
}
// 这里你会发现ABC都不行了
// 为什么呢？
// foo(A); ❌
// 因为b需要有b和age这俩属性 此时传入的B并不符合
// foo(B); ❌
// foo(C); ❌
// ✅ 解决方法 因为B继承了A 所以都要有
foo({
  a: 100,
  age: 200,
  b: 0,
});
```

> 以`function foo<T extends B>`为例，T 一定要是 B 的子类型，最简单的测试就是你看 T 能不能赋值给 B 就行。

extends 不是单纯的意思，主要用在以下几个场面。

- 联合类型 extends → 主要是分发
- 类继承
- 泛型约束 → 表示一种条件

#### keyof

```typescript
// 单纯的JS写法 这样调用完全就没有了属性约束
// 比如key可以随便写了 加入你写个hello也行 但是这就失去了TS的意义
// 那么我们怎么能验证的 这个时候就出现了映射类型
const obj = {
  name: 'string',
  age: 19,
};
function getProper(obj, key) {
  return obj[key];
}

getProper(obj, 'name');
```

那么这样写呢？

```typescript
// O是可以的，单此时的K就没了约束  你会发现你写啥都行 目前K被定义成了string
// 那么怎么约束K呢
function getProper<O, K>(obj: O, key: K) {
  return obj[key];
}

getProper(obj, 'name');
```

最后的解决 使用 `extends keyof`

```typescript
function getProper<O, K extends keyof O>(obj: O, key: K) {
  return obj[key];
}

getProper(obj, 'name');
```

keyof 是什么呢？keyof 本质就是一个所有 key 的联合类型。

```typescript
interface IKey {
  name: string;
  age: number;
}

type a = keyof IKey;
// 本质就是下面的
// type a = "name" | "age"
```

> 到目前为止，有俩地方用到了 keyof
>
> - 索引类型 `[Proper in keyof Type]:Type[Proper]`
> - 在类型的约束的时候对于参数

```typescript
// 用处1:索引签名 in keyof
type Info<T> = {
  [prop in keyof T]: T[prop];
};

// 用处2:参数类型约束 extends keyof
const obj = {
  name: 'hello',
  age: 100,
};
function getObjValue<O, K extends keyof O>(obj: O, key: K) {
  return obj[key];
}
```

### 映射类型 Mapped Types

这也是类型约束的一种 直接看上面的高级类型得了。

### 类型推断 infer

这个貌似是 TS 里让人最难理解的一部分。非常非常难。但我感觉也没有十分特别的难就是了。差不多熟悉了都不难，经常用就不难的东西。

首先先学一个**在条件类型中进行推断 inferring within conditional types**，这个是什么意思呢。

首先我们这里有一个需求，就是想获得一个函数的返回。

```typescript
// 简单的定义一个函数类型
type CalcFnType = (x: number, y: number) => number;
// 其实TS内部有一个工具函数 传入一个. 型获取返回值类型
// ReturnType<传入类型>
// 比如 下面就可以获取到CalcFnType的类型
type CalcFnReturnType = ReturnType<CalcFnType>;

// 目前有一个需求 想获得一个函数的返回值类型
function foo() {
  return 'hello';
}

// 那么我们想获取foo的返回值类型怎么办，首先要先获取foo的类型
// 使用typeof 就可以先获取类型
type FooFnReturnType = ReturnType<typeof foo>;
```

> 上面差不多解决了，这个问题。但是这个工具函数是怎么实现的呢？就引出了主题 infer。
>
> 下面自己实现一个`ReturnType`

```typescript
// 首先自己要接受一个类型 那么这个T类型有啥限制吗
// 首先这个类型必须是一个函数 (...args:any[]) => any
type MyReturnType<T> = any;

// 所以下面的T是一个函数 返回值的类型也应该是一个函数才是
// 但是下面这种全部返回any是没有意义的
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => any
  ? any
  : false;
```

所以这里类型推断就出来了，需要谁，你就推断一下，内部就可以做出正确的类型。infer 这个关键字就是根据实际类型进行推断。R 相当于一个占位符，这个推断你想要的类型。

`infer R ? R : never` 推断是 R，不是的话就是 never

```typescript
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

const bar = (x: string) => {
  return 111;
};
// 测试 👌
type FnType = MyReturnType<typeof bar>;
```

> 一旦理解了这个之后，你想获取参数的类型也可以推断了。想获取什么就推断什么。最后在结果的时候返回就行。
>
> 注意 必须要在类型推断的时候进行推断，也就是在 extends 里的?:里用 infer

```typescript
type MyParamaterType<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

function boo(x: [number, boolean]) {
  return 11;
}
// 测试 👌
type mp = MyParamaterType<typeof boo>;
```

### 分发条件类型 distributive

这个其实也蛮难理解的。当在**泛型中**使用条件类型的时候，如果传入一个联合类型，就会变成分发的**(distributive)**。这种现象英文叫 distributive conditional types

感觉还是直接上例子比较清晰。

```typescript
// 1首先定义一个类型 传入一个类型 返回类型数组
type toArray<T> = T[];
// 2 下面这种就可以
type NumArr = toArray<number>;
type StrArr = toArray<string>;
// 那么思考一下 如果我们使用联合类型 那么最后的答案是什么呢？
type U1 = toArray<number | string>; // (string | number)[]
// 也就是说把这个联合类型当做一个整体 返回了一个既可以放入number，也可以放入string的数组
const u1: U1 = [1, 'hello'];
```

> 如果我想要的是 `string[] | number[]` 呢？
>
> 这个时候分发条件类型就会登场了

```typescript
// 你传入的类型会一次又一次的透过这里
type toArrayA<T> = T extends any ? T[] : never;

type U2 = toArrayA<number | string>;

// const u2: U2 = [1, 'hello']; ❌ 这样就错误了
const u2: U2 = [1, 1, 1, 1]; // ✅
const u3: U2 = ['ok', 'ok', 'ok', 'ok']; // ✅
```

> 主要条件就是
>
> - 泛型里的类型是**联合类型**
> - 关键字 **extends** 进行分发

## 类型别名 type

这个慢慢看吧。还有 type 和 interface 的区别。

```typescript
type Car<T> =
  | {
      list: T[];
    }
  | T[];

const c1: Car<string> = {
  list: ['hello', 'tes'],
};
const c2: Car<number> = [1, 2, 3];
```

这里有一个案例，是 redux 的 compose 源码

[compose](https://github.com/reduxjs/redux/blob/master/src/compose.ts)

```typescript
type Func<T extends any[], R> = (...a: T) => R;

export default function compose(): <R>(a: R) => R;

export default function compose<F extends Function>(f: F): F;

/* two functions */
export default function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>;

/* three functions */
export default function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>;

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>;

/* rest */
export default function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R;

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  );
}
```

分隔看看

```typescript
// 首先看看这一句话
// 这定义了一个函数类型
// 函数的参数 是一个剩余参数 剩余参数的类型相当于就是一个any[]数组
type Func<T extends any[], R> = (...a: T) => R;
```

第一个啥函数都没有的相当于

```typescript
// 无参的
compose()('hello');
// 这里规定了 <R>(a: R) => R;
// 相当于传入的是啥 就返回什么
export default function compose(): <R>(a: R) => R;
```

```typescript
// 1个参数 这个参数必须是一个函数
// F extends Function 表明F必须是一个函数
// 传入一个函数 传出来一个函数
// add 是一个函数
compose(add)('hello');
export default function compose<F extends Function>(f: F): F;
```

接下来有点难理解了。

```typescript
// 2个参数 此时写了3个泛型
// f1参数1 代表一个函数 函数的第一个参数必须是A类型 返回R
// f2 参数2 代表一个函数  这个函数的参数1 是一个T的剩余参数的类型数组 参数2 是一个A
// 所以说
compose(add1, add2)('hello');
export default function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>;

// 传入了ATR 三个泛型类型
// A 相当于f2的返回值 也就是  compose(add1, add2)('hello');里add2的返回值
// T 相当于任意一个类型的数组 也就是 compose(add1, add2)('hello');的hello
// R 相当于最终的返回值

【感觉A很像一个中间桥梁，中间的一个值】
```

## 逆变 协变

协变：covariance

逆变：contravariance

双向协变：bivariant

不变：Invariant

这也是一个很难的概念，以前在别的语言里没有看过。

首先前置知识

- `A ≼ B` 意味着 `A` 是 `B` 的子类型。
- `A → B` 指的是以 `A` 为参数类型，以 `B` 为返回值类型的函数类型。
- `x : A` 意味着 `x` 的类型为 `A`

TS 不同于 Java 这些。都是鸭子类型。

> 要判断两个类型是否是兼容的，只需要看两个类型的结构是否兼容就可以了，不需要关心类型的名称是否相同。比如下面这个。

```typescript
interface Info {
  name: string;
}
class Person {
  name: string;
}

let i1: Info;
i1 = new Person(); // 因为结构相同，所以不会报错
```

可以看这篇文章

[TypeScript 进阶之类型兼容——逆变、协变、双向协变和不变](https://juejin.cn/post/7019565189624250404)

然后参透这个例子

```typescript
class Animal {}
class Dog extends Animal {
  public name: string = 'Dog';
}
class WhiteDog extends Animal {
  public name: string = 'WhiteDog';
}
class BlackDog extends Animal {
  public name: string = 'BlackDog';
}

let animal: Animal;
let dog: Dog;
let whiteDog: WhiteDog;
let blackDog: BlackDog;

type Callback = (dog: Dog) => Dog;
function exec(cb: Callback): void {}

type ChildToChild = (blackDog: BlackDog) => BlackDog;
let childToChild: ChildToChild;
exec(childToChild);

type ChildToParent = (blackDog: BlackDog) => Animal;
let childToParent: ChildToParent;
exec(childToParent);

type ParentToParent = (animal: Animal) => Animal;
let parentToParent: ParentToParent;
exec(parentToParent);

type ParentToChild = (animal: Animal) => BlackDog;
let parentToChild: ParentToChild;
exec(parentToChild); // 只有这个可以

/**
 * 结论
 *
 * 参数：自己和自己的父类 （除非你设置strictFunctionTypes 这样就是双向协变 你传自己，子类，父类都可以）
 * 返回值：自己和自己的子类
 */
```

我这里来简单总结一下

协变：允许子类型转换成父类型 参数只能放大的

> 其实这个很好理解，为什么参数只能放更大的呢。因为如果你参数传入进去是一个小的，此时子类型特有的函数你怎么调用呢。肯定是无法调用的。本质还是类型安全问题。

逆变：允许父类型转换成子类型 只能返回更小的

> 这个也是，你的返回值只能是更小的。如果是更大的，那么返回值可能

双向协变：都可以

不变：不能变，鸭子类型失效

几个容易出问题的关键字

- in
- keyof
- extends
- as

### 内置类型

这个代码写完了。可以慢慢看

```typescript
export {};

/**
 *  下面开始写内置工具
 */

interface Info {
  name: string;
  age?: number;
  gender: boolean;
}

/**
 * 1.Partial 返回一个可选的类型
 */

type OptinalTypes = Partial<Info>;

// 自己手写
// 原理就是使用了映射类型
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
type MyOptinalTypes = MyPartial<Info>;

/**
 *2. Required 所有属性都必须是必选
 */

type InfoRequiredType = Required<Info>;

// 自己手写
// 其实只要把?修饰符减掉就可以
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type MyInfoRequiredType = MyRequired<Info>;

/**
 *3.Readonly 表示一个类型的属性全部都是readonly
 */

type InfoReadOnlyTypes = Readonly<Info>;

// 自己手写 这个原理其实和上面的一模一样
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type MyInfoReadOnlyTypes = MyReadonly<Info>;

/**
 * 4 Record<K,T> 返回一个键值对的对象
 * key都是key的类型，T的话是Types类型
 * 代码可能更清晰
 */

type T1 = 'foo' | 'bar' | 'far';
type T2 = Info;
type r1 = Record<T1, T2>;
// type d = {
//   foo: Info;
//   bar: Info;
//   far: Info;
// }

// 自己手写的
type MyRecord<K extends keyof any, T> = {
  // 这样感觉貌似就可以了  [P in keyof K]: T;
  // 1.代表K必须是一个对象类型 因为keyof返回的就是一个对象联合类型
  // 所以要这样 [P in 联合类型] :T 所以不能是加上了keyof
  // [P in keyof K]: T; → [P in  K]: T;
  // 2.但是这里有了新问题，K万一传入的不是一个对象呢，万一传入的是boolean
  // 如何确定传进来的K一定可以作为一个对象的key呢？答案 → keyof any 固定用法记住就行
  // keyof any 返回一个 string|number|symbol 正好都是可以做key的
  [P in K]: T;
};

type Myr1 = MyRecord<T1, T2>;

/**
 * 5.Pick<T,K>
 * 返回一个包含K属性的类型
 * 看看例子更好了解
 */

type PickedInfo = Pick<Info, 'gender'>;
// 这里只会返回gender 也就是你要的
// type PickedInfo = {
//   gender: boolean;
// }

// 自己手写
// 这里K 拿到的其实是T的所有key的联合类型
// in后面是一个联合类型
type MyPick<T, K extends keyof T> = {
  // 到这里此时的其实是 K extend  "name" | "age" | "gender"
  // K是 "name" | "gender"
  // 这里为什么直接用P in K 其实道理和的MyRecord是一样的
  //
  [P in K]: T[P];
};

type MyPickedInfo = MyPick<Info, 'name' | 'gender'>;

/**
 * 6.Omit<T,K>
 * 返回一个不包含K的属性的类型
 * 这个也是看例子，其实和Picked有异曲同工之妙
 */

type OmitInfo = Omit<Info, 'name'>;

// 自己手写一个
type MyOmit<T, K> = {
  // 主要用的思考是P里面是否包含在K 包含的话就是never 否则就是P
  // 难点1 keyof T 里面放的是全部的属性 as P 这里相当于又断言了
  // 难点2
  [P in keyof T as P extends K ? never : P]: T[P];
};

type MyOmitInfo = MyOmit<Info, 'gender'>;

/**
 * 7.Exclude<T,U>
 * 首先这个是联合类型特定的
 * T是一个联合类型，U是一个key
 * 得到一个去掉U的类型
 */

type UnionType = 'sleep' | 'swim' | 'sing';

type ExcludeType = Exclude<UnionType, 'sing'>;

// 自己写
// 难点1 T extends U 如果T是一个联合类型 那么就是一个分发
type MyExclude<T, U> = T extends U ? never : U;
// 相当于下面就是这样的
// type MyExclude<T, U> = 'sleep' extends 'sing' ? never 'sleep';
// type MyExclude<T, U> = 'swim' extends 'sing' ? never 'swim';
// type MyExclude<T, U> = 'sing' extends 'sing' ? never;

/**
 * 8.Extract 提取
 * 你直接理解成Exclude的相反就行
 * 联合类型中返回自己要的那个
 */

type ExtractType = Extract<UnionType, 'sing'>;

// 自己写
// 难点都在上面的Exclude写了
type MyExtract<T, U> = T extends U ? U : never;
type MyExtractType = MyExtract<UnionType, 'sing'>;

/**
 * 9. NonNullablue<Type>
 * 联合类型 返回一个去除掉了null和undefined的类型
 */

type NullType = 'sleep' | 'swim' | 'sing' | undefined | null;

type NullTypes = NonNullable<NullType>;

// 自己写
// 难点就是是否是null和undefined否则就pass
type MyNonNullable<T> = T extends null | undefined ? never : T;

/**
 * 10.InstanceType<这里放入构造函数类型>
 * 用于构造一个由Type的构造函数的实例类型组成的类型
 */

class Person {}
// 先拿到构造函数类型
type person = typeof Person;
// 这里的p就是正确的Person类型了
type p = InstanceType<person>;

// 这个主要用于在哪里呢？
// 比如我们需要一个生成类的工厂函数
// 此时T约束成为一个构造函数 返回也是
function factory<T extends new (...args: any[]) => any>(clazz: T): T {
  return new clazz();
}

const p1 = factory(Person); // ❓ const p1: typeof Person
// 这里只会被认为是一个构造器类型 而不是一个Person实力类型
// 此时怎么办呢？就用到了 InstanceType

function factory2<T extends new (...args: any[]) => any>(
  clazz: T
): InstanceType<T> {
  return new clazz();
}
const p2 = factory2(Person); // ✅ const p2: Person

// 自己写

type MyInstanceType<T extends new (...args:any) => any> = T extends new (..args:any[]) => infer R ? R :never

type p3 = MyInstanceType<typeof Person> // ✅

```
