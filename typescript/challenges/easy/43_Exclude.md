# Exclude

实现内置的 Exclude <T, U>类型，但不能直接使用它本身。

从联合类型 T 中排除 U 的类型成员，来构造一个新的类型。

## 1. 示例

```typescript
type Result = MyExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
```

## 2. 自己实现

这个实现其实很简单，因为放进去的联合类型。出来的是排除后的联合类型。这个也自己实现了。

```typescript
type MyExclude<T, U> = T extends U ? never : T;
```

## 3. 难点

### 难点 1 分发条件类型 distributive conditional types

这个其实也蛮难理解的。当在**泛型中**使用条件类型的时候，如果传入一个联合类型，就会变成分发的**(distributive)**。这种现象英文叫 distributive conditional types。

```typescript
interface Fish {
  n1: string;
}

interface Water {
  n2: string;
}

interface Bird {
  n3: string;
}

interface Sky {
  n4: string;
}

type Condition<T> = T extends Fish ? Water : Sky; // ✅ 可分发的
// type Condition<T> = { t: T } extends { t: Fish } ? Water : Sky; // ❓ 这种就不是分发 因为写在里面 同时T[],[T]也是不行的

// 如果是非naked 整体都要被送进去比较  如果是就1个个进去比较
let c1: Condition<Fish | Bird> = { n4: 'helllo' };
let c2: Condition<Fish | Bird> = { n4: 'helllo' };
```

感觉还是直接上例子比较清晰。

```typescript
// 1首先定义一个类型 传入一个类型 返回类型数组
type toArray<T> = T[];
// 2 下面这种就可以
type NumArr = toArray<number>;
type StrArr = toArray<string>;
// 那么思考一下 如果我们使用联合类型 那么最后的答案是什么呢？
type U1 = toArray<number | string>; // (string | number)[]
// 也就是说把这个联合类型当做一个整体 返回了一个既可以放入number，也可以放入string的数组
const u1: U1 = [1, 'hello'];
```

> 如果我想要的是 `string[] | number[]` 呢？
>
> 这个时候分发条件类型就会登场了

```typescript
// 你传入的类型会一次又一次的透过这里
type toArrayA<T> = T extends any ? T[] : never;

type U2 = toArrayA<number | string>;

// const u2: U2 = [1, 'hello']; ❌ 这样就错误了
const u2: U2 = [1, 1, 1, 1]; // ✅
const u3: U2 = ['ok', 'ok', 'ok', 'ok']; // ✅
```

> 主要条件就是
>
> - 泛型里的类型是**联合类型**
> - 关键字 **extends** 进行分发

所以上面的那一题就可以分解成下面这样。

```typescript
'a' extends 'a'  ? never : T → 选never
'b' extends 'a'  ? never : T → 选T也就是'b'
'c' extends 'a'  ? never : T → 选T也就是'c'
```

## 4. built-in 内置

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

## 补充

这一题不是很难，可以对比内置的工具类型。`Extract<>`

Exclude 是排除的话，那么 Extract 就是提取。

[Github 类型体操-Exclude](https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.zh-CN.md)

[Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
