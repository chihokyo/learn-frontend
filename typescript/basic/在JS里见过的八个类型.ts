/**
 * 数据类型
 *
 * 在JS里见过的类型
 *
 * 1 boolean
 * 2 number
 * 3 string
 * 4 Array<> | type[]
 * 5 object
 * 6 symbol
 * 7 null
 * 8 undefined
 */

/**
 * 布尔 boolean
 * 不是Boolean Boolean是一个ES规范下的类
 */
const b1: boolean = true;
const b2: boolean = false;
const b3: boolean = !!0; // 也可以是一个计算之后的布尔值表达式

/**
 * 数字 number
 * (没有int或者float)类型
 */
const n1 = 10; // 这样会直接推算成一个字面量字符串 而不是number
const n2: number = 88;
const n3: number = 0b011; // 3 二进制 binary
const n4: number = 0o71; // 57 八进制 octal
const n5: number = 0xfb; // 251 十六进制 hexadecimal

/**
 * 字符串 string
 * 支持单引号 支持双引号 支持模板字符串拼接
 */
const str: string = 'hello'; // 字符串
const str2 = 'hello'; // 这样写也是字符串字面量类型 就不是string了 要注意

const name = 'chin';
const age = 19;
console.log(`my name is ${name} and age is ${age}`);

/**
 * 数组 array
 */
const arr: Array<string> = ['ok', 'yes']; // 数组写法1 这个可以在tslint array-type:false 进行关闭
const arr2: number[] = [1, 2, 3]; // 数组2 一般写成这样
const arrA = ['foo', 'far']; // 会自动进行类型推断成 string[]
const arrAny = ['yes', 123, true]; // 一般不能放不同类型的 除非你写成any[]

// 对象数组
const arr3: { name: string; age: number }[] = [
  { name: 'chin', age: 99 },
  { name: 'tom', age: -8 },
];

// 也可以直接用type
type ArrType = { name: string; age: number }[];
const arr4: ArrType = [
  { name: 'chin', age: 99 },
  { name: 'tom', age: -8 },
];

type ArrType2 = { name: string; age: number };
const arr5: ArrType2[] = [
  { name: 'chin', age: 99 },
  { name: 'tom', age: -8 },
];

/**
 * undefined
 * null
 * 这俩比较特殊 既是数据也是类型
 *
 * undefined 在 tsconfig strictNullChecks 为 true 的情况下是 void 和 any 类型子型，为 false 的情况下则除 never 的子类型
 */
let un: undefined = undefined;
let nu: null = null;

let unA = undefined;
let v: void;
let numA: number = 123;
// numA = unA;  ❌ 不可以的
v = unA; // 可以的 因为是

/**
 * 对象 object【引用类型】
 */
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

type InfoTYpe = { name: string; age: number };
function getInfo(info: InfoTYpe) {
  // 这样你就可以保证info里肯定有name 以前的话可以随便穿
  return info.name.toUpperCase();
}
console.log(getInfo({ name: 'chin', age: 88 })); // CHIN

type InfoTYpeA = {
  name: string;
  age: number;
  // 可选
  height?: number;
  // 只读不可修改
  readonly gender: string;
};

/**
 * Symbol
 * 这个不用赘述 一个独一无二的值
 */

const s1: symbol = Symbol('foo');
const s2: symbol = Symbol('foo');

console.log(s1 === s2); // false

export {};
