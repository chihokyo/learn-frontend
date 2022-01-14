import { Analyzer } from './crowller';

export default class AnalyzerTwo implements Analyzer {
  public analyzer(html: string, filePath: string) {
    return html;
  }
}
