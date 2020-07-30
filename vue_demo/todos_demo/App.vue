<!--这里是项目入口文件App.vue-->
<template>
  <div id="app">
    <img src="./assets/logo.png" alt="Vue Logo" />
    <br />
    <!-- 1普通正常写法 -->
    <!-- <TodoHeader :addTodo="addTodo"></TodoHeader> -->
    <!-- 使用自定义监听事件进行重写上面addTodo -->
    <!-- 2自定义事件：针对父与子 给标签对象绑定监听 ，并非调用函数 -->
    <!-- <TodoHeader @addTodo="addTodo"></TodoHeader> -->
    <!-- 3 使用on监听 要把this指向header就要进行一个ref唯一标识-->
    <TodoHeader ref="header"></TodoHeader>
    <!-- <TodoList :todos="todos" :deleteTodo="deleteTodo"></TodoList> -->
    <!-- 使用Pubsub订阅消息 -->
    <TodoList :todos="todos"></TodoList>
    <TodoFooter :todos="todos" :deleteAllNot="deleteAllNot" :selectAll="selectAll"></TodoFooter>
  </div>
</template>


<script>
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
// 引入自定义工具模块（自己写的）
import storageUtil from "./util/storageUtil";

// 绑定事件监听  -- 订阅消息
// 触发事件     -- 发布消息
import PubSub from "pubsub-js";

export default {
  name: "App", // 给这个模块取名字

  data() {
    return {
      // todos:[
      //   {title:'play',status:false},
      //   {title:'heloo',status:true},
      //   {title:'swim',status:true},
      // ]

      /* 这里开始使用 localstorage */
      // localstorage 注意点 存储的是k-v字符串，所以需要转换。
      // '[]' 这里需要注意就是如果为空需要转换成字符串格式
      todos: storageUtil.readTodos(),
    };
  },

  // mounted多用于异步，所以监听事件一般都在这里
  // $on绑定事件写法
  mounted() {
    // 这个对象是错误的，是app，但是要绑定的是Todoheader
    // [error] this.$on('addTodo', this.addTodo)
    this.$refs.header.$on("addTodo", this.addTodo);

    // 订阅消息
    PubSub.subscribe("deleteTodo", (msg, index) => {
      this.deleteTodo(index);
    });
  },

  methods: {
    // 新建Todo
    addTodo(todo) {
      this.todos.push(todo);
    },

    // 删除Todo
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },

    // 删除所有已完成
    deleteAllNot() {
      // 注意这一步要重新赋值
      this.todos = this.todos.filter((todo) => !todo.status);
    },
    // 全选or全不选
    selectAll(check) {
      this.todos.forEach((todo) => (todo.status = check));
    },
  },
  watch: {
    todos: {
      deep: true, // 深度监视
      /* handler: function (value) {
        // todos最新的数据保存到里面，数据是JSON格式需要转换成字符串呼应上面
        storageUtil.saveTodos(value);
      }, */
      /* //出自
      handler: function(todos){
        window.localStorage.setItem('todo_keys', JSON.stringify(todos))
      }, */
      // 简写成下面
      handler: storageUtil.saveTodos,
    },
  },
  components: {
    TodoHeader,
    TodoList,
    TodoFooter,
  },
};
</script>

<style scoped>
/* 这里开始写样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
