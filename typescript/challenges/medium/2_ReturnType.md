# ReturnType

> 不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

## 1. 示例

```typescript
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"
```

## 2. 自己实现

```typescript
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
```

## 3. 难点

### 难点 1 类型约束

下面是我第一次自己写的。这里主要是没有判定 T 的类型，T 肯定必须是一个函数才行

```typescript
type MyReturnType<T> = T extends (...arg: any) => infer R ? R : never;
```

所以少了个类型推断。

```typescript
T extends (...args: any) => any
```

### 难点 2 类型推断 infer

因为这一题要求我们从函数中获取部分信息。获取部分信息的时候自然就要该想到 infer。

那么 infer 具体的用法是什么呢？

这个貌似是 TS 里让人最难理解的一部分。非常非常难。但我感觉也没有十分特别的难就是了。差不多熟悉了都不难，经常用就不难的东西。

首先先学一个**在条件类型中进行推断 inferring within conditional types**，这个是什么意思呢。

首先我们这里有一个需求，就是想获得一个函数的返回值类型。

```typescript
// 简单的定义一个函数类型
type CalcFnType = (x: number, y: number) => number;
// 其实TS内部有一个工具函数 传入一个. 型获取返回值类型
// ReturnType<传入类型>
// 比如 下面就可以获取到CalcFnType的类型
type CalcFnReturnType = ReturnType<CalcFnType>;

// 目前有一个需求 想获得一个函数的返回值类型
function foo() {
  return 'hello';
}

// 那么我们想获取foo的返回值类型怎么办，首先要先获取foo的类型
// 使用typeof 就可以先获取类型
type FooFnReturnType = ReturnType<typeof foo>;
```

> 上面差不多解决了，这个问题。但是这个工具函数是怎么实现的呢？就引出了主题 infer。
>
> 下面自己实现一个`ReturnType`

```typescript
// 首先自己要接受一个类型 那么这个T类型有啥限制吗
// 首先这个类型必须是一个函数 (...args:any[]) => any
type MyReturnType<T> = any;

// 所以下面的T是一个函数 返回值的类型也应该是一个函数才是
// 但是下面这种全部返回any是没有意义的
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => any
  ? any
  : false;
```

## 4. 内置 built-in

首先这是一个内置 bulit-in 的，因为 TS 自己实现了。TS 自己实现的如下。

```typescript
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

建议配合 Parameter 一起看。

## 补充

[Github 类型体操-ReturnType](https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.zh-CN.md)
