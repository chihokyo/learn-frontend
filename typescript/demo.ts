interface Person {
  readonly id: string; // 只读
  name: string;
  age?: number; // 可有可无
  [propName: string]: any; // 可以中途随意添加属性名是string，然后任何类型
  say(): string; // 必须有
}

const getPersonName = (person: Person): void => {
  console.log(person.name);
};

const setPersonName = (person: Person, name: string): void => {
  person.name = name;
};

const person = {
  id: '11',
  name: 'dell',
  gender: 'famale',
  say() {
    return 'yes';
  },
};

getPersonName(person);
setPersonName(person, 'kitty');
getPersonName(person);

class Demo {
  private static instance: Demo;
  private constructor(public name: string) {}
  static getInstance() {
    if (!this.instance) {
      return new Demo('dell');
    }
    return this.instance;
  }
}

const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();
console.log(demo1);
console.log(demo2);
