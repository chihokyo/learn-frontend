// 没有箭头函数
const obj4 = {
  id: 'obj',
  foo: function () {
    const bar = () => {
      console.log(this); // obj4
    };
    return bar;
  },
};

const fn = obj4.foo();
fn.apply('aaa');

// 有箭头函数
const obj5 = {
  id: 'obj',
  foo: () => {
    const bar = () => {
      console.log(this); // window
    };
    return bar;
  },
};

const fn2 = obj5.foo();
fn2.apply('aaa');
