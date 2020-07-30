import Vue from 'vue' // 引入vue这个包
import App from './App.vue' // 加载入口模块

Vue.config.productionTip = false // 非生产环境

new Vue({
    // 关于这个h是这么可以关键字搜索思Vue h render
    render: h => h(App), // 渲染模块
}).$mount('#app') // 挂载，在声明周期上也有接触过

// // 这种写法教程有，但目前会报错
// new Vue({
//     el: "#app",
//     components: {App},
//     template: '<App/>'
// })
