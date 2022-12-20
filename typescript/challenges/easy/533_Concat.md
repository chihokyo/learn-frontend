# Concat

## 1. 示例

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

例如：

```typescript
type Result = Concat<[1], [2]>; // expected to be [1, 2]
```

## 2. 自己实现

直接看答案类型。

```typescript
type If<C extends boolean, T, F> = C extends true ? T : F;
```

## 3. 难点

首先你要知道 js 中，这个函数的用法。不知道的话，无从下手。

```js
// 1.用法
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

// 2.实现
function concat(arr1, arr2) {
  return [...arr1, ...arr2];
}
```

### 难点 1 拓展运算符直接实现

按照拓展运算符，其实是可以直接实现的。

```typescript
type Concat<T, U> = [...T, ...U];
```

### 难点 2 类型约束

只是上面的话，那么 T 和 U 就是什么类型都可以了。事实上是不可以的。所以要约束成为一个数组

```typescript
type Concat<T extends any[], U extends any[]> = [...T, ...U];
```

## 补充

不是很难，但是要知道 JS 的原生实现和拓展运算符。

[Github 类型体操-Concat](https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md)
