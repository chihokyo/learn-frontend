<!--这里是项目入口文件App.vue-->
<template>
  <div id="app">
    <Search></Search>
    <MainBody></MainBody>
  </div>
</template>


<script>
import Search from "./components/Search";
import MainBody from "./components/MainBody";

export default {
  name: "App", // 给这个模块取名字
  components: {
    Search: Search, //这里其实是一个 自定义名字：引入模块 （上面引入时候的name）
    MainBody, // 自定义和引入时候的名字一样的话可以简写成一起
  },
  mounted() {},
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
