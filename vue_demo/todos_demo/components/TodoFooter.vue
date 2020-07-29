<template>
  <div>
    <!--计算属性是最难想到的，因为要监听最新的值-->
    <input type="checkbox" name id v-model="isCheckAll" />全选/不选
    <!-- statusFalse不要加括号 不然立即调用了 -->
    <p>已完成：{{ statusFalse }}</p>
    <p>全部任务：{{ todos.length }}</p>
    <button type="button" v-show="statusFalse" @click="deleteAllNot">清除所有已完成任务</button>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array,
    deleteAllNot: Function,
    selectAll: Function,
  },

  computed: {
    // 计算未完成数量
    statusFalse() {
      return this.todos.reduce((pre, todo) => pre + (todo.status ? 1 : 0), 0);
    },
    isCheckAll: {
      get() {
        return this.status === this.todos.length && this.todos.length > 0;
      },
      set(value) {
        // 最新的值
        this.selectAll(value);
      },
    },
  },
};
</script>

<style>
</style>