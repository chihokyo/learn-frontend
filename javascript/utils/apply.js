function apply(Fn, obj, args) {
    if (obj == undefined || obj == null) {
        obj = globalThis;
    }

    obj.temp = Fn;
    // 传过来的是一组数组 扩展运算符进行展开
    let result = obj.temp(...args)
    delete obj.temp;
    return result;
}