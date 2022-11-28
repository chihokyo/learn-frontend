/**
 * 类型可以从外部导入
 * 最好导入的时候加上关键字 这样有助于编译器编译的效率
 */

// 如果导入的是一个类型 推荐在类型前面加上type关键字
// 这样虽然增加代码量 表明导入是一个类型之后 编译器编译的时候会删掉
// 因为类型最终会被删除掉的 编译器有时候会判断是不是一个类型 是类型的时候会删除
// 如果你不写也可以 但是明确写的时候 编译（非TS编译器 bable esbuild）就可以直接删掉
import { sum, type IDType, type IPerson } from './type';

// import type { IDType, IPerson } from './type'; 如果都是类型 你也可以直接在这里写
console.log(sum(10, 20));

const id: IDType = 'chin';
console.log(id);

const ip: IPerson = {
  id: 'uu1',
  age: 20,
};
console.log(ip);
