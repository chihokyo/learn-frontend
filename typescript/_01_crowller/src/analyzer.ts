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
