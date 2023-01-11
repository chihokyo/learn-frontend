interface IObject {
  first: string;
  second: number;
}

type TObject = {
  first: string;
  second: number;
};

// typeof 注意点
// 1. JS里的行为和TS不一样
// 2. JS返回是字符串
// 3. TS的typeof后面连接的是数据，而不是类型

// keyof 注意点
// 本质上后面可以放上类型（对象）本质上是只能拿到type的
// 放类型的话 可以拿到对象所有的key联合类型
// 放数据的话(必须是type过的) 可以拿到prototype上所有的key组成的联合类型
// 放类的话 可以拿到所有public的，因为private是放在实例对象上 不是原型上

const obj = {
  first: 'one',
  second: 'two',
};

type tObj = typeof obj;
type tKey = keyof typeof obj; // "first" | "second"

// in用来遍历的枚举类型的 本质就是遍历而已

type Ty = 'first' | 'second';
type Ty1 = {
  [p in Ty]: any;
  // 相当于就是下面的
  // ["first"]: any;
  // ["second"]: any;
};

type Ty2 = {
  [P in Ty]: P;
};

type TsObj = {
  first: string;
  second: number;
};

type newTsObj = {
  [P in keyof TsObj]: TsObj[P];
};

const jsObj = {
  name: 'chin',
  age: 88,
};
// type TypeJsObj = typeof jsObj;

type TypeJsObj = {
  // [P in keyof typeof jsObj]: P;
  // [name]:"name"
  // [age]:"age"
  [P in keyof typeof jsObj]: typeof jsObj[P];
  // name: string;
  // age: number;
};

enum ENUM_SEASONS {
  SPRING = 'hello',
  SUMMER = 222,
  AUTUMN = 77,
  WINTER = 232,
}

type typeSeasons = typeof ENUM_SEASONS;

type keytypeSeason = keyof typeof ENUM_SEASONS;

type Ts = {
  [P in keytypeSeason]: any;
};

type a = {};

// object
type PartialPointX = { x: number };
type PartialPointY = { y: boolean };

type PartialPoint1 = PartialPointX | PartialPointY;

const a: PartialPoint1 = {
  // 可以少写
  x: 1,
  y: true,
};

// 交集
type PartialPoint2 = PartialPointX & PartialPointY;
const b: PartialPoint2 = {
  // 必须全部是实现
  x: 1,
  y: true,
};

// extends的用法
//1 继承，interface可以用extends继承，type不行，type用&
//2 泛型约束 表示是否匹配 T extend A 也就是说T能不能赋值给A（也有人说这是子类
//3 条件判断(氛围两种情况，前面是否是联合类型)

enum GENDER {
  MALE,
  FEMALE,
}

interface IHuman<G extends GENDER> {
  gender: G;
  age: number;
}

const ihuman: IHuman<GENDER.MALE> = {
  gender: GENDER.MALE,
  age: 99,
};

// 如果T是U的子类 那么就never 这是找差集
type Subtraction<T, U> = T extends U ? never : T; // 找差集
type Intersection<T, U> = T extends U ? T : never; // 找差集

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface Eg1 {
  name: string;
}

type T1 = keyof Eg1;

class Eg2 {
  private name: string;
  public readonly age: number;
  protected home: string;
}

type T2 = keyof Eg2;

interface Eg1 {
  name: string;
  age: number;
}

type MyOmit<T, K extends keyof any> = {
  [P in keyof T as P extends K ? never : P]: T[P];
  // P in keyof T as P 取出所有T里面的key
  // 判断是否匹配K，否则就是P
  // 剩下的估计不用解释了
};
