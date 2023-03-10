import React from 'react';
import ReactDom from 'react-dom/client';
import App from './react/App';

import { sum } from './ts/math';

import axios from 'axios';

console.log('hello');
const obj = {
  name: 'chin',
  age: 1888,
};

const { name, age } = obj;

console.log(name);

const msg = 'hello';
console.log(msg.includes('he'));

// 这里开始写react代码
const root = ReactDom.createRoot(document.querySelector('#root'));
root.render(<App />);

// 使用ts代码
console.log(sum(2, 18));
console.log(sum(2, 128));
console.log(sum(3, 128));

console.log(axios);

if (true) {
  // 这个就相当于你自己命名了name，这个叫魔法注释
  import(/*webpackChunkName:"aboutChin"*/ './about.js');
}
