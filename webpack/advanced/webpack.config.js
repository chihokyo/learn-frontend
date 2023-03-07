const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts'],
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
