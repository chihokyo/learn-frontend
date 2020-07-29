<template>
  <div>
    <li>{{ comment.username}} 说了： {{ comment.content}}</li>
    <span><button type="button" @click="delComment">删除评论</button></span>
  </div>
</template>

<script>
export default {
  // props:['comment'] // 只会指定属性名
  props: {
    // 指定属性名和属性值 类似于prototypes
    comment: Object,
    deleteComment:Function,
    index: Number
  },
  methods:{
    delComment(){
      const {comment,deleteComment,index} = this
      if (window.confirm(`确定删除${comment.username}的评论吗`)) {
        deleteComment(index)
      }
    }
  }
}
</script>

<style scoped>
</style>
