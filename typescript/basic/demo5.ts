/**
 * interface和type一样
 *
 * 1 都可以？有这个属性 表示可选
 * 2 readonly 表示可读
 *
 */

// 定义对象类型
type IPerson = {
  name: string;
  age: number;
};

// interface定义
interface IPersonA {
  name?: string;
  readonly age: number;
}

const p: IPersonA = {
  name: 'chin',
  age: 88,
};

export {};
