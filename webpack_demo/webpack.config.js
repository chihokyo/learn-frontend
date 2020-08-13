/**
 * development : 开发环境 不压缩
 * production : 生产环境 压缩
 * webpack4.0 默认打包入口文件 src -> index.js
 * 默认打包出口文件 dist -> main.js
 *
 */

// 导入nodejs里路径path模块
const path = require('path')

module.exports = {
  // 入口文件夹
  entry: path.join(__dirname, './src/index.js'),
  output: {
    // 出口文件夹
    path: path.join(__dirname, './dist'),
    // 出口文件名
    filename: 'bundle.js'
  },

  mode: 'development'
}

