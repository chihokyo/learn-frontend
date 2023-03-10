const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: {
      import: './src/main.js',
      dependOn: 'shared',
    },
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    shared: ['axios'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    clean: true,
  },
  devServer: {
    static: ['public'],
    open: true, // 自动打开浏览器
    hot: true, // 启用热更新
    compress: true, // 压缩
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts'],
  },
  optimization: {
    // development默认是named，也是推荐点
    // production的话则推荐使用 deterministic 表示确定的数字，这样的话每次分包的名字固定可以减少更新的频率
    chunkIds: 'deterministic', //
    splitChunks: {
      chunks: 'all',
      // // 只要包大于2000kb就会给你拆起来（但是不一定就给你拆成这么大，因为函数有可能是一个大的整体）
      // maxSize: 20000,
      // // 每一个拆成不小于minSize这么小
      // minSize: 10000,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          filename: '[id]_vendor.js',
        },
        utisl: {
          test: /utils/,
          filename: '[id]_vendor.js',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //?表示0个或1个
        use: ['babel-loader'],
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        // 这里是ts-loader
        // use: ['ts-loader'],
        // 这里是babel
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/react/index.html',
    }),
  ],
};
