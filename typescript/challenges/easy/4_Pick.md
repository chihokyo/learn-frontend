# Pick

> **从类型 `T` 中选择出属性 `K`，构造成一个新的类型**。

## 1. 示例

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

## 2. 自己实现

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## 3. 难点

### 难点 1 类型约束

**首先 T 代表的是什么呢？**从示例可以看出来，这个代表你的传入的数据类型，这个 T 目前其实没有任何约束的。如果你仔细看的话，任何类型都是可以的。

```typescript
MyPick<true, 'name' | 'age'>; // 目前这样也是可以的
```

但是这里一般都传入的是一个对象！**为什么是对象**，因为这个函数的用法就是 Pick 选取到你所需的属性，你不传入对象，难道一个 boolean 可以`boolean[属性]`这样调用吗？你传入其他数据有意义吗？其他数据也没有属性啊。

### 难点 2 keyof

**其次 K 是什么？** K 就是你想被挑选进去的属性。是一个联合类型，或者不是联合类型也是可以的。但这个属性是要有类型约束的，不是任意一个属性都可以的。既然扯到了类型约束，那么就搞出来了`keyof`

`keyof`是干嘛的呢？他返回一个类型的联合类型。

所以`K extends keyof T` 这里本质就是

- 约束了 K 必须是 T 的属性
- 且必须写在泛型参数的位置 → 写下面怎么约束传来的实参呢？`Pick<P,boolen>`这种情况就 🙅🏻‍♀️

```typescript
// keyof 是什么呢？keyof 本质就是一个所有 key 的联合类型。
interface IAnimal {
  name: string;
  age: number;
  cow: number;
}
type props = keyof IAnimal;

//相等的 type props = "name" | "age" | "cow"
```

### 难点 3 in

**这个 in 是干什么的？** 我刚开始也很迷惑这个 in 是干什么的，后来看了一个，这个相当于 js 的 `for...in` 用法。

关键字 `in` 是用来遍历**枚举类型**的。就是**遍历一个对象的属性**的。

```typescript
const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}
```

那么

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 这里的你可以想象成P是形参，就是上面的property
```

in 后面接的是一个联合类型，P 其实就是所有的属性了。其实这个就是**映射类型 Mapped Types**。

于是下面的结果就是

```typescript
interface IAnimal {
  name: string;
  age: number;
  cow: number;
}

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
  // 于是上面就相当于
  // K是 name | age | cow
  // P就是下面的1,2,3一个个遍历
  /**
   * 1 ["name" in 'age' | 'cow'] 不
   * 直接啥都没有
   * 2 ["age" in 'age' | 'cow'] 存在
   * ["age"]:Animal["age"] → ["age"]:number
   * 3 ["cow" in 'age' | 'cow'] 存在
   * ["cow"]:Animal["cow"] → ["cow"]:number
   *
   */
};

type props = MyPick<IAnimal, 'age' | 'cow'>;
```

## 4. 内置 built-in

首先这是一个内置 bulit-in 的，因为 TS 自己实现了。TS 自己实现的如下。

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## 补充

[Github 类型体操-Pick](https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.zh-CN.md)

[Typescript 关键字](https://juejin.cn/post/7034035155434110990)
