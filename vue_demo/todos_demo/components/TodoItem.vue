<template>
    <div>
      <li @mouseenter="isShow(true)" @mouseleave="isShow(false)" :class="color">
        <label for="">
            <input type="checkbox" name="" id="" v-model="todo.status">
            <span> {{ todo.title }}</span>
        </label>
        <button v-show="show" @click="deleteItem()">delete</button>       
        </li>
    </div>
</template>

<script>
export default {
    props: {
        todo: Object,
        index: Number,
        deleteTodo: Function
    },
    data(){
        return {
          color:'',
          show:false
        }
    },

    methods:{
      isShow(isEnter){
        if (isEnter) {
          this.color = 'grey',
          this.show = true
        } else {
          this.color = 'false',
          this.show = false
        }
      },
      deleteItem(){
        const {todo,index,deleteTodo} = this
        if(window.confirm(`确认删除${todo.title}?`)){
          deleteTodo(index)
        }
      }
    }
}
</script>

<style>
.grey {
  background-color: grey;
}
.display {
  display: none;
}
</style>