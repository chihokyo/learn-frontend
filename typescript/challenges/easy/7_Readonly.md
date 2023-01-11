# Readonly

> `Readonly` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会被 `readonly` 所修饰。

## 1. 示例

```typescript
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
```

## 2. 自己实现

```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## 3. 难点

### 难点 1 映射类型 Mapped Types

其实这个超级简单，唯一的就是你要懂在 Pick 里写过的映射类型是什么

- 遍历所有属性 `in keyof`
- 遍历同时给这些属性加上 readonly 标识符

### 难点 2 readonly

就是一个修饰符，表示不能再次被赋值了。只读类型。

[深入理解 TypeScript-readonly](https://jkchao.github.io/typescript-book-chinese/typings/readonly.html)

## 4. 内置 built-in

首先这是一个内置 bulit-in 的，因为 TS 自己实现了。TS 自己实现的如下。

```typescript
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

> 这里说明一下，如果都已经做了这个。那么内置的这两个建议也学习一下。
>
> - `Partial<Type>` 把所有的变成任意的
> - `Required<Type>` 把所有的变成必选的

## 补充

这个不是很难，都不想说了。

[Github 类型体操-Readonly](https://github.com/type-challenges/type-challenges/blob/d535735ae6cebd15019b14661577e67683a00461/questions/00007-easy-readonly/README.zh-CN.md)

[Typescript 关键字](https://juejin.cn/post/7034035155434110990)
