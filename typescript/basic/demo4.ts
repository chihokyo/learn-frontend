/**
 * 类的作用
 *
 * 1 可以创建类的实例 这个不用解释
 * 2 本身可以作为实例的类型 这个也不用解释
 * 3 可以当成一个有构造签名的函数（难以理解？
 *
 */

// 比如说下面这个函数必须要接受一个构造函数 那么什么是构造函数
function factory(c: new () => void) {
  console.log(c);
}

function Person() {}
class PersonA {}

// factory(Person); 这样就是不可以的 因为只是单纯的一个函数
factory(PersonA); // 这样就是可以的 因为这代表是一个类

export {};
