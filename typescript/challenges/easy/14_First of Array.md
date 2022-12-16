# First

实现一个泛型`First<T>`，接收一个数组`T`然后返回它的第一个元素的类型。

## 1. 示例

```typescript
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

## 2. 自己实现

我自己实现的思路，刚开始就是。

```typescript
type First<T extends any[]> = T[0];
```

但是看了题解之后发现人家是这样写的。

也就是如果传入的是一个空数组`[]`的情况下，需要进行判定。

```typescript
ype First<T extends any[]> = T extends [] ? never : T[0];
```

## 3. 难点

### 难点 1 任意数组怎么表示

```typescript
T extends any[] // 这样可以表示一个任意数组
```

### 难点 2 判断不为空数组用到了条件类型

Conditional Types

使用 extends 来判定

```typescript
SomeType extends OtherType ? TrueType : FalseType;
```

## 补充

这个不是很难，都不想说了。

[Github 类型体操-First to Object](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md)

[Typescript 条件类型 官方文档](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
