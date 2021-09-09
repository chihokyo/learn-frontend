# 一个短小精悍的炒鸡基础的React小练手项目

反正就是老项目。直接点击下面最后完成品框架可以感受一下。项目的感觉。能学到什么呢？

- react怎么写组件，模块，工程的。
- 最基础最基础。
- 并不包含redux状态管理等等。

写给n年后再来看这个练手项目的我的话 → **因为这里并没有安装包文件，如果需要重温一下这个任务的话敲下面命令开启。**

```
npm install
npm start
```

## 1. 静态拆分

### 1-1 拆分结构

看一下需要多少个组件

![image-20210908164402939](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210908164404.png)

### 1-2 整合一些

从现有的htmlcss到react

- 统一把html一股脑放进*App.js*最原始的存在
- 修改 class → className
- 从 `style=""`→ `style={{}}`
- 从**ide**里看看有什么没闭合的标签啥的
- 统一把css一股脑放在*App.css*

### 1-3 搞静态文件

- 把从一股脑的*App.js*里面的html拆分到各个组件 **组件/index.jsx**
- 把从一股脑的*App.css*里面的css拆分到各个组件 **组件/index.css**

## 2. 动态数据

下面是这个结构，现在比较棘手的是List和Header之间的传递。因为是兄弟关系，目前还没有学会兄弟之间传递。兄弟之间在这里找共通的父亲，也就是App里存储数据就可以了。

- 父 → 子 【使用props直接传递数据就可以】
- 子 → 父【①父使用props传递一个**函数**给子 → ②子调用函数的时候把数据以参数func(param)形式传递  → ③父收到新的数据重新渲染】

```
App
	Header 文本框输入任务
	List
		Item 具体任务
	Footer
```

因为要给共同（**List&Header→App**）的父亲，所以数据就放在App.js里，并且状态在哪里，操作状态的方法就在哪里。

### 2-1父给子

写一个父给子

*App.js* **App组件给List组件传递了todos的数据**

```jsx
<List todos={todos} />
```

### 2-2 子给父

*App.js* 

```jsx
// 第一步首先父亲写一个函数
addTodo = (todoObj) => {
    // 获取已有任务列表
    const { todos } = this.state;
    // 添加新任务到已有任务列表
    const newTodo = [todoObj, ...todos];
    // 更新状态
    this.setState({ todos: newTodo });
};
// 第二步通过props传给子
<Header addTodo={this.addTodo} />
```

来到了*Header.jsx*

```jsx
// 第三步在input里面写回调
<input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
// 第四步 直接通过 this.props.addTodo(todoObj)调用就行
// 接下来父亲就会收到最新的todoObj数据
handleKeyUp = (event) => {
    const {keyCode, target} = event;
    if(keyCode !== 13) return
    if(target.value.trim() === '') {
        alert('输入不能为空')
        return
    }
    const todoObj = {
        id: nanoid(),
        name: target.value,
        done: false
    }
    // 从App组件传来的addTodo
    // 通过这样的形式把子组件的 todoObj 传递给 父组件
    this.props.addTodo(todoObj)
    // 别忘记清空
    target.value = ''
}
```

### 2-3 类型约束问题

安装包：https://github.com/reactjs/prop-types

安装完之后就这样写。

```jsx
import PropTypes from "prop-types";
// 类型约束
export default class index extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        updateTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
    };
}
```

## 3. 一些小问题

- 传递数据的简便写法

```jsx
<Item key={todo.id} name={todo.name} done={todo.done} updateTodo={updateTodo} deleteTodo={deleteTodo} />
// todo对象一股脑全进去
<Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
```

- defalutchecked区别

**defalutchecked** 默认选中，一次性，不可修改。**checkd** 可以修改，但需要写`onChange()` 不然报错

- 鼠标移动的效果

使用数据的true，false决定

- window的confirm小问题

直接写`confirm()`会出错，需要加上**window**对象

- 关于柯里化的再次确认

```jsx
onClick={() => {
    this.handleDelete(id);
}}
// 在onClick里面写了匿名函数，这样写回调函数的时候就不用写return在返回一个函数了
// 点击删除
handleDelete = (id) => {
    // 一个小坑，this指向问题 必须window
    if (window.confirm("你确定要删除?")) {
        this.props.deleteTodo(id);
    }
};
```

## 最后完成品框架

- 在输入框输入文字回车键键入添加任务
- 鼠标悬浮变颜色+显示删除
- 点击删除可以删除
- 点击前面的✅可以完成
- 已完成任务+ 全部任务 可以实时显示在下面
- 底部可以点全选，也可以取消全选
- 可以清除全部已完成任务

![image-20210909230512391](https://raw.githubusercontent.com/chihokyo/image_host/develop/20210909230514.png)

