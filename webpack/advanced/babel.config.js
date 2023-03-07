module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        // false 表示不使用
        // usage 表示使用
        // entry 这个表示第三方的代码也进行polyfill，比如对axios也是用
        useBuiltIns: 'entry',
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
