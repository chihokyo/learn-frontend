<template>
  <div>
    <h2>使用axios查询Github用户请求练习</h2>
    <input type="text" placeholder="input github username" v-model="searchParam" />
    <button @click="search">点击搜索</button>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
export default {
  data() {
    return {
      searchParam: "",
    };
  },

  methods: {
    search() {
      const searchParam = this.searchParam.trim();
      if (searchParam) {
        PubSub.publish("search", searchParam); // 参数1:消息名称 参数2:要传过去的数据
      }
    },
  },
};
</script>

<style>
</style>