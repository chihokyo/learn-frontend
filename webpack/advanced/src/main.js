import React from 'react';
import ReactDom from 'react-dom/client';
import App from './react/App';

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
