/**
 * 类型可以从外部导入
 * 最好导入的时候加上关键字 这样有助于编译器编译的效率
 */

export function sum(x: number, y: number) {
  return x + y;
}

export interface IPerson {
  id: string;
  age: number;
}

export type IDType = string | number;
