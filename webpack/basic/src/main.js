import './css/style.css';
import './css/style.scss';
import imageDemo from './img/image_demo.png';

const add = (x, y) => {
  return x + y;
};

const res = add(2, 7);

console.log('aaaaewwwww');

[2, 2, 2].map((n) => n * 2);

if (module.hot) {
  // demo.js是需要你更新的
  module.hot.accept('./demo.js');
}
