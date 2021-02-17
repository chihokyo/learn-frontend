function bind(Fn, obj, ...args) {
    // 返回一个新的函数
    return function(){
        // 因为本质上和call是一样的
        return call(Fn, obj, ...args);
    }
}


function bind(Fn, obj, ...args) {
    // 返回一个新的函数
    // 要注意这个参数 也就是args2 这个一定要放在后面实现
    return function(...args2){
        // 因为本质上和call是一样的
        return call(Fn, obj, ...args, ...args2);
    }
}