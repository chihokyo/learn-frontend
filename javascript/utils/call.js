function call(Fn, obj, ...args) {
    // 判断 如果obj是undefined 或者 null 就给全局对象
    if (obj == undefined || obj == null) {
        obj = globalThis;
    }
    // 为obj添加临时方法 相当于给obj新建一个函数
    obj.temp = Fn;
    // obj.temp() 这样就相当于调用了obj的temp方法 也就是Fn
    let result = obj.temp(...args);
    // 删除这个方法
    delete obj.temp;
    // 返回执行结果
    return result;
}