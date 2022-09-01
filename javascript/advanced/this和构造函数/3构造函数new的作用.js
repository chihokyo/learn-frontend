// 这只是一个普通的函数
function Person(name, age) {
  let obj = {};
  obj = this;
  this.name = name;
  this.age = age;
  return this;
}

// 如果你new了，那么new会帮你做到下面注释的地方 你不用手动了
function Person(name, age) {
  //   let obj = {}; ① 创建空对象
  //   obj = this; ② this指向这个空对象
  this.name = name;
  this.age = age;
  //   return this; ③ 返回这个this
}

const p = new Person('chin', 88);
