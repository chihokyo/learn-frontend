import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import AnalyzerOne from './analyzerOne';
import { appendTo } from 'cheerio/lib/api/manipulation';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

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

router.post('/getData', (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  if (password === '111') {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = AnalyzerOne.getInstance();
    new Crowller(url, analyzer);
    res.send('hello getData111');
  } else {
    res.send(`${req.name} Error`);
  }
});

export default router;
