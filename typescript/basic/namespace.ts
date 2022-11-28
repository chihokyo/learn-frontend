/**
 * 命名空间
 *
 * 现在不怎么用了 现在都用es模块化方案了
 * 需要注意的就是命名空间和模块你都要导出才行
 */

// 写俩重复名字的函数是不行的 因为算是全局的
// export function format() {}

// export function format() {}

// 此时命名空间就登场了

namespace price {
  // 记着导出
  export function format(price: string) {
    return '&' + price;
  }
  // 这里的参数也属于命名空间的
  // 内部使用的时候你可以不用导出 但是外部使用的话 依然是要导出的
  const foo: string = 'foo';
}

namespace data {
  // 记着导出
  export function format(data: string) {
    return '%' + data;
  }
}

// 记住一定要导出 不然算全局的
export { price, data };
