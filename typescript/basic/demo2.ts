/**
 * 抽象类实现多态
 */

abstract class Shape {
  abstract getArea(): number;
}

class Circle extends Shape {
  private r: number;

  constructor(r: number) {
    super();
    this.r = r;
  }

  getArea(): number {
    return this.r * this.r * 3.14;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
    this.width = width;
    this.height = height;
  }
  getArea(): number {
    return this.width * this.height;
  }
}

function calcArea(shape: Shape) {
  console.log(shape.getArea());
}

calcArea(new Circle(10)); // 314
calcArea(new Rectangle(10, 20)); // 200
