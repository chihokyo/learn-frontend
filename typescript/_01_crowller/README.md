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

