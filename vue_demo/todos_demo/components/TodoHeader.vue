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

      this.addTodo(todo);
      this.title = "";
    },
  },
};
</script>

<style>
</style>