# Tuple To Union

## 题目

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

例如

```typescript
type Arr = ['1', '2', '3'];
type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

## 2. 自己尝试实现

这一题我自己本来看答案，都懵了。因为我发现每个人写的都不一样，最大的不一样在哪里呢？

在前面的类型约束上面。如何判断一个是否是一个元祖。

```typescript
type TupleToUnion<T extends readonly unknown[]> = T[number];
// 也有人这样写
type TupleToUnion<T extends any[]> = T[number];
// 还有人这样写
type TupleToUnion<T> = Exclude<
  T extends [infer First, ...infer Rest]
    ? TupleToUnion<First> | TupleToUnion<Rest>
    : T,
  []
>;
// 还有
type TupleToUnion<T extends any[]> = T extends [infer i, ...infer rest]
  ? i | TupleToUnion<rest>
  : never;
```

## 3.难点

### 难点 1 loopup types 查找类型

这个前面也说过，keyof 后面可以接上不同的东西。这样就有不同的结果。

[官方文档](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)

```typescript
// 这样官方文档给的例子
interface Person {
  name: string;
  age: number;
  location: string;
}
type K1 = keyof Person; // "name" | "age" | "location" → 也就是把所有的键key当成了一个联合类型
type K2 = keyof Person[]; // "length" | "push" | "pop" | "concat" | ... → 这里写出来的是普通数组所有可以用的属性
type K3 = keyof { [x: string]: Person }; // string 这里的出来的是一个对象的key所具备的属性
```

这里还有一个关于索引类型的描述

如果是一个多重的数组。也是可以准确拿到类型的。

```typescript
type P1 = Person['name']; // string
type P2 = Person['name' | 'age']; // string | number
type P3 = string['charAt']; // (pos: number) => string
type P4 = string[]['push']; // (...items: string[]) => number
type P5 = string[][0]; // string
```

所以就会有这样的例子，可以做约束

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}
let x = { foo: 10, bar: 'hello!' };
let foo = getProperty(x, 'foo'); // number
let bar = getProperty(x, 'bar'); // string
let oops = getProperty(x, 'wargarbl'); // Error! "wargarbl" is not "foo" | "bar"
setProperty(x, 'foo', 'string'); // Error!, string expected number
```

### 难点 2 索引类型

[官方文档 索引类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

这一题的思路就是。你想把一个 tuple，转换成联合类型。那么 tuple 本质上是一个数组，数组都是可以用**数字**进行访问的。

所以会获得一个联合类型。

```typescript
type Arr = ['1', '2', '3'];
type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'

// 此时的T就是你传入的元祖，
type TupleToUnion<T extends readonly unknown[]> = T[number];
```

## 4. 参考题目

[![11・元组转换为对象](https://camo.githubusercontent.com/6fe43d65402990ab468544cad78baa0bde3973244cdd7f57e36d11af76fc3669/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d31312545332538332542422545352538352538332545372542422538342545382542442541432545362538442541322545342542382542412545352541462542392545382542312541312d376161643063)](https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.zh-CN.md) [![472・Tuple to Enum Object](https://camo.githubusercontent.com/22d2d6e13b1285a6fa04593a12c29ba5b1ce32faed25609164233ab79a577913/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d3437322545332538332542425475706c65253230746f253230456e756d2532304f626a6563742d646533643337)](https://github.com/type-challenges/type-challenges/blob/main/questions/00472-hard-tuple-to-enum-object/README.zh-CN.md) [![730・Union to Tuple](https://camo.githubusercontent.com/8d2ffab00f189519c5e207f03071a63fa9914fea6b592da7b267240785c74a6e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d373330254533253833254242556e696f6e253230746f2532305475706c652d646533643337)](https://github.com/type-challenges/type-challenges/blob/main/questions/00730-hard-union-to-tuple/README.md) [![3188・Tuple to Nested Object](https://camo.githubusercontent.com/ffbd45df6dd4979c97a29e35ec537ec69e4b52277083c020363120c13faf554a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d333138382545332538332542425475706c65253230746f2532304e65737465642532304f626a6563742d643939303161)](https://github.com/type-challenges/type-challenges/blob/main/questions/03188-medium-tuple-to-nested-object/README.md)

## 补充

[元组转合集](https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/README.zh-CN.md)
