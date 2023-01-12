# Deep Readonly

实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

## 1. 示例

```typescript
type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

## 2. 自己实现

想到了应该是用递归实现的。但是具体写不出。直接看答案了

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};
```

首先在单纯的 readonly 是怎么实现的呢？

```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

> 那么问题的重点就放在了，T 这个到底是不是一个对象。如果是对象那么就继续递归遍历。

## 3.难点

### 难点 1 递归

首先你就要想到递归。当是一个对象的时候要继续递归。

```typescript
DeepReadonly<T[K]>;
```

### 难点 2 判断对象

这个也是在评论区找到的

> 检查是否 T 为对象或者 void，可以 用 keyof T extends never 判断

如果 T 是一个对象，那么她的 key of 对象 肯定就不会匹配 never。下面就是个例子

```typescript
const a = {};
type b = keyof typeof a; // never

const aa = { name: 'chin', age: 88 };
type bb = keyof typeof aa; // "name" | "age"
```

那么最后的答案就是

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};
// keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>
// keyof 类型 是否匹配 never ？空对象or不是对象 : 是对象
// 是的话就到头了，不是的话。说明是个对象
```

顺便说下这里还有另外一个答案

```typescript
type DeepReadonly<T> = {
  readonly [Key in keyof T]: T[Key] extends Function
    ? T[Key]
    : DeepReadonly<T[Key]>;
};
```

这里的判断标准直接成为`T[K] extends Function`来判断是否为对象。

## 4. 参考题目

因为这一题是 ReadOnly 和 Readonly2 的延伸。所以建议一起观看。

## 补充

[Deep ReadOnly](https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md)
