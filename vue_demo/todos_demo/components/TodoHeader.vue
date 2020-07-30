<template>
  <div>
    <h2>TodoHeader</h2>请输入：
    <input type="text" name id v-model="title" @keyup.enter="addItem" />
  </div>
</template>

<script>
export default {
  props: {
    addTodo: Function,
  },

  data() {
    return {
      title: "",
    };
  },
  methods: {
    addItem() {
      const title = this.title.trim();
      if (!title) {
        alert("请输入!");
        return;
      }
      const todo = {
        title,
        status: false,
      };
      // 2,3 $on和@事件通用触发事件写法
      this.$emit("addTodo", todo);
      // 1普通写法
      //this.addTodo(todo)
      this.title = "";
    },
  },
};
</script>

<style>
</style>