<template>
  <div>
    <li @mouseenter="isShow(true)" @mouseleave="isShow(false)" :class="color">
      <label for>
        <input type="checkbox" name id v-model="todo.status" />
        <span>{{ todo.title }}</span>
      </label>
      <button v-show="show" @click="deleteItem()">delete</button>
    </li>
  </div>
</template>

<script>
// 引入订阅消息用来发布
import PubSub from "pubsub-js";
export default {
  props: {
    todo: Object,
    index: Number,
    //普通写法
    //deleteTodo: Function,
  },
  data() {
    return {
      color: "",
      show: false,
    };
  },

  methods: {
    isShow(isEnter) {
      if (isEnter) {
        (this.color = "grey"), (this.show = true);
      } else {
        (this.color = "false"), (this.show = false);
      }
    },
    deleteItem() {
      const { todo, index } = this;
      if (window.confirm(`确认删除${todo.title}?`)) {
        // 普通写法
        //deleteTodo(index);
        // 订阅写法
        PubSub.publish("deleteTodo", index);
      }
    },
  },
};
</script>

<style>
.grey {
  background-color: grey;
}
.display {
  display: none;
}
</style>