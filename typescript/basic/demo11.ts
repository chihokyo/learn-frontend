/**
 * 枚举
 */
enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const d1 = Direction.LEFT;
console.log(d1); // 2

enum Direction2 {
  UP = 100,
  DOWN,
  LEFT,
  RIGHT,
}

const d2 = Direction2.LEFT;
console.log(d2); // 102

enum Direction3 {
  // 使用位运算 1*2的0次方
  UP = 1 << 0,
  // 1*2的1次方
  DOWN = 1 << 1,
  // 1*2的2次方
  LEFT = 1 << 2,
  RIGHT = 1 << 3,
}

const d3 = Direction3.LEFT;
const d33 = Direction3.RIGHT;
console.log(d3); // 4
console.log(d33); // 8

export {};
