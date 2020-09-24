<template>
  <div id="add">
      <form action="">
        <span>姓名：</span>
        <input type="text" name="name" id="" v-model="username"><br>
        <span>评论内容：</span>
        <textarea name="comments" id="" cols="30" rows="10" v-model="content"></textarea><br>
        <button type="button" @click="add">发表</button>
      </form>
  </div>
</template>

<script>
export default {
    // 文档API里有全部参数的详细说明。表示接受数据的类型和约束
    props: {
        addComment:{
            type: Function,
            required: true
        }
    },

    data(){
        return {
            username:'chihokyo.com',
            content: '我的评论我做主'
        }
    },
    methods: {
        // 这里的点击事件函数名貌似貌似不能和其他组件传来的方法重名
        add(){
            // 检查输入validate
            const username = this.username
            const content = this.content
            if (!username || !content) {
                alert('不能为空')
                return // 这一步不能少。
            }
            // 获取输入值（转换成对象便于插入）
            const comment = {
                username,
                content
            }
            // 写入到数据
            // ※ 数据在哪个组件，操作数据的行为就在哪里。由于数据写在了App.vue。要在那里进行操作然后传递到这里
            this.addComment(comment)
            // 清除输入
            this.username = ''
            this.content = ''

        }
    }
}
</script>

<style scoped>
#add {
    background-color: bisque;
    width: 300px;
}

textarea {
    color: #2c3e50;
}
</style>
