# JS提高 Tips

## 1 作用域提升问题

首先要知道这个ES规范的说法问题，本质上没有变化，只是在说法上可能会有些许变化，但是意思是基本上差不多的。

JS在执行的时候，首先全局会有一个GO的作用域。

这个需要一些图来辅助理解。明天整理。

## 2 代码在内存的执行

加载到内存 → CPU执行 → 根据CPU可能会在开辟空间

内存的生命周期

- 申请空间
- 使用空间 存放啥的
- 不用销毁释放

## 3 具体函数的执行

下面一段代码的奇幻旅程（执行过程）。

```javascript
var msg = 'hello global';
function foo() {
  console.log(msg);
}
function bar() {
  var msg = 'hello bar';
  foo();
}
bar(); // hello global
```

> 这里我只是先画一个整体流程图，不包含细节。

总体说1就是编译阶段生成的，其他都是陆续生成的。

![image-20220326232628199](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220326232628199.png)

## 4 闭包函数又是什么呢？

![image-20220327231220222](/Users/chin/Library/Application Support/typora-user-images/image-20220327231220222.png)

## 5 什么是闭包的内存泄漏？

其实就是**闭包函数地址**和**周围环境的那个函数地址**互相指向对方，导致迟迟不会被销毁！

```javascript
closureFn = null // 这样就可以手动销毁
```

