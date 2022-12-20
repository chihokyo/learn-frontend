# Parameter

## 1. 示例

实现内置的 Parameters 类型，而不是直接使用它，可参考[TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

例如：

```typescript
const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
```

## 2. 自己实现

因为以前做过，所以很简单。

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

## 3. 难点

### 难点 1 类型约束

这里的类型必须是一个函数，不然哪里来参数。

```typescript
<T extends (...args: any[]) => any>
```

### 难点 2 类型推断 infer

因为这一题要求我们从函数中获取部分信息。获取部分信息的时候自然就要该想到 infer。

那么 infer 具体的用法是什么呢？

这个貌似是 TS 里让人最难理解的一部分。非常非常难。但我感觉也没有十分特别的难就是了。差不多熟悉了都不难，经常用就不难的东西。

首先先学一个**在条件类型中进行推断 inferring within conditional types**，这个是什么意思呢。

首先我们这里有一个需求，就是想获得一个函数的返回。

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

所以这里类型推断就出来了，需要谁，你就推断一下，内部就可以做出正确的类型。infer 这个关键字就是根据实际类型进行推断。R 相当于一个占位符，这个推断你想要的类型。R 你可以把他当成一个一个变量。

`infer R ? R : never` 推断是 R，不是的话就是 never

```typescript
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

const bar = (x: string) => {
  return 111;
};
// 测试 👌
type FnType = MyReturnType<typeof bar>;
```

> 一旦理解了这个之后，你想获取参数的类型也可以推断了。想获取什么就推断什么。最后在结果的时候返回就行。
>
> 注意 必须要在类型推断的时候进行推断，也就是在 extends 里的?:里用 infer。至于这个 infer 后面是不是一定要立刻就加上？这种判断。那是未必的，只要在最后加上就是可以的。

```typescript
type MyParamaterType<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

function boo(x: [number, boolean]) {
  return 11;
}
// 测试 👌
type mp = MyParamaterType<typeof boo>;

// <这里面写T extend 是为了放入的类型约束>
// 也就是你在调用这个类型的时候帮你检测传入的函数的

// 后面那个T extends 是为了做判断的
```

再次解析，有可能一段时间不看 infer 可能就会搞错。所以这里再次拆分一下上面那个实现`Parameters<T>`

```typescript
type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type Parameters<T extends (...args: any[]) => any> = (这里相当于一个整体，一个判断语句，如果是子类型，就返回P，否则就是never)
  ? P
  : never;
```

下面这还有一个例子

```typescript
/**
 * 应用案例 tuple 转 union
 * [string,number] → string | number
 */

// 这是一个tuple
type Ttuple = [string, number];
// 自己手写 难点1 首先元祖也是数组 所以是符合Array<infer E>的
// 这里是把整体都放进去 infer E，因为有可能是一个string 也有可能是一个 number
type Element<T> = T extends Array<infer E> ? E : never;
// 测试转换是否成功
type TupleTpUnion = Element<Ttuple>;
```

## 4. 内置 built-in

首先这是一个内置 bulit-in 的，因为 TS 自己实现了。TS 自己实现的如下。

```typescript
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

## 补充

不难。直接配合 Push 一起食用更佳。

[Github 类型体操-Unshift](https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.zh-CN.md)
