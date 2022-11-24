/**
 * 索引签名 index signatures
 *
 * 这个是第二次开始写了 说实话 这个理解起来有点难
 * 因为我在其他资料里也看了 这个也叫任意属性 是接口里的
 *  JS里我们定义了一个对象/数组的话 访问的时候用的下标
 * 虽然是一个数字，但是JS内部默认会转换(隐式调用)成一个string的
 * arr[0] → arr["0"]
 *
 * 重点1 索引只能有两种数据类型 [index:number] or [index:string]
 * 重点2 数字类型索引范围一定要小于字符的 [index:number] 范围小 子类
 */

interface Person {
  // [index: number | string]: string; 不能在index写联合类型
  [key: number]: string;
  [index: string]: any; // 这样是可以的

  //*********** */
  // 数字索引的类型 范围一定要小于 字符串类型的索引
  // [index: number]: number|string;❌ 这个太大了
  // [index:string]:string

  // [index: number]: string; ✅
  // [index:string]:number|string
}

const p: Person = ['aa', 'bb', 'cc'];

console.log(p[1]);
export {};
