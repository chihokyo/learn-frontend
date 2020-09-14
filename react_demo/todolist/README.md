# TodoList案例&基础总结

> **基于开发简书项目案例的前面导学部分**

## 1. 组件引入

### 关于jsx语法

```javascript
import React from 'react';
// dom渲染 虚拟DOM挂载到真实DOM
import ReactDOM from 'react-dom';
// 具体内部组件引入
import App from './App';
```

基础jsx语法
**所谓jsx 其实就是 js的语法糖，js里面写html标签。**
js ===>>>> jsx

- 以前在js里面写html。都是字符串。现在直接写。

- jsx 不仅仅可以用html，还可以使用自定义标签。比如自定义的组件，引入过来。**（！开头必须要大写！）**

```javascript
import React, { Component, Fragment } from 'react';
// Fragment 可以代替 跟标签root div进行站位
```

- 如果想转译`HTML`,dangerouslySetInnerHTML

```javascript
<ul>
    {
    this.state.list.map((item, index) => {
        return (
        <li key={index}
            onClick={this.handleItemDelete.bind(this, index)}
            dangerouslySetInnerHTML={{__html:item}}
        > 
        </li>)
    })
    }
</ul>
```

```javascript

<ul>
    {
    this.state.list.map((item, index) => {
        return (
        <li key={index}
            onClick={this.handleItemDelete.bind(this, index)}
        >
            {item}
        </li>)
    })
    }
</ul>

```

- 想要使用html标签

```html
<label for='area' >输入内容</label>  这样会报错
<input id='area' className='input' type="text">
<label htmlfor='area' >输入内容</label>
```

## 2. 关于组件通信

#### 父传子 → 通过属性

```javascript

<ul>
   // 这里的item传过去的是给child
    {
    this.state.list.map((item, index) => {
        return (
        <div>
            <TodoItem itemPasstoChild={item}/>
            {/*<li key={index}
            onClick={this.handleItemDelete.bind(this, index)}
            dangerouslySetInnerHTML={{ __html: item }}
            >
            </li>)*/}
        </div>
    })
    }
</ul>


```

#### 子传父 → 调用父类方法

通过事件绑定
也是通过传递

```javascript

// 父亲传递过去，通过属性，父组件的函数指向要进行绑定
<TodoItem 
    key={index} 
    itemPasstoChild={item} 
    index={index}
    ItemDelete={this.handleItemDelete.bind(this)}
/>

// 子组件进行接收

handleClick = () => {
    // 获取index值
    console.log(this.props.index)
    // 调用父组件的方法
    this.props.ItemDelete(this.props.index)

}
```



## 3. React一些特点

### 声明式编程

命令式编程 ===>>> 大部分都是在dom操作
react 就是 声明是开发 不需要每一步都自己做，不需要自己操作dom
react 其实可以和JQ并存 因为react 只接管一个根节点 id：root 

### 组件化

组件化 标签大写 jsx 记得结束符 *<Component />*

### 单向数据流

单向数据流：子组件只能使用父组件的value，而不能改变。防止bug。
如果子组件想改变父组件，最后用子组件调用父组件，**父组件自己改变自己**。

### 视图层框架

视图层框架： 视图层框架就是指的是 MVVM

这篇文章可以参考一下：[前端框架架构模式](https://juejin.im/entry/6844903521221869575)

###  函数式编程

函数式编程：写的都是一个个函数的写法。维护起来比较容易，自动化测试容易。

## 4. props&state&render关系

state 和 props 是数据。

组价内 state和props只要发生改变， *render()*就会被执行
所以数据发生变化，页面也会变化。
当父组件*render()*被执行时，子组件的*render()*都会被执行。

所以感觉上就是

> state/props → *render()* → 重新渲染页面

PS：React三个属性 `state,props,ref`

## 5. 虚拟DOM

虚拟DOM一言以蔽之，**就是一个js对象，用来描述真实的DOM。**

### 耗能模式

1. state 数据
2. JSX 模板
3. 数据 + 模板 ===>>> 生成**真实的DOM**
4. state 发生改变
5. 数据 + 模板 结合 替换原始的**真实的DOM**

缺陷： **每一次都会生成新的真实DOM**，耗费性能。

### 优化模式

1. state 数据
2. JSX 模板
3. 数据 + 模板 ===>>> 生成**真实DOM**
4. state 发生改变
5. 数据 + 模板 结合 并不替换原来的DOM
6. 新的**真实DOM** （DocumentFragment）和 原始**真实DOM** 作对比，找差异
7. 找出具体input框对比发生变化
8. 只用 新的**真实DOM**中 的input元素替换掉原来 老旧的input元素

缺陷： 虽然是只更新部分**真实DOM**，性能提升并不明显。

### 虚拟DOM

1. state 数据

2. JSX 模板

3. 数据 + 模板 ===>>> 生成真实的DOM

4. 生成**<u>虚拟的DOM</u>**(就是一个js对象，用来描述真实的DOM) 
   类似于数据`['div', {id:'test'},['span',{},'hello world']]`
   ↓ 

`<div id="test"><span>hello world</span></div>`

5. state发生变化

6. 数据 + 模板 生成新的**虚拟DOM**，['div', {id:'test'},['span',{},'yes']]

7. 比较新旧 **虚拟DOM** 差别

8. 直接操作**真实DOM**，改变span内容

好处  **①性能提升　②跨端应用得到实现（React Native）**

> **Q:为什么能跨端呢？**
>
> 因为是虚拟DOM，所以即使没有浏览器环境的真实DOM，比如Android和iOS端，也可以通过虚拟DOM进行渲染。
>
> 这样就可以跨端进行开发。

```javascript
// 这里是虚拟DOM的React写法
render() {
        const { itemPasstoChild, test } = this.props
        return (
            <div onClick={this.handleClick}>
                {test}-{itemPasstoChild}
            </div>
        )
} 
// 但其实是本质就是利用的
render() {
        const { itemPasstoChild, test } = this.props
        // 其实就是一个 jsx → createElement → 虚拟DOM（js对象） → 真实dom
        return (
            React.createElement('div', {}, 'item')
        )
} 
```

### 虚拟Diff算法

##### Q: 虚拟dom什么时候会被更新？

diff里 *state*和*props*发生变化

*setState()* 异步函数，多次改变，n次diff，1次更新。**这就是为什么要被设计成异步函数**。

关于同层比对。

第一层开始比对。第一层不同，下面直接不看，直接进行删除重新渲染。

虽然效率略等，但是比下面一一比对效率更高。类似于下面图这种。

下面所有的虚拟DOM节点进行*diff*算法比较其实比直接渲染效率更低。

![](https://raw.githubusercontent.com/chihokyo/image_host/master/20200914230745.png)

##### Q: 为什么 key不应该是index？

因为如果数据是这样的形式。*0:a, 1:b, 2:c *

一旦删除掉其中一个比如a删除掉，那么就会重新进行排序，变成*0:b, 1:c *。这样会导致key值不稳定，这样进行diff算法会很消耗性能。

那用什么作为key值，可以用item，这样就是a,a,b,b,c,c ,这样即使去掉了a，那么b，c的index也不会变化。提高渲染效率。

使用一个稳定的value作为key值在性能上更好，所以不推荐index作为key，因为index，在每一次变化的时候都会变。

<u>**PS:**</u>

<u>**但实际开发里面发现了新问题，就是如果item是重名的话，那么就会报错。这里还是需要其他解决方案吧。</u>**

#### 关于ref

```html
<input
       id='area'
       className='input'
       value={this.state.inputValue}
       onChange={this.handleChange}
       ref={(input)=>{this.input = input}}
/>
```

`ref={(input)=>{this.input = input}} ` 自动接收一个参数(input)，这个参数名称是任意的，

这句话解析，我们构建了1个*ref*引用。

this.input 指向 这个input对应的DOM节点：比如上面的就是指向的input这个框的DOM

因为this.input既然指向了input所在的dom元素，那么下面的获取value的时候就可以不用使用**e*.target.value*

```javascript
handleChange2(e) {
    const value = e.target.value  
    this.setState(()=>({
      inputValue: value
    }))
  	//
  	const value = this.input.value  
}
```

#### 使用ref直接操作DOM注意点

直接操作dom可能会出现异步函数不同步执行发生错误的情形。

```javascript
<ul ref={(ul)=>{this.ul = ul}}>
  {
  this.getTodoItem()
  }
</ul>

handleBtnClick() {
    this.setState((preveState) => ({
      list: [...preveState.list, preveState.inputValue],
      inputValue: ''
    }))
		// 因为是异步函数，所以这时候得出来的长度并不一定是实际节点的长度
  	// 因为这个函数可以先于 this.setState 执行
    console.log(this.ul.querySelectorAll('div').length)

  }

```

如果需要正确的结果是需要在在*this.setState()*回调函数写的

```javascript
handleBtnClick() {
    this.setState((preveState) => ({
      list: [...preveState.list, preveState.inputValue],
      inputValue: ''
    }), () => {
      // 回调函数
      console.log(this.ul.querySelectorAll('div').length)
    })

  }
```

