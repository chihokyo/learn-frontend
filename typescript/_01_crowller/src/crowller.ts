import superagent from 'superagent';
import fs from 'fs';
import path from 'path';
import AnalyzerOne from './analyzer';

export interface Analyzer {
  analyzer: (html: string, filePath: string) => string;
}
class Crowller {
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
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}

const secret = 'x3b174jsx';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyzer = new AnalyzerOne();
new Crowller(url, analyzer);
