/**
 * 严格字面量检测
 *
 * 第一次有新鲜感初始化的时候就是没办法进行赋值的
 * 但是如果你一旦初始化之后，丧失了新鲜感，或者使用断言之后。可以了
 */

interface Person {
  name: string;
  age: number;
}

function printPerson(p: Person) {
  console.log(p);
}

printPerson({ name: 'chin', age: 99 }); // 这样是可以的
// printPerson({ name: 'chin', age: 99,height:"" }); ❌ 不行 因为不能有多余的属性

const obj = {
  name: 'chin2',
  age: 66,
  height: '99',
};

printPerson(obj); // ✅ 这样就没问题 因为不可能出错 就是因为没新鲜感了

export {};
