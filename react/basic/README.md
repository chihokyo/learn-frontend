# React初级入门

## ⭐️新总结

## 1. React特点

组件化模式 

命令式编码 → 让你干嘛你干嘛

声明式代码 → 不用我命令 你自己会察觉到

JSJQ那种原生操作DOM会浪费大量资源，因为每一次都是更新都是重新渲染全部的页面。

bable的作用

- ES6 → ES5
- JSX → JS

### 核心库

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

### 创建虚拟DOM2种

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

## 2. 组件

### 函数式组件（简单组件）

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

### 类式组件（复杂组件）

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
>
> 人 的 状态 影响 行为
>
> 组件 的 状态 驱动 页面

类组件，也就是复杂组件才有状态，类有属性，实例化之后，才有状态。

## 3. 组件实例三大个核心属性

组件实例对象，不是类身上，而是实例身上的。

class 定义的 才有 → 实例 → 才有 →属性

上面的function不能，但最新的hooks有。后面再说。

### 3.1 state

1. state是组件对象最重要的**属性**, **值是对象**(可以包含多个key-value的组合)

2. 组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件，每一次调用render都在渲染)

#### **如何初始化state？**

对类的初始化操作 → 需要`constructor()`

```jsx
constructor(props){
    super(props)
    this.state = true
    this.handleClick = this.handleClick.bind(this);
}
```

如果有多个数据，就需要用对象来获取

```jsx
constructor(props){
    super(props)
    this.state = {
        isLike:true
    }
    this.handleClick = this.handleClick.bind(this);
}
```

#### **如何读取state？**

直接看js语法，就从实例里面获取属性。

```jsx
render() {
    const { isLikeMe } = this.state
    return <h2>{isLikeMe ? '你爱我' : '我爱你'}</h2>
}
```

#### **那么如何触发点击状态？**

首先看原生事件绑定

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Document</title>
	</head>
	<body>
		<button id="btn1">按钮1</button>
		<button id="btn2">按钮2</button>
		<button onclick="demo()">按钮3</button>

		<script type="text/javascript" >
             // 方法1
			const btn1 = document.getElementById('btn1')
			btn1.addEventListener('click',()=>{
				alert('按钮1被点击了')
			})
			// 方法2
			const btn2 = document.getElementById('btn2')
			btn2.onclick = ()=>{
				alert('按钮2被点击了')
			}
			// 方法3
			function demo(){
				alert('按钮3被点击了')
			}

		</script>
	</body>
</html>
```

React怎么实现呢

原生：onclick → React：onClick

 **变成首字母大写**

错误写法1

```js
render(){
    const {isLike} = this.state
    return <h1 onClick="demo()"><h1/>
}
// 因为这里根本就是原生的js，所以原生的js写法错误        
```

错误写法2

```js
render(){
    const {isLike} = this.state
    return <h1 onClick={demo()}><h1/>
}
// 因为这属于赋值，相当于把demo()给调用，并且把undefined返回值给了onClick  
```

推导出来到了正确的写法

```js
render(){
    const {isLike} = this.state
    return <h1 onClick={demo}><h1/>
}
```

调用的问题解决了，接下来就是如何修改isLike状态的问题。

错误写法1

```js
class Like extends React.Component {
    render(){
        const {isLike} = this.state
        return <h1 onClick={demo}><h1/>
    }
}
            
function demo(){
   console.log(this) // 这里的undefined 因为这个是你自定义的函数，在babel的严格模式下，这里的this就是这个。如果非严格模式下，也就是<script type="text/javascript">，那就是window。所以当然拿不到state
}
```

错误写法2 这个写法错误是因为代码结构上问题

因为上面写法错误的原因因为是丢了this，所以在这里多增加个that呢？

```js
<script type="text/babel">
    let that // ①在最外面定义个全局变量
    class Like extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                isLike: true
            }
            that = this // ②在最外面定义个全局变量
        }

        render(){
            const { isLike } = this.state
            return <h2 onClick={demo}>{isLikeMe ? '你爱我' : '我爱你'}</h2>
        }
    }
	funcion demo (){
        console.log(that.state.isLike)
    }
</script>
```

上面虽然可以，但是这样that和下面的函数根本都不是类组件里面的！

错误写法3

```js
<script type="text/babel">
    class Like extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                isLike: true
            }
        }
        render(){
            const { isLike } = this.state
            return <h2 onClick={this.demo}>{isLikeMe ? '你爱我' : '我爱你'}</h2>
        }
        funcion demo (){
        	console.log(that.state.isLike) // 这里总没错了吧
    	}
    }
	
</script>
```

但结果，为什么会错误？

因为`demo()`这里并不是Like实例调用的,可以看下面的代码。

```js
class Person {
    constructor(name){
        this.name = name
    }
    study(){
        conso.log(this)
    }
}
const p1 = new Person("Amy")
p1.study()
const x = p1.study
x() // 这里就相当于直接调用，那么严格模式下，就是undefined，而函数里面默认是严格模式。
```

由于demo是作为onClick回调，所以不是通过实例调用的，是直接调用的，而类又开启了严格模式，所以这里还是错误的。

最后一句话解决

```js
this.demo = this.demo.bind(this)
```
这里需要分析

![image-20210831001136142](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210831001138.png)

通过上面的一行代码成功就把原型上的对象，挂在了实例自身上。成功上位！`bind()`这个函数还是应该多深入学点。下面是按照上面的原理，重新更换了名字写的正确代码。因为这样可以看出来清晰的结构。
```js
<script type="text/babel">
    class Like extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                isLike: true
            }
            this.yes = this.test.bind(this)
        }
        render(){
            const { isLike } = this.state
            return <h2 onClick={this.yes}>{isLikeMe ? '你爱我' : '我爱你'}</h2>
        }
        funcion test (){
        	console.log(that.state.isLike) // 这里总没错了吧
    	}
    }
	
</script>
```

#### 状态不可直接更改

调用解决了，那么如何修改里面的数据呢？下面的直接修改是绝对不允许的。

```
//严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
//this.state.isHot = !isHot //这是错误的写法
```

必须要用`setState()` ，并且这个函数是合并，并不是替换，就算你只修改了一个属性，其他属性也不会消失。

```js
<script type="text/babel">
    //1.创建组件
    class Weather extends React.Component{

        //构造器调用几次？ ———— 1次
        constructor(props){
            console.log('constructor');
            super(props)
            //初始化状态
            this.state = {isHot:false,wind:'微风'}
            //解决changeWeather中this指向问题
            this.changeWeather = this.changeWeather.bind(this)
        }

        //render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
        render(){
            console.log('render');
            //读取状态
            const {isHot,wind} = this.state
            return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
        }

        //changeWeather调用几次？ ———— 点几次调几次
        changeWeather(){
            //changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
            //由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
            //类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined

            console.log('changeWeather');
            //获取原来的isHot值
            const isHot = this.state.isHot
            //严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
            this.setState({isHot:!isHot})
            console.log(this);

            //严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
            //this.state.isHot = !isHot //这是错误的写法
        }
    }
//2.渲染组件到页面
ReactDOM.render(<Weather/>,document.getElementById('test'))

</script>
```

#### state完整写法

首先把上面的注释和输出都给去掉的完整写法是这样的。

```js
<script type="text/babel">
    class Weather extends React.Component{

        constructor(props){
            super(props)
            this.state = {isHot:false,wind:'微风'}
            this.changeWeather = this.changeWeather.bind(this)
        }

        render(){
            const {isHot,wind} = this.state
            return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
        }

        changeWeather(){
            const isHot = this.state.isHot
            this.setState({isHot:!isHot})
        }
    }
ReactDOM.render(<Weather/>,document.getElementById('test'))

</script>
```

为什么可以简写？首先`<Weather/>`这样生成的`new Weather()`只会帮你调用`render()`，其他的你自定义的函数是不会帮你的。自定义函数是通过回调函数来调用的，所以并不是this触发的，那么岂不是每一次都要`this.changeWeather = this.changeWeather.bind(this)`来绑定。那么在构造器`constructor()`的函数里其实有一个js基础知识点。

关于状态上的精简原理

```js
class Dog {
    constructor(legs){
        this.legs = legs
    }
    legs = 4;
}
// 类可以直接写赋值语句，相当于直接添加一个大家都可以用属性。
// 所以可以改成这样
 class Weather extends React.Component{

     constructor(props){
         super(props)
         // this.state = {isHot:false,wind:'微风'}
         this.changeWeather = this.changeWeather.bind(this)
     }
     state = {isHot:false,wind:'微风'}
 }
```

那么函数是不是也可以这样做呢。通过给匿名函数赋值成一个属性。

```js
class Weather extends React.Component{

    constructor(props){
        super(props)
        // this.state = {isHot:false,wind:'微风'}
        // this.changeWeather = this.changeWeather.bind(this)
    }
    changeWeather = function(){
        const isHot = this.state.isHot
        this.setState({isHot:!isHot})
    }
}
```

但是这样其实就涉及了箭头函数和普通函数区别的基础知识，结论就是你只是把这个`changeWeather()`挂在了`Weather`上，但真正点击触发调用的其实并不是`Weather.changeWeather()`。而箭头函数没有自己的this，一直指向的就是距离自己对象。[ES6 - 箭头函数、箭头函数与普通函数的区别](https://juejin.cn/pos/6844903805960585224)

#### state精简写法

按照上面的演变过程，最后的结果就是

```js
<script type="text/babel">
    class Weather extends React.Component{

        state = {isHot:false,wind:'微风'}

        render(){
            const {isHot,wind} = this.state
            return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
        }

        changeWeather = () => {
            const isHot = this.state.isHot
            this.setState({isHot:!isHot})
        }
    }
ReactDOM.render(<Weather/>,document.getElementById('test'))

</script>
```

#### 注意事项

- 组件中render方法中的this为组件实例对象
- 状态数据，不能直接修改或更新（`setState()`）
- 组件自定义的方法中this为undefined，如何解决？
  - 强制绑定this: 通过函数对象的bind()
  -  箭头函数

### 3.2 props

state只能用于1个组件内的数据，如果和外面交互呢。多个组件内交换信息呢。可以看出来，state局限性。

```jsx
class Person extends React.Component {
    state = {name:"tom",age:18}
    render(){
        return (
            <ul>
                <li>{this.state.name}</li>
                <li>{this.state.age}</li>
            </ul>
        )
    }
}
ReactDom.render(<Person />, document.getElementById('test1'));
ReactDom.render(<Person />, document.getElementById('test2'));
ReactDom.render(<Person />, document.getElementById('test3'));
```

所以props横空出世了。可以从组件外部传递值，动态的传递进去。

```jsx
class Person extends React.Component {
    state = {name:"tom",age:"18"}
    render(){
        return (
            <ul>
                <li>{this.props.name}</li>
                <li>{this.props.age}</li>
            </ul>
        )
    }
}
ReactDom.render(<Person name="Amy" age="19"/>, document.getElementById('test1'));
ReactDom.render(<Person name="Tom" age="99"/>, document.getElementById('test2'));
ReactDom.render(<Person name="Can" age="18"/>, document.getElementById('test3'));
```

但是这样写还是太繁琐了，所以有**解构赋值**。

```jsx
class Person extends React.Component {
    state = {name:"tom",age:18}
    render(){
        const {name, age} = this.props
        return (
            <ul>
                <li>{name}</li>
                <li>{age}</li>
            </ul>
        )
    }
}
ReactDom.render(<Person name="Amy" age="19"/>, document.getElementById('test1'));
ReactDom.render(<Person name="Tom" age="99"/>, document.getElementById('test2'));
ReactDom.render(<Person name="Can" age="18"/>, document.getElementById('test3'));
```

以上就是最基本的使用方式。

但是如果信息特别多呢，下面的模式是不是就捉襟见肘了。

#### 批量传递

```jsx
ReactDom.render(<Person name="Amy" age="19"......./>, document.getElementById('test1'));
```

于是，这里就有个**展开运算符**。

```jsx
class Person extends React.Component {
    state = {name:"tom",age:18}
    render(){
        const {name, age} = this.props
        return (
            <ul>
                <li>{name}</li>
                <li>{age}</li>
            </ul>
        )
    }
}
const p = {name:"Amy", age:"18"}
// ReactDom.render(<Person name="Amy" age="19"/>, document.getElementById('test1'));
ReactDom.render(<Person {...p}/>, document.getElementById('test1'));
```

#### 展开运算符复习向

```js
let arr = [1, 2, 3]
// 展开数组
consol.log(arr) // [1,2,3] 
consol.log(...arr) // 1,2,3
// 连接数组
let arr2 = [4,5,6]
let arr3 = [...arr, ...arr2]
console.log(arr3) // [1,2,3,4,5,6] 
// 传递不定参数
function sum(...numbers) {
    return numbers.reduce((pre, cur) => {
        return pre + cur;
    })
}
// 但是展开运算符不适用于对象
let person = {name: "Amy", age:"18"}
// let person2 = person 这里只是引用传递并不是复制
// console.log(...person) 报错，展开运算符不能展开对象
let person2 = {...person} // 这里就是赋值，构造字面量对象时使用展开语法
// 并且可以合并
let person3 = {...person, name:"bob"} // 成功修改属性
```

原生是不可以遍历对象的，但是bable+react是可以遍历的。虽然可以展开，但是只可以适用于标签属性的传递、

```jsx
ReactDom.render(<Person {...p}/>, document.getElementById('test1'));
```

#### props的限制

数字可以这样改

```jsx
ReactDom.render(<Person name="Amy" age={19}/>, document.getElementById('test1'));
```

所以如何对传递过来的值进行**类型+范围+默认值设置**这些修改呢？

#### props完整写法

```js
<script type="text/babel">
    //创建组件
    class Person extends React.Component{
        render(){
            // console.log(this);
            const {name,age,sex} = this.props
            //props是只读的
            //this.props.name = 'jack' //此行代码会报错，因为props是只读的
            return (
                <ul>
                    <li>姓名：{name}</li>
                    <li>性别：{sex}</li>
                    <li>年龄：{age+1}</li>
                </ul>
    		)
    	}
    }
// 对标签属性进行类型、必要性的限制
// 注意propTypes 写法 PropTypes 大小写也一样
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
    speak:PropTypes.func,//限制speak为函数
}
//指定默认标签属性值
Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))
ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

const p = {name:'老刘',age:18,sex:'女'}
// console.log('@',...p);
// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))

function speak(){
    console.log('我说话了');
}
</script>
```

版本16之前还是`React.PropTypes`后面觉得React背负了太多 就直接PropTypes了
所以需要引入这个包(**prop-types.js**)，这样就引入了PropTypes对象

```html
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>
```

传入函数的话，就需要`func` 为什么不是`function`，因为会和关键字冲突，为什么`string number`就可以，因为这俩在js里是`String,Number`

```jsx
speak:PropTypes.func, //限制speak为函数
ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))
function speak(){
    console.log('我说话了');
}
```

props是**只读**的，不允许改。

```jsx
// props是只读的
// this.props.name = 'jack' //此行代码会报错，因为props是只读的
// 但是下面的运算是可以的
{age + 1}
```

#### props精简写法

仔细看结构，会发现所有和这个**组件相关的限制还是放在类里面**比较好。

![image-20210831170003662](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210831170004.png)

所以结论就是给这个类本身增加属性。使用`static`

```jsx
//创建组件
class Person extends React.Component{

    constructor(props){
        //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
        // console.log(props);
        super(props)
        console.log('constructor',this.props);
    }

    //对标签属性进行类型、必要性的限制
    static propTypes = {
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        sex:PropTypes.string,//限制sex为字符串
        age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    static defaultProps = {
        sex:'男',//sex默认值为男
        age:18 //age默认值为18
    }

    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        //props是只读的
        //this.props.name = 'jack' //此行代码会报错，因为props是只读的
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}
```

以上，就完成了简写。

#### 构造器问题

接下来开始整一下构造器问题。在最前面构造器初始化的时候可以看到参数是`constructor(props){}`

**Q1：传入不传入`super(props)`有什么区别?**

在输出实例自身的props的时候

```js
//  不传入
constructor(){
    super()
    console.log('constructor',this.props); // undefined
}
//  传入
constructor(props){
    super(props)
    console.log('constructor',this.props); // 能获取到自身实例
}
```

所以结论就是 <u>**构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props**</u>。

**Q2：类中构造器有什么作用?**

- 给`this.state`初始化
- 为事件处理函数绑定实例 → `this.changeWeather = this.changeWeather.bind(this)`

```jsx
//创建组件
class Person extends React.Component{

    constructor(props){
        //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
        // console.log(props);
        super(props)
        console.log('constructor',this.props);
    }

    //对标签属性进行类型、必要性的限制
    static propTypes = {
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        sex:PropTypes.string,//限制sex为字符串
        age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    static defaultProps = {
        sex:'男',//sex默认值为男
        age:18 //age默认值为18
    }

    render(){
		....
    }
}
```

#### 函数式组件使用props

函数式组件里虽然不能用到以上(state，refs，但这么说也不严谨。后面hooks也可以了state)的属性，但是`props`却能用到。因为函数可以接受参数。

```jsx
//创建组件
function Person (props){
    const {name,age,sex} = props
    return (
        <ul>
            <li>姓名：{name}</li>
            <li>性别：{sex}</li>
            <li>年龄：{age}</li>
        </ul>
    )
}
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
}

//指定默认标签属性值
Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```

#### props总结

- 标签属性可以通过`props`传递数据 → `ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))`
- 简写的原理就是通过`static`关键字从类外部转移到了内部

### 3.3. refs

**Q1：什么是？为什么要用？**

组件内的标签可以定义ref属性来标识自己 快速定位呗

**Q2：取得的是真实的DOM还是虚拟的DOM？**

真实的DOM 可以通过`debugger`验证

#### 字符串形式refs

下面是字符串形式的refs 

```jsx
class Demo extends React.Component {
    showData = () => {
        console.log(this)
        debugger
		const {input1} = this.refs // 复数
    }
    showData2 = () => {
        const {input1} = this.refs
    }
    render(){
        return (
            <div>
                <input ref="input1" type="text" value="" />
                <button onClick={this.showData}></button>
                <input ref="input2" onBlur={this.showData2} type="text" value="" />
            </div>
        )
    }
}
```
注意，根据官网的描述，这个API已经快过时了。**因为效率不高**
[过时 API：String 类型的 Refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)

> 过时 API：String 类型的 Refs 
>
> 如果你之前使用过 React，你可能了解过之前的 API 中的 string 类型的 ref 属性，例如 `"textInput"`。你可以通过 `this.refs.textInput` 来访问 DOM 节点。我们不建议使用它，因为 string 类型的 refs 存在 [一些问题](https://github.com/facebook/react/pull/8333#issuecomment-271648615)。它已过时并可能会在未来的版本被移除。
>
> > 注意
> >
> > 如果你目前还在使用 `this.refs.textInput` 这种方式访问 refs ，我们建议用[回调函数](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)或 [`createRef` API](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#creating-refs) 的方式代替。

#### 回调形式refs

- 我定义了一个函数
- 我没有调用它
- 它执行了

用这个可以验证，回调函数返回值跟调用者有关。这里返回的就是a所在的节点`<input ref={(a)=>{console.log(a)}} `

所以就可以这样写↓` <input ref={(curNode)=>{this.input1 = curNode}} type="text" value="" />`

这样的结果，就是把a所在的节点挂在了this.input1上，这里的this也就是箭头函数最近的实例Demo

```jsx
class Demo extends React.Component {
    showData = () => {
        console.log(this)
        debugger
		const {input1} = this.refs // 复数
    }
    showData2 = () => {
        const {input1} = this.refs
    }
    render(){
        return (
            <div>
                <input ref={c =>this.input1 = c} type="text" value="" />
                <button onClick={this.showData}></button>
            </div>
        )
    }
}
```

回调次数问题

官方说明内联函数问题 → [关于回调 refs 的说明](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs)

```jsx
//  内联形式
{/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}
<input ref={this.saveInput} type="text"/><br/><br/> 
// 绑定形式
saveInput = (c)=>{
    this.input1 = c;
    console.log('@',c);
}
```

所以下面会有一个非内联的，绑定的。但这两者*无关紧要*，不用过于纠结。

```jsx
//创建组件
class Demo extends React.Component{
state = {isHot:false}
showInfo = ()=>{
    const {input1} = this
    alert(input1.value)
}

changeWeather = ()=>{
    //获取原来的状态
    const {isHot} = this.state
    //更新状态
    this.setState({isHot:!isHot})
}

saveInput = (c)=>{
    this.input1 = c;
    console.log('@',c);
}

render(){
    const {isHot} = this.state
    return(
        <div>
            <h2>今天天气很{isHot ? '炎热':'凉爽'}</h2>
            {/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/} 内联形式
            <input ref={this.saveInput} type="text"/><br/><br/>  绑定形式
            <button onClick={this.showInfo}>点我提示输入的数据</button>
            <button onClick={this.changeWeather}>点我切换天气</button>
        </div>
    )
}
}
```

#### createRef()形式

官方写的很清楚。[创建 Refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#creating-refs)

**要注意，这里的创建方式并不是通过回调函数，而是官方的API。**

创建 `myRef = React.createRef()`

获取`this.myRef.current.value`

他的局限性就是，专人专用，一个萝卜一个坑。而且用几个容器就要创建几个，代码稍微要写多点。

```jsx
//创建组件
class Demo extends React.Component{
    /* 
		React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
	*/
myRef = React.createRef()
myRef2 = React.createRef()
//展示左侧输入框的数据
showData = ()=>{
    alert(this.myRef.current.value);
}
//展示右侧输入框的数据
showData2 = ()=>{
    alert(this.myRef2.current.value);
}
render(){
    return(
        <div>
            <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
            <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
            <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
        </div>
    )
}
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```





















------------



>  **以下内容都是以前的总结，不是很全。**

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