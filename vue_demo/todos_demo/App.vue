<!--这里是项目入口文件App.vue-->
<template>
  <div id="app">
    <img src="./assets/logo.png" alt="Vue Logo" />
    <br />

    <TodoHeader :addTodo="addTodo"></TodoHeader>
    <TodoList :todos="todos" :deleteTodo="deleteTodo"></TodoList>
    <TodoFooter :todos="todos" :deleteAllNot="deleteAllNot" :selectAll="selectAll"></TodoFooter>
  </div>
</template>


<script>
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

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
      todos: JSON.parse(window.localStorage.getItem("todos_key") || "[]"),
    };
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
      handler: function (value) {
        // todos最新的数据保存到里面，数据是JSON格式需要转换成字符串呼应上面
        window.localStorage.setItem("todos_key", JSON.stringify(value));
      },
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
