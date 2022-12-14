# Tuple to Object

元组转对象。

> 传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

## 1. 示例

```typescript
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

## 2. 自己实现

不会自己实现，直接看题解好了。

as const 的意思就是说不能改变。相当于都是 const 了。

```typescript
type TupleToObject<T extends readonly (string | number)[]> = {
  [P in T[number]]: P;
};
```

## 3. 难点

### 难点 1 元组类型怎么表示

好了，看了题解有了思路。首先这个 T 是什么。就是你传入的元组，也就是数组。

```typescript
T extends readonly (string | number)[]
```

- 只读的，key 不能变。
- 而且 key 只能是 string or number
- 是个数组

### 难点 2 索引访问类型

接下来是我看不懂`T[number]`是怎么来的，后来我去看了官方文档的索引类型。才知道有一个用法。

```typescript
type TupleToObject<T extends readonly (string | number)[]> = {
  [P in T[number]]: P;
};
//  T[number] 这个是怎么来的
```

> [Indexed Access Types 索引访问类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) 使用任意类型进行索引的另一个示例是**使用数字来获取数组元素的类型**。我们可以将其与 typeof 结合使用，以方便地捕获数组文字的元素类型

```typescript
const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
];

type Person = typeof MyArray[number];
// 这样就获取到了 { name: 'Alice', age: 15 }的对象类型。
type Person = {
  name: string;
  age: number;
};
```

所以从这里可以知道

```typescript
type TupleToObject<T extends readonly (string | number)[]> = {
  [P in T[number]]: P;
};

// T[number] 相当于获取的就是
const Tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

// 获取到了一个所有元素组成的联合类型
type demo = typeof Tuple[number]; // "tesla" | "model 3" | "model X" | "model Y"
```

那么接下来也就是顺理成章的用了**映射类型**。

```typescript
type TupleToObject<T extends readonly (string | number)[]> = {
  [P in 'tesla' | 'model 3' | 'model X' | 'model Y']: P;
  //   相当于下面的感觉 也就是最后的答案了
};
```

> 还有一点，就是

```typescript
type TupleToObject<T extends readonly (string | number)[]>
type TupleToObject<T extends readonly string | number[]> // 别忘记加上括号
```

## 4. 内置 built-in

首先这是一个内置 bulit-in 的，因为 TS 自己实现了。TS 自己实现的如下。

```typescript
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## 补充

这个不是很难，都不想说了。

[Github 类型体操-Tuple to Object](https://github.com/type-challenges/type-challenges/blob/d535735ae6cebd15019b14661577e67683a00461/questions/00011-easy-tuple-to-object/README.zh-CN.md)

[Typescript 关键字](https://juejin.cn/post/7034035155434110990)

[Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
