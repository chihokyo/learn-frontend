// ============类型别名===========
// 类型别名使用前 💰
function person(id: number | string) {
  console.log(`ID is ${id}`);
}
person('uuid');

// 使用之后 🐒 别名
type MyInfo = number | string;
function person2(id: MyInfo) {
  console.log(`ID is ${id}`);
}
person2(1000);

// 为了解决又臭又长 属于别名 只是起了一个别名
type PointType = { x: number; y: number };
function printPoing(point: PointType): void {
  console.log(`x is ${point.x} and y is ${point.y}`);
}

// ============接口声明===========
// 先说下区别
// 仔细看 下面是一个对象声明
// type ID = string | number; 这样就是一个普通的联合类型
// type很像const赋值操作 只是类比 不必认真
type PointType2 = {
  x: number;
  y: number;
  z?: number;
};
// 接口很像class function 这种关键字声明方式
// 所以不会用等于号 而是直接声明
interface PointType3 {
  x: number;
  y: number;
  z?: number;
}

// 从使用上来说PointType2和PointType3是一样的

// ============区别===========
// 相同点： 在对象类型上 两者是可以互换的
// 不同点：type可以声明基本类型的 interface只能是复杂类型
type co = string | number;
// 不同点：interface支持继承 支持被起来类实现 感觉跟java好像

// ============交叉类型 &===========

interface IA {
  name: string;
  id: string;
}

interface IB {
  hobby: string[];
}
// 既要有IA的品质 也要有IB （感觉和Java的多重实现很像
const info: IA & IB = {
  name: 'jojo',
  id: 'uui',
  hobby: ['sleep'],
};

// ==========类型断言 Type Assertion==========
// 首先要搞清楚为什么要有类型断言，这个话适用于当类型不确定你手动需要确定
// 以达到提示会正确的效果
//  document.querySelector("div") // 这种有类型 HTMLImageElement  直接写标签选择
//  document.querySelector(".img") // 这种就没有 只是一个泛泛的 Element

const imgEl = document.querySelector('img');
const imgEL = document.querySelector('.img') as HTMLImageElement; // 这种就直接给断言了

// ==========非空类型断言 Type Assertion==========
// 对于一些非空属性 在调用的时候 可能会出现undefined
// 以前会用可选链 ？但是这种情况并不适用

// 如果这个参数是没有传入的，很有可能下面打印的时候会出现错误
function printMsg(msg?: string) {
  console.log(msg?.toUpperCase); // undefined
}

printMsg();

// 或者下面这种
interface IMe {
  name: string;
  friend?: {
    follow: boolean;
  };
}

const info2: IMe = {
  name: 'jojo',
  friend: {
    follow: true,
  },
};

console.log(info2.friend?.follow); // 从访问的角度可以使用可选链
// 但是从赋值的角度上来说是不行的
// info2.friend?.follow = false; ❌

// 解决方案1 类型缩小
if (info2.friend) {
  info2.friend.follow = false;
}
// 解决方案2 非空类型断言（其实就是告诉编译器不要检测了 只有确保friend万无一失 绝对有值才可以
// 结论就是不要帮我检测了 仅此而已
info2.friend!.follow = true;

// ==========字面量类型 literal types==========
// 感觉很像java里的枚举
const jo: 'jo' = 'jo'; // 单个字面量是这样定义的 但是毫无意义
// 那么接下来你的季节只能从下面这些选了
type senson = 'spring' | 'summer' | 'autumn' | 'winter';

// const s: senson = 'love'; // ❌
const s: senson = 'winter'; // 这样就可以

// 比如请求只可以是get和post
type MethodType = 'GET' | 'POST';

// 这里就可以显示必须是GET和POST
function request(url: string, method: MethodType) {
  console.log(method);
}
// 但是如果是在对象里怎么办

const urlInfo = {
  url: 'http',
  method: 'GET', // 这里对method默认是一个string 不是GET 如何解决
};
// request(urlInfo.url, urlInfo.method); // ❌ ?如何解决
// 解决方案1
const urlInfo2 = {
  url: 'http',
  method: 'GET' as 'GET', // 这里对method默认是一个string 不是GET 如何解决
};
request(urlInfo2.url, urlInfo2.method);

// 解决方案2
const urlInfo3 = {
  url: 'http',
  method: 'GET',
} as const;
request(urlInfo3.url, urlInfo3.method);

// ==========类型缩小 type narrowing==========
// 可以用各种方式进行类型缩小 typeof === !==  instanceof in判断属性
function printSth(id: number | string) {
  // 如果是字符串
  if (typeof id === 'string') {
    console.log(id.length);
    // 如果是数字
  } else if (typeof id === 'number') {
    console.log(id);
  }
}

type ILove = {
  love: () => void;
};
type IHate = {
  hate: () => void;
};

// 判断是否有某个属性
function girl(person: ILove | IHate) {
  if ('love' in person) {
    person.love();
  } else if ('hate' in person) {
    person.hate();
  }
}

// ==========函数类型==========
// 这是一个什么类型呢
const foo = (id: number): string => {
  return id.toString();
};
// 完整的又臭又长
const foo2: (id: number) => string = (id: number): string => {
  return id.toString();
};

// 修改版本
type foo2Type = (id: number) => string; // 函数类型表达式
const foo3: foo2Type = (id: number): string => {
  return id.toString();
};

class Person {
  name!: string; // !表示无需验证初始化
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  run() {
    console.log(`${this.name} is running...`);
  }
  eat() {
    console.log(`${this.name} is eat...`);
  }
}

const p1 = new Person('chin', 88);

p1.run();
p1.eat();

// public 默认就是这个
// private 仅在同一个类可见
// protected 尽在自身和子类可见

class PersonA {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  printField() {
    console.log(`name is ${this.name} and age is ${this.age}`);
  }
}

class StudentA extends PersonA {
  constructor(name: string, age: number) {
    super(name, age);
  }
}

const s1 = new PersonA('chin', 20);
console.log(s1);

class PersonAA {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const pa = new PersonAA('chin');
console.log(pa);

class Fruits {
  constructor(public fruitname: string) {}

  say(): void {
    console.log(`${this.fruitname}`);
  }
}
