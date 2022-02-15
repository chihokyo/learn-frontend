# 关于Redux的一俩事



## 写常识

redux其实是一个js库（并不是**React**专用的库）

angular和vue都可以用，是一个状态管理的js库

用于管理多个组件中共享状态。在大型项目中，redux这种状态管理比较适用。

## 简单的介绍

这样的构造下，很难去搞数据的传递。

使用通信里的广播。

![](https://raw.githubusercontent.com/chihokyo/image_host/develop/20211117140047.png)



这时候redux就出来了，redux里面就是一个公用的。集中式状态管理。可以把一些集中的数据放在redux里面，然后谁需要就向里面拿就可以了。

其实就是**集中管理状态。** 很像中间商。

action 负责创建分发 → 本质就是一个对象 包含俩东西**①type，指名要干什么。②data，修改的数据。**

store　相当于 一个中枢 通过dispatch 指挥reducer进行操作

![image-20211117145800557](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20211117145800557.png)

action → 中介（接活儿）核心就是把要做的事情给包装成对象。

store → 大老板 负责调控，交代打工人做事。交付给组件

reducer → 打工人（初始化状态【state】，加工状态【action】）→ 处理原始数据，还有逻辑。

最后 components 用 *getState()* 就获取了最新的状态。

客人（点餐）→ 服务员（分发） → 老板监控（运筹帷幄） → 厨师（做饭）

```
这里有一个后期写的一张图，可以帮助理解。
```

![image-20220215222721776](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220215222721776.png)

最后版本

![image-20220215224046602](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220215224046602.png)

## 没有redux的世界

*src/components/Count/index.jsx*

```jsx
import React, { Component } from 'react'

export default class Count extends Component {
 
    state = {count: 0}

    increment = () => {
        // 获取用户的值
        // 这里是字符串
        const { value } = this.selectNumber;
        const { count } = this.state;
        this.setState({
            count: count + value * 1
        })
    }
    decrement = () => {
        // 获取用户的值
        // 这里是字符串
        const { value } = this.selectNumber;
        const { count } = this.state;
        this.setState({
            count: count - value * 1
        })
    }
    incrementIfOdd = () => {
        // 获取用户的值
        // 这里是字符串
        const { value } = this.selectNumber;
        const { count } = this.state;
        if (count % 2 !== 0) {
            this.setState({
                count: count + value * 1
            })        
        }
    }
    incrementIfAsync = () => {
        const { value } = this.selectNumber;
        const { count } = this.state;
        setTimeout( () => {
            this.setState({
                count: count + value * 1
            })
        }, 1000)
    }
    render() {
        return (
            <div>
                <h1>当前求和是：{this.state.count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementIfOdd}>if odd</button>
                <button onClick={this.incrementIfAsync}>async</button>
            </div>
        )
    }
}

```

​	*src/App.js*

```js
import React, { Component } from 'react'
import Count from './components/Count'
export default class App extends Component {
  render() {
    return (
      <div>
        <Count />
      </div>
    )
  }
}
```

以上就是没有redux，实现的一个很简单的小组件的世界。

## 有了redux的迷你世界

![image-20211117214101106](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20211117214101106.png)

store，和reducers。每一个组件都应该有一个reducers， 比如*count_reducer.js*

**安装redux**

```bash
npm install redux
```

**新建个文件夹&文件**

```bash
- src/redux
	 - count_reduce.js
	 - store.js
```

*src/components/Count/index.jsx*

```jsx
import React, { Component } from 'react'
import store from '../../redux/store';

export default class Count extends Component {
 
    state = {carName: 'tesla'} // 即使统一的store管理，也可以有自己的数据

    /* componentDidMount(){
		//检测redux中状态的变化，只要变化，就调用render
        ----！！！所以这段代码，最后写在了最外层的root里！！！----
		store.subscribe(()=>{
			this.setState({})
		})
	} */

    increment = () => {
        // 获取用户的值
        // 这里是字符串
        const { value } = this.selectNumber;
        // const { count } = this.state; 这里也就不用写了 统一管理的话
        // 【组件→store】分发，负责告诉store，我要干什么了
        store.dispatch({type: 'increment',data: value * 1})
    }
    decrement = () => {
        // 获取用户的值
        // 这里是字符串
        const { value } = this.selectNumber;
        store.dispatch({type: 'decrement',data: value * 1 })
    }
    incrementIfOdd = () => {
        // 获取用户的值
        // 这里是字符串
        // const { value } = this.selectNumber;
        // const { count } = this.state;
        // if (count % 2 !== 0) {
        //     this.setState({
        //         count: count + value * 1
        //     })        
        // }

        const { value } = this.selectNumber
        // 这里就是要获取此时的状态值
		const count = store.getState()
		if(count % 2 !== 0){
			store.dispatch({type: 'increment',data: value * 1})
		}
    }
    incrementIfAsync = () => {
        const { value } = this.selectNumber;
        setTimeout( () => {
            store.dispatch({type: 'increment', data: value * 1})
        }, 1000)
    }
    render() {
        return (
            <div>
                <h1>当前求和是：{store.getState()}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementIfOdd}>if odd</button>
                <button onClick={this.incrementIfAsync}>async</button>
            </div>
        )
    }
}
```

*src/redux/count_reducer.js*

```js
/**
 * 这里既然是reducer，初始化状态+加工状态
 * 1接收东西
 * 2根据接收的之前的状态，进行处理
 * 3函数来处理
 * 4reducer本质就是1个函数
 */

/**
 * 
 * @param {string} prevState 之前的状态
 * @param {object} action 动作对象
 */

const initialState = 0; // 初始化状态，这样默认写参数要比在里面写清晰一点
export default function countReducer(state=initialState, action) {
    // console.log(state); // 这里会看到最新的状态
    // data: 传入的数据
    const {type, data} = action // 结构赋值
    switch (type) {
        case 'increment':
            return state + data;
        case 'decrement':
            return state - data;
        default:
            return state // 没有就默认初始化状态
    }
}
```

*src/redux/store.js*

```js
/**
 * 该文件专门用语暴露1个store对象，整个应用只有一个store对象
 */

// 引入createStore，专门用于创建redux最核心的store对象
import { createStore } from 'redux';
// 引入为count组件服务的reducer
import countReducer from './count_reducer';

const store = createStore(countReducer)
// store 需要交出去
export default store


// 也可以写成这样 export default createStore(countReducer)
```

最后要记得在全局进行状态管理

```js
import React from 'react'; // react
import ReactDOM from 'react-dom'; // render
import App from './App'; 
import store from './redux/store' // 引入状态管理

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})
```

以上就是粗糙的版本的redux，最草根的版本。

```
(1).去除Count组件自身的状态 state不写

(2).src下建立:
    - redux
    - store.js
    - count_reducer.js
    
(3).store.js：
  1).引入redux中的createStore函数，创建一个store
  2).createStore调用时要传入一个为其服务的reducer
  3).记得暴露store对象	

(4).count_reducer.js：
  1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态
  2).reducer有两个作用：初始化状态，加工状态
  3).reducer被第一次调用时，是store自动触发的，
  传递的preState是undefined,
  传递的action是:{type:'@@REDUX/INIT_a.2.b.4}
  ⭐️这里为什么是@@REDUX/INIT_a.2.b.4这样的字符，且每次刷新都不一样呢。是为了防止和自己定义的函数名重名！！

(5).在index.js中监测store中状态的改变，一旦发生改变重新渲染 <App/>
	⭐️：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。
```



