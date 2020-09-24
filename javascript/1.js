// 直接定义函数
function demo1(){
    console.log(this) // window
    console.log('demo1')
}
demo1()

// 通过对象定义
var obj = {
    name:'amy',
    age: 18,
    sayHello: function(){
        console.log(this) // obj
        console.log('sayHello')
    }
}
obj.sayHello()

// 通过新建实例对象
function Person(name,age){
    this.name = name
    this.age = age
    this.run = function(){
        console.log(this) // Person
        console.log('run')
    }
}
var amy = new Person('amy',20)
amy.run()

// 箭头函数
const arrowObj = {
    func: ()=> {
        console.log(this) //从定义时的函数继承上下文 所以出来的是Person
        console.log('func') 
    }
}

// 改变函数指向，主要用于什么呢？用于给对象增加方法，强制继承
var animal = {
    
}