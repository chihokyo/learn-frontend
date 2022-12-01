/**
 * 数据类型
 * 在TS里新增的数据类型 JS没有
 * 1 tuple
 * 2 enum
 * 3 any
 * 4 void
 * 5 never → 比较难理解
 * 6 unknown → 比较难理解
 */

/**
 * 元祖 tuple
 */

// 各个位置上的元素类型都要对应 元素个数也要一致
const t1: [string, number, boolean] = ['hello', 99, true]; // 必须要按照这个顺序来

t1[0] = 'world'; // 你也可以单独用数组的方式赋值
console.log(t1); // [ 'world', 99, true ]

// 好处在哪里呢？
// 元祖数据结构可以存放不同的数据类型 取出来的也是有明确的类型
// 比如数组要好一点 数组的数据类型要统一 介于【数组和对象之间】
// 主要使用场景在哪里呢？其实对象也可以替代 主要用于函数
const t2: [string, number, number] = ['chin', 22, 178];

// 向数组里放两种数据类型 最好办法就是元素
function myUseState<T>(init: T): [T, (newValue: T) => void] {
  let value = init;
  function setValue(newValue: T) {
    value = newValue;
  }
  // 这就是一个元祖 特别是函数返回值 使用场景最多
  return [value, setValue];
}
const [first, setfirst] = myUseState<number>(20);

/**
 * 枚举 enum
 */
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

/**
 * any
 * 当你不知道一个类型是什么的时候 就用any
 * ⚠️ 但是请注意，不要滥用 any 如果任何值都指定为 any 类型那么 TypeScript 将失去它的意义。
 * 但对于一些特殊数值的类型 嵌套层级很多 不得已可以使用any的
 * 特点1 可以随意赋值
 * 特点2 可以随意调用不存在属性方法 相当于和JS一模一样了
 */

const arr: any[] = [1, 56, 'yes', true, { id: 'uu1', age: 99 }];
console.log(arr); // [ 1, 56, 'yes', true, { id: 'uu1', age: 99 } ]

let value: any;
value = 123;
value = 'foo'; // 可以被任意赋值
console.log(value); // foo

/**
 * void
 * 就是什么类型都不是 定义函数没有返回值时会用到 当一个函数没有返回值的时候使用
 * 1 void 可以被赋值成为undefined跟null 其他不可以
 * 2 其实最主要的用法就是在明确一个函数的类型的时候
 * () => void  用来表明函数返回值
 */

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

/**
 * never
 * 类型指那些永不存在的值的类型 开发很少实际会定义 都是自动推导
 * 总会抛出异常或根本不会有返回值的函数式的返回值类型
 * 1 开发框架会用到
 * 2 封装类型工具
 * 3 死循环会用到
 * 4 异常会用到
 */

// 因为这个函数总会抛出异常 所以返回值是never
// 用来表明她的返回值是永远不存在的
const errFunc = (msg: string): never => {
  throw new Error(msg);
};
errFunc('foo');

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
  return []; // 这里永远用不到 也是never
}
const a = parse();

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
// 就会报错 保持健壮性
// function handleMsg(msg: string | number | boolean);
// handleMsg(true)

/**
 * unknown 相对安全 用于描述不确定的类型
 * 这个类型跟any很像 但是any有个情况就是可以赋值为任何类型 unknown进行任何操作都不合法
 * any可以使用方法 但是un啥都不行
 * 但是这个unknown是可以来作为类型缩小控制流的
 * 其实重点就俩
 * 1 any 是什么都可以 叫任意
 * 2 unknown 是不确定 所以什么都不行 需要类型缩小
 */

let fooA: any = 'aaa';
fooA = 123; // 就可以赋值了

let fooB: unknown = '111';
fooB = 22; // 可以赋值
// fooB.length  任何东西都是非法的 因为不确定是啥类型 所以有安全隐患
// 那我们为什么要使用？类型缩小后可使用 un要求必须校验后才能使用
{
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
}

export {};
