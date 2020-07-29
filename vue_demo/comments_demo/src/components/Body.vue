<template>
  <div>
      <h2>我是body</h2>
      <h3>评论回复</h3>
      <h4 v-show="comments.length === 0">目前暂无评论</h4>
      <ul>
          <!-- 在把从App.vue => Body.vue => List.vue 传过去-->
          <List v-for="(comment,index) in comments" :key="index" :comment="comment" :deleteComment="deleteComment" :index="index"></List>
      </ul>
      
  </div>
  
</template>

<script>
import List from './List'
export default {
    // 声明接受来自App.vue的comments数据
    // 这个组件的属性就会成为组件对象的属性
    // 只会指定属性名
    // deleteComment自己不用，只是给add传递
    props:['comments','deleteComment'],
    components: {
        List,
    }
}
</script>

<style scoped>

</style>
