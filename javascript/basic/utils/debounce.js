/**
 * 防抖函数
 * 在函数需要频繁触发时: 在规定时间内，只让最后一次生效，前面的不生效。
 * 适合多次事件一次响应的情况 → 输入框实时搜索联想（keyup/input)
 * @param {*} callback 回调函数
 * @param {*} time 在一定时间内时间 
 * @returns 返回一个需要防抖动的函数
 */
function debounce(callback, time) {
    // 用来保存定时器time唯一id
    let timeoutId = -1;
    return function (e) {
        // 不是-1 意思就是 timeoutId 有数字，有的意思就是已经有定时器在跑了
        if (timeoutId !== -1) {
            // 定时器已经跑了就先给清空
            clearTimeout(timeoutId)
        }
        // 然后开始重启一个定时器任务
        timeoutId = setTimeout(() => {
            callback.call(this, e)
            // 这里要重置的，重置之后才能重新计算
            // 如果不重置，那么就是直接每次执行完就clear没有意义
            timeoutId = -1;
        }, time)
    }
}