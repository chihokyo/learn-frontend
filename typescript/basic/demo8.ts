/**
 * 接口可以被类实现
 */

interface IAnimal {
  name: string;
  age: number;
  // 这样写类型
  run: () => void;
}

// 使用方法1 可以直接当类型使用
const dog: IAnimal = {
  name: 'wangcai',
  age: 18,
  run: () => {
    console.log('dog is running');
  },
};

dog.run(); // dog is running

// 使用方法2 被一个类实现之后可以直接使用
// 好处就是不用像上面1那种 每次都要实现才能写
interface IAnimal {
  name: string;
  age: number;
  // 这样写类型
  run: () => void;
}

class Dog implements IAnimal {
  // 没配置strictPropertyInitialization的情况下
  // 必须加上非空判断
  name!: string;
  age!: number;
  // 这样写类型
  run() {}
}

const dog2 = new Dog();
console.log(dog2);
console.log(dog2.name);
export {};
