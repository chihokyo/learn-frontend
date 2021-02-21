/**
 * 给函数附身到一个对象（改变对象指向）并执行（传入数组）
 * 
 * @param {*} Fn  函数
 * @param {*} obj 目标对象
 * @param {*} args 一些参数 注意这个是数组 无需解包
 * @returns 返回上面函数执行的结果
 */
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