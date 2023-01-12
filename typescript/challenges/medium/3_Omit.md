# Omit

> 不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。
>
> `Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

## 1. 示例

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo: TodoPreview = {
  completed: false,
};
```

## 2. 自己实现

第一次有思路，但是写出来的是这个。

```typescript
type MyOmit<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

> 这段代码其实有一些问题的。

这里只是单纯的复制而已。这里我直接看了答案。

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

## 3. 难点

### 难点 1 类型约束

下面是我第一次自己写的。我以为 K 一定要 T 的 key 才行，但是事实上是可以给一些非法的 invalid 的值。

```typescript
K extends keyof T
```

所以正确答案里只是说

```typescript
K extends keyof any
```

### 难点 2 Exclude

这个首先要知道 Exclude 怎么实现的

```typescript
type Result = MyExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'

type MyExclude<T, U> = T extends U ? never : T;
```

这里就是排除掉了

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
Pick<T, Exclude<keyof T, K>>;
// Exclude<keyof T, K> 也就是说这里拿到的是一个组合类型，不包含K的一个联合类型
// 走到这里其实就是
type Omit<T, K extends keyof any> = Pick<T, 联合类型>;
Pick<T, Exclude<keyof T, K>>;
```

### 难点 3 Pick

自己实现

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

// 自己实现的在这里
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

也就是说。解析答案的话。

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// Exclude<keyof T, K> 选出所有排除掉的也就是过滤掉之后的联合类型
// Pick<T, 真正需要联合类型>
```

### 难点 4 不用自带的 Pick 和 Exclude 那怎么写呢？

其实上面的两个方法给了一个很好的思路

- 先过滤掉你不要的联合类型（Exclude
- 然后只遍历你需要的联合类型（Pick

```typescript
type MyOmit<T, K extends keyof any> = {
  [P in keyof T as P extends K ? never : P]: T[P];
  // P in keyof T as P 取出所有T里面的key
  // 判断是否匹配K，否则就是P
  // 剩下的估计不用解释了
};
```

### 难点 5 as

as 的用法这里从官方的 4.1 开始的[官方解释](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)。实际运作中大概两种用法。

- 断言
- 转化（作为占位的感觉
- 重映射（

```typescript
// 断言
const myStr: any = 'tellyourmad';
const myStrLength: number = (someValue as string).length;

// 转化
type TsUnionType = 'a' | 'b' | 1 | 2;

// type TsType1 = { a: any; b: any; 1: any; 2: any; }
type TsType1 = {
  [P in TsUnionType]: any;
};

/**
 * 强制将 key 全都 as 成 number 了
 * type TsType2 = { [x: number]: any; }
 */
type TsType2 = {
  [P in TsUnionType as number]: any;
};
```

下面官方写的解释的理解。其实意思很简单，就是当你用映射类型遍历的时候，经常有可能不想使用官方给你的 key。这个时候你可以重映射。

```typescript
// 比如下面这一段就是一个把所有的属性都变成可选的
// 但如果我根本不想叫你给的key呢
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

这个时候就诞生了 as

```typescript
// 这个时候就诞生了as
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// before
interface Person {
  name: string;
  age: number;
  location: string;
}
// after
type LazyPerson = Getters<Person>;

// type LazyPerson = {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
```

官方还很有意思的给了一个不使用 Omit 也能达到排除类型的用法。

```typescript
// Remove the 'kind' property
type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, 'kind'>]: T[K];
};

interface Circle {
  kind: 'circle';
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;

// 最后
// type KindlessCircle = {
//   radius: number;
// }
```

## 4. 内置 built-in

首先这是一个内置 bulit-in 的，因为 TS 自己实现了。TS 自己实现的如下。

```typescript
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

建议配合 Pick 和 Exclude 一起看。

## 补充

[Github 类型体操-Omit](https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.zh-CN.md)

[as 解释](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)

[一个不成熟的 solution，评论给出了解释](https://ghaiklor.github.io/type-challenges-solutions/en/medium-omit.html)
