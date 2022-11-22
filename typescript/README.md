# TypeScript

这里有一个可以用来写 TypeScript 的 PlayGround

[PlayGround](https://www.typescriptlang.org/play?#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBBCcQQ0MwAUVWDEQC0gADVHBQGNJ3KAALygABEAAkYNAMOB4GRonzFBTBPB3AERcwABS0+mM9ysygc9wASmCKhwzQ8ZC8iHFzmB7BoXzcZmY7AYzEg-Fg0HUiQ58D0Ii8fLpDKZgj5SWxfPADlQAHJhAA5SASPlBFQAeS+ZHegmdWkgR1QjgUrmkeFATjNOmGWH0KAQiGhwkuNok4uiIgMHGxCyYrA4PCCJSAA)

## 关于优点

1. 提前检查类型和报错

```javascript
function demo(data) {
  return data;
}
demo(); //这样直接调用在js肯定是错的，但是在写的只有到浏览器里才会显示报错
```

如果是在 TS 里的话

```typescript
function tsDemo(data: { x: number; y: number }) {
  return data;
}
// tsDemo({1,2}); 在写代码的时候就会提示报错
tsDemo({ x: 1, y: 2 });
```

> 开发过程中就能发现问题

2. 编写代码的时候编辑器可以更好的提示
3. 代码语义清晰易懂 类型声明！

```typescript
interface Point = {x:number, y:number} // 类型别名
function tsDemo(data:Point) {
    return data;
}
// tsDemo({1,2}); 在写代码的时候就会提示报错
tsDemo({x:1,y:2});
```

![image-20211128234729897](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20211128234729897.png)

下面有个**Prettier Single Quote** 也要勾上

设置成单引号！

tab 是 2 个空格的缩进（这点默认就是 2）

Prettier 这个插件如果保存不生效的话，在设置里修改 **Format on Save**

安装环境

```bash
# 安装ts
npm install -g typescript
# 只是安装ts的话，还需要编译执行 安装下面这个插件 直接运行 ts-node xxx.ts
sudo npm install -g ts-node
```

## 静态类型

- 基础类型
- 对象类型

类型注解 PK 类型推断

```typescript
const count: number = 123;

const teacherName: string = 'yes';

const teacher: {
  name: string;
  age: number;
} = {
  name: 'tony',
  age: 17,
};

// array
const numbers: number[] = [1, 33, 4];

// class
class Person {}

// object
const dell: Person = new Person();

// function return a number
const getTotal: () => number = () => {
  return 1243;
};

// type annotation 类型注解 自己主动写
// type inference 类型推断 不写系统自己猜

let n: number;
n = 111;

let abc = 123; // ts自动尝试分析变量类型
let dfg = 78;
let h = abc + dfg; // 不写也能推断出

// 这种情况下无法推测 因为不写的话 只有在执行才知道
function total(a: number, b: number) {
  return a + b;
}

const t = total(1, 2);

function hello() {}

const hello1 = () => {};

const hello2 = function () {}; // 匿名函数

function add1(n1: number, n2: number) {
  return n1 + n2;
}

const d1 = add1(1, 2);

// 按理说↑这样的写法也是可以的 为什么不行呢？
// 函数的返回值有时候在传值的时候可以检查一下传入的对不对

function add2(n1: number, n2: number): number {
  // return n1 + n2 + ''; 这样的话 类型推断会出错了
}

const d2 = add2(1, 2); //  比如这里写错了

function sayHello(): void {
  console.log('hello');
  return 1; // 这丫就错了
}
```

永远不可能执行

```typescript
function sayHello(): void {
  console.log('say');
}

function errorE(): never {
  while (true) {}
}
```

解构赋值的类型注解写法

只要是解构，就必须要写在`{}`里。

```typescript
function add3({ a1, b1 }: { a1: number; b1: number }): number {
  return a1 + b1;
}

const total = add3({ a1: 1, b1: 2 });
```

### 基本类型

```
boolean number string void undefined symbol null
```

```typescript
let count = 1234; // 写1行可以推断 number
let count; // 写2行不可以推断，是any
count = 123;
```

### 对象类型

```
{} Class function []
```

2 种写法，因为第一种写法的话，基本上 ts 都可以通过你写的内容给你类型推断，所以基本也可以不写

```typescript
const func = (str: string): number => {
  return parseInt(str, 10);
};

// 基本上ts都可以通过你写的内容给你类型推断，所以基本也可以不写
const func = (str: string) => {
  return parseInt(str, 10);
};

// 这个含义其实就是：一律是类型 = 后面是函数体
const func1: (str: string) => number = (str) => {
  return parseInt(str, 10);
};

==================================
一般参数都是要定义类型的
返回值都可以推断出来，可以不用写。
// 其他
interface Person {
  name: 'string';
}
const rawData = '{"name":"dell"}';
const newData: Person = JSON.parse(rawData); // 这种内置函数可能不会推断

// 也可以有多种类型的那种选择
let temp: number | string = 123;
temp = 'yes';
```

数组 + （个数固定） + （类型固定） = 元祖

```typescript
const arr: (number | string)[] = [1, '2', 3]; // 既可以是number也可以是string
const stringArr: string[] = ['1', 'dwd', 'dew'];
const undefinedArr: undefined[] = [undefined];

// 没使用类型别名之前type alias
const objectArr:{name:string, age:number}[] = [{
  name: 'dell'.
  aget: 10
}]

// 使用类型别名之后
type User = { name: string; age: number };
class Teacher {
  name: string;
  age: number;
}

const objectArr: Teacher[] = [
  new Teacher(), // 因为也满足有name和age的类型，所以这样直接写也可以的
  {
    name: 'hanako',
    age: 18,
  },
];

// Tuple
// 数组 + （个数固定） +  （类型固定） = 元祖
const teacherInfo: [string, string, number] = ['Dell', 'male', 19]; // OK
const teacherInfo: [string, string, number] = ['Dell', 'male', 19, 20]; // OK

// 元祖应用场景：good at csv
const teacherList:[string, string, number][] = [
    ['Dell', 'male', 19],
    ['Dell', 'male', 19],
    ['Dell', 'male', 19]
]
```

type 和 interface 有什么区别？

- 如果能用接口，就不用类型别名
- 接口可以表达函数，对象，type 比较单一。

interface 可选属性怎么写？

readonly 是什么？

传递对象参数的时候可以直接写吗？需要注意什么

```typescript
interface Person {
  readonly id: string; // 只读
  name: string;
  age?: number; // 可有可无
  [propName: string]: any; // 可以中途随意添加属性名是string，然后任何类型
  say(): string; // 必须有
}
```

函数定义

```javascript
function hello() {}
const hello = function () {};
const hello = () => {};
```

函数 never 类型

- 永远不可能执行 → while（true）无限循环
- 永远不可能执行 throw new error()

列出所有全局包

```
npm list -g --depth=0
```

## 接口

普通属性 → 多 1 个少 1 个都不行

可选属性 → age？ 可选可不选，只能有 or 没有，不能突然多 1 个 age 之外的

任意属性 → 任意属性 反正啥类型都行（但是定义的类型必须包含的可选类型的类型

```typescript
// 使用 [propName: string] 定义了任意属性取 string 类型的值。
// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
```

## 爬虫

```javascript
npm init -y //
tsc --init //
```

下载 ts-node，并且本地安装，并且自定义个脚本

```
npm install ts-node -D
"dev": "ts-node ./src/crowller.ts",
```

可以开始写了

```javascript
npm install superagent --save // ajax api
npm i --save-dev @types/superagent // 翻译文件 ts → d.ts → js
```
