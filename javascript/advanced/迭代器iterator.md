# iterator 迭代器

## 1. 基础概念

所有语言的一个通用的概念

> 数据结构可以被一个对象所迭代，那么这个对象就要做迭代器。相当于穿了一层马甲，这层马甲就是迭代器。

JS 里的迭代器

> 只要符合迭代器协议（iterator protocol），就是迭代器。
>
> 其实就是一个光标，一直向下走。向下走。

![javascript - What is the difference of a real Array and Array Iterator in JS  - Stack Overflow](https://i.stack.imgur.com/5htF9.png)

## 2. 初体验

### 迭代器

**JS 迭代器**这里最重要的就是实现一个`next()`方法，这个方法，会返回一个对象。

```
next()
1.无参 or 1个参数
2.返回值 对象 {done,value}
```

于是下面就是一个迭代器

```js
// 对象 因为①next这个方法 ②又返回了相应的对象
const iterator = {
  next() {
    return {
      done: true,
      value: 1,
    };
  },
};
```

> 下面试着实现一个数组的迭代器

```js
const arr = ['foo', 'bar', 'baz'];

let index = 0;
const iterator = {
  next: () => {
    if (index < arr.length) {
      return {
        value: arr[index++],
        done: false,
      };
    }
    return {
      value: undefined,
      done: true,
    };
  },
};

console.log(iterator.next()); // { value: 'foo', done: false }
console.log(iterator.next()); // { value: 'bar', done: false }
console.log(iterator.next()); // { value: 'baz', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

> ⚠️ 局限性就是，其实这个也没函数，就是单独写一段代码而已。
>
> 如果想用在别的数组上，肯定是要写进一个函数里的。
>
> 所以下面用函数实现一下，实现可以让所有数组都有**迭代器**

### 自己实现

```js
const arr1 = ['foo', 'bar', 'baz'];
const arr2 = [23, 14, 99];
function createArrayIterator(arr) {
  let index = 0; // 注意这里要写在外面，第一次写在next里面了，导致只能迭代第1个
  return {
    next: () => {
      if (index < arr.length) {
        return {
          value: arr[index++],
          done: false,
        };
      }
      return {
        value: undefined,
        done: true,
      };
    },
  };
}

const ite1 = createArrayIterator(arr1);
const ite2 = createArrayIterator(arr2);
console.log(ite1.next());
console.log(ite1.next());
console.log(ite1.next());
console.log(ite1.next());

console.log(ite2.next());
console.log(ite2.next());
console.log(ite2.next());
console.log(ite2.next());
```

## 3. 可迭代对象

上面只是初步体验了什么是迭代器，就是一个可以调用 next 并且返回特定对象的玩意儿。

可迭代对象 PK 迭代器

> - 它和迭代器是不同的概念
> - 当一个对象实现了 iterable protocol 协议时，它就是一个可迭代对象
> - 这个对象的要求是必须实现 **@@iterator** 方法，在代码中我们使用 **Symbol.iterator** 访问该属性

那么什么是可迭代对象呢？其实就是**实现了迭代器的对象**

- 你是一个普通对象
- 你实现了迭代器协议（iterator protocol）❄️ JS 的迭代器协议就是实现某个属性

### 简单思路

上面的意思大概是这样的。

```js
// 如何创建一个可迭代对象
// 就是把你自己写的迭代器直接放在人家对象身上
// before(其实就是想方设法把下面的createIterator就放在info身上)
const info = {
  hobby: ['swim', 'sleep', 'code'],
};

let index = 0;
const createIterator = {
  next: function () {
    if (index < info.hobby.length) {
      return {
        done: true,
        value: info.hobby[index++],
      };
    } else {
      return {
        done: false,
        value: undefined,
      };
    }
  },
};

console.log(createIterator.next());
console.log(createIterator.next());
console.log(createIterator.next());
console.log(createIterator.next());
```

那么我怎么把这俩合并在一起呢？

> [Symbol.iterator] **计算属性名**

🔥 这个就是 JS 的可迭代对象必须实现的属性！！！

**这也是如何验证一个对象是否是可迭代对象的方法**

```js
只要打印一下他的[Symbol.iterator] 属性就可以

const str = 'hello';
console.log(str[Symbol.iterator]);
```

> 那么如何实现呢？

### 具体实现

按照上面的精神指示

- 必须实现 1 个属性 `[Symbol.iterator]` 这个属性是一个方法
- 这个函数必须返回迭代器 （**这个迭代器用于迭代当前对象**

> 💡 可迭代对象 PK 迭代器
>
> 可迭代对象的返回值是一个迭代器，和迭代器不一样，可迭代对象**必须要实现**`[Symbol.iterator]`属性

```js
// 箭头函数版本
// 1 这只是一个普通对象
const obj = {
  hobby: ['swim', 'sleep', 'read'],
  // 2 增加属性
  [Symbol.iterator]: () => {
    // 3 返回值必须是迭代器
    let index = 0;
    return {
      next: () => {
        // ❗️如果不想使用 obj，可以用this代替，但是必须在箭头函数才可以
        // 这里是因为this指向的不是iterableObj 而是迭代器函数，看下面是ite.next() 所以ite
        // 所以要用箭头函数，这样才能向上层作用域寻找 但是，👆🏻的[Symbol.iterator]就不能是箭头函数了
        if (index < obj.hobby.length) {
          return {
            done: true,
            value: obj.hobby[index++],
          };
        }
        return {
          done: false,
          value: undefined,
        };
      },
    };
  },
};

// 4 生成迭代器
const ite = obj[Symbol.iterator]();
console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
```

另外一个版本（其实这个版本主要是考察你对箭头函数 this 的理解，和 this 向上层作用域查找的理解。

```js
const obj = {
  hobby: ['swim', 'sleep', 'read'],
  // 2 增加属性
  // ⚠️ 看这里用的是function哦
  [Symbol.iterator]: function () {
    // 3 返回值必须是迭代器
    let index = 0;
    return {
      // ⚠️ 看这里用的是arrow哦
      next: () => {
        if (index < this.hobby.length) {
          return {
            done: true,
            value: this.hobby[index++],
          };
        }
        return {
          done: false,
          value: undefined,
        };
      },
    };
  },
};

// 4 生成迭代器
const ite = obj[Symbol.iterator]();
console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
```

> 上面对迭代器的基础就告一段落了

## 4. 可迭代类

说一些可迭代类，如何让一个类，天生就可以被迭代呢？

下面代码就是，主要就是实现方法`[Symbol.iterator]`，

```js
Person.prototype.[Symbol.iterator] = function(){}
```

上面是 ES5，👇🏻 是 ES6，以后也都这样写。

```js
class Person {
  constructor(name, age, hobby) {
    this.name = name;
    this.age = age;
    this.hobby = hobby;
  }

  [Symbol.iterator]() {
    let index = 0;
    const ite = {
      next: () => {
        if (index < this.hobby.length) {
          // 注意这里是false debug好久 气死
          return { done: false, value: this.hobby[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
    return ite;
  }
}

const p1 = new Person('why', 18, ['swim', 'sleep']);
const p2 = new Person('hokyo', 28, ['swim', 'read']);

for (const item of p1) {
  console.log(item);
}
for (const item of p2) {
  console.log(item);
}
```

## 5. 中断迭代器

如果你的迭代器，迭代到了某个值，就想让她结束怎么办？

答案，在迭代器里实现**return 方法**！看好了 是方法`return()`，并且必须返回一个对象。

大概是这样的

```js
return: () => {
        console.log('监听迭代器中断才会执行');
        return { done: true }; // ⚠️ 这个必须要加 不然返回值不是对象
},
```

整理全部实现

```js
class Person {
  constructor(name, age, hobby) {
    this.name = name;
    this.age = age;
    this.hobby = hobby;
  }

  [Symbol.iterator]() {
    let index = 0;
    const ite = {
      next: () => {
        if (index < this.hobby.length) {
          // 注意这里是false debug好久 气死
          return { done: false, value: this.hobby[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
      return: () => {
        console.log('监听迭代器中断才会执行');
        return { done: true }; // ⚠️ 这个必须要加 不然返回值不是对象
      },
    };
    return ite;
  }
}

const p1 = new Person('why', 18, ['swim', 'sleep']);
const p2 = new Person('hokyo', 28, ['swim', 'read']);

// for (const item of p1) {
//   console.log(item);
// }
for (const item of p2) {
  if (item === 'swim') break;
}
```

## 6. 原生可迭代对象

JS 有很多数据类型都是原生的可迭代对象

上面也写了验证方法，只要打印一下`console.log(str[Symbol.iterator]);`

```
String
Map
Array
Set
argument
NodeList集合
...
```

## 7. 应用

上面说了这么多，那么迭代器到底有什么用处呢？

**for..of..**

可以使用 for..of..就是可迭代的

**创建一些其他对象时**

```js
const set1 = new Set(iterableObj);
const set2 = new Set(names);
const arr1 = Array.from(iterableObj);
```

**剩余参数**

```js
// before
const info = {
  id: 'uu01',
  age: 88,
  weigt: 50,
};

function foo(...info) {
  console.log(info);
}
foo(...info); // 这样是会报错的 TypeError: Found non-callable @@iterator
// 因为没有实现迭代协议

const info = {
  id: 'uu01',
  age: 88,
  weigt: 50,
  [Symbol.iterator]: function () {
    const values = Object.values(this);
    let index = 0;
    return {
      next: () => {
        if (index < values.length) {
          return {
            done: false,
            value: values[index++],
          };
        }
        return {
          done: true,
          value: undefined,
        };
      },
    };
  },
};

function foo(...info) {
  console.log(info);
}
foo(...info); // 自己实现了 就可以了
```

**展开运算**

因为你的是可迭代对象，所以可以进行展开。

```js
const names = [];
const newName = [...names]; // 因为names是可迭代对象
```

> ⚠️ 特殊
>
> 那就是 ES9 新增的语法，这个不是迭代器搞的，因为迭代器的话可能是迭代 key，也可能是 value。但是 ES9 内部实现了这个展开，把 kv 都给展开了。

```js
const obj = {
  id: 1,
  msg: 'hello',
};
//
for (o of obj) {
  console.log(o); // ❌ 不可以使用for of语法
}

const newObj = { ...obj }; // ✅ 可以使用
```

**解构赋值**

这个也是同理，除了上面的对象。

```js
var [one, two, three] = arr;
```

**Promise.all**

all 里面就是存入的可迭代对象

```js
Promise.all(iterableObj).then((res) => {
  console.log(res);
});
```

yield\*

生成器在讲！这里就割爱了。
