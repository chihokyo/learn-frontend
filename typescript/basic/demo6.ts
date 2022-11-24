/**
 * 索引签名
 *
 * 希望通过什么来进行迭代访问
 */
interface ICollection {
  // 说明通过index来访问 返回string
  // 下标必须是一个number arr[0]就可以 arr["hello"]就不行
  [index: number]: string;
  length: number;
}

const names: string[] = ['aa', 'bb', 'cc'];
// const names: string[] = [1, 'bb', 'cc']; 有1 就不行 因为不是string

function iterator(collection: ICollection) {
  console.log(collection[0]);
  console.log(collection[1]);
  console.log(collection[2]);
}
iterator(names);

// 定义字符串索引类型
// 索引(index)是一个string 返回值(value)是number
type comControlType = { [code: string]: number };
let comControl: comControlType = {};
let str = [1, 3, 8, 4, 2, 3];
str.forEach((x) => {
  if (Object.keys(comControl).filter((y) => y == x.toString()).length < 1) {
    comControl[x.toString()] = 1;
    return;
  }
  comControl[x.toString()]++;
});

console.log(comControl);

export {};
