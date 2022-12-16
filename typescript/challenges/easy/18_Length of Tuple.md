# Length of Tuple

对于给定的元组，你需要创建一个泛型`Length`类型，取得元组的长度。

## 1. 示例

```typescript
type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT'
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

## 2. 自己实现

刚开始可能摸不着头脑，一般不都返回类型吗，这个返回长度？于是就不会了。直接看的答案。

```typescript
type Length<T extends { length: number }> = T['length'];
```

其实思路就是直接拿到 length 就可以

## 3. 难点

### 难点 1 length

我们知道在 JavaScript 中可以使用属性`length`来访问数组的长度。我们也可以在类型上做同样的事情。

原来想要知道一个属性的长度，可以直接访问它的 length 属性就可以了。

```typescript
type Length<T extends any> = T['length'];
```

### 难点 2 并不是所有数据类型都有长度

因为并不是所有类型都有长度，这里就需要你的类型是含有 length 这个属性的才可以。那么怎么写呢？

`T extends { length: number }`

```typescript
type Length<T extends { length: number }> = T['length'];
```

## 补充

这个不是很难，都不想说了。

[Github 类型体操-First to Object](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md)

[Typescript 条件类型 官方文档](
