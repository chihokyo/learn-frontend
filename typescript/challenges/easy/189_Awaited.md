# Awaited

这题很难，看不懂可以先跳过去。

## 1. 示例

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

```typescript
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

## 2. 自己实现

难。不会写。直接看了答案写了。超级难，后面写解析。

```typescript
type MyAwaited<T extends { then: (onfulfilled: any) => any }> = T extends {
  then: (onfulfilled: (arg: infer U) => any) => any;
}
  ? U extends Promise<unknown>
    ? MyAwaited<U>
    : U
  : never;
```

## 3. 难点

### 难点 1 Promise 类型约束

你还要保证你传入的这个 T 也是一个 Promise 类型。这就有了类型约束。

```typescript
type MyAwaited<T> = T extends Promise<string> ? string : T;
```

其实要解决这个问题，需要的是你传入的 T 需要进行类型约束。也就是下面的

```typescript
type Awaited<T extends Promise<any>>
```

> 但其实从答案来看的话，不是这样写的，而是必须写是一个成功的回调才行。也就是说只要一个对象实现了 then 这个方法就可以了。

```typescript
<T extends { then: (onfulfilled: any) => any }>
```

### 难点 2 infer 类型推断

这里为什么会用到类型推断呢？

是因为你看上面的解答，你只能确定是一个 string，而无法确定是其他类型的。

```typescript
// string
type MyAwaited<T> = T extends Promise<string> ? string : T;
// number
type MyAwaited<T> = T extends Promise<number> ? number : T;
// boolean
type MyAwaited<T> = T extends Promise<boolean> ? boolean : T;
```

难道要像上面一样，每次都写一遍呢？当然这是不行的。

于是这个时候 infer 就出现了。这个 infer 下面的补充我也写了官方的文档。

> 在条件类型的 extends 子句中，现在可以有引入要推断的类型变量的推断声明。可以在条件类型的真实分支中引用此类推断类型变量。同一类型变量可以有多个推断位置。
>
> 例如，以下提取函数类型的返回类型：

```typescript
// 这里推断了一个类型，extends 可以理解成三元运算符的感觉
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

所以这一题的话，很好就利用了类型推断。因为你不知道的位置你都可以推断。也就是

```typescript
type Awaited<T> = T extends Promise<infer R> ? R : T;
```

### 难点 3 递归思想

为什么会有递归呢？因为如果你有类型`Promise<Promise<string>>`，你也需要返回类型`string`。

这个第一次比较难以理解，属于你推导出 R 之后，需要再次进行嵌套调用，因为此时的 R 就是 Promise\<R>，相当于每次嵌套一次。掉一层皮。所以答案就是这样的。

```typescript
type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T;
```

### 难点 4 答案有误

上面写了这么多，但其实在看给的答案的时候我是很懵逼的。下面开始解析。

用了双重推断才解析出来的。

```typescript
type MyAwaited<T extends { then: (onfulfilled: any) => any }> = T extends {
  then: (onfulfilled: (arg: infer U) => any) => any;
}
  ? U extends Promise<unknown>
    ? MyAwaited<U>
    : U
  : never;
```

这里参考一下有个人写的[解决方案](https://ghaiklor.github.io/type-challenges-solutions/en/easy-awaited.html)

```typescript
The solution originally provided
// 官方最初给的答案

type Awaited<T> = T extends Promise<infer R> ? R : T;

does not satisfy the following two tests:
// 但是这个答案无法通过以下两个测试
Expect<Equal<MyAwaited<Z>, string | number>>, //recursion

and the one which expects error:
// 还有一个期待错误
// @ts-expect-error type error = MyAwaited<number>
(Also, the type in solution is misnamed, it has to be MyAwaited, not Awaited // 此外，解决方案中的类型命名错误，必须是 MyAwaited，而不是 Awaited）)

The correct solution, which satisfies both these tests, as well as deeper recursion levels is the following:

 // 正确答案
type MyAwaited<T extends { then: (onfulfilled: any) => any }> = T extends { then: (onfulfilled: (arg: infer U) => any) => any; } ? U extends Promise<unknown> ? MyAwaited<U> : U : never;
```

主要看这一段，相当于进行了两次约束。第一次判断是否为 Promise，并且进行推断了这个 U。但是这个 U 也必须是 Promise 类型的。但是此时是不知道 Promise 里面是什么类型。所以用了 unknown，然后又进行了递归。

```typescript
T extends { then: (onfulfilled: (arg: infer U) => any) => any; }
  ? U extends Promise<unknown>
  	? MyAwaited<U> : U : never;
```

拆解版本

```typescript
// 1 首先应该是这样的 then应该是一个函数
type MyAwaited<T extends {then:(onfulfilled:any)=>any}>  = T extends {then:()=>any} ? U  : never;
// 2 then里面应该有一个参数是 onfulfilled 而且这个参数也是一个函数 于是就有了 onfulfilled:(arg:infer U)=>any
type MyAwaited<T extends {then:(onfulfilled:any)=>any}>  = T extends {then:(onfulfilled:(arg:infer U)=>any)=>any} ? U  : never;
// 3 进行第一次类型约束 判断是否？U 但是这样不行 还要进一步判断
type MyAwaited<T extends {then:(onfulfilled:any)=>any}>  = T extends {then:(onfulfilled:(arg:infer U)=>any)=>any} ? U  : never;
// 4 第二次类型约束
U extends Promise<unknown> ? MyAwaited<U>:U
```

## 补充

这题很难。答案还有问题。

[Github 类型体操-Awaited](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.zh-CN.md)

[官方文档-Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types)
