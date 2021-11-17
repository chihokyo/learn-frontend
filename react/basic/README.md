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
   console.log(this) 
    // 这里的undefined 因为这个是你自定义的函数，在babel的严格模式下，这里的this就是这个。
    // 如果非严格模式下，也就是<script type="text/javascript">，那就是window。所以当然拿不到state
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

用这个可以验证，**回调函数返回值跟调用者有关**。这里返回的就是a所在的节点`<input ref={(a)=>{console.log(a)}} `

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

## 4. 事件处理

事件委托的原理就是事件冒泡

**发生事件的事件源和操作的元素相同的情况下，不要过度使用refs。反正都是自身。**

比如下面这个输入框失去焦点就可以不用写

```jsx
// 使用ref写的
myRef2 = React.createRef();
showData2 = () => {
    alert(this.myRef2.current.value)
}

<input onBlur={this.showData} ref={this.myRef2} type="text" placeholder"失去焦点" />

// 不使用
showData2 = (event) => {
    alert(this.event.target.value)
}

<input onBlur={this.showData} type="text" placeholder"失去焦点" />
```

如果事件源和需要的数据不是一个DOM，就不行了哦。

**Q:为什么不是用原生的事件(`onclikc()`)处理，还是使用的自己封装的(`onClick()`)？**

为了考虑兼容性问题和效率。

### 4.1 非受控组件 VS 受控组件

首先无论是受控组件还是非受控组件，这个概念都是针对表单而言的。

非受控组件，顾名思义，不用你主动去控制，帮你收集数据。是通过**ref**来实现的。

- 受控组件 很像vue双向绑定 可以省略ref
- 非受控组件 直接使用ref操作dom

[React 之受控组件和非受控组件](https://juejin.cn/post/6844903629493633038)

[受控和非受控组件真的那么难理解吗？(React实际案例详解)](https://juejin.cn/post/6858276396968951822)

案例，收集一个表单数据并输出。

#### 非受控组件代码演示

```jsx
class Login extends React.Component {

    handleSubmit = () => {
        event.preventDefault() // 阻止表单提交，不然就会有刷新提交动作。
        const { username, password } = this;
        // alert(username) // 这里拿的就是一个节点而已 {c => this.username = c} 是节点
        alert(username.value) // 所以要这样写 然后下面是一个嵌套模板字符串 ${ }
        alert(`输入的用户名：${username.value},输入的密码：${password.value}`)
    }

    render(){

        return (
            <form action="#" method="get" onSubmit={this.handleSubmit}>
                <input ref={c => this.username = c} type="text" name="username" id="" />
                <input ref={c => this.password = c} type="password" name="password" id="" />
                <button>login</button>
            </form>
        )
    }
}

ReactDOM.render(<Login />, document.getElementById('root'))
```

注意点

- 阻止默认事件提交行为
- ref定义箭头函数取得节点
- 在`handleSubmit()`里如何取值
- 嵌套模板字符串

#### 受控组件代码演示

这种可以在state状态里根据你输入框的变化取出来的就是一大特点。

上面的是表单统一获取，下面的这个受控的，就是可以控制了。那么通过什么控制呢，就是`onChange()`。vue不是有一个双向绑定的概念吗，你输入什么就同步可以显示出来，react这里需要自己写。所以就先写第一阶段。

```jsx
class Login extends React.Component {
	
    // 初始化状态
    state = {
        username:'',
        password:''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = this
        alert(`username:${username},pass:${password}`)
    }
	
    // 这里就是受控组件
    saveUsername = (event) => {
        this.setState({
            username:event.target.value
        })
    }
	// 这里就是受控组件
    savePassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }       

    render(){
        return (
            <form action="#" method="get" onSubmit={this.handleSubmit}>
                <input
                    // 受控组件下需要onChange()函数，这里传入onChange的是一个函数
                    // 所以不能写this.saveUsername() 加了括号就是直接调用了
                    onChange={this.saveUsername}
                    type="text"
                    name="username"
                    id=""
                    />
                <input
                    onChange={this.savePassword}
                    type="password"
                    name="password"
                    id=""
                    />
                <button>login</button>
            </form>
        )
    }
}
```

上面的受控组件写完了，但是还有很多重复的部分。比如一个输入框就要写一个onchange，是不是太麻烦了？能不能通过一个通用的函数然后根据参数来判断呢？比如下面这个样

```jsx
saveFormData = (event) => {
    this.setState({
        username:event.target.value
    })
}

<input onChange={this.saveFormData('username')} type="text" name="username" id="" />
<input onChange={this.saveFormData('password')} type="text" name="password" id="" />
```

这样是不行的，因为上面也已经写了。如果是加了括号并且有了参数，这样就相当于触发事件之后我们直接就调用了`saveFormData('username')`函数，**那么此时onChange接受的就是这个函数的返回值，而不是这个函数！**这样就造成了无论你怎么调用，出来的都是undefined的，如果说加了括号就相当于调用的是返回值的话，那么如何解决呢？

<u>结论。让函数的返回值是一个函数不就好了？</u>

```jsx
saveFormData = (event) => {
    // this.setState({
    //    username:event.target.value
    // })
    return () => {
 		console.log("test")       
    }
}
```

这样的话，你每次调用的输出的都是test了。可以见得，回调函数这个返回值就不再是undefined的了。

又由于onChange里的函数是谁来调用的呢，是React实例来调用的，那么在这里面就可以写上event，也就是可以取得你想要的state的值了

```jsx
saveFormData = (event) => {
    // this.setState({
    //    username:event.target.value
    // })
    return (event) => {
		console.log(event.target.value)
    }
}
```

于是，总和一下，加上了可以判断的参数，那么就是这样写的

```jsx
saveFormData = (dataType) => {
    return (event) => {
		this.setState({
		// dataType:event.target.value 错误写法，因为这里的datatype就是一个变量，对象直接写变量就是会变成一个字符串了。这里是js的语法基础，当dateType是一个变量，你想取出来。要通过方括号
            [dataType]:evnet.target.value
        })
    }
}
```

上面那个js基础可以看这个

```js
let a = "name";
le obj = {}
obj.a = "Amy";
console.log(obj) // 这里输出的就是a:Amy
// 比如要这样
obj[a] = "Ayy";
console.log(obj) // 这里输出的就是name:Amy
```

上面的写法还能不能进行优化呢。比如写一个共通的函数`this.saveFormData()`

因为如果你单纯的只是写了一个共通函数对数据类型进行判断的话，肯定是不对的。

```jsx
class Login extends React.Component {
    state = {
        username: "",
        password: "",
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this;
        alert(`username:${username},pass:${password}`);
    };
	
	// 这里可以测试出来你写的不对
    saveFormData = (event) => {
        console.log(event);
    };

    render() {
        return (
            <form action="#" method="get" onSubmit={this.handleSubmit}>
                <input
                    // 如果这样写的话，其实就是把this.saveFormData("username")这个函数返回值给了onChange回调
                    onChange={this.saveFormData("username")}
                    type="text"
                    name="username"
                    id=""
                    />
                <input
                    onChange={this.saveFormData("password")}
                    type="password"
                    name="password"
                    id=""
                    />
                <button>login</button>
            </form>
        );
    }
}
```

那么怎么写才可以呢。首先要保证

- 需要返回一个真正的回调函数
- 需要把2个参数进行合并

下面就是高阶函数的世界了。**函数的柯里化。**

### 4.2 函数柯里化

```
高阶函数，如果一个函数满足以下2个规范中任意一个规范，那么这个函数就是高阶函数
	①若A函数，接受的参数是一个函数。那么A就是高阶函数。
	②若A函数，调用的返回值仍然是一个函数，那么A就是高阶函数。
常见的高阶函数，Promise，setTimeout，arr.map()，感觉回调函数都是高阶函数

函数的柯里化：通过函数调用继续返回函数的方式，实现多次接受的参数最后统一处理的函数编码形式
```

比如以下

```js
// 没有柯里化
funtion sum(a, b, c) {
    return a + b + c
}
const res = sum(1, 2, 3) // 6
// 函数柯里化
funtcion sum(a) {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
const res2  = sum(1)(2)(3) // 6
```

使用了柯里化函数之后的实现

```jsx
class Login extends React.Component {
    state = {
        username: "",
        password: "",
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this;
        alert(`username:${username},pass:${password}`);
    };
	
	// 主要是这里 dataType 和 event 进行的统一处理
    saveFormData = (dataType) => {
        // 这里才是React帮你调用的函数，所以拿到了event
        return (event) => {
            this.setState({
                [dataType]: event.target.value,
            });
        };
    };

    render() {
        return (
            <form action="#" method="get" onSubmit={this.handleSubmit}>
                <input
                    // 这里
                    onChange={this.saveFormData("username")}
                    type="text"
                    name="username"
                    id=""
                    />
                <input
                    onChange={this.saveFormData("password")}
                    type="password"
                    name="password"
                    id=""
                    />
                <button>login</button>
            </form>
        );
    }
}
```

#### 不用函数柯里化

如果不用函数柯里化就不能写了吗？

下面当然可以，如果说onChange只是需要一个函数的话，那么就传给她一个函数`() => {}`

然后因为调用这个匿名函数的是React，那么参数event肯定是能取到的，然后在调用`saveFormData()`。顺理成章。

```jsx
saveFormData = (dataType, value) => {
    this.setState({
        [dataType]: value,
    });
};

render() {
    return (
        <form action="#" method="get" onSubmit={this.handleSubmit}>
            <input
                onChange={(event) => {
                    this.saveFormData("username", event.target.value);
                }}
                type="text"
                name="username"
                id=""
                />
            <input
                onChange={(event) => {
                    this.saveFormData("password", event.target.value);
                }}
                type="password"
                name="password"
                id=""
                />
            <button>login</button>
        </form>
    );
}
```

这样也可以

```jsx
saveFormData = (dataType, event) => {
    this.setState({
        [dataType]: event.target.value,
    });
};

render() {
    return (
        <form action="#" method="get" onSubmit={this.handleSubmit}>
            <input
                onChange={ event => 
                    this.saveFormData("username", event);
                }
                type="text"
                name="username"
                id=""
                />
            <input
                onChange={ event => 
                    this.saveFormData("password", event);
                }
                type="password"
                name="password"
                id=""
                />
            <button>login</button>
        </form>
    );
}
```

## 5. 生命周期

为什么要学生命周期，因为这个是React最重要的概念。

组件放到页面叫 比如设置定时器 → 挂载mount

组件被清除掉 比如清除定时器 → 卸载unmount

下面有一个无限循环错误实现

```jsx
class Life extends React.Component {
    state = {
        opacity: 1,
    };

    death = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    };

    render() {
        // 写一个定时器
        setInterval(() => {
            let { opacity } = this.state;
            opacity -= 0.1;
            if (opacity <= 0) opacity = 1;
            // 因为这里有更新，那么就是不停的render，只要每一次render那么就有一个定时器
            // 无限下去就是指数级增长 所以定时器放在这里不合适
            this.setState({ opacity });
        }, 200);

        return (
            <div>
                <h2 style={{opacity:this.state.opacity}}>React好难</h2>
                <button onClick={this.death}>DEATH</button>
            </div>
        );
    }
}

ReactDOM.render(<Life />, document.getElementById("root"));
```

所以就引出了一个生命周期`componentDidMount()`，这个函数是React实例自己调用的，其他函数都是事件回调调用的，而这个函数是React自己调用的，**组件完成挂载！**

`componentDidMount()` → 组件挂载完毕，只调用1次

`render()` → 初始化渲染1次 + 每次更新n次

所以接着写。

```jsx
class Life extends React.Component {
    state = {
        opacity: 1,
    };

    death = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    };
	// 因为只调用1次，所以在这里写比较安全
    componentDidMount() {
        // 写一个定时器
        setInterval(() => {
            let { opacity } = this.state;
            opacity -= 0.1;
            if (opacity <= 0) opacity = 1;
            this.setState({ opacity });
        }, 200);
    }

    render() {
        return (
            <div>
                <h2 style={{ opacity: this.state.opacity }}>React好难</h2>
                <button onClick={this.death}>DEATH</button>
            </div>
        );
    }
}

ReactDOM.render(<Life />, document.getElementById("root"));
```

虽然安全了，但是引出了全新的错误。那就是在点DEATH的时候会发现报错

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in Life
```

意思就是说，组件已经被卸载了，就无法更新(`render()`)了。但是定时器还在运行呢，所以必须要找个时间清空定时器。

比如下面这样

```jsx
class Life extends React.Component {
        state = {
          opacity: 1,
        };

        death = () => {
            // 在这里清除
            clearInterval(this.timer);
          ReactDOM.unmountComponentAtNode(document.getElementById("root"));
        };

        componentDidMount() {
          // 写一个定时器
          this.timer = setInterval(() => {
            let { opacity } = this.state;
            opacity -= 0.1;
            if (opacity <= 0) opacity = 1;
            this.setState({ opacity });
          }, 200);
        }

        render() {
          return (
            <div>
              <h2 style={{ opacity: this.state.opacity }}>React好难</h2>
              <button onClick={this.death}>DEATH</button>
            </div>
          );
        }
      }
```

但是为了更好的时机的话，可以使用生命周期的函数组件将要卸载`componentWillUnmount()`

```jsx
death = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
};

componentDidMount() {
    this.timer = setInterval(() => {
        let { opacity } = this.state;
        opacity -= 0.1;
        if (opacity <= 0) opacity = 1;
        this.setState({ opacity });
    }, 200);
}
componentWillUnmount() {
    // 在这里清除更好
    clearInterval(this.timer)
}
```

这里开始写旧的生命周期。

### 生命周期【旧】

但首先要明白，生命周期函数是按照顺序调用的，跟你写的前后顺序无关。这也就是为什么可以在组件内直接写函数，不需要像你自己写的函数那样还要`this.method()`。

**生命周期回调函数 == 生命周期钩子函数 == 生命周期函数 == 生命周期钩子** 都是一个意思

`componentDidMount()`

`componentWillUnmount()`

`render()`

这是上面接触过的

下面写一个案例来看一下。

```jsx
class Count extends React.Component {

    // 组件初始化的时候
    constructor(props) {
        console.log("Count---constructor");
        super(props)
        this.state = {count: 0}

    }

    // 组件将要挂载的钩子
    componentWillMount(){
        console.log("Count---componentWillMount");
    }

    // 组件挂载完毕
    componentDidMount(){
        console.log("Count---componentDidMount");
    }

    add = () => {
        const {count} = this.state
        this.setState({count:count+1})
    }

    // 组件渲染or再次更新的时候
    render () {
        console.log("Count---render");
        const {count}  = this.state
        return (
            <div>
                <h2>当前点击：{count}</h2>
                <button onClick={this.add}>Click Me +1</button>
            </div>
        )
    }
}
```

上面的首次刷新，什么都不做的情况下会输出

```
Count---constructor
Count---componentWillMount
Count---render
Count---componentDidMount
```

![image-20210906224504402](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210906224511.png)

也就是走完了上面的流程。

接下来写一个卸载组件的小函数`death()`

```jsx
// 卸载组件按钮的回调
death = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}

// 组件挂载完毕
componentWillUnmount(){
    console.log("Count---componentWillUnmount");
}


// 组件渲染or再次更新的时候
render () {
    console.log("Count---render");
    const {count}  = this.state
    return (
        <div>
            <h2>当前点击：{count}</h2>
            <button onClick={this.add}>Click Me +1</button>
            <button onClick={this.death}>Click DEATH</button>
        </div>
    )
}
```

上面点击DEATH之后就是**Count---componentWillUnmount**

接下来再看右边部分，分为3条线。先看第②条黄线

#### 第②条线

![image-20210906225223605](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210906225224.png) 

当更新的时候首先要更新setState，然后在判断我应该不应该更改状态的时候，就看`shouldComponentUpdate()`，这个函数返回的是**true**就可以更新，如果是**false**就②那条线到此结束。之前没写的时候，就直接`render()`也可以啊，因为这个钩子默认永远返回的是**true**，除非你自己写。

接下来你自己写了一个

```jsx
shouldComponentUpdate(){
    console.log("Count---shouldComponentUpdate");
}
```

你在刷新页面会发现，调用了但是会报错。

```
Count---shouldComponentUpdate
Warning: Count.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.    in Count
```

所以你写上了true

```jsx
shouldComponentUpdate(){
    console.log("Count---shouldComponentUpdate")
    return true
}
```

然后点击clickme！会发现结果就是

```
Count---shouldComponentUpdate
Count---render
```

如果你写的是false

```
shouldComponentUpdate(){
    console.log("Count---shouldComponentUpdate")
    return false
}
```

点击click me你会发现页面会输出你点击次数的Count---shouldComponentUpdate，但是没任何反应。**为什么呢？因为是false之后下面那条线就完全不会向下走了，自然就不会有任何效果。**

于是你接下来继续执行②那条线，写代码。

```jsx
// 卸载组件按钮的回调
death = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}

// 组件挂载完毕
componentWillUnmount(){
    console.log("Count---componentWillUnmount");
}

// 控制组件更新的阀门 false就停止
shouldComponentUpdate(){
    console.log("Count---shouldComponentUpdate");
    return true
}

// 组件将要完成更新的钩子
componentWillUpdate(){
    console.log("Count---componentWillUpdate");
}

// render


// 组件已经完成了更新的钩子
componentDidUpdate(){
    console.log("Count---componentDidUpdate");
}
```

会发现结果就是

```
Count---shouldComponentUpdate
Count---componentWillUpdate
Count---render
Count---componentDidUpdate
```

接下来看第③条线

#### 第③条线

第③条线起始点是一个`forceUpdate()`，表示强制更新。

正常的更新肯定是要对状态进行修改`setState()`，如果不想更新状态就是想更新怎么办。于是就有了强制更新。其实就是比正常的更新少了个阀门`shouldComponentUpdate()`，**但是这种情况用的并不多。**

代码实现

```jsx
force = () => {
    this.forceUpdate()
}
<div>
    <h2>当前点击：{count}</h2>
    <button onClick={this.add}>Click Me +1</button>
    <button onClick={this.death}>Click DEATH</button>
    <button onClick={this.force}>JUST UPDATE</button>
</div>
```

输出的结果

```
Count---componentWillUpdate
Count---render
Count---componentDidUpdate
```

上面即使`shouldComponentUpdate()`返回的是**false**，也是可以强制更新的哦。

接下来继续看第①条线

#### 第①条线

首先，先创建一个有父子关系的组件。**并且A组件里面的数据交给B组件来展示，于是就使用了标签属性传递。**

```jsx
class A extends React.Component {

    state = { carName: 'toyoda'}
    changeCar = () => {
        this.setState({
            carName: 'honda'
        })
    }
    render(){
        return (
            <div>
                <div>A</div>
                <button onClick={this.changeCar}>Change</button>
                <B carName={this.state.carName}/>
            </div>
        )
    }
}

class B extends React.Component {
    render(){
        return (
            <div>
                B,接收到了A的：{this.props.carName}
            </div>
        )
    }
}
ReactDOM.render(<A />, document.getElementById("root"));
```

B组件将要接受`componentWillReceiveProps()`,但是这个钩子有个问题就是你第一次刷新的时候会发现根本不会调用，必须你点击之后才会调用。所以有人提议应该是`componentWillReceiveNewProps()`才对。按照常理第一次B组件其实已经接受了父组件的props。但其实调用的时候，父组件已经是第二次渲染了。

```jsx
componentWillReceiveProps(props){
    console.log("B----componentWillReceiveProps", props);
}
```



> 上面的全部【旧】生命周期的钩子函数都结束了，上面都是旧的。
>
> -  初始化阶段: 由`ReactDOM.render()`触发---初次渲染
>      -  constructor()
>      -  componentWillMount()
>      -  render()
>      -  **componentDidMount() =====> 常用一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息**
> -  更新阶段: 由组件内部`this.setSate()`或父组件`render()`触发
>      -  shouldComponentUpdate()
>      -  componentWillUpdate()
>      -  **render() =====> 必须使用的一个**
>      -  componentDidUpdate()
> -  卸载组件: `由ReactDOM.unmountComponentAtNode()`触发
>      -  **componentWillUnmount()  =====> 常用 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息**

### 生命周期【新】

省略ing

### DIFF算法

- 虚拟DOM检测到变化的最小粒度是节点（一个标签） 。

- 算法对比了多层。不一定标签里面嵌套标签。标签内也是递归进行对比的，所以即使下面的这个例子也只会更新span，而不会更新input

```jsx
class Time extends React.Component {
    state = {date: new Date()}

    componentDidMount () {
        setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000)
    }

    render () {
        return (
            <div>
                <h1>hello</h1>
                <input type="text"/>
                <span>
                    现在是：{this.state.date.toTimeString()}
                    <input type="text"/>
                </span>
            </div>
        )
    }
}
```

**Q：为什么key最好不要用index？**

因为**可能**会出现一些问题。首先diff算法是根据index来判断key的

此处需要添加一些规则

**使用index作为key的案例**

因为这里是从前面添加的，react会发现这个所有的index都发生了改变。所以整体的虚拟DOM都被替换了。

```jsx
class Person extends React.Component {
    state = {
        persons: [
            { id: 1, name: "amy", age: "19" },
            { id: 2, name: "tom", age: "20" },
        ],
    };

    add = () => {
        const {persons} = this.state
        const p = {id:persons.length + 1, name:"wangwang", age:"30"}
        // 这里是从前面开始添加的，所以新添加的这个wangwangkey应该是3
        this.setState({
            persons:[p,...persons]
        })
    }

    render () {
        return (
            <div>
                <h2>展示人员</h2>
                <button onClick={this.add}>click</button>
                <ul>
                    {
                        this.state.persons.map((personObj, index)=>{
                            return <li key={index}>{personObj.name} --- {personObj.age}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Person />, document.getElementById("root"));
</script>
```

那么怎么才能解决这个问题呢。

**不适用index作为key的案例**

会发现这里并不会全部替换，只会增加wangwang

```jsx
class Person extends React.Component {
    state = {
        persons: [
            { id: 1, name: "amy", age: "19" },
            { id: 2, name: "tom", age: "20" },
        ],
    };

    add = () => {
        const {persons} = this.state
        const p = {id:persons.length+1, name:"wangwang", age:"30"}
        this.setState({
            persons:[p,...persons]
        })
    }

    render () {
        return (
            <div>
                <h2>展示人员用index</h2>
                <button onClick={this.add}>click</button>
                <ul>
                    {
                        this.state.persons.map((personObj, index)=>{
                            return <li key={index}>{personObj.name} --- {personObj.age}</li>
                        })
                    }
                </ul>
                <h1></h1>

                <h2>展示人员用id</h2>
                <ul>
                    {
                        this.state.persons.map((personObj)=>{
                            return <li key={personObj.id}>{personObj.name} --- {personObj.age}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
```

如何验证会出现问题呢。比如在显示里面加入了输入框，把以上代码的这一行替换成下面

```jsx
// 替换前
return <li key={personObj.id}>{personObj.name} --- {personObj.age}</li>
// 替换后
return <li key={personObj.id}>{personObj.name} --- {personObj.age}</li>
```

![Sep-07-2021 18-05-58](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210907180640.gif)

```
慢动作回放----使用index索引值作为key
    初始数据：
        {id:1,name:'小张',age:18},
        {id:2,name:'小李',age:19},
    初始的虚拟DOM：
        <li key=0>小张---18<input type="text"/></li>
        <li key=1>小李---19<input type="text"/></li>

	更新后的数据：
        {id:3,name:'小王',age:20},
        {id:1,name:'小张',age:18},
        {id:2,name:'小李',age:19},
	更新数据后的虚拟DOM：
        <li key=0>小王---20<input type="text"/></li>
        <li key=1>小张---18<input type="text"/></li>
        <li key=2>小李---19<input type="text"/></li>

慢动作回放----使用id唯一标识作为key

    初始数据：
        {id:1,name:'小张',age:18},
        {id:2,name:'小李',age:19},
    初始的虚拟DOM：
        <li key=1>小张---18<input type="text"/></li>
        <li key=2>小李---19<input type="text"/></li>

    更新后的数据：
        {id:3,name:'小王',age:20},
        {id:1,name:'小张',age:18},
        {id:2,name:'小李',age:19},
    更新数据后的虚拟DOM：
        <li key=3>小王---20<input type="text"/></li>
        <li key=1>小张---18<input type="text"/></li>
        <li key=2>小李---19<input type="text"/></li>
```



为什么上面用index的发生错乱了呢。因为这里在做比较的时候li的内容react发现了虚拟dom有了改变，所以是进行了替换，这个时候由于input这里react还是没能识别出有虚拟DOM有任何不同的地方，因为react不会连value也能识别到并且做出判断。所以就这么渲染到了真实dom，但是真实dom这个时候已经有我输入框输入的value了。所以就发生了错乱。（本质就是li已经替换了，但是input并没有替换）

但是在id里面，id是统一的，react发现全部都没有问题，li没有发生替换，input也没有发生替换。所以新增加了新的id的那个节点。

### DIFF总结

```
经典面试题:
① react/vue中的key有什么作用？（key的内部原理是什么？）
② 为什么遍历列表时，key最好不要用index?

一. 虚拟DOM中key的作用：
    1. 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。
    2. 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】,随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：
        a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
            (1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
            (2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
        b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
        		根据数据创建新的真实DOM，随后渲染到到页面

二. 用index作为key可能会引发的问题：
    1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
    	会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
    2. 如果结构中还包含输入类的DOM：
    	会产生错误DOM更新 ==> 界面有问题。
    3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
    	仅用于渲染列表用于展示，使用index作为key是没有问题的。

三. 开发中如何选择key?:
    1. 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
    2. 如果确定只是简单的展示数据，用index也是可以的。
```

## 6. 工程化

关于工程化的解说，工程化怎么说呢。就是有一个脚手架，便于你开发。模块化，组件化，工程化。感觉工程化就是把后端的一些管理包工具，什么兼容性，还有压缩，编译，检查代码这些零零碎碎的等等规范起来一起就是工程化。这个概念貌似后端经常用。

工程化那就不能跟上面一样用个html就打发了，就需要在本地安装环境。

首先检查一下本地环境有没有安装这些。

```
node -v
npm -v
```

然后直接安装就可以了。官方安装参考[Create React App](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app)

```
npx create-react-app my-app
cd my-app
npm start
```

<u>貌似用yarn会比较好，因为yarn也是Facebook出的？</u>

### 三大文件

首先看最重要的三个文件

![image-20210908145854573](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210908145856.png)

下面详解下面三个文件，首先看主页面`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
		<meta charset="utf-8" />
		<!-- %PUBLIC_URL%代表public文件夹的路径 -->
		<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
		<!-- 开启理想视口，用于做移动端网页的适配 -->
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- 用于配置浏览器页签+地址栏的颜色(仅支持安卓手机浏览器) -->
    <meta name="theme-color" content="red" />
    <meta
      name="description"
      content="Web site created using create-react-app"
		/>
		<!-- 用于指定网页添加到手机主屏幕后的图标 -->
		<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
		<!-- 应用加壳时的配置文件 -->
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
		<!-- 浏览器不支持js则展示标签中的内容 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

再来看 入口文件 → `index.js` 

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// 引入css
import './index.css';
// 引入App.js组件，后缀js可以不写
import App from './App';
// --- 页面性能分析文件(需要web-vitals库的支持)
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
   // 开启严格模式，这样对一些显而易见的错误都会有提醒
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

 **App**组件 → `App.js`

webpack的理念，一切皆组件。所以图片css这些静态资源也当组件跟引入进来了。

```jsx
import logo from './logo.svg';
import './App.css';

function App() {
  return (
     // 为了区别js关键字class，所有的html class属性都被写成了classXxx的形式
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

```

**这里会有个疑问，为什么App.js可以被index.js给识别到。**

- index.js里面导入了App.js
- App.js通过es6的默认暴露`export default App;`，给暴露出来了。

如果不写默认暴露，这样写也是可以实现的。

创建 + 暴露

```jsx
export default function App() {
  return (
    <div className="App">
      Learn React!!!
    </div>
  );
}
```

创建组件和暴露分别

```jsx
function App() {
  return (
    <div className="App">
      Learn React!!!
    </div>
  );
}
export default App;
```

#### 随便写一个组件

小Tips

> 一般会把入口的index.js和App.js主要组件写成js，虽然说App.jsx也可以识别的。但是一般把这种主要的写成js，其他组件都会写成`.jsx`

*Hello.jsx*

```jsx
import React, { Component } from 'react'

export default class Hello extends Component {
    render() {
        return (
            <div>
                我是Hello
            </div>
        )
    }
}
```

*App.js*

```jsx
import './App.css';
// 引入默认暴露的Hello组件
import Hello from './Hello'

function App() {
  return (
    <div className="App">
      Learn React!!!
      <Hello />
    </div>
  );
}

export default App
```

#### 一些项目不同的框架思路

**写法1**

上面的*Hello.js*是我直接生成在src这个目录下的。其实也可以这样写。新建一个组件文件夹，在下一层新建组件名的文件夹，然后写，这样统一。然后在*App.js*引入的时候要注意别写错了。

![image-20210908152513716](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210908152515.png)

```jsx
import './App.css';
// 注意引入的路径
import Hello from './Component/Hello/Hello'

function App() {
  return (
    <div className="App">
      Learn React!!!
      <Hello />
    </div>
  );
}

export default App
```

其实还有一种写法，也很常见的。这样看起来很清晰，但是也造成了一个问题，就是难以一眼看出来到底是哪个组件的`index.js`

**写法2**

`Hello.jsx` → `index.jsx`

```
import Hello from './Component/Hello/Hello'
import Hello from './Component/Hello/'
```

![image-20210908153053788](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210908153055.png)

```jsx
import './App.css';
import Hello from './Component/Hello'

function App() {
  return (
    <div className="App">
      Learn React!!!
      <Hello />
    </div>
  );
}

export default App
```

样式的模块化

为了解决导出都是有css，导致css冲突的情况。

```css
/* Hello.css */
.title {

}
/* Hello.css2 */
.title {

}
```

**解决方法1 → 使用less**

```less
.hello {
    .title{
        
    }
}
.hello2 {
    .title{
        
    }
}
```

**解决方法2 → webpack形式的样式模块化**

- index.css → index.module.css
- 引入修改 

```jsx
import hello from './index.module.css'
import './index.css'
```

- 对象书写

```jsx
<h2 className="title">Hello!!</h2>
<h2 className={hello.title}>Hello!!</h2>
```

### 组件化基本流程

① 拆完页面 → 抽取组件 → 写几个jsx，怎么命名

② 实现静态的（没有交互）→ 写html，css，图片等。

③ 实现动态的 → 写需要什么数据，组织数据，写事件。

大概就是这样

```
1. 拆分组件: 拆分界面,抽取组件
2. 实现静态组件: 使用组件实现静态页面效果
3. 实现动态组件
        3.1 动态显示初始化数据
                3.1.1 数据类型
                3.1.2 数据名称
                3.1.3 保存在哪个组件?
        3.2 交互(从绑定事件监听开始)
```



## 脚手架的代理配置

主要解决的是是跨域请求，比如React项目是3000端口，请求server，5000的端口怎么办。2种解决方法。

### 方法一

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （**优先匹配前端资源）**比如这样请求的话，http://localhost:3000/index.html，React自己有`index.html`的情况下，会优先找`index.html`下面的

### 方法二

1. 第一步：创建代理配置文件

   ```
   在src下创建配置文件：src/setupProxy.js
   ```

2. 编写setupProxy.js配置具体代理规则：

   ```js
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时**必须加前缀**。

## 7. 路由

单页Web应用（single page web application，SPA）

```
1.	单页Web应用（single page web application，SPA）。
2.	整个应用只有一个完整的页面。
3.	点击页面中的链接不会刷新页面，只会做页面的局部更新。
4.	数据都需要通过ajax请求获取, 并在前端异步展现。
```

关于前后端的路由

```
1.	后端路由：
    1)	理解： value是function, 用来处理客户端提交的请求。
    2)	注册路由： router.get(path, function(req, res))
    3)	工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
2.	前端路由：
    1)	浏览器端路由，value是component，用于展示页面内容。
    2)	注册路由: <Route path="/test" component={Test}>
    3)	工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件
```

本质就是说整个项目就一个*HTML* 这样很不利于SEO！

路由链接的本质就是一个kv组合而已。

key就是路径，value有可能是function，也有可能是组件。

**前端路由的基石！**

本质用的是BOM（Brower Object）浏览器对象，专门用来管理所有的操作。

这里用了*history.js*这个库来验证的

```javascript
// let history = History.createBrowserHistory() //方法一，直接使用H5推出的history身上的API
let history = History.createHashHistory() //方法二，hash值（锚点）

function push (path) {
    history.push(path)
    return false
}

function replace (path) {
    history.replace(path)
}

function back() {
    history.goBack()
}

function forword() {
    history.goForward()
}

history.listen((location) => {
    console.log('请求路由路径变化了', location)
})
```

- 锚点跳转就会有#这个符号，不会引起页面刷新，但会引起页面跳转产生历史。
- 前端路由的工作原理就是*history.js*

react-router

- web 直接学这个为web打造 *react-router-dom*
- vative
- anywhere

路由和路由器是不一样的。路由器可以管理路由。

点击导航引起路径变化，路径的变化被路由器检测到，然后匹配组件。

#### BrowserRouter

```jsx
import './App.css';
import {Link, BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
function App() {
  return (
    <div className="App">
      <h1>我是头</h1>
      {/* <a href=""></a>
      <a href=""></a> */}
        <Routes>
          {/* 在React里面靠路有链接切换组件-编写路由链接 */}
            <Link className="" to="/about">About</Link>
            <Link className="" to="/home">Home</Link>
          {/* 注册路由 */}
            <Route path="/about" componet={<About/>}></Route>
            <Route path="/home" componet={<Home/>}></Route>
          </Routes>
    </div>
  );
}

export default App;

```

#### 路由的基本使用

```
1.明确好界面中的导航区、展示区
2.导航区的a标签改为Link标签
	<Link to="/xxxxx">Demo</Link>
3.展示区写Route标签进行路径的匹配
	<Route path='/xxxx' component={Demo}/>
4.<App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>
```

#### 路由组件 PK 一般组件

路由组件 会收到很多路由器给的东西

一般组件 不给就不会收到

```
1.写法不同：
    一般组件：<Demo/>
    路由组件：<Route path="/demo" component={Demo}/>
2.存放位置不同：
    一般组件：components
    路由组件：pages
3.接收到的props不同：
    一般组件：写组件标签时传递了什么，就能收到什么
    路由组件：接收到三个固定的属性
            history:
                go: ƒ go(n)
                goBack: ƒ goBack()
                goForward: ƒ goForward()
                push: ƒ push(path, state)
                replace: ƒ replace(path, state)
            location:
                pathname: "/about"
                search: ""
                state: undefined
            match:
                params: {}
                path: "/about"
                url: "/about"
```

#### LInk 和 NavLink 和 封装NavLink

NavLink可以实现路由链接的高亮，通过activeClassName指定样式名

之前

```jsx
// App.jsx
<NavLink activeClassName="yes" className="yes-2" to="/about">About</NavLink>
```

 之后

```jsx
// App.jsx
<NyNavLink to="/home">Home</NyNavLink>
// index.jsx
<NavLink activeClassName="yes" className="yes-2" {...this.props}/>
```

标签体内容也是一个属性，可以在*this.props*为*children*

可以使用*console.log(this.props)*验证

```jsx
<NyNavLink to="/home">Home</NyNavLink>
<NyNavLink to="/home" children="Home" /> 
// 意思就是说这俩一样的
```

#### 关于Switch的使用

之前

```jsx
// 这样会发现会全部继续向下匹配
<Route path="/path1" component={About}/>
<Route path="/path2" component={About2}/>
```

之后

```jsx
<Switch>
	<Route path="/path1" component={About}/>
	<Route path="/path2" component={About2}/>
</Switch>
```

总结

```
1.通常情况下，path和component是一一对应的关系。
2.Switch可以提高路由匹配效率(单一匹配)。
```

#### 样式丢失问题

如果请求不存在的地址的时候，react会自动跳转到默认的界面，就是*index.html*

**多级路径** + **刷新**页面会出现问题。可以查看路径来确定。

```jsx
// 刷新就会丢失
localhost/path/about 会丢失
// 刷新不会丢失
localhost/about 不会丢失
```

因为react在刷新的时候会默认 *localhost/path/*  是一个整体，就会找不到资源。

如何解决呢？

方法1

```
public/index.html 中 引入样式时不写 ./ 写 / （常用）  因为这样会直接根据localhost找
```

方法2

```
public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
```

方法3

```
使用HashRouter  因为#后面的react都会忽略
```

#### 路由的模糊匹配 (默认是模糊匹配)

给多可以，给少不行！！

*/home*  给了 */home/a/b* 可以的

*/home/a/b*  给了 */home* 不可以

```jsx
// 模糊匹配下是可以的 OK
/home 
/home/a/b
```

精准匹配 → exact 这样就必须符合条件

```jsx
<Route exact={true} path="/about" component={About}/> // OK
<Route exact path="/about" component={About}/> // OK
```

> 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

#### Redicrt 重定向

兜底作用

一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

```jsx
<Switch>
    <Route path="/about" component={About}/>
	<Route path="/home" component={Home}/>
	<Redirect to="/about"/> 
</Switch>
```

#### 二级路由（嵌套路由）

为了实现，类似于下面这样。

![image-20211109232049802](https://raw.githubusercontent.com/chihokyo/image_host/develop/20211109232050.png)

路由是有顺序的，会依次匹配。

先匹配第一级，然后第二级.....

比如 `/home/new`

- 先匹配1级 这样不会丢 先挂载 `/home`
- 继续进行匹配 `/home/new`

所以严格模式就天残！下面所有的子路由都祭天了。

### 传递参数

#### params → 直接在路径下

直接写``肯定是不行的，因为这里是jsx，不是js，需要的话可以在{}写js

```jsx
// 【路由链接(携带参数)】给路由组件传递参数 放出信号
<Link to={`/demo/test/tom/${id}`}>详情</Link>
// 【注册路由(声明接收)】声明接受params参数 一一对应 接收信号
<Route path="/demo/test/:name/" component={Test}/>
//  【接收参数】
this.props.match.params
```

#### search → 无需声明

```jsx
// 路由链接(携带参数)
<Link to='/demo/test?name=tom&age=18'}>详情</Link>
<Link to={`/demo/test?name=${name}&age=${id}`}>详情</Link>
// 注册路由(无需声明，正常注册即可)
<Route path="/demo/test" component={Test}/>
// 接收参数
this.props.location.search
// 备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
```

这里会引入一个qs的库 `querystring`

```jsx
import qs from '`querystring'
const { search } = this.props.location
const {id, title} = qs.parse(search.slice(1)) // 直接去掉？之后解构赋值
```

本质就是把字符串 转换 成一个对象

#### state参数 → 地址栏不会暴露

不同于上面2个，这个state参数不会再地址栏进行暴露。

这个state不会和组件的state有任何关系

```jsx
// 路由链接(携带参数)
<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}} />
// 注册路由(无需声明，正常注册即可)
<Route path="/demo/test" component={Test}/>
// 接收参数
this.props.location.state
```

> 虽然地址栏没有东西，但是刷新也可以保留住参数
>
> 如何实现的呢？其实本质就是用的浏览器的history，使用的就是浏览器的这个history API
>
> 但是如果清除掉 **缓存** 的话，那么就会出错。所以解构赋值的时候

```jsx
const {id, title} = this.props.location.state || {}
// 所以要注意空对象的问题。
```

如何选择？

- 不想展示在地址栏就用state

### 编程式路由导航

不借助路由链接 Link NavLink来实现

#### push PK replace

默认就是push

```jsx
<Link replace={true} />
<Link replace />
```

## 8. redux

这样的构造下，很难去搞数据的传递。

使用通信里的广播。

![](https://raw.githubusercontent.com/chihokyo/image_host/develop/20211117140047.png)



这时候redux就出来了，redux里面就是一个公用的。集中式状态管理。可以把一些集中的数据放在redux里面，然后谁需要就向里面拿就可以了。

其实就是**集中管理状态。** 很像中间商。

action 负责分发

store　相当于 一个中枢 只会reducer进行操作

![image-20211117145800557](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20211117145800557.png)

action → 中介（接活儿）核心就是把要做的事情给包装成对象。

store → 大老板 负责调控，交代打工人做事。交付给组件

reducer → 打工人（初始化状态，加工状态）

最后 components 用 *getState()* 就获取了最新的状态。

客人（点餐）→ 服务员（分发） → 老板监控（运筹帷幄） → 厨师（做饭）















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

**生命周期跟写的函数顺序无关，就是框架执行顺序而已。有**部分生命周期函数并没有写，因为涉及其他父子组件传递数据问题。

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