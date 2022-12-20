# Includes

## 1. 示例

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。

例如：

```typescript
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
```

## 2. 自己实现

直接看答案类型。这题不简单。

```typescript
type Includes<T extends readonly any[], U> = T['length'] extends 0
  ? false
  : Equal<U, T[0]> extends true
  ? true
  : T extends [any, ...infer R]
  ? Includes<R, U>
  : false;
```

## 3. 难点

### 难点 1 解析 solution 的错误答案

首先这是 solution 给的一个[错误答案](https://ghaiklor.github.io/type-challenges-solutions/en/easy-includes.html)，其实也说不上错误。只是考虑的情况不多。不严谨而已。

> 接下来解析这个答案

接下来是我看不懂`T[number]`是怎么来的，后来我去看了官方文档的索引类型。才知道有一个用法。

```typescript
type TupleToObject<T extends readonly (string | number)[]> = {
  [P in T[number]]: P;
};
//  T[number] 这个是怎么来的
```

> [Indexed Access Types 索引访问类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) 使用任意类型进行索引的另一个示例是**使用数字来获取数组元素的类型**。我们可以将其与 typeof 结合使用，以方便地捕获数组文字的元素类型。
>
> `T[number]`可以获取到一个联合类型。
>
> 如果我们访问 `T[number]`，TypeScript 将返回 T 中所有元素的联合。

```typescript
// 1.例如
type T = [1, 2, 3];
T[number]; // 将返回 1|2|3 是一个联合类型。
```

直接使用

```typescript
type Includes<T, U> = T[number]; // 因为没有类型约束，不确定T是否是一个tuple，所以会报错 Type ‘number’ cannot be used to index type ‘T’”
```

所以你要约束一下。

```typescript
type Includes<T extends unknown[], U> = T[number];
```

接下来就是如何检查元素是否存在于联合类型中？我们可以使用 extends 关键字来检查 U 是否在 T[number] 中，如果是，则返回 true。

```typescript
type Includes<T extends unknown[], U> = U extends T[number] ? true : false;
```

> 以上都是 solution 里面给出的解决方案，但是其实是有问题的。思路上是没问题，但是很多边界不是很严谨。

### 难点 2 解析正确答案

接下来直接看正确答案。

```typescript
type Includes<T extends readonly any[], U> =
  // 第一个判断是否为空
  T['length'] extends 0
    ? false
    : // 第二个判断元素有且只有1个的情况 那么直接返回true（其实也是递归的终止条件
    Equal<U, T[0]> extends true
    ? true
    : // 第三次使用了递归每次只判断一个，剩下的就递归下去，如果第 一直到true为止
    T extends [any, ...infer R]
    ? Includes<R, U>
    : false;
```

解决了一些问题

```typescript
// readonly 表明是一个tuple 不可修改
<T extends readonly any[], U>
```

### 难点 3 递归

接下来使用了最难理解的一部分，就是递归。这里为什么要用递归呢？

因为这一题的思路就是一个个进行判断，就像错误答案的那种联合分发类型的，自动进行一个个。而是进行了递归。

递归的时候使用了下面这个判断元素是否相等。

```typescript
Equal<U, T[0]> extends true ? true // 判断是否相等
```

顺便还看到一个，思路也是一样的，就是写法上稍微容易理解一点

### 好理解的答案

```typescript
type Includes<T extends readonly any[], U> = T extends [
  infer head,
  ...infer rest
]
  ? Equal<head, U> extends true
    ? true
    : Includes<rest, U>
  : false;
```

![image-20221220171543746](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20221220171543746.png)

## 补充

有点难。可以略了都。答案给的也很多。

[Github 类型体操-Includes](https://github.com/type-challenges/type-challenges/issues/20035)
