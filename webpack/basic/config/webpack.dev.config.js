const { merge } = require('webpack-merge');
const comConfig = require('./webpack.com.config');
// dev配置
module.exports = merge(comConfig, {
  // dev的专属配置
});
