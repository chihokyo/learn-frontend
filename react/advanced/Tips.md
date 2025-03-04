# React随时一些小Tips

## 1 render小技巧

怎么说呢，以前我总以为是setState才能重新渲染，事实上，在你需要重新获取数据的时候，

直接调`用render()`也是可以实现同样的效果的。

![image-20220203171522223](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220203171522223.png)

关于严格模式下 `render()`总会调用2次的，关上就是1次了。

![image-20220222141238517](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220222141238517.png)

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

## 8 传递参数

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

## 15 用react实现slot

slot是什么呢。就是那种一个页面，比如导航栏，看起来都是一样的

```
左 中 右
```

但其实内容不一样，共通的结构，不同的细节。

在vue里就是用的slot实现的，但是react里怎么实现呢？

![image-20220208135224514](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220208135224514.png)

## 16 属性展开

Spread Attributes 自己查 反正都超级方便跟。。。相关。

## 17 context

跨组件开发

- 类组件实现
- 函数组件实现

啥叫跨组件，就是父给子，子给孙，孙给其他啥的这种就叫跨组件。

如果没有的话，需要一层一层的，但是跨组件可以直接用。

步骤如下

- 创建context对象
- 包裹起来  <Provider>
- 传入数据

类式组件是这样的

![image-20220302153549603](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220302153549603.png)

函数组件

![](https://raw.githubusercontent.com/chihokyo/image_host/develop/20220303170608.png)

## 18 再看看setState

首先源码在哪里？

![image-20220208225805959](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220208225805959.png)

关于异步更新问题

**为什么是异步的?**

大神的给的答案

**如何获取异步数据?**

俩方法

![image-20220208230926969](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220208230926969.png)

其实`setState()`既有可能是同步的 也有可能是异步的，具体要看源码。

还有就是

![image-20220208233417430](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220208233417430.png)

还有一点为什么setState里面数据不可变的问题

![image-20220209154733303](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220209154733303.png)

```jsx
// 2.推荐做法
const newFriends = [...this.state.friends]; // 这里的newFriend相当于拷贝了一份 就是新的内存 
newFriends.push({ name: "tom", age: 30 });
this.setState({
  friends: newFriends
})
```

## 19 关于key的问题

其实key解决的本质就是虚拟DOM树重绘的问题。

![image-20220209000605061](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220209000605061.png)

比如下面这个有差别的

```jsx
// key在匹配子元素的时候，在插入的时候会有优化
insertList() {
    this.setState({
      // movies: ['3', ...this.state.movies], 从前面添加 这时候index全部打乱
      movies: [...this.state.movies, '3'],
    });
  }
```

## 20 关于Purecomponent

PureComponent是为了解决每次判定类组件是否更新的时候，要手动实现`shouldComponentUpdate`

**PureComponent** 这个只能解决类组件，函数式组件不适用，不行的。但是函数式组件可以用`memo()`

比如

## 21 表单默认行为

![image-20220210005857124](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220210005857124.png)

## 22 关于到底什么是受控组件

其实受控组件非受控组件谈论的都是表单！

关于什么是受控组件的问题，单向数据流。

![image-20220210010555686](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220210010555686.png)

> 也就是说你**输入的东西**和**你写入的东西** 本来是不一致的，而是通过上面的一连串行为才改变的。
>
> 所以上面那个input就是受控组件，接受我们的控制。

而非受控其实本质就是直接DOM操作 是不推荐的，不可取的！！

## 23 高阶组件

高阶函数是什么，传入函数返回函数。

高阶组件是什么，一个函数，传入组件返回组件

关于commonJS的导入

即使export导出了，其实导入的时候名字也能自己取的

![image-20220210155128656](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220210155128656.png)

高阶可以自定义

 	

高阶组件使用之前之后的的区别。

使用前 

```jsx
import React, { PureComponent } from 'react';

class Home extends PureComponent {
  render() {
    return (
      <h2>
        Home:
        {`nickname is  ${this.props.nickname} age is ${this.props.age}`}
      </h2>
    );
  }
}

class About extends PureComponent {
  render() {
    return (
      <h2>
        About:{`nickname is  ${this.props.nickname} age is ${this.props.age}`}
      </h2>
    );
  }
}

class App extends PureComponent {
  render() {
    return (
      <div>
        <Home nickname="chin" age={90} />
        <About nickname="chin2" age={10} />
      </div>
    );
  }
}

export default App;
```

如果这个时候多了一个需求，想给Home和About组件新增加一个属性的话。

```jsx
About:{`nickname is  ${this.props.nickname} age is ${this.props.age}`}
```

如果修改每个组件这样就太不优雅了，于是就使用高阶组件来实现。

```jsx
import React, { PureComponent } from 'react';

function enhanceLevelProps(WraapedComponent) {
  return (props) => {
    return <WraapedComponent {...props} level="100" />;
  };
}

class Home extends PureComponent {
  render() {
    return (
      <h2>
        Home:
        {`nickname is  ${this.props.nickname} age is ${this.props.age} level is ${this.props.level}`}
      </h2>
    );
  }
}

class About extends PureComponent {
  render() {
    return (
      <h2>
        About:
        {`nickname is  ${this.props.nickname} age is ${this.props.age} level is ${this.props.level}`}
      </h2>
    );
  }
}

const EnhanceHome = enhanceLevelProps(Home);
const EnhanceAbout = enhanceLevelProps(About);

class App extends PureComponent {
  render() {
    return (
      <div>
        <EnhanceHome nickname="chin" age={90} />
        <EnhanceAbout nickname="chin2" age={10} />
      </div>
    );
  }
}

export default App;

```

![image-20220211205113492](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220211205113492.png)

## 24 关于redux的基本使用

因为redux不只是react可以用，vue也可以用。

这个有一个纯函数的概念，`reducer()`本质就是一个纯函数

**所以说reduce（state）这里传入的state数据是不能改的！！！**你可以复制一份。

```
纯函数
确定的输入，一定会产生确定的输出; 
函数在执行过程中，不能产生副作用;所谓副作用就是传入的数据不能被修改
```

![image-20220215222721776](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220215222721776.png)

于是最后的完成版本就是这样的。

![image-20220215224046602](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220215224046602.png)

![image-20220215233757128](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220215233757128.png)

一些补充

![image-20220216000617737](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220216000617737.png)

关于导出导入也是可以有多个选择的。

我看了这么多，都不如这个解释的好。

![img](https://pic3.zhimg.com/80/84a649275f15c1d6699482beb4b1318f_1440w.jpg?source=1940ef5c)

## 25 关于redux的react

下面就用一个点击的案例来说明一下如何搭配起来的。

![image-20220217000130292](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220217000130292.png)

上面那个案例，数据是分开的，而且事件不一样，但是其他可能是一样的。

所以现在开始抽离出去。



由于接下来的redux 有点难 决定先放弃一下。大概在16 17 18 的50分钟前

## 26 路由操作

首先来一个hash路由原理，咱们正常用`a`标签的代码。是会造成跳转的。

![image-20220218173036544](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220218173036544.png)

接下来还有一个实现

那就是H5新的接口！

![image-20220218173403243](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220218173403243.png)

## 27 关于Link和Route区别

Link其实就是a连接，Route像是一个组件

![image-20220218180741698](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220218180741698.png)

## 28 关于Route里的Switch&Redirect

![image-20220220232909926](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220220232909926.png)

## 29 关于子路由嵌套

![image-20220220233917656](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220220233917656.png)

## 30 关于history跳转

目前写的跳转都是下面这两个

Link

NavLink

如果想是一个按钮呢？也就是你自己封装一个组件！

用的原理差不多是这样的

![image-20220220235626822](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220220235626822.png)

![image-20220220235755014](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220220235755014.png)

如果执意想用方式二呢？？？

答案！**高阶组件 withRoute(组件)**

![image-20220221001826938](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220221001826938.png)

其实就是给一些普通渲染的组件 + history属性

> 但是上面有一个坑的意思，就是react V6之后就不行了。建议看最新的文档。

那么withRouter的原理呢？

反正看起来所以又是来自react-router-dom，但其实有一部分来自的react-router

![image-20220221002950695](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220221002950695.png)

那么withRouter的源码在哪里，其实在这里了。

感觉这个知识还是蛮多的，看得懂就看得懂，看不懂就拉倒。

## 31 动态路由

可以作为参数传递的一种方式。参数传递！！！！！

**方法1 参数传递**

![image-20220221144937928](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220221144937928.png)

**方法2 search传递** → 已经不推荐了

现在不是很推荐query

![image-20220221161349407](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220221161349407.png)

**方法3 传入对象** → 推荐的

![image-20220221171157378](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220221171157378.png)

>简单的数据传递就用方法1 复杂的就用方法3
>
>2基本上没人用

## 32 react-router-config

因为 Switch组件的作用: 就是**路径和组件**之间的映射关系

一个个switch这样写的 这样写实在太分散了！！

![image-20220221231157105](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220221231157105.png)

`renderRoute()`的本质是什么呢？

![image-20220222114357013](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220222114357013.png)

## 33 ref的一些事情

这个怎么说呢，ref这个其实就是说，目前react的开发不是组件开发吗？

平常都是用数据驱动页面的变化的，页面的数据变化进行render（渲染），但如果不想用数据，而是直接操作dom呢？

这个时候就需要ref，比如我想拿到自己组件的元素，想拿到子组件的元素

下面是类组件

![image-20220322192427479](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220322192427479.png)

但是上面只是针对类组件的，那么函数组件呢？

这就说出来了，ref其实本来就是react管理的，并非一个普通的属性

```jsx
<Home ref={"unnormal"}/> // 并非一般的属性
```

如何解决呢？

答案就是一个高阶函数`forwardRef()`

这是一个高阶函数，传入一个组件，出来一个组件。出来之后这个组件拥有了一个强大的属性，那就是ref！！你不是不让我自己搞吗？于是我自己搞！

![image-20220322201646230](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220322201646230.png)
