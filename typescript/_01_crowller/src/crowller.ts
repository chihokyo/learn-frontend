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
