import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import AnalyzerOne from './analyzerOne';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello /222');
});

router.get('/getData', (req: Request, res: Response) => {
  const secret = 'x3b174jsx';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = AnalyzerOne.getInstance();
  new Crowller(url, analyzer);
  res.send('hello getData111');
});

export default router;
