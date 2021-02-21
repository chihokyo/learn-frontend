/**
 * 实现map函数 进去一组数组 出来一组经过callback函数洗礼过的数组
 * @param {Array} array 数组
 * @param {Function} callback 要调用的函数 
 * @returns 新的数组
 */
function mapA(array, callback) {
    // 新建一个数组 就是return的那个船新的数组
    const newArr = [];
    // 遍历老数组
    for (let index = 0; index < array.length; index++) {
        // 分别拿出来老数组的值和index 然后使用这个函数
        // 并且push压到新数组
        newArr.push(callback(array[index], index));
    }
    return newArr;
}


/**
 * 数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
 * @param {Array} arr 数组
 * @param {Function} callback 要调用的函数
 * @param {*} initValue 初始值
 * @returns 
 */
function reduce(arr, callback, initValue) {
    let result = initValue;
    for (let index = 0; index < arr.length; index++) {
        // 对于每一个函数执行这个回调之后进行返回result 这里注意理解
        result = callback(result, arr[index]);
    }
    return result;
}

// 这个对于reduce的讲解很好
// 官方文档
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

// Accumulator (acc) (累计器)
// Current Value (cur) (当前值)
// Current Index (idx) (当前索引)
// Source Array (src) (源数组)

/**
 * 用来过去老数组的数值然后返回一个过滤后的新数组
 * @param {Array} arr 
 * @param {Function} callback 
 * @returns 返回一个过滤后的数组
 */
function filter(arr, callback) {
    // 新建空数组 用来接收符合条件的数组值
    let result = [];
    for (let index = 0; index < arr.length; index++) {
        // 调用函数 放进去俩
        let res = callback(arr[index], index);
        // 如果结果为true 那么就押入新的数组
        if (res) {
            result.push(arr[index])
        }
        return result;
    }
}