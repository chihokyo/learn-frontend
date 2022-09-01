// 1 显式 > 隐式
function foo() {
  console.log(this);
}
const obj = {
  foo: foo,
};

obj.foo.apply('aaa'); // [String: 'aaa']

// 2 new > 隐式
const obj2 = {
  id: 'chin',
  foo: function () {
    console.log(this); // 空对象 {}
    console.log(this === obj2); // false
  },
};

new obj2.foo();

// 3 new > 显示
function foo() {
  console.log(this); // 空对象 {}
}
const bindFn = foo.bind('aaa');

new bindFn();

// bind > apply

function foo() {
  console.log(this); // 空对象 {}
}

const bindFn2 = foo.bind('aaa');
bindFn2.apply('bbb'); // [String: 'aaa']
