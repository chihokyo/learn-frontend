# DOM 和 Node 傻傻分不清楚的人

因为自己每一次都分不清楚，现在趁着有记忆。写一下自己理解的。

首先 DOM（**D**ocument **O**bject **M**odel）是什么？

DOM Tree 其实是浏览器解析完 HTML 之后就会形成的一个抽象 Object，这个 Object 就是 JS 和 HTML 之间的桥梁。

**JS 之所以能操作 HTML，就是有了这个 DOM**，具体要先看我写的这篇文章。

[浏览器解析过程]() 看完这个理解更深。

## 继承图

这个图必须要看懂，因为这个包含了几乎所有的。

一个 HTML 除了标签之外，不是还有一些注释和普通文本呢？那么都在文档里面，就有共同的特性。

![image-20220831161156567](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220831161156567.png)

那么如何区别 Node 和 Element 呢？其实也很简单，可以发现 Node 里面有的方法因为继承特性，所以 Node 有的，那么 HTMLElement 肯定就有。所以 Node 范围更大。

## 导航

其实就是如何通过一个 node，拿到其他的 node。这个就是导航。

![image-20220831162047257](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220831162047257.png)

Node 和 HTMLElement 的导航主要 API 就是如图。

![image-20220831163223678](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220831163223678.png)

所以这次终于可以区分清楚

- childNodes → 表示节点的，所有获取所有子节点
- children → 表示元素的，只会获取所有的**HTML**元素

代码演示一下。

```html
<body>
  <!-- 我是普通的注释 -->
  我只是普通的文本

  <div class="box">
    <p>我是P</p>
    <span>我是span</span>
  </div>

  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
</body>

<script>
  // 这里document是Document的实例
  const bodyEl = document.body; // HTMLElement

  // 对比Node：获取body内的所有子节点（包括杂七杂八的）
  console.log(bodyEl.childNodes); // 返回的是NodeList类型，类数组
  // 对比HTML：获取body内的所有HTML子节点（只包括html特征的
  console.log(bodyEl.children); // 返回的是NodeList类型，类数组
</script>
```

下面是结果的对应

![image-20220831162736589](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220831162736589.png)

下面写一个 Q&A

## 小总结

**Q： document 是啥？**

A 其实就是整个文档 Document 这个类的实例，document。

可以直接在 console 打印一下，`console.log(document)`，会发现整个文档都打印出来了。打印`console.log(Document)`，会发现打印出来的是一个类（JS 叫构造函数）

**Q：DOM 是啥？**

DOM 其实就是一个模型，充当 Document 和 JS 的桥梁的东西。JS 想操作上面所有的东西就是需要 DOM，只是一个**抽象概念**，不涉及具体的 API。

**Q：Node 和 HTMLElement 区别？**

Node 包括网页上所有的杂七杂八的，包括注释等等。HTMLElement 只会包裹有 HTML 标签特征的，比如都有标签<>这种形式的，都可以设置 id，class 等等。

## 导航弊端

导航有啥弊端的，比如我们要获取任一一个元素，难道还要导航一个个嵌套的去拿啊。

```js
const bodyEl = document.body;
bodyEl.children[0];
bodyEl.children[1];
// 这样一个个拿效率太低了,尤其嵌套很深的情况。
```

那么就需要 API 登场了，DOM 里面有很多查询元素的方法。

| **方法名**             | **搜索方式** | **可以在元素上调用?** | **实时的?** |
| ---------------------- | ------------ | --------------------- | ----------- |
| querySelector          | CSS-selector | ✔                     | -           |
| querySelectorAll       | CSS-selector | ✔                     | -           |
| getElementById         | id           | -                     | -           |
| getElementsByName      | name         | -                     | ✔           |
| getElementsByTagName   | tag or '\*'  | ✔                     | ✔           |
| getElementsByClassName | class        | ✔                     | ✔           |

**什么叫可以在元素调用？**

意思就是说不是通过`document.xxx()`这样，而是直接通过元素。👇🏻

而其他的都可以

```js
const bodyEl = document.body;
// ❌ bodyEl.getElementById();
// ❌ bodyEl.getElementsByName();
// ✅ 只能通过这种
document.getElementById();
document.getElementsByName();
```

**什么是实时的？**

意思就是如果在下面新增了元素之后，会不会实时的**获取**到。

```js
const lis = document.querySelector("li");
// 此时在下面又新增了一个li元素
....
querySelector是获取不到新增的li的。
```
