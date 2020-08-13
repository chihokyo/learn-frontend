/**
 * development : 开发环境 不压缩
 * production : 生产环境 压缩
 * webpack4.0 默认打包入口文件 src -> index.js
 * 默认打包出口文件 dist -> main.js
 * 预览页面插件 html-webpack-plugin
 * 由于webpack默认只能处理js文件
 * 所以需要处理css打包的时候需要加载器
 */

// 导入nodejs里路径path模块
const path = require('path')
// 导入预览页面插件 得到构造函数
const HtmlWebpakcPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebpakcPlugin(
  {
    template: './src/index.html',
    filename: 'index.html'
  }
)
module.exports = {
  mode: 'development',
  // 入口文件夹
  entry: path.join(__dirname, './src/index.js'),
  output: {
    // 出口文件夹
    path: path.join(__dirname, './dist'),
    // 出口文件名
    filename: 'bundle.js'
  },
  // 预览页面配置节点
  plugins: [htmlPlugin],
  // css打包加载器
  module: {
    rules: [
      // 顺序固定必须style-loader，css-loader
      // 但是会从后向前调用
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
}
