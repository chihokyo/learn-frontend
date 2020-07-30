<template>
  <div>
    <h3 v-if="firstView">欢迎来查查！</h3>
    <h3 v-if="loading">Loading</h3>
    <h3 v-if="errorMsg">errorMsg</h3>
    <h3 v-if="users">搜索结果如下：</h3>
    <h4 v-if="noResult">暂无结果!</h4>
    <div v-for="(user, index) in users" :key="index">
      <a :href="user.url" target="_blank" rel="noopener noreferrer">
        <img :src="user.avatar_url" alt srcset />
      </a>
      <p>{{ user.name }}</p>
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js"; // 引入订阅
import axios from "axios"; // 引入发送ajax请求

// 组件间通信是兄弟之间
export default {
  data() {
    return {
      firstView: true,
      loading: false,
      users: "",
      errorMsg: "",
      noResult: false,
    };
  },
  mounted() {
    // 订阅消息
    PubSub.subscribe("search", (msg, searchParam) => {
      // 接口api
      const url = `https://api.github.com/search/users?q=${searchParam}`;
      /* 
      1.更新状态（请求中）
      2.发送ajax请求
      3.请求成功
      4.请求失败 
      */
      this.firstView = false;
      this.loading = true;
      this.users = null;
      this.errorMsg = "";
      this.noResult = false;
      axios
        .get(url)
        .then((response) => {
          const result = response.data;
          const users = result.items.map((item) => ({
            url: item.html_url,
            avatar_url: item.avatar_url,
            name: item.login,
          }));
          this.loading = false;
          this.users = users;
          console.log(this.users.length);
          if (this.users.length == 0) {
            this.noResult = true;
          }
          console.log(this.users);
        })
        .catch((error) => {
          this.loading = false;
          this.errorMsg = error;
        });
    });
  },
};
</script>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>