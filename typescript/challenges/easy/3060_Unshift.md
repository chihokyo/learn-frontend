# Unshift

## 1. 示例

实现类型版本的 `Array.unshift`。

例如：

```typescript
type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]
```

## 2. 自己实现

这一题简直就是 Push 的翻版。直接两个一起看就行。

JS 里是这样的

```typescript
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// expected output: 5

console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]
```

自己实现

```typescript
type Unshift<T extends any[], U> = [U, ...T];
```

## 3. 难点

没啥难的。太 easy。

## 补充

有点难。可以略了都。答案给的也很多。

[Github 类型体操-Includes](https://github.com/type-challenges/type-challenges/issues/20035)
