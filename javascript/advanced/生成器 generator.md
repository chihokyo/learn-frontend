# 生成器 generator

## 1. 起源&导入

为什么会产生生成器？

这是因为我们在执行函数的时候如果想要暂停的话，没有方法的。return 的话直接函数就完全返回了，这不是暂停。一个函数在执行的时候，只有发生了问题 or **return** or **throw new Error** 才会暂停。

如果想让一个函数在执行的时候暂停一下，先休息一下，在从原来断的地方开始呢？

> 根据这个需求就产生了生成器

首先 generator 是一个特殊的 iterator！

不会 iterator，就不会 generator，所以一定要先搞懂什么是 iterator

## 2. 生成器函数

生成器是需要生成器函数来生成的，那么什么是生成器函数?

```js
function foo() {} // 普通函数
function* foo() {} // 生成器函数
```

和普通函数有什么区别呢？

- 需要加个 \*
- 内部使用 yield 特殊关键字进行暂停（普通函数不能用）

### 2-1 执行过程（基本）

```js
function* foo() {
  console.log('****1****');
  console.log('****2****');
  yield;
  console.log('****3****');
  yield;
  console.log('****4****');
  yield;
  console.log('****5****');
}
// ① 调用生成器函数，得到生成器
const generator = foo();
// ② 调用next() 开始运行
console.log(generator.next());
```

运行的结果 看懂结果很重要

```js
// 运行1次next
****1****
****2****
{ value: undefined, done: false }

// 运行2次next
****1****
****2****
{ value: undefined, done: false }
****3****
{ value: undefined, done: false }

// 运行3次next
****1****
****2****
{ value: undefined, done: false }
****3****
{ value: undefined, done: false }
****4****
{ value: undefined, done: false }

// 运行4次next
****1****
****2****
{ value: undefined, done: false }
****3****
{ value: undefined, done: false }
****4****
{ value: undefined, done: false }
****5****
{ value: undefined, done: true }
```

好了，差不多就到头了。知道了吧。yield 在没有么有返回值的情况下，默认是返回的啥，其实和迭代器的`next()`不就是一样的么，只是你没写返回值，于是 value 就是 undefined。

那么 yield 有没有返回值呢？ 一旦 done 为 true（这个 true 可以单纯的理解成 这个生成器函数执行完了，后面没东西了），当遇到 yield 之后，生成器就

- 暂停函数执行
- 你如果想返回值 `yield 你想返回的值`

> 其实每一次暂停，暂停到哪里？**暂停到 yield 的后面**！！！

![image-20220916130233220](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220916130233220.png)

### 2-2 执行过程（带返回值）

如果不仅仅想执行，还想有返回值呢？

那就在 yield 后面写，写就是返回值

```js
function* foo() {
  console.log('****1****');
  console.log('****2****');
  yield 666;
  console.log('****3****');
  yield 777;
  console.log('****4****');
  yield 888;
  console.log('****5****');
}
// ① 调用生成器函数，得到生成器
const generator = foo();
// ② 调用next() 开始运行
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

执行结果就是

```js
// 运行1次next
****1****
****2****
{ value: 666, done: false }

// 运行2次next
****1****
****2****
{ value: 666, done: false }
****3****
{ value: 777, done: false }

// 运行3次next
****1****
****2****
{ value: 666, done: false }
****3****
{ value: 777, done: false }
****4****
{ value: 888, done: false }

// 运行4次next
****1****
****2****
{ value: 666, done: false }
****3****
{ value: 777, done: false }
****4****
{ value: 888, done: false }
****5****
{ value: undefined, done: true }
```

就是每次 next 有返回值 value 的感觉了。

### 2-3 执行过程（带参数）

如果我不只是有返回值，我还有参数呢？

#### 第一个带参数

如果你想在第 1 次就传参，那么是不可以写在 next 里面的，

> 第一个 next 调用永远不可能有参数

需要的话请写在生成器生成的地方

```js
// ① 第一次传参，请在这里写
const generator = foo(11); ✅
// ② 不能再这里写
console.log(generator.next(11)); ❌
console.log(generator.next(22)); // 第2次以后都能写
console.log(generator.next(33));
```

第一次传参之后 foo 也要有相应变化，要有形参参数了`foo(num)`

```js
function* foo(num) {
  console.log('****start****');
  const v1 = num * 100;
  console.log('****v1****', v1);
}
// 第一次必须在这里传参
const generator = foo(2);
console.log(generator.next());
```

### 2-4 多次具体执行

那么传递的参数要怎么接收呢？下面直接写一下这个函数的执行过程

```js
function* foo() {
  console.log('****start****');
  const v1 = 100;
  console.log('****v1****', v1);
  const n1 = yield v1;
  const v2 = n1 * 100;
  console.log('****v2****', v2);
  const v3 = yield v1;
  const v4 = v3 * 10;
  console.log('****v2****', v4);
}
const generator = foo();
console.log(generator.next());
console.log(generator.next(11));
console.log(generator.next(22));
console.log(generator.next(33)); // 本质上没用 因为代码执行完了
console.log(generator.next(44)); // 本质上没用 因为代码执行完了
```

![image-20220916235742222](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220916235742222.png)

差不多最难的就是到这里了，接下来就是。

## 3. return

return 在普通函数里都是返回值，那么在生成器函数里面是怎样的一个存在呢？

> 代表着中止执行 代表着下面的代码都跟不存在一样

```js
function* foo() {
  console.log('函数开始执行~');

  const value1 = 100;
  console.log('第一段代码:', value1);
  const n = yield value1;

  return 33;
  const value2 = 200 * n;
  console.log('第二段代码:', value2);
  const count = yield value2;

  const value3 = 300 * count;
  console.log('第三段代码:', value3);
  yield value3;

  console.log('函数执行结束~');
  return '124';
}

const fgenerator = foo();
console.log(fgenerator.next());
// 函数开始执行~
// 第一段代码: 100
// { value: 100, done: false }
console.log(fgenerator.next()); // { value: 33, done: true }
console.log(fgenerator.next(20)); // { value: undefined, done: true }
console.log(fgenerator.next(30)); // { value: undefined, done: true }
```

具体的一些流程

![image-20220426230940032](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220426230940032.png)

> 如果第一次在生成器就直接调用 `return()` 呢？

```javascript
function* foo() {
  console.log('函数开始执行~');

  const value1 = 100;
  console.log('第一段代码:', value1);
  const n = yield value1;

  const value2 = 200 * n;
  console.log('第二段代码:', value2);
  const count = yield value2;

  const value3 = 300 * count;
  console.log('第三段代码:', value3);
  yield value3;

  console.log('函数执行结束~');
  return '124';
}

const fgenerator = foo();
console.log(fgenerator.return(1)); // 相当于直接返回了这个参数 { value: 1, done: true }
```

直接在第一次就开始用 return 的。用的很少，除非你对上一次的值不太满意，可以终止。

总结一下

> - return 之后的代码都将无视
> - `return 数据` 里的数据 会被当成`next()`里 value 的返回值
> - return 如果放在生成器函数最后，会被当成生成器函数最后一个`next()`返回值

## 4. throw

关于 throw 在生成器函数里的用法，这个 throw 最主要的就是多用和多写。

自己多看看就好。

![image-20220426232017813](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220426232017813.png)

这种代码就是要多多调试，多多看。多多写。

其实就是捕获了之后代码会被正常执行，跟没事人似的。

- 捕获`try catch`了，继续执行
- 没捕获，直接停掉。

```javascript
function* foo2() {
  console.log('start');
  console.log('1 code starting...');
  const v1 = 100;
  try {
    yield v1; // 这样捕获 代码会正常执行
  } catch (error) {
    console.log(error);
  }
  console.log('2 code starting...'); // 这里也会执行
  const v2 = 200;
  yield v2; // 会执行到这里！！
  console.log('end!!!');
}

const g1 = foo2();
console.log(g1.next());
// start
// 1 code starting...
// { value: 100, done: false }
console.log(g1.throw('ops!err!'));
```

什么时候用到 throw，就是第一次执行完`next()`，对结果不是特别满意，就会抛出错误。

```js
function* foo() {
  console.log('start');
  console.log('1 code starting...');
  const v1 = 100;
  try {
    yield v1;
  } catch (error) {
    console.log(error);
  }
  console.log('2 code starting...');
  const v2 = 200;
  yield v2;
  console.log('end!!!');
}

const generator = foo2();
const res = generator.next();
// 比如下面这样
if (res.value !== 200) {
  console.log(generator.throw('error'));
}
```

## 5. 用生成器替代迭代器

反正生成器是特殊的迭代器，生成器其实是可以替代迭代器的。

比如之前写的迭代器。

```js
function createIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { done: false, value: arr[index++] };
      }
      return { done: true, value: undefined };
    },
  };
}
const arr = ['11', 'aa', 'zz'];
const ite = createIterator(arr);
console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
```

为什么可以替代？

因为生成器函数返回的就是一个`next()`返回的对象，这是系统规定的。

所以可以改写成这样

```js
function* createIterator(arr) {
  // 写法1️⃣
  // let index = 0;
  // for (let i = index; i < arr.length; i++) {
  //   yield arr[index++];
  // }
  // 写法2️⃣ 因为arr的
  for (const a of arr) {
    yield a;
  }
}
const arr = ['11', 'aa', 'zz'];
const generator = createIterator(arr);
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

- 把普通函数 → 生成器函数
- 增加 yield 值

### 语法糖

由于上面的写法还是太繁琐了，JS 直接给了你一个语法糖`yield*`

语法

```js
yield * 可迭代对象;
```

具体使用

这个 yield，每一次就会帮你迭代里面的对象。相当于帮你 yield 每一次 yield 出去了。

类似于这种感觉

```js
const arr = ['foo', 'bar', 'baz'];
// yield* arr 相当于①帮你取出来 ②又帮你yield出去
yield 'foo';
yield 'bar';
yield 'baz';
```

具体应用

```js
// 3️⃣ 语法糖 yield*
const arr = ['foo', 'bar', 'baz'];
// 生成器替代迭代器
function* createArrayIterator(arr) {
  // 后面接一个可迭代的对象 就可以自己取出来 然后yield出去
  yield* arr;
}
const arrGene2 = createArrayIterator(arr);
console.log(arrGene2.next());
console.log(arrGene2.next());
console.log(arrGene2.next());
console.log(arrGene2.next());
```

具体应用，生成一个范围内连续数字

```js
function* createRangeIterator(start, end) {
  while (start < end) {
    yield start++;
  }
}

const ite = createRangeIterator(5, 9);
console.log(ite.next()); // { value: 5, done: false }
console.log(ite.next()); // { value: 6, done: false }
console.log(ite.next()); // { value: 7, done: false }
console.log(ite.next()); // { value: 8, done: false }
console.log(ite.next()); // { value: undefined, done: false }
```
