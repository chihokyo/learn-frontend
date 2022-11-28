/**
 * 命名空间
 *
 * 现在不怎么用了 现在都用es模块化方案了
 * 需要注意的就是命名空间和模块你都要导出才行
 */

import { price, data } from './namespace';

// 这里主要写如何导入

console.log(price.format('yes')); // &yes
console.log(data.format('20221122')); // %20221122
