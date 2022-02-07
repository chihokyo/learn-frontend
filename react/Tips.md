# React随时一些小Tips

## 1 render小技巧

怎么说呢，以前我总以为是setState才能重新渲染，事实上，在你需要重新获取数据的时候，

直接调`用render()`也是可以实现同样的效果的。

![image-20220203171522223](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203171522223.png)

## 2 组件怎么来的

想要自己写一个组件的话，就需要继承`React.componet`

```javascript
class App extends React.componet{} // 这里可以查看源码
```

![image-20220203171901884](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203171901884.png)

这个函数里面写不写()只是为了告诉它是一个整体。为了表示整体，换行用。

```javascript
class App extends React.Component {
    render() {
        return ()
        return 
    }
}
```

一个组件只能有一个根`<div></div>`

## 3 关于this的一些小九九

并非是组件那个class调用，而是内部`apply()`调用，在这里内部调用是拿不到this的。

下面自己写的函数，其实不是自己调用的，而是React回调给调用的，调用的时候还把this绑定成undefined

所以最后`bind()`绑定了，其实还有其他方法，比如箭头函数。这样即使bind后面在继续使用apply也是可以的！

![image-20220203172802863](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203172802863.png)

而这里不用，因为已经给绑定了。你自己调用的函数啊，和上面那个`onClick()`不一样的！

![image-20220203183054508](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203183054508.png)

## 4 setState初见

`render()`永远不要自己手动调用，既然想要数据，比如都存入到`this.state.xxx`里面。

如果想要页面进行刷新，必须要`setState()`

最后就是这样，这个流程是最最最最重要的。

![image-20220203174125777](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203174125777.png)

## 5 jsx

为什么使用jsx

因为React有一个all in js的思想 逻辑与的能力 flag是true就显示，是false就不显示。

![image-20220203182551670](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203182551670.png)

可以在react显示和不可以在react的jsx显示的类型

## 6 引入css class 属性

引入style的时候要用驼峰表示

![image-20220203221212980](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203221212980.png)

## 7 如何this绑定函数 【重点】

几种方案，绑定自定义的函数

**第1个 显示绑定**

![image-20220203222110498](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203222110498.png)

**第2个 构造器绑定**

因为一旦执行组件，都会执行构造器。这样先绑定好。

![image-20220203222248399](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203222248399.png)

**第3个 箭头函数**

箭头函数从es6开始出现，最大的区别，箭头函数中永远不绑定this，只会找自己最近的上下文this。也就是当前对象，也就是组件。

![image-20220203222832754](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203222832754.png)

**第4个 表达式内部箭头函数** → 最推荐

下面的逻辑！

![image-20220203223423984](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203223423984.png)

## 8

关于传递参数一些好的方法

其实就两个事情就是上面的函数不仅仅给绑定了undefined，还给绑定了event

![image-20220203224646134](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203224646134.png)

## 9 条件渲染那点事儿

使用逻辑运算符快速实现条件渲染，同时还有解决了一个疑问。

![image-20220203230523019](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203230523019.png)

## 10 JSX本质

![image-20220205001246488](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220205001246488.png)

但是黄色框的话需要babel才能解析，下面红色框的无需babel

就可以把

```jsx
<script type="text/babel">
  ↓
<script>
```

其实jsx的本质就是返回一个对象，这个对象就是React.Componet 

所以只要是这样的对象，随便写。

![image-20220205004039642](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220205004039642.png)

Q:如何让虚拟DOM呢 → 真实DOM呢 ？

A: `render()`

```
// jsx -> createElement函数 -> ReactElement(对象树) -> ReactDOM.render -> 真实DOM
        // j
```

## 11 packjson那点事儿

小版本更新

![image-20220206165714481](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220206165714481.png)

## 12 组件划分碎碎念

组件有各种划分

类组件 PK 函数组件。。反正就是按照不同分类标准其实就有各种组件。本身组件没有太大区别。

生命周期在类组件很有用，但是随着Hooks出来，可能用处不大哦。

## 13 什么数据都要写在state里面？

![image-20220207154352726](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220207154352726.png)

![image-20220207154503012](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220207154503012.png)

合起来就是这样的意思

![image-20220207235018827](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220207235018827.png)

## 14 记不住子组件→父组件怎么办？

![image-20220207234405065](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220207234405065.png)