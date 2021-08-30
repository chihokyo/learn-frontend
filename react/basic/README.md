# React初级入门

## 8月30日再开

组件化模式 

命令式编码 → 让你干嘛你干嘛

声明式代码 → 不用我命令 你自己会察觉到

JSJQ那种原生操作DOM会浪费大量资源，因为每一次都是更新都是重新渲染全部的页面。

bable的作用

- ES6 → ES5
- JSX → JS

核心库

1. react.js：React核心库。　**引入核心库，要先引入**

2. react-dom.js：提供操作DOM的react扩展库。上面引入了这个才可以，用于react操作DOM。

3. babel.min.js：解析JSX语法代码转为JS代码的库。最后的JSX转换

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>hello_react</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入react核心库 多了一个React -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM 多了一个ReactDOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel" > /* 此处一定要写babel 而不是写jsx */
		//1.创建虚拟DOM
		const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串 这就是JSX */
		//2.渲染虚拟DOM到页面（虚拟DOM，容器）
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
</body>
</html>
```

↑ 写的都是最基础的引入方式，是为了学习语法，真正开发的时候是不推荐这样直接引入的，因为浏览器在遇到`<script type="text/babel" >`的时候才会进行翻译。

```
ReactDOM.render(VDOM,document.getElementById('test'))
ReactDOM.render(VDOM2,document.getElementById('test'))
```

上面的操作不是追加，而成了替换。

创建虚拟DOM2种

- JS

```
不需要以下了
<script type="text/javascript" src="../js/babel.min.js"></script>
<script type="text/babel" >
React.createElement(标签名,属性,内容);
```

按照这样写法，无限包含下去。怎么办。

```
const vDom1 = React.createElement('h2',React.createElement(在这里无限嵌套),内容)
```

- JSX

虽然这个本质，就是上面的JS语法糖。

```html
<script type="text/babel" > /* 此处一定要写babel */
		//1.创建虚拟DOM 用()这样表示一个整体 这样更像一个整体
		const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
			<h1 id="title">
				<span>Hello,React</span>
    		</h1>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```

### 虚拟DOM PK 真实DOM

```jsx
//1.创建虚拟DOM
const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
    <h1 id="title">
        <span>Hello,React</span>
    </h1>
)
// 渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))

// 2.创建真实DOM
const TDOM = document.getElementById('demo')
console.log('虚拟DOM',VDOM);
console.log('真实DOM',TDOM);
debugger; // 在这里可以看出真实DOM会有很多不需要的属性很重 
// console.log(typeof VDOM);
// console.log(VDOM instanceof Object);
/* 
		关于虚拟DOM：
		1.本质是Object类型的对象（一般对象 因为不是数组对象，也不是函数对象）
		2.虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。
		3.虚拟DOM最终会被React转化为真实DOM，呈现在页面上。
*/
```

为什么不用XML，因为是这个XML的标签数据结构性的内容比数据还多。特别繁琐，没有效率。

### jsx语法规则

```
1.定义虚拟DOM时，不要写引号。→ 不是字符串，不用加引号
2.标签中混入JS表达式时要用{}。 id={myId.toLowerCase()} → 规则
3.样式的类名指定不要用class，要用className。
4.内联样式，要用style={{key:value}}的形式去写。→双括号 {}第一层表示js{}第二层包裹表示写一个style对象
5.只有一个根标签 直接写不行，jsx不能有多个根标签。只能包一层
6.标签必须闭合
7.标签首字母
	(1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
	(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。

```

关于5的深入理解

```jsx
const VDOM = (
    <h2 className="title" id={myId.toLowerCase()}>
        <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
    </h2>
    <h2 className="title" id={myId.toUpperCase()}>
        <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
    </h2>
    <input type="text"/>
)
```

上面错误的，因为h2和input平级，相当于有2个根标签了。修改如下

```jsx
const VDOM = (
    <div>
        <h2 className="title" id={myId.toLowerCase()}> // 2个id不能一样
            <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
        </h2>
        <h2 className="title" id={myId.toUpperCase()}> // 2个id不能一样
            <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
        </h2>
        <input type="text"/>
    </div>
)
```

关于7

虽然可以自造标签，但是不被允许。

首字母大小 ➡️ 可能误认为是一个组件

jsx小演化

```jsx
const VOM = {
    <div>
        <h1>JS</h1>
        <ul>
            <li>REACT</li>
            <li>VUR/li>
            <li>AN/li>
        </ul>
    </div>
}
ReactDOM.render(VOM, document.getElementById('test'))
```

传入数组，会自动遍历。但这不行。

这里扯出来一个问题，什么是表达式？什么是语句？

一言以蔽之：**有返回值的都是表达式。**

```
1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
    下面这些都是表达式：
    (1). a
    (2). a+b
    (3). demo(1)
    (4). arr.map() 
    (5). function test () {}
2.语句(代码)：
    下面这些都是语句(代码)：
    (1).if(){}
    (2).for(){}
    (3).switch(){case:xxxx}
```

所以就可以改写成 这里实际上用的是`arr.map()`,并且遍历的时候都要有唯一值。

```jsx
//模拟一些数据
const data = ['Angular','React','Vue']
//1.创建虚拟DOM
const VDOM = (
    <div>
        <h1>前端js框架列表</h1>
        <ul>
            {
                data.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))
```

### 模块&组件

模块 → 一个JS文件

组件 → 更加细分代码+资源（html+css+js+img..）实现组件复用。

## 组件

### 函数式组件

这里的函数这样直接进行渲染写**不行**

```
ReactDOM.render(MyComponent,document.getElementById('test'))
```

小写&没有结束标签也不行

```
ReactDOM.render(<myComponent>,document.getElementById('test'))
```

这个函数本质就是创建了一个对象。可以用bable，验证。**函数名就是组件名。**

[babel官网编译在线转换](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.15.3&externalPlugins=&assumptions=%7B%7D)

![](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210830145208.png)

```jsx
//1.创建函数式组件
function MyComponent(){
    console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
    return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))
/* 
	执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
	1.React解析组件标签，找到了MyComponent组件。
	2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
*/
```

### 类式组件

**类名就是组件名**

- 类必须要继承`React.Component`才能成为一个组件
- 必须要写`render()`
- `render()`必须要有返回值

```jsx
class MyComponent extends React.Component {
    render(){
       return <h2>我是用函数定义的组件(适用于【复杂组件】的定义)</h2>
    }
}
```

```jsx
//1.创建类式组件
class MyComponent extends React.Component {
    render(){
        //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
        //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
        console.log('render中的this:',this);
        return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
    }
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))
/* 
	执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
		1.React解析组件标签，找到了MyComponent组件。
		2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
		3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
*/
```

为什么没有实例调用`render()`，却能执行？

因为和上面一样，找到了组件名(`<MyComponent/>`)之后→随后React帮你new出来了该类的实例，并通过该实例调用到原型上的`render()`方法。

> **如果你的组件有状态，那么就是复杂组件，没有就是简单组件。**

人 的 状态 影响 行为

组件 的 状态 驱动 页面

## 组件实例三大个核心属性

组件实例对象，不是类身上，而是实例身上的。

class 定义的 才有 → 实例 → 才有 →属性

上面的function不能，但最新的hooks有。后面再说。

### state



























--------------



## 1. 环境安装

- 引入js文件
- 通过脚手架工具来编码（脚手架很多，不必纠结。）

## 2. 虚拟DOM

创建虚拟dom元素，将虚拟dom引入到真是的dom容器中

1创建虚拟DOM元素

2将虚拟DOM元素渲染到真实的DOM容器中

- react js 核心库

- react-dom.js 提供操作dom的拓展库

- bable，es6语法的转移 jsx→js

### 创建的2种方式

<u>此处有代码</u>

```javascript
	// 第一种渲染方式,text/javascript
    const msg1 = 'I like React1'
    const myid1 = 'chinhokyo1'
    // 1.创建虚拟dom
    // 这个是本质，最后都会转换到这里面向对象
    const vDom1 = React.createElement('h2',{id:myid1.toLowerCase()},msg1.toUpperCase())
    debugger
    // 2.渲染
    ReactDOM.render(vDom1,document.getElementById('test1'))
    </script>

    <script type="text/babel">
    // 第二种渲染方式,text/babel
    const msg2 = 'I like React2'
    const myid2 = 'chinhokyo2'
    // 1 创建虚拟dom
    const vDom2 = <h3 id={myid2.toLowerCase()}>{msg2.toUpperCase()}</h3>
    debugger
    // 2 渲染虚拟dom
    ReactDOM.render(vDom2,document.getElementById('test2'))
```

关于渲染

```
// 虚拟DOM + 渲染容器DOM
ReactDOM.render(element, container[, callback])
```

虚拟dom最后都会渲染成真实DOM

可以发现真实DOM更重，虚拟DOM**只有在渲染的时候**才会更新页面。

### JSX

JavaScript ＋ XML = JSX。**浏览器无法直接识别jsx**，所以需要babel

用来创建虚拟的DOM元素对象，既不是字符串，也不是xml标签。最终就是一个对象。

标签名任意，属性名任意。是一种扩展。

在测试的时候可能需要编译会有延迟慢的反应，但是在项目中发布的时候一般都是提前编译好的。所以就不是很慢。

## 3. 模块化

### 模块

特定功能的js文件就是一个模块

主要用的是es6的语法。

> 什么是数据，就是**变量**，对数据的操作是什么呢？就是**函数**。
>
> 这个函数和变量如何对外暴露提供功能呢。这就是**对象**。
>
> 为什么要有这样的模块呢，是因为js代码越写越多越大，那么就要像外面进行暴露。提高效率和进行复用。
>
> 这就是对模块的另一个理解。个人感觉还蛮有意思的。

### 组件

组件是什么呢。

一个页面的局部功能模块。分分分，解耦的一种方式。

组件是包括了html css js 三要素。所有资源的集合就是组件。

### 组件化

做项目的时候是以组件的方式实现，这就是组件化。

也都是为了对应日益复杂增大的项目本身所拆分出来的思想。

## 4. 面向组件

面向过程，面向对象，面向模块，面向组件。

React就是一个面向组件化的构成。

为了跟html标签区分，开头大写。

#### 自定义组件

定义组件

方式1 : 工厂函数适用于简单组件（如果不需要状态state，使用简单模式更简洁。效率高，无需创建对象）

```javascript
// 方式1 工厂函数(简单组件)
function MyComponent(){
// 既然渲染的是虚拟dom，所以这个时候return的就应该是虚拟dom
// return <h2>这个地方就是组件</h2>
return <h2>lalalal</h2>  
}
// 渲染组件标签
ReactDOM.render(<MyComponent/>, document.getElementById('root'))
```

方式2 : 类组件适用于复杂组件

这个相对复杂，因为要。创建实例。这个复杂功能多厚重。

```javascript
// 方式2 ES6类组件（复杂组件）

class MyComponentClass extends React.Component {
  render () {
    return  <h2>复杂组件</h2>  
  }
}

// 渲染组件标签
ReactDOM.render(<MyComponentClass/>, document.getElementById('test2'))
```

## 5. 三大属性

### 1. state

类型对象，组件又是状态机。

**初始化状态**

**读取某一个状态时**

**更新状态** 组件页面自动更新

这三个阶段，执行的时候很重要。

个人感觉，在状态这里有三种。但是在监听事件的时候由于渲染已经成功，这个时候新增的实例化的方法this的指向就会变成undefined，

所以需要在初始化constructor进行对方法的绑定

```javascript
class Like extends React.Component {
      
      // es6语法 初始化
      constructor (props) {
        // 调用父类型的函数传递props
        super(props)
        // 初始化状态,这是一个对象
        this.state = {
          isLikeMe: true
        }
        // 将新增方法强制绑定为组件对象
        // !!!这里最难理解
        this.handleClick = this.handleClick.bind(this)
      }

      /* 到这里是会报错的，因为这里的this并不是组件对象了
      * 新增的方法this默认不是组件对象，而是undefined
      * 为了改变这个状态，就在上面的handleclick里面bind到了this
      * 这个时候handleClick并没有直接被调用，而是在初始化函数里被调用的，那么指向肯定就是没有问题
      */
  
      handleClick () {
        console.log(this)
        // 获取状态
        console.log(this.state.isLikeMe)
        const isLikeMe = !this.state.isLikeMe
        console.log(isLikeMe)
        // 更新状态
        // this.setState({isLikeme:isLikeme}) ===>>> this.setState({isLikeme})
        this.setState({isLikeMe})
      }

      render () {
        console.log(this.state)
          const {isLikeMe} = this.state
          // 用的大写，用于区别原生点击事件 
          // onClick PK onclick
          // this：组件对象
          return <h2 onClick={this.handleClick}>{isLikeMe?'你爱我':'我爱你'}</h2>
      }
    }

    // 2.渲染组件标签
    //  <Like/> ====>>>> <Like></Like>
    ReactDOM.render(<Like/>, document.getElementById('root'))
```

**话说，任何的框架都是套路。明白了套路，就是知道了框架。至于框架的实现，其实就是拿基础语言 + 自己定义的套路**

### 2. props

*props*是三大属性之一。都是对象类型。

要指定类型和默认值的话，需要引入一个库。建议自己一定要看这个官方文档。

参考官方文档：https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html

> 补充一个tips 扩展运算符 关于...的作用 其他网站的基本都看不懂
>
> 打包 数组or对象给打包起来
>
> 解包 数组or对象给解包起来

关于打包。

```javascript
function(...params){}
function(1,3,4)()
// 相当于把1，3，4打包在了params这里形成了一个数组
```

关于解包，这其实就是一个解包的过程

```javascript
// ReactDOM.render(<Person name={p1.name} age={p1.age} gender={p1.gender}/>,document.getElementById('test1'))
ReactDOM.render(<Person {...p1}/>,document.getElementById('test1'))
// 比如有个数组
const arr1 = [1,2,3]
const arr2 = [6,1,2,3,9] =====>>> const arr2 = [6,...arr1,9]
```

### 3. refs

这里参考一下案例7，感觉就是跟vue一样，是用来标识定位

看网上教程，这个refs又有了新的用法。但是本质还是没变的。

这些框架的API经常变化，但其实事实上只是用法上稍微有了点变化，想要实现的原理几乎不会变化。比如要取特定的实例的值，要获得这个实例，那么基本上就是围绕着这个目的进行的变化，更简便的写而已。

状态是组件内部状态state，props是外部的，外部的数据，写标签的时候进行传递的。

无论是内部还是外部改变，那么组件本身都要改变。

## 6. 组件化Code思路

> 1 **拆分组件**，看看页面有几个组件这样。
>
> 2 **实现静态组件**，静态的先实现。
>
> 3 **实现动态组件**。
>
> 动态显示初始化数据
>
> 交互功能（监听事件）

如果是以todolist做例子的话。

### 第1步。拆分组件，拆分成三个部分

```javascript
class App extends React.Component {
        render () {
          return ()
        }
      }

      class Add extends React.Component {
        render () {
          return ()
        }
      }

      class List extends React.Component {
        render () {
          return ()
        }
      }

ReactDOM.render(<App />, document.getElementById('root'))
```

### 第2步。静态呈现。

```javascript
class App extends React.Component {
        render () {
          return (
            // 一个组件只能有一个根标签
            <div>
              <h1>TodoList</h1>
              <Add />
              <List />
            </div>
          )
        }
      }

      class Add extends React.Component {
        render () {
          return (
            <div>
              <input type="text" name="" id="" />
              <button> add #</button>
            </div>
          )
        }
      }

      class List extends React.Component {
        render () {
          return (
            <ul>
              <li>jq</li>
              <li>js</li>
              <li>vue</li>
              <li>react</li>
            </ul>
          )
        }
      }

      ReactDOM.render(<App />, document.getElementById('root'))
```

### 第3步。动态组件

那么数据存储在哪个组件上呢，因为这个模式是列表，所以数据应该放在APP，因为APP是相同的父组件

看组件是某个组件需要，还是某些组件需要。如果是某些组件，那么就要找共同的父亲。

此处放个代码连接。

## 7. 获取表单

几乎就都实现了。

原生onchange事件在失去焦点触发

但是React里面不是。

受控组件 表单项输入数据自动继承状态

非受控组件 需要手动读取表单输入框的 数据

非受控组件自己读取。所以在操作的时候是**读取**

```javascript
用户名：<input type="text" ref={input => this.nameInput = input} /> <br/>
```

受控组件自己去控制状态

```javascript
密码：<input type="password" value={this.state.pwd} onChange={this.handleChange}/><br/>
```

## 8. 组件生命周期

**官方文档**：https://zh-hans.reactjs.org/docs/react-component.html

官方这里有图谱，描述了生命周期的整个过程。

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

是对象的生命周期

jq就是那种命令式编程。所有的工作都要你来做，都是你自己控制没有自己执行。

但是react这些框架就是声明编程。其实已经定义好了整个流程，声明的阶段，你几乎不用控制这些。

**所以才有了生命周期。**

什么是生命周期函数，也称为钩子。在特定时间进行调用。

回调函数就是你定义的，你没有调用，但最终执行了。

render方法是你定义的，但是你没有调用，但最终执行了

这里是一个完成的React生命周期。

!(https://raw.githubusercontent.com/chihokyo/image_host/master/20200911155155.png)

其实最主要的就是挂载前，挂载中，挂载后。

![](https://raw.githubusercontent.com/chihokyo/image_host/master/20200911154242.png)

补充一个写法问题

一般类组件里面

*render*写在最下面

*constructor*写在最上面

生命周期跟写的函数顺序无关，就是框架执行顺序而已。有部分生命周期函数并没有写，因为涉及其他父子组件传递数据问题。

```javascript
class Life extends React.Component {

    constructor(props) {
        super(props)
        // 初始化状态
        this.state = {
            opacityStatus: 1
        }

        this.handlePause = this.handlePause.bind(this)
    }

    handlePause() {
        // 这里会直接删除节点
        // 定时器会造成内存泄漏
        console.log('开始删除node节点')
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    
    // 【生命周期】挂载之前 执行1次，用于初始化
    componentWillMount() {
        console.log('生命周期[挂载之前]：componentWillMount（）')
    }

    // 【生命周期】挂载 执行1次，用于初始化
    componentDidMount() {
        console.log('生命周期[挂载了]：componentDidMount（）')
        console.log('定时器开始执行')
        this.intervalId = setInterval(function () {
            /*
                紧急注意! 因为是定时器，所以默认的this指向为window
                这里如果要改变指向2种做法
                1 使用箭头函数
                2 bind(this) ==>> 这个this就是生命周期函数的this componentDidMount
            */
            console.log('定时器执行了')
            let opacityStatus = this.state.opacityStatus
            opacityStatus -= 0.1
            if (opacityStatus <= 0) {
                opacityStatus = 1
            }
            // 这里一定要记得更新状态
            this.setState({ opacityStatus })
        }.bind(this), 200)
    }

    // 【生命周期】将要更新
    componentWillUpdate() {
        console.log('生命周期[将要更新]：componentWillUpdate（）')
    }
    
     // 【生命周期】已经更新
    componentDidUpdate(){
        console.log('生命周期[已经更新]：componentDidUpdate（）')
    }

    // 将要卸载 执行1次，用于死亡
    // 清理定时器
    componentWillUnmount() {
        console.log('生命周期：componentWillUnmount（）')
        clearInterval(this.intervalId)
    }


    render() {
        console.log('生命周期：render（）')
        // const {opacity} = this.state
        const opacity = this.state.opacityStatus
        return (
            <div>
                <h3 style={{ opacity: opacity }}>{this.props.msg}</h3>
                <button onClick={this.handlePause}>暂停</button>
            </div>
        )
    }
}
ReactDOM.render(<Life msg="react easy" />, document.getElementById('root'))
```

## 9. 虚拟DOM&DIFF()

虚拟dom的目的就是为了更少的去操作真实dom

diff就是一种判断算法，看哪里需要更新，哪里不需要更新。

在组件进行render的时候会计算哪些区域需要更新，哪些区域不需要更新。

```javascript
class Time extends React.Component {

            constructor(props) {
                super(props)
                this.state = {
                    date: new Date()
                }
            }

            componentWillMount() {
                console.log('componentWillMount()')
                setInterval(() => {
                    this.setState({
                        date: new Date()
                    })
                }, 1000)
            }

            render() {
                console.log('render()')

                return (
                    <p>
                        HelloWorld
                        <input type="text" name="" id="" />
                        <span> 现在时间是：{this.state.date.toTimeString()}</span>
                    </p>
                )
            }

        }

        ReactDOM.render(
            <Time />,
            document.getElementById('root')
        )
```

这些

 【初期显示】

创建虚拟DOM树→真实DOM树→绘制页面显示

【更新显示】

*setState()*更新状态→重新创建虚拟DOM树

→新旧对比差异 =====>>>>  **这里就需要DIFF算法，做到最小范围内的重绘**→

→更新差异对应真实DOM→局部重新绘制

查找全局下载根目录

```shell
$ npm root -g
/usr/local/lib/node_modules
$ cd /usr/local/lib/node_modules
```

## 10. 项目安装

```shell
npx create-react-app my-app
cd my-app
npm start
```

关于这个文件的解释

```javascript
import * as serviceWorker from './serviceWorker';
serviceWorker.unregister();

/*service worker是在后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务。
registerServiceWorker就是为react项目注册了一个service worker，用来做资源的缓存，这样你下次访问时，就可以更快的获取资源。而且因为资源被缓存，所以即使在离线的情况下也可以访问应用（此时使用的资源是之前缓存的资源）。
但有一点要注意，registerServiceWorker注册的service worker 只在生产环境中生效（process.env.NODE_ENV === 'production'），所以开发的时候，可以注释掉。
当然了，在生产环境中，你也可以选择使用或者不适用这个功能.
*/
```

接下来是App.js

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// // 下面这个写法也可以
// import React from 'react'
// // import React, { Component } from 'react'
// import logo from './logo.svg'
// import './App.css'

// class App extends React.Component {
//   render () {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">
//             Hello React
//           </h1>
//         </header>
//         <p className="App-intro">
//           to!!
//         </p>
//       </div>
//     )
//   }
// }

// export default App
```

## Redux

redux其实是一个js库（并不是**React**专用的库）

angular和vue都可以用，是一个状态管理的js库

用于管理多个组件中共享状态。

在大型项目中，redux这种状态管理比较适用。

### 读取状态

React Component → Store

### 更新状态

React Component →  ActionCreators → Store → Reducer

分发对象 dispatch()