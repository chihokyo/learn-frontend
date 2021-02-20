// function bind(Fn, obj, ...args) {
//     // 返回一个新的函数
//     return function(){
//         // 因为本质上和call是一样的
//         return call(Fn, obj, ...args);
//     }
// }

/**
 * 这个一定要记住，返回的是一个函数，并不只是改变函数指向的对象
 * @param {*} Fn 函数
 * @param {*} obj  目标对象
 * @param  {...any} args 参数 需要解包
 * @returns 返回是一个函数
 */
function bind(Fn, obj, ...args) {
    // 返回一个新的函数
    // 要注意这个参数 也就是args2 这个一定要放在后面实现
    return function(...args2){
        // 因为本质上和call是一样的
        return call(Fn, obj, ...args, ...args2);
    }
}