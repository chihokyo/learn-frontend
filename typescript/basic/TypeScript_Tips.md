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
  - [bigint](https://developer.mozilla.org/en-US/docs/Glossary/BigInt)
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
  - undefined
  - null
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

## 4. 类型推导 type inference

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

## 5. 关于函数

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

### 5-1 匿名函数

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
> 系统的函数是无需写的。

## 6. 关于对象

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
  // 这样你就可以保证info里肯定有name 以前的话可以随便穿
  return info.name.toUpperCase();
}
console.log(getInfo({ name: 'chin', age: 88 })); // CHIN
```

对象也有可选类型和只读类型
