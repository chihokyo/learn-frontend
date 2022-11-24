/**
 * 接口继承
 */

interface IAnimal {
  name: string;
  age: number;
  // 这样写类型
  run: () => void;
}

interface IDog extends IAnimal {
  pows: number;
  wang: () => void;
}

// 必须要实现所有的方法和属性才行 缺一不可
const dog: IDog = {
  name: 'wangcai',
  age: 12,
  pows: 4,
  wang() {
    console.log('dog is wang');
  },
  run() {
    console.log('dog is run');
  },
};

console.log(dog.run());

export {};
