<!--这里是项目入口文件App.vue-->
<template>
  <div id="app">
    <div v-if="!repoUrl">loading</div>
    <div v-else>最热门的仓库就是
      <a :href="repoUrl">{{ repoName }}</a>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "App", // 给这个模块取名字
  data(){
    return {
      repoUrl:'',
      repoName:''
    }
  },

  mounted(){
    /* 
    发送ajax请求获取数据
    1. vue-resource插件
    2. axios 官方推荐 
    看到我的插件里面貌似没有Vue-resource
    所以决定使用axios
    */
   // 请求url
   const url = "https://api.github.com/search/repositories?q=vu&sort=stars"
   axios.get(url).then(
     response =>{
       const result = response.data
       const mostRepo = result.items[0]
       this.repoUrl = mostRepo.html_url
       this.repoName = mostRepo.name
     }
   ).catch( (error)=>{
     alert(error)
   })
    
  }
}
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
