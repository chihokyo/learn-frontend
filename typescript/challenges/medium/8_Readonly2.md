# Readonly 2

> 实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。
>
> `K`指定应设置为 Readonly 的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

## 1. 示例

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

## 2. 自己实现+思路

实现不出来，直接看的答案。

```typescript
type MyReadonly2<T, F extends keyof T = keyof T> = {
  [K in Exclude<keyof T, F>]: T[K];
} & {
  readonly [K in F]: T[K];
};
```

首先在没看答案之前我的思路是没有这么清晰的，但是看了这个答案我知道了。这一题的意思要把你写的属性给 Readonly，没写的，或者不存在的都不动。

- 先把全部属性都给 Readonly
- `Exclude<keyof T, F>` 这一步就是把不需要的拿出来
- 两者进行& 交叉
- 结果就出来了

这一题最大的难点就是同属性的一个 Readonly，一个不是。交叉之后到底是不是？？

```typescript
interface A {
  readonly title: string;
  readonly des: string;
  readonly completed: boolean;
}

interface B {
  completed: boolean;
}

type C = A & B;

const c: C = {
  title: 'yes',
  des: 'happy',
  completed: false,
};

// 4.5之前，所有的属性都会变成readonly,4.5之后修改了这个bug
c.title = 'ok'; // No
c.des = 'sad'; // No
c.completed = true;
```

## 3. 难点

### 难点 1 类型约束

这个类型约束本来我觉得没什么问题了，

```typescript
type MyReadonly2<T, F extends keyof T>
```

像上面一样就可以，但是这种例子却不行。

```typescript
Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>;
// 也就是说当没有传入任何类型的时候，默认给个值。就是全部的keyof T
```

### 难点 2 参数默认类型

为了解决上面什么都没传入的情况。给参数一个默认值

```typescript
type MyReadonly2<T, F extends keyof T = keyof T>
```

### 难点 3 & 交叉类型的问题

这一题的原理就是通过交叉类型，把所有的都变成 Readonly，然后交叉一下你不需要变成的。

```typescript
interface A {
  readonly title: string;
  readonly des: string;
  readonly completed: boolean;
}

interface B {
  completed: boolean;
}

type C = A & B;

const c: C = {
  title: 'yes',
  des: 'happy',
  completed: false,
};

c.title = 'ok'; // No
c.des = 'sad'; // No
c.completed = true;
```

然后解析答案

```typescript
type MyReadonly2<T, F extends keyof T = keyof T> = {
  [K in Exclude<keyof T, F>]: T[K];
} & {
  readonly [K in F]: T[K];
};

//  readonly [K in F]: T[K];
// 相当于把所有的key都变成了readonly

// Exclude<keyof T, F>
// 先看这里，这里相当于只提取出来你不需要readonly的属性也就是 completed
// [K in completed]: T[K];
// [completed]: T[completed];
// completed:boolean 这样进行交叉

interface AA {
  readonly completed: boolean;
}

interface BB {
  completed: boolean;
}

type CC = AA & BB;

const cc: CC = {
  completed: false,
};
cc.completed = true;
console.log(cc.completed); // true
```

> 当一个属性是 readonly，一个不是的时候。交叉之后，结论就是**不是！，我们是可以随便读写的**

## 4. 参考题目

因为这一题是 ReadOnly 的延伸。所以建议一起观看。

## 补充

[Github 类型体操-ReadOnly](https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.zh-CN.md)
