<!--这里是项目入口文件App.vue-->
<template>
<div id="app">
    <img src="./assets/logo.png" alt="Vue Logo"><br>

    <!-- 下面开始是组件 -->
    <Header></Header>
    <!-- 父传子数据传递方法1添加评论 2删除评论-->
    <Add :addComment="addComment" :deleteComment="deleteComment"></Add>
    <!-- 父传子数据需要1：声明 2：Body那边需要接受-->
    <Body :comments="comments" :deleteComment="deleteComment">
      
    </Body>
    <Footer></Footer>

</div>
</template>


<script>
// 局部引入组件↓（下面还需要注册
import Header from './components/Header'
import Footer from './components/Footer'
import Body from './components/Body'
import Add from './components/Add'

export default {
    name: 'App', // 给这个模块取名字
    data: function(){ //这里是函数，不是对象
        return {
           // App.vue 的数据要传给Body.vue
            comments: [
              {username:'Amy',content:'I love U'},
              {username:'Bob',content:'I love Bob'},
              {username:'Candy',content:'I love Candy'},
              {username:'Dog',content:'I love Dog'},
            ]
        }
    },
    methods: {
        // 添加评论
        addComment(comment){
          // 这里可以直接操作，无需set status
         //  传递过去给add.vue
          this.comments.unshift(comment)
        },

        deleteComment(index){
          
          this.comments.splice(index,1)
        }
    },
    // 注册组件
    components: {
      Header,
      Footer,
      Body,
      Add
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
  margin-top: 60px;
}
</style>
