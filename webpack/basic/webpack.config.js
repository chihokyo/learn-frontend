const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
// NodeJS环境 默认是commonjs模块管理
module.exports = {
  // entry是相当于这个目录的。但这个极少改变，一律都用默认的
  context: path.resolve(__dirname, '/'),
  // 输入
  entry: './src/main.js',
  // 输出
  output: {
    filename: 'bundle.js',
    // 这里必须要用绝对路径 所以使用了path.resolve()这个系统函数 具体不知道去ChatGPT
    path: path.resolve(__dirname, 'dist'),
    // clear: true,
  },
  mode: 'development',
  decServer: {
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src/utils'),
    },
  },
  module: {
    // 这里为什么用数组，因为可能有多个loader
    rules: [
      {
        test: /\.css$/,
        // 这里为什么用数组，因为可能1个类型 需要多重loader来处理
        // useloader顺序是从后向前的，所以先用css-loader，在用style-loader
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['autoprefixer'],
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        // 这里为什么按照这个顺序呢？
        // sass处理转换成css 然后再处理css 然后插入style
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024,
          },
        },
        generator: {
          // 占位符
          // name 原来文件名字
          // ext 拓展名字
          // hash 哈希值 如果觉得太长 可以截取[hash:7]
          // 这里会提前生成文件夹
          filename: 'static/[name][hash:7][ext]',
        },
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '我取的名字',
      template: './index.html',
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
    }),
  ],
};
