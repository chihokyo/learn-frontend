/* Vue插件库
官方参考网址 https://cn.vuejs.org/v2/guide/plugins.html
*/

// 自己要新建一个封闭的环境(function(){})()

(function(){
     
    // 需要向外暴露的插件对象 要注意：官方并没有定义这个MyPlugin 所以自己设定成对象{}
    const MyPlugin = {}
    // 
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod = function () {
          // Vue就是一个构造函数 类似于filter
          console.log('Vue函数对象的方法 myGlobalMethod()')

        }
      
        // 2. 添加全局资源
        Vue.directive('my-directive', {
          bind (el, binding, vnode, oldVnode) {
              el.textContent = binding.value.toUpperCase()
          }
          
        })
      
        // // 3. 注入组件选项
        // Vue.mixin({
        //   created: function () {
        //     // 逻辑...
        //     // 由于不会暂时不写
        //   }
          
        // })
      
        // 4. 添加实例方法 为了分辨出特地用了$符号用以区分
        Vue.prototype.$myMethod = function (methodOptions) {
          console.log('Vue实例对象的方法 $myMethod()')
        }
    }

    // 向外暴露
    window.MyPlugin = MyPlugin
})()