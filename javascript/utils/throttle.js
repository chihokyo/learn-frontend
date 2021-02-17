/**
 * 节流函数
 * 原理就是判断时间间隔
 * 在函数需要频繁触发时: 函数执行一次后，只有大于设定的执行周期后才会执行第二次
 * 适合多次事件按时间做平均分配触发→ 滚动操作 抢购点击click操作
 * @param {*} callback 回调函数
 * @param {*} wait 在wait毫秒内最多执行1次 间隔
 * @returns 这里返回的是一个事件监听函数（需要你节流的函数） 
 */
function throttle(callback, wait) {
    let start = 0;
    return function (e) {
        // 获取当前时间戳
        const current = Date.now();
        // 那现在时间和上一个时间的查和间隔做对比
        if (current - start > wait) {
            // 如果超过的话 那么在执行下面的函数 call就是直接执行了
            // 这里的this 实际上是指向事件源的
            callback.call(this, e);
            start = current;
        }
    }
}