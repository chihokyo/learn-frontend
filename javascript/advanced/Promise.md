# Promise

## 1. 历史

历史问题。那么 JavaScript 是为了解决什么问题呢？

JS 是单线程的，就是排队上厕所。但是有时候等不了怎么办，比如说大的文件的下载，成功了还失败了？我难道必须等你全部下载完（成功失败未定）才能干其他事情吗？这些都是好耗时的，等不起的！

```js
function requestData(url) {
  setTimeout(() => {
    if (url === 'request') {
      let data = [1, 2, 3];
      return data;
    } else {
      let errMsg = 'error';
      return errMsgl;
    }
  }, 2000);
}

console.log(requestData('request')); // undefined

// 2秒之后什么都不会返回，因为很简单，setTimeout()是异步调用。
```

所以这里设计了一个回调函数

> _利用回调函数_
>
> 有结果的时候通过回调函数来接收**结果**

```js
function requestData(url, sucCb, failCb) {
  // setTimeout不会马上给你结果，利用回调函数
  // 有结果的时候通过回调函数来接收
  setTimeout(() => {
    if (url === 'request') {
      let data = [1, 2, 3, 4];
      sucCb(data);
    } else {
      failCb('error');
    }
  });
}

requestData(
  'request',
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
// [ 1, 2, 3, 4 ]

requestData(
  'error',
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
// error
```

![image-20220422132526348](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422132526348.png)

### 弊端

- 设计函数的时候太自由，`function requestData(url, sucCb, failCb)` 别人可能把 url 放入到第 3 个位置，可能函数名也不知道是啥
- 调用者也麻烦。每次都要看一下是什么函数

### 解决

那怎么解决的呢？如果存在一个类，这个类包含了成功和失败的回调。如下 👇🏻

```js
function requestData(url) {
  const alarm = new Alarm(); // ① 新建一个类
  setTimeout(() => {
    if (url === 'request') {
      let data = [1, 2, 3, 4];
      alarm.success(data); // ② 成功的函数
    } else {
      let errMsg = 'error';
      alarm.fail(errMsg); // ③ 成功的函数
    }
  });
  return alarm; // ④ 返回这个类
}
```

但是这个也不行啊，Alarm 是什么呢？

于是 ES 搞了一个规范，就是所有人都要遵守的。**这个就是 Promise**。

- 上面的`Alarm`换成 Promise
- `new Promise((resolve,reject) => {})`
- 成功回调`resolve,resolve`会立即执行 `then`
- 失败回调`reject,reject`会立即执行 `catch`

```js
function requestData(url) {
  // ① 把你想要异步执行的代码直接放进new Promise里
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'request') {
        let data = [1, 2, 3, 4];
        resolve(data); // ② 成功的函数
      } else {
        let errMsg = 'error';
        reject(errMsg); // ③ 成功的函数
      }
    });
  });

  return promise; // ④ 返回这个类
}

const promise = requestData('requ1est');
promise.then((value) => {
  console.log(value);
});
promise.catch((error) => {
  console.log(error);
});

// 也可以写成这样 链式调用的形式

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
```

## 2. API 介绍

`Promise` 是一个类（构造函数）

- 给调用者一个承诺（新建一个`new Promise()`）
- 创建的时候需要放进去一个回调函数 `new Promise(exector)`

> Promise 是一个类，可以翻译成 承诺、许诺 、期约;
> 当我们需要的时候，给予调用者一个承诺。待会儿我会给你回调数据时，就可以创建一个 Promise 的对象。
>
> 在通过 new 创建 Promise 对象时，我们需要传入一个回调函数，我们称之为**executor**
>
> - 这个回调函数会被立即执行，并且给传入另外两个回调函数**resolve、reject**
> - 当我们调用**resolve**回调函数时，会执行 Promise 对象的**then**方法传入的回调函数
> - 当我们调用 reject 回调函数时，会执行**Promise**对象的**catch**方法传入的回调函数

上面只是一个概述，具体还是要看代码。

Executor 是在创建 Promise 时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入两个参数

```js
new Promise((resolve, reject) => {
  console.log('exector代码');
});
```

![image-20220422134458062](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422134458062.png)

然后就可以把上面那段代码用`Promise`来重构了

![img](https://raw.githubusercontent.com/chihokyo/image_host/develop/sp20220422_135735_489.png)

然后就可以直接用了

```javascript
const promise = requestData('request1');

promise
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('failed');
  });

// 这样写也可以 then里面2个回调函数，1个成功，1个失败
promise.then(
  () => {
    console.log('success');
  },
  () => {
    console.log('failed');
  }
);

// 这样直接写也可以
new requestData((resolve, reject) => {
  console.log('------');
  resolve();
  reject();
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

于是差不多最后的结果就是

```javascript
const p1 = new Promise((resolve, reject) => {
  const data = [
    { id: 'uuid1', age: 99 },
    { id: 'uuid2', age: 10 },
  ];
  const errMsg = 'failed';
  let flag = false;
  if (flag) {
    resolve(data);
  } else {
    reject(errMsg);
  }
});

p1.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```

### 状态

> 首先要有一个东西要知道，一旦状态确定，就无法更改。
>
> 也不能再次执行某个回调改变状态。

- pending
- fulfilled
- rejected

![image-20220422140804125](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422140804125.png)

状态一旦确定，就无法更改，就是被锁住的。

```javascript
new requestData((resolve, reject) => {
  console.log('------');
  resolve(); // fulfilled状态
  // reject(); ❌ 这个时候已经敲定了 resolve ，在来 reject 是没意义的
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## 3. resolve()

最常见最基础的用法就是里面直接放一个你想传递的数据（大多数是对象 or 数组）。这是最基础的用法，上面都是这种。但是真正写起来会有一些别的用法。

### 普通值 or 普通对象

不说了，上面都是。

### 带有 then 属性的对象

这个就是 thenable 了。

```js
function requestData(url) {
  return new Promise((resolve, reject) => {
    if (url === 'request') {
      resolve({
        id: 'test_then',
        then: function (resolve, reject) {
          resolve('aaa'); // 👈🏻 这里决定的
        },
      });
    }
  });
}
requestData('request').then((res) => {
  console.log(res);
});
```

### 带一个新的 new Promise

其实就是根据这个新的 Promise 状态来决定最后的结果

```js
function requestData(url) {
  return new Promise((resolve, reject) => {
    if (url === 'request') {
      resolve(
        new Promise((resolve, reject) => {
          reject('error'); //👈🏻 根据这个定的 这里是啥 结果就是啥
        })
      );
    }
  });
}
requestData('request')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

下面是一个图的，助理解。

![image-20220422151915827](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422151915827.png)

## 4. then()

### 是啥？

关于`then()`方法

首先 then 是一个 Promise 对象上的方法，然后可以验证出来

```javascript
// 直接打印是出不来的 ，因为可以看到 enumerable: false,
console.log(Object.getOwnPropertyDescriptors(Promise.prototype));
```

结果就是

```json
{
  length: { value: 1, writable: false, enumerable: false, configurable: true },
  name: {
    value: 'Promise',
    writable: false,
    enumerable: false,
    configurable: true
  },
  prototype: {
    value: Object [Promise] {},
    writable: false,
    enumerable: false,
    configurable: false
  },
  all: {
    value: [Function: all],
    writable: true,
    enumerable: false,
    configurable: true
  },
  allSettled: {
    value: [Function: allSettled],
    writable: true,
    enumerable: false,
    configurable: true
  },
  any: {
    value: [Function: any],
    writable: true,
    enumerable: false,
    configurable: true
  },
  race: {
    value: [Function: race],
    writable: true,
    enumerable: false,
    configurable: true
  },
  resolve: {
    value: [Function: resolve],
    writable: true,
    enumerable: false,
    configurable: true
  },
  reject: {
    value: [Function: reject],
    writable: true,
    enumerable: false,
    configurable: true
  },
  [Symbol(Symbol.species)]: {
    get: [Function: get [Symbol.species]],
    set: undefined,
    enumerable: false,
    configurable: true
  }
}
```

### 可被多次调用

当 `resolve()` 方法被回调时, 所有的 `then()` 方法传入的回调函数都会被调用

```javascript
const thenPromise = new Promise((resolve, reject) => {
  resolve('then test');
});

thenPromise.then((res) => {
  console.log('res1', res);
});
thenPromise.then((res) => {
  console.log('res2', res);
});
thenPromise.then((res) => {
  console.log('res3', res);
});
```

那么再来比较一下下面这两者

![image-20220422233031775](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422233031775.png)

### 返回值 3 种情况

于是就引出了新的问题，就是第二段 Promise 的问题。

`then()` 有没有返回值的问题。结论就是有的，返回值是一个新的`new Promise()`但是分三种情况。因为 then 本身返回的还是一个 Promise，所以可以使用链式调用。

先说一下原理+第一种情况

![image-20220422233703276](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422233703276.png)

然后是剩下 2 种

![image-20220422234853081](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220422234853081.png)

```js
// 第2种
const testThen2 = new Promise((resolve, reject) => {
  resolve('aa');
});

testThen2
  .then((res) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(res);
      }, 2000)
    );
  })
  .then((res) => {
    console.log(res); // 2秒后打印aa
  });

// 第3种
const testThen3 = new Promise((resolve, reject) => {
  resolve('aaa');
});

testThen3
  .then(() => {
    return {
      then: function (resolve, reject) {
        resolve('bbb');
      },
    };
  })
  .then((res) => console.log(res));
```

可以 catch 一起写，可以分开写。

```js
const p = new Promise((resolve, reject) => {
  resolve(1);
  //   reject("error")
});
// 分开写
p.then(() => {}).catch(() => {});
// 一起写 → 效果是一样的
p.then(
  () => {},
  () => {}
);
```

## 5. catch()

`catch()`也是会返回一个 Promise 的，所以也可以继续链式调用`then()`跟`catch()`的。

```js
const p = new Promise((resolve, reject) => {
  reject('error');
});
p.catch((err) => {
  console.log(err); // err
  return '11';
}).then((res) => console.log(res)); // 11
```

关于 `catch()` 有几个需要注意的地方

![image-20220424225510796](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220424225510796.png)

另外这就产生了独立调用的问题

catch 可以在不写 then 的时候独立写吗？

```javascript
const cPromise = new Promise((resolve, reject) => {
  // resolve(11);
  reject(22);
});

cPromise.then((res) => {});
// 这里会报错 为什么？
// 因为如果相对独立的话， 👆 根本没有实现 reject() 时候的处理
// ❌ 这样独立写在外面会显示报错。
cPromise.catch((err) => {
  console.log(err);
});
```

也就是说你这样写是可以的

```js
const p = new Promise((resolve, reject) => {
  reject('error');
});
p.catch((err) => {
  console.log('err1', err);
});
p.catch((err) => {
  console.log('err2', err);
});
p.catch((err) => {
  console.log('err3', err);
});
```

但是这样写不可以

```js
const p = new Promise((resolve, reject) => {
  reject('error');
});
// ❌
p.then((res) => {
  console.log('res', res);
});
p.catch((err) => {
  console.log('err1', err);
});
p.catch((err) => {
  console.log('err2', err);
});
p.catch((err) => {
  console.log('err3', err);
});
```

### 捕获异常

只要有一个`catch()`在最后，上面所有的 Promise 都可以被 catch 到。虽然大家的 Promise 都不一样，但是只要有一个 catch 就可以 cat 到全部的

```js
const p = new Promise((resolve, reject) => {
  reject('error');
});
// 虽然catch写在了最后，并且下面代码2个新的Promise
// 上面是一个Promise，总共3个不同的Promise。
// 但是都会被最后一个catch到
p.then((res) => {
  console.log(res);
})
  .then((res) => {
    console.log(re);
  })
  .catch((err) => {
    console.log(err);
  });
```

并且 catch 会捕获从上到下的全部异常。兜底一样。

那么如果在`then()`里面发生了异常怎么办？难道写 reject？

```js

const p = new Promise((resolve, reject) => {
   resolve(11);
});
p.then((res) => {
 ❌ rejectr(erro)？
  console.log(res);
})
  .then((res) => {
    console.log(re);
  })
  .catch((err) => {
    console.log(err);
  });

// 正确捕获方式

const p = new Promise((resolve, reject) => {
  resolve(11);
});
p.then((res) => {
  throw new Error('error');
  console.log(res);
})
  .then((res) => {
    console.log(re);
  })
  .catch((err) => {
    console.log(err);
  });

```

```javascript
const cPromise = new Promise((resolve, reject) => {
  resolve();
});

cPromise
  .then((res) => {})
  .then((res) => {
    throw new Error('then error message');
  })
  .catch((err) => {
    console.log('err:', err); // err: Error: then error message
  });
```

### 返回值

那么 `catch()` 有没有返回值？

`catch()`也是会返回一个 Promise 的，所以也可以继续链式调用`then()`跟`catch()`的。

```javascript
const cPromise = new Promise((resolve, reject) => {
  reject('111');
});

cPromise
  .then((res) => {
    console.log('res:', res);
  })
  .catch((err) => {
    console.log('err:', err); // err: 111
    // 答案就是有的 原理和上面一样
    // return 回来的其实一个Promise新的resolve
    return 'catch return value';
  })
  .then((res) => {
    console.log('res result:', res); // res result: catch return value
  })
  .catch((err) => {
    console.log('err result:', err);
  });
```

基本结论就是这些带

## 6. finally()

ES9 新增的，以前没有。无论 Promise 是 fulfilled 还是 rejected 状态。finally 都会被执行。

在没有 finally 之前，要想实现这个无论成功 or 失败都会被执行的逻辑。

是需要写。

```js
const finallyPromise = new Promise((resolve, reject) => {
  resolve(11);
  //   reject(22);
});

finallyPromise
  .then((res) => {
    console.log('res', res);
    foo();
  })
  .catch((err) => {
    console.log('err', err); // err 22
    foo();
  });

function foo() {
  console.log('无论成功失败我都会执行的！'); // 无论成功失败我都会执行的！
}
```

有了 finally 之后

```js
const finallyPromise = new Promise((resolve, reject) => {
  // resolve(11);
  reject(22);
});

finallyPromise
  .then((res) => {
    console.log('res', res);
  })
  .catch((err) => {
    console.log('err', err); // err 22
  })
  .finally(() => {
    console.log('无论成功失败我都会执行的！'); // 无论成功失败我都会执行的！
  });
```

## 7. Promise.xxx 类方法

### 7-1 Promise.resolve()

首先要了解 JS 有实例方法和类方法的区别。这跟 java 的 static 静态方法，和普通方法区别差不多。类方法就是挂载在类上面的。不用实例化，可以直接调用。JS 的类方法都是在`Promise.prototype`上的。

```js
// 实例方法
const promise = new Promise((resolve) => {
  resolve(11);
});

// 类方法
Promise.resolve();
```

那么这个`Promise.resolve();`类方法是什么呢

主要用于只有成功 resolve 的时候，快速就写出来了。不必实例化了。

```js
Promise.resolve(11).then((res) => {
  console.log(res);
});
```

上面的代码就相当于

```js
const promise = new Promise((resolve) => {
  resolve(11);
});
promise.then((res) => {
  console.log(res);
});
```

可以更简洁，更好。

#### 用途

主要用于已经有了一个内容，想转换成 Promise 对象。

以前都是一系列操作，比如异步请求，会新建一个 Promise。如果已经有了一个结果了，可能读取是本地的文件。然后使用 promise 返回出去。这样没有必要新建一个 Promise 对象。

```js
// before
const data = ['aa', 'bb', 'cc'];
const promise = new Promise((resolve) => {
  resolve(data);
}).then((res) => {
  console.log(res);
});

// 🆕
const data = ['aa', 'bb', 'cc'];
Promise.resolve(data).then((res) => {
  console.log(res);
});
```

### 7-2 Promise.all()

概念，all 里面放的是一个可迭代对象。

`Promise.all()`这个 Promise 的状态，是由 p1,p2,p3 决定的。

只要有 1 个被 rejected 了，整体就是失败了。

全部都是 fulfilled，才是 fulfilled。

```js
const p1 = new Promise((resolve, reject) => {
  resolve(11);
});

const p2 = new Promise((resolve, reject) => {
  resolve(22);
});

const p3 = new Promise((resolve, reject) => {
  resolve(33);
});

// 这个Promise的结果是由p1,p2,p3的结果来决定的
Promise.all([p1, p2, p3]).then((res) => {
  console.log(res); // [ 11, 22, 33 ]
});
```

### 7-3 Promise.allSettled()

略，很简单。对比 all 来看。

### 7-4 Promise.race()

略，很简单。对比 any 来看。

### 7-5 Promise.any()

略，很简单。对比 any 来看。
