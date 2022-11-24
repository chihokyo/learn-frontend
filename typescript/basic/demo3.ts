// 鸭子类型
class Person {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }

  eat() {
    console.log(`${this.name} is eating...`);
  }
}

// 按理说这里应该接受一个Person类型
function printP(p: Person) {
  console.log(p.name, p.age);
}
printP(new Person('chin', 99));

// 但事实上鸭子类型的话 只要有Person的属性和方法 我们都认为就是Person类型
printP({
  name: 'chin2',
  age: 88,
  eat() {
    console.log('eating... now');
  },
});

export {};
