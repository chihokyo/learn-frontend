# 爬虫

列出所有全局包

```
npm list -g --depth=0
```

基本安装

```javascript
npm init -y // 
tsc --init //  
```

下载ts-node，并且本地安装，并且自定义个脚本

```
npm install ts-node -D
"dev": "ts-node ./src/crowller.ts",
```

可以开始写了

```javascript
npm install superagent --save // ajax api
npm i --save-dev @types/superagent // 翻译文件 ts → d.ts → js
```

## 1 雏形

*src/crowller.ts*

```typescript
import superagent from 'superagent';

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHtml = ''; // 初始化html源文件
  async getRawHtml() {
    const result = await superagent.get(this.url); // 这里返回一个reponse类型的
    this.rawHtml = result.text;
  }

  // 构造函数
  constructor() {
    this.getRawHtml();
  }
}

const crowller = new Crowller();

```

## 2 通过网页源文件→获取课程信息

到这里已经可以直接输出源文件的raw文件了

然后这个时候要分析，其实就是获取每个节点元素。用到了一个包**cheerio**

```
npm i cheerio
import cheerio from 'cheerio';
```

然后主要进行了以下几点

- 获取源文件 → 通过源文件获取提取网页信息
- 通过cheerio的包，使用jQuery形式获取
- 然后把爬虫到的课程信息存储到需要的格式

```typescript
import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
  title: string;
  count: number;
}

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHtml = ''; // 初始化html源文件

  /**
   * 获取课程信息
   * @param html 网页源文件
   */
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');

    const courseInfos: Course[] = []; // 初始化课程信息 存储所有过滤好的信息

    // 获取所有course后进行遍历
    courseItems.map((index, element) => {
      // 获取每一个描述
      const desc = $(element).find('.course-desc');
      // 获取每一个标题
      const title = desc.eq(1).text();
      // 获取每一个学习人数 → 进行关键字分割寻找数字
      const count = parseInt(desc.eq(1).text().split('：')[1], 10);
      // 添加到课程信息
      courseInfos.push({
        title,
        count,
      });

      // 最后想获取的信息
      const result = {
        time: new Date().getTime(),
        data: courseInfos,
      };

      console.log(result);
    });
  }

  /**
   * 获取源文件
   */
  async getRawHtml() {
    const result = await superagent.get(this.url); // 这里返回一个reponse类型的
    this.rawHtml = result.text;
    this.getCourseInfo(result.text);
  }

  // 构造函数
  constructor() {
    this.getRawHtml();
  }
}

const crowller = new Crowller();

```

## 3 添加写入功能

首先优化了一些原有的耦合，使得每个函数相互独立起来。

然后获取完之后添加写入文件的代码

```typescript
import superagent from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface Course {
  title: string;
  count: number;
}

interface courseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHtml = ''; // 初始化html源文件

  /**
   * 获取源文件之后转换成对象
   *
   * @param html 网页源文件
   * @returns courseResult 对象
   */
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');

    const courseInfos: Course[] = []; // 初始化课程信息 存储所有过滤好的信息

    // 获取所有course后进行遍历
    courseItems.map((index, element) => {
      // 获取每一个描述
      const desc = $(element).find('.course-desc');
      // 获取每一个标题
      const title = desc.eq(1).text();
      // 获取每一个学习人数 → 进行关键字分割寻找数字
      const count = parseInt(desc.eq(1).text().split('：')[1], 10);
      // 添加到课程信息
      courseInfos.push({
        title,
        count,
      });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }

  /**
   * 获取源文件
   * @returns 输出文本信息
   */
  async getRawHtml() {
    const result = await superagent.get(this.url); // 这里返回一个reponse类型的
    return result.text;
  }

  /**
   *  不断添加获取的文件json信息
   * @param courseInfo 课程信息
   * @returns 最新的课程信息
   */
  generateJsonContent(courseInfo: courseResult) {
    const filePath = path.resolve(__dirname, '../data/course.json');
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      // 文字 → 对象
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  /**
   * 主函数
   */
  async initSpiderProcess() {
    //
    const html = await this.getRawHtml(); // 异步函数同样需要添加html
    const courseInfo = this.getCourseInfo(html);
    const filePath = path.resolve(__dirname, '../data/course.json');
    const fileContent = this.generateJsonContent(courseInfo);

    // 对象 → 字符串
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }

  // 构造函数
  constructor() {
    this.initSpiderProcess();
  }
}

const crowller = new Crowller();

```

## 4 拆分所有小功能

```typescript
import superagent from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface Course {
  title: string;
  count: number;
}

interface courseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHtml = ''; // 初始化html源文件

  private filePath = path.resolve(__dirname, '../data/course.json');

  /**
   * 获取源文件之后转换成对象
   *
   * @param html 网页源文件
   * @returns courseResult 对象
   */
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');

    const courseInfos: Course[] = []; // 初始化课程信息 存储所有过滤好的信息

    // 获取所有course后进行遍历
    courseItems.map((index, element) => {
      // 获取每一个描述
      const desc = $(element).find('.course-desc');
      // 获取每一个标题
      const title = desc.eq(0).text();
      // 获取每一个学习人数 → 进行关键字分割寻找数字
      const count = parseInt(desc.eq(1).text().split('：')[1], 10);
      // 添加到课程信息
      courseInfos.push({
        title,
        count,
      });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }

  /**
   * 获取源文件
   * @returns 输出文本信息
   */
  async getRawHtml() {
    const result = await superagent.get(this.url); // 这里返回一个reponse类型的
    return result.text;
  }

  /**
   *  不断添加获取的文件json信息
   * @param courseInfo 课程信息
   * @returns 最新的课程信息
   */
  generateJsonContent(courseInfo: courseResult) {
    let fileContent: Content = {};
    if (fs.existsSync(this.filePath)) {
      // 文字 → 对象
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  /**
   * 将文件写入
   * @param content 对象
   */
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  /**
   * 主函数
   */
  async initSpiderProcess() {
    // ①读取html源文件 ======> 通用的
    const html = await this.getRawHtml(); // 异步函数同样需要添加html
    // ②获取html源文件转换成对象
    const courseInfo = this.getCourseInfo(html);
    // ③在json里不断添加获取的信息
    const fileContent = this.generateJsonContent(courseInfo);
    // ④写入json文件 ======> 通用的
    this.writeFile(JSON.stringify(fileContent));
  }

  // 构造函数
  constructor() {
    this.initSpiderProcess();
  }
}

const crowller = new Crowller();
```

## 5 初步分离

*src/analyzer.ts*

```typescript
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface Course {
  title: string;
  count: number;
}

interface courseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

export default class Analyzer {
  private filePath = path.resolve(__dirname, '../data/course.json');

  /**
   * 获取源文件之后转换成对象
   *
   * @param html 网页源文件
   * @returns courseResult 对象
   */
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');

    const courseInfos: Course[] = []; // 初始化课程信息 存储所有过滤好的信息

    // 获取所有course后进行遍历
    courseItems.map((index, element) => {
      // 获取每一个描述
      const desc = $(element).find('.course-desc');
      // 获取每一个标题
      const title = desc.eq(0).text();
      // 获取每一个学习人数 → 进行关键字分割寻找数字
      const count = parseInt(desc.eq(1).text().split('：')[1], 10);
      // 添加到课程信息
      courseInfos.push({
        title,
        count,
      });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }

  /**
   *  不断添加获取的文件json信息
   * @param courseInfo 课程信息
   * @returns 最新的课程信息
   */
  generateJsonContent(courseInfo: courseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      // 文字 → 对象
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public analyzer(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}

```

*src/crowller.ts*

```typescript
import superagent from 'superagent';
import fs from 'fs';
import path from 'path';
import Analyzer from './analyzer';

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHtml = ''; // 初始化html源文件

  private filePath = path.resolve(__dirname, '../data/course.json');

  /**
   * 获取源文件
   * @returns 输出文本信息
   */
  async getRawHtml() {
    const result = await superagent.get(this.url); // 这里返回一个reponse类型的
    return result.text;
  }

  /**
   * 将文件写入
   * @param content 对象
   */
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  /**
   * 主函数
   */
  async initSpiderProcess() {
    // ①读取html源文件 ======> 通用的
    const html = await this.getRawHtml(); // 异步函数同样需要添加html

    const fileContent = analyzer.analyzer(html, this.filePath);

    // ④写入json文件 ======> 通用的
    this.writeFile(fileContent);
  }

  // 构造函数
  constructor(private analyzer: any) {
    this.initSpiderProcess();
  }
}

const analyzer = new Analyzer();
const crowller = new Crowller(analyzer);

```

## 6 组合模式

从这里开始直接看代码会更清晰一点点，所以直接只写Github的仓库地址

## 

# 配置文件

```json
ts-node // 可以简化调试成本
```

但是问题就是没有编译，所以需要

*package.json*

```json
"build" : "tsc" // 其实tsc就是编译命令
```

如果指定biild生成的文件在哪里

*tsconfig.json*

```json
"outDir": "./build",   
```

发生改变自动编译

```json
 "build": "tsc -w"
```

编译之后还自动运行

```json
npm install nodemon -D
// 增加配置
"start": "nodemon node ./build/crowller.js"
```

这样会发现无限循环，所以需要增加nodemon配置

```json
 "nodemonConfig" : {
    "ignore": "data/*"
  },
```

nodemon默认只会watch js的文件，而没有ts

所以通过nodemon+tsc-w 就达到了ts-node的效果

```json
npm install concurrently -D
// 这个插件，可以并行执行多个脚本
"scripts": {
    "dev:build": "tsc -w",
    "dev:start": "nodemon node ./build/crowller.js",
    "dev": "concurrently npm:dev:*"
  },
```

## 配置

```json
// 初始化配置
tsc --init
// 生成配置文件后 tsc --xx的话并不会执行config文件，
// 只能通过tsc这样
tsc
```

各种配置项的说明

[看这个网页就可以了，因为太多了](https://juejin.cn/post/6844904093568221191)

## 联合类型&类型保护

```typescript
interface Bird {
    fly:boolean;
    sing: () => {};
}

interface Dog {
    fly:boolean;
    bark: () => {};
}

// 类型断言
function tryAnimal(animal: Bird | Dog) {
    if(animal.fly) {
        (animal as Bird).sing();
    } else {
        (animal as Dog).bark();
    }
}


// in语法
function tryAnimal2(animal: Bird | Dog) {
    if ('sing' in animal) {
        animal.sing();
    } else {
        animal.bark();
    }
}

// typeof语法
function add(first:string | number, second: string | number) {
    if (typeof first === 'string' || typeof second === 'string') {
        return `${first}${second}`
    } else {
        return first + second;
    }
}

// intanceof只能用于class,而不能用于interface
class NumberObj {
    count:number
}
function add2(first:object | NumberObj, second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
        return first.count + second.count;
    }
    return 0;
}

```

## Enum 枚举

我个人的理解，枚举就是一个常量数组。

```typescript
// 没用之前
const Status = {
    OFFLINE:0,
    ONLINE:1,
    DELETED:2,
};

function getResult(status:any) {
    if (status == Status.OFFLINE) {
        return 'offline';
    } else if (status == Status.ONLINE){
        return 'online';
    } else if (status == Status.DELETED) {
        return 'deleted';
    }
    return 'error';
}
```

用了之后呢？

```typescript
enum Status {
  OFFLINE, // 不写默认从0开始
  ONLINE,
  DELETED,
}

enum Status {
  OFFLINE, // 0
  ONLINE = 2, // 从写的位置向下+1
  DELETED, // 3 
}
```

## 泛型

```typescript
function join(a: string | number, b: string | number) {
  return `${a}${b}`;
}
// 如果希望a和b传入的参数类型是一样的
// generic 泛指的类型

function join2<ABC>(a: ABC, b: ABC) {
  return `${a}${b}`;
}

join2<string>('1', '1');

function map<T>(params: T[]) {
  // (params: Array<ABC>)
  return params;
}

map<string>(['heelo']);

function map<T, P>(params: T[]) {
  // (params: Array<ABC>)
  return params;
}

map<string>(['heelo']);
```

同时也可以定义多个，泛型在用的时候才会知道是什么类型

```typescript
// 也可以同时定义多个泛型
function map2<T, P>(param1: T, param2: P) {
  return `${param1}${param2}`;
}

map2<string, number>('1', 2);
map2('1', 2); // 不写就给你推断
```

如果泛型不知道是什么类型，但是会满足某一个接口呢？

```typescript
interface Item {
  name: string;
}

class DataManager<T extends Item> {
  constructor(private data: T[]) {}
  getItem(index: number): string {
    return this.data[index].name;
  }
}

const data = new DataManager([
  {
    name: 'xiaowang',
  },
]);

console.log(data.getItem(0));

```

如果泛型可能是string也有可能是number，2种之一呢？

```typescript
class DataManager<T extends string | number> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index];
  }
}

const data = new DataManager<string>([]); // 空数组也可以,['1']也可以
```

![image-20220102175221744](https://raw.githubusercontent.com/chihokyo/image_host/develop/image-20220102175221744.png)

```typescript
// 如何使用泛型作为一个具体的类型注解
// 相当于要接受一个泛型
const func: <T>(param: T) => string = <T>() => {
  return 'hello';
};
// 比如可以拆分成
function hello<T>(param: T) {
  return param;
}
const func2: <T>(param: T) => T = hello;
```

## 命名空间

类似模块的感觉，不会污染全局变量

```typescript
namespace Home {
	  class Header{}
    class Content{}
    class Footer{}
}

// 如果你想要外部使用
namespace Home {
	  class Header{} 
    class Content{}
    class Footer{}
  	export class Page { // 通过这种export形式进行暴露
      constructor(){
        new Header()
 				new Content()
        new Footer()
      }
    }
}

// 调用的使用
Home.page
```

但是上面的代码并没有体现拆分，所以现在拆分成page和组件

*components.ts* → 记得引入

```typescript
namespace Components {
	  export class Header{} 
    export class Content{}
    export class Footer{}
}
```

*page.ts*

```typescript
namespace Home {
  	export class Page { // 通过这种export形式进行暴露
      constructor(){
        new Components.Header()
 				new Components.Content()
        new Components.Footer()
      }
    }
}
```

上面的话 还需要引入。

```html
<script src="./dist/components.js"></script>
```

如果不想引入的话，可以修改*tsconfig*配置项目

```json
"outFile": "./",                      /* Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. */
// 但同时也需要修改成
"module": "amd",      
```

注意一下依赖声明

```typescript
/// <refrence path="./components.ts"> 加上这个之后结构更加清晰，
namespace Home {
  	export class Page { // 通过这种export形式进行暴露
      constructor(){
        new Components.Header()
 				new Components.Content()
        new Components.Footer()
      }
    }
}
```

同时命名空间里也可以定义interface，也可以有子命名空间

```typescript
namespace Components {
  	// 子命名空间
	  export namespace SubComponents{
      export class Test{}
    }
  	// interface
 		export interface User{
      name:string;
    }
	  export class Header{} 
    export class Content{}
    export class Footer{}
}
```

## import引入语法

下面的这种，比较难以辨认。模块化组织看起来不清晰

```typescript
/// <refrence path="./components.ts"> 加上这个之后结构更加清晰，
namespace Home {
  	export class Page { // 通过这种export形式进行暴露
      constructor(){
        new Components.Header()
 				new Components.Content()
        new Components.Footer()
      }
    }
}
```

```typescript
// 使用amd语法
import {Header, Content, Footer} from './componets'

class Page {
    constructor(){
        new Header();
        new Content();
        new Footer();
    }
}
```

如何引入amd语法？

使用包`require.js`

```
// 因为特别麻烦，所以直接使用webpack，就不写下面的。主要知道amd，commonjs兼容适配。
```

## 关于Parcel

和webpack对打的，但是没webpack这么麻烦，这么多的配置。就不用按照↑那种一步步还要引入啥的。

```json
npm install parcel@next -D
```

然后去package.json就能直接给你编译了

```json
"scripts": {
    "test": "parcel ./src/index.html",
  },
```

## 如何编译自己的类型文件-使用jQuery演示

以前说过在ts写js代码，虽然使用了parcel这样的库可以帮我们编译，但是有时候ide却不能帮我们主动识别

比如在html引入了jQuery的库

```html
<script src="https://code.jquery.com/jquery-3.6.0.slim.js" integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
```

然后在ts文件里写jq代码

```typescript
$(function(){
  alert(1) // 这里的$就无法识别
})
```

以前的话我们会引用

```
npm install type@jquery
```

现在我们自己写**类型定义文件**使用的是 `declare`关键字 

*jquery.d.ts*

```typescript
// 接收一个函数，返回void
// 接收了一个什么样子的函数呢 () => {} in是无参，out是对象
// 接收了一个什么样子的函数呢 () => void in是无参，out是void
declare var $: (param: () => {}) => void;

```

然后如果比如写了一个入口函数，一个选择器的话。就可以这样写。

```typescript
interface JqueryInstance {
  html: (html: string) => JqueryInstance;
}

// 函数重载
declare function $(readyFunc: () => void): void;
declare function $(selector: string): JqueryInstance;

```

其实上面那两行重载，可以写成这种形式

```typescript
// 使用interface语法，实现函数重载
interface Jquery {
  (readyFunc: () => void): void;
  (selector: string): JqueryInstance;
}

declare var $: Jquery;

```

如果要对对象进行**类型定义**，或者对**类进行类型定义**，以及**命名空间的嵌套**。

```typescript
declare namespace $ {
    namespace fn {
        class init{}
    }
}

$(function() {
  $('body').html('<div>123</div>');
  new $.fn.init(); // 适用于这部分
});

```

使用es6模块化

```typescript
// Es6 模块化
declare module 'jquery' {
  interface JqueryInstance {
    html: (html: string) => JqueryInstance;
  }
  // 混合类型
  function $(readyFunc: () => void): void;
  function $(selector: string): JqueryInstance;
  namespace $ {
    namespace fn {
      class init {}
    }
  }
  export = $;
}

// 这样外部使用的时候直接引入就可以
import $ from 'jquery';

$(function() {
  $('body').html('<div>123</div>');
  new $.fn.init();
});

```

## 泛型中keyof语法的使用

稍微有点难以理解

先看看发生背景

```typescript
interface Person {
  name: string;
  age: number;
  gender: string;
}
class Teacher {
  constructor(private info: Person) {}
  getInfo(key:string) { // 这里的key是一个string
    return this.info[key];
  }
}

const teacher = new Teacher({
  name: 'dell',
  age: 18,
  gender: 'male'
});

const test = teacher.getInfo('hello');// 你会发现即使你写不包含在Person里的也不报错
console.log(test)

```

虽然上面的写法不报错，但是这样类型就没了意义。所以需要进行约束

```typescript
class Teacher {
  constructor(private info: Person) {}
  getInfo(key:string) { 
    // 极其不优雅
    if(key == 'name' || key == 'age' || key == 'gender') {
          return this.info[key];
    }
  }
}
```

最后事实上用的就是keyof语法来解决的

```typescript
class Teacher {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}
```

其实这个T相当于遍历了Person里面全部的属性

相当于这个type，不仅仅是以前的类型，比如string，number，还可以是一个具体的内容！比如`name,age,gender`这种字符串。

```typescript
type T = 'name' // 相当于申请了类型别名

type NAME = 'name';
key: 'name';
Person['name'];

type T = 'age'
key: 'age'
Person['age']

type T = 'gender'
key: 'gender'
Person['gender']
```



# express

搭建框架

```json
"scripts": {
  "dev:build": "tsc -w",
  "dev:start": "nodemon node ./build/index.js",
  "dev": "tsc && concurrently npm:dev:*"
},
```

输入命令

```
npm install express --save
npm i --save-dev @types/express // 类型注解文件
```

然后构建

```typescript
// src/index.ts
import express, { Request, Response } from 'express';
import router from './router';

const app = express();

app.use(router);

app.listen(7001, () => {
  console.log('server is running');
});

src/router.ts
import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import AnalyzerOne from './analyzerOne';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password" />
          <button>提交</button>
        </form>
      </body>
    </html>
  `);
});

router.get('/getData', (req: Request, res: Response) => {
  const secret = 'x3b174jsx';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = AnalyzerOne.getInstance();
  new Crowller(url, analyzer);
  res.send('hello getData111');
});

export default router;


```

如果要增加权限的话，会发现无法去得到值

```typescript
router.post('/getData', (req: Request, res: Response) => {
  console.log(req.body); // undefined why？
  if (req.body.password === '111') {
  } else {
    res.send('Error');
  }
});
```

因为仔细看追根溯源的话

```
req.body → ReqBody → any
```

可以发现是类型文件有问题，没有识别到，翻译有错误，但是ide没有提示错误，如果这样的话那么ts就失去了意义。

所以解决方案，就是中间件`body-parser`

```
npm i body-parser
```

一定要写在路由前面，毕竟是中间件

```typescript
// src/router.ts
import express, { Request, Response } from 'express';
import router from './router';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(7001, () => {
  console.log('server is running');
});

```

顺利解决！！

有了新问题

```
问题1: express 库的类型定义文件 .d.ts 文件类型描述不准确
问题2: 当我使用中间件的时候，对 req 或者 res 做了修改之后呢，实际上类型并不能改变。
```

关于问题2就是相当于

```typescript
// 如果你以后新增一个属性
req.hello = 1;
// 那么ide也不会出现的
```

那如何解决呢？

**问题1解决自己写一个！！！接口！！**

根据已经写好的d.ts 然后自己实现一个。

```typescript
// src/router.ts
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
......
router.post('/getData', (req: RequestWithBody, res: Response)
```

**问题2 解决 自己写个文件 类型融合**

```typescript
// custom.d.ts
declare namespace Express {
  interface Request {
    name: string;
  }
  
// 这样你就可以自己添加了
// src/index.ts
app.use((req: Request, res: Response, next: NextFunction) => {
  // 这里req虽然没有name这个属性，也不知道是什么类型，但可以通过类型融合进行添加
  req.name = 'System';
  next();
});
// src/router.ts
router.post('/getData', (req: RequestWithBody, res: Response) => {
    const { password } = req.body;
    ...
    } else {
      res.send(`${req.name} Error`); // 同时这里也可以表示出name
    }
  });
```

开始写登录功能

主要用到的是一个库

```json
cookie-session
```

所以就要安装

```
npm install cookie-session --save
npm install @types/cookie-session --save
```

然后执行

```typescript
// src/index.ts
import cookieSession from 'cookie-session';
app.use(
  cookieSession({
    name: 'session',
    keys: ['chin'],
    // 登录期限 24小时
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
// 判断是否登录
const isLogin = req.session ? req.session.login : false;
// 如果已经登录
if (isLogin) {
  res.send('已经登录');
} else {
  // 未登录
  // 看看验证码
  if (password === '111' && req.session) {
    req.session.login = true;
    res.send('登录成功');
  } else {
    res.send('登录失败');
  }
}
```

