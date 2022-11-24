# 类型注解

## 1. 一些基本

https://www.codeleading.com/article/96395885437/

```typescript
// 字符串 string
const car: string = 'tesla';
// 数字 number
const mileage: number = 300;
// 布尔 boolean
const liks: boolean = true;
// 对象 Object
// 注意对象为什么不写成 const owner:object={}
// 这样写根本不可以有类型解析 下面也不会显示出来
const owner: {
  name: string;
  age: number;
} = {
  name: 'tom',
  age: 99,
};

// 数组 array
const model: Array<string> = [];
const model2: string[] = []; // NG [string]
// 数组 array 混合一下
const model3: (string | number)[] = [11, 'yes'];
// 对象数组 直接一下
const person: { name: string; age: number }[] = [{ name: 'big', age: 200 }];
// 对象数组 不直接一下 用的接口
interface Person2 {
  name: string;
  age: number;
}
const people: Person2[] = [{ name: 'red', age: 88 }];
```

## 2. 函数

普通的 js 函数定义

```javascript
// 定义
function fn(params) {
  console.log(params);
}
fn('hello');

// 函数表达式
const fn2 = function (param2) {
  console.log(param2);
};
fn2(123);

// 箭头函数
const fn3 = (param3) => {
  console.log(param3);
};
fn3({ name: 'hello', age: 19 });

// new Function构造函数 '函数名' + '函数体'
new Function('name', 'alert("hello,"+name)');
```

ts 类型注解

```typescript
// 普通定义
function tsFn(one: number, two: number): void {
  console.log(one + two);
};
tsFn(1, 2);

// 函数表达式
const sayHello = (name: string, age: number = 20): string => {
  console.log(name + age.toString());
  return name + age.toString();
};

// 箭头函数
const fn3 = (param3) => {
    console.log(param3);
}
fn3({name:"hello", age:19});

// new Function构造函数 '函数名' + '函数体'
new Function('name','alert("hello,"+name)');

function add((one,two): {one:number,two:number}){
    return one + two
}
```

### 参数上的问题

```typescript
// 可选参数，加？变可选参，放在参数最后
function sayHello(name:string, age?:number):string | number{
    retrun name + age
}
sayHello('tom',18)
// 默认参数
function sayHello(name:string, age:number = 20):string | number{
    retrun name + age
}
sayHello('tom')
// 剩余参数1
function count(...result:number[]):number{
    let sum = 0;
    for(let i = 0; i < result.length; i++){
        sum += result[i]
    }
    return sum
}
count(1,2,3,4)
// 剩余参数2
function count(a:number,...result:number[]): number{
    let sum = a;
    for(let i = 0; i < result.length; i++){
        sum += result[i]
    }
    return sum
}
count(1,2,3,4)
```

下面作为参数有一些问题

```typescript
// 对象作为参数需要分别定义{变量名1， 变量名2}：{变量名1：变量类型1，变量名2：变量类型2}
function add({ x, y }: { x: number; y: number }) {
  return x + y;
}
console.log(add({ x: 1, y: 2 }));
```

### 元祖 Tupple

虽然在 Python 里用过，不会改变的数组就是元祖的感觉，但是吧没怎么用过

```typescript
// 联合类型
const xjj: (string | number)[] = ['a', 22, 'b']; // 规定整个数组当中可以有string或number

// 元组注解 注意这里的注解只有一个中括号
const xjj1: [string, number, number] = ['a', 22, 33]; // 规定了数组每个元素对应位置的类型

// Note: 在开发中元祖的使用在相对少

// CSV的方式定义数据格式； （二维数组时需要多加一个中括号）
const xjj2: [string, number, number][] = [
  ['a', 22, 33],
  ['a', 22, 33],
];
```

## 3. 接口

```typescript
interface Girl {
  // 接口 （理解：对象属性的类型描述）
  readonly name: string; // 只读属性 （定义之后不能再修改）
  age: number;
  waistline?: number; // 加个问号表示是可选值
  [propname: string]: any; // 表示可以有不限制属性名的属性，但属性名需要是字符串，值可以是任意类型
  say(): string; // 函数类型，返回值是string (如无返回值时是 void)。  say()也可以加入参数类型检查，如say(p:number)
}
// 和类型别名类似，不同的是 接口必须是一个对象，而别名可以直接是一个类型，如 type Girl = string

// 接口的继承
interface Teacher extends Girl {
  teach(): string;
}

const girl = {
  name: '大脚',
  age: 18,
  sex: '女',
  say() {
    return '欢迎光临';
  },
  teach() {
    return '教';
  },
};

const screenResume = ({ name, age, bust, sex }: Girl) => {
  console.log(name, age, bust, sex);
};
const getResume = ({ name, age, bust, teach }: Teacher) => {
  teach();
  console.log(name, age, bust);
};
screenResume(girl);
getResume(girl);

// 接口在class类中的使用
class xiaojjj implements Girl {
  name = 'xiaojj';
  age = 18;
  bust = 98;
  sex = '女';
  say() {
    return '欢迎光临';
  }
}
```

感觉类型注解，是最难的部分。
