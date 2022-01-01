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

