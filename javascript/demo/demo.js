/**
 * export导出
 */

// a.js 导出
export const str = 'abc'
export const foo = () => {
    return 'hello'
}
// b.js 导入
// 原理利用解构赋值
import { str, foo } from 'a'

/**
 * export default 导出
 */

// c.js 导出
const dStr = 'abcccc'
export default dStr
// d.js 导入
import str from 'a' // 没有花括号，可以随便写

// 因为一个文件至多有一个 default 相当于就给了一个全局变量叫做 default
// 所以说在引入的时候可以不用 str
// import str from 'a' // str可以任意，写，aaa，bbb都可以。因为只有一个。
// export 要知道 import 抛出的变量名或者函数名字
// 因为并没有 default 这个全局变量
// 关于这个加载问题其实在尚硅谷的有一个课程里面也有详解。可以去听一下。