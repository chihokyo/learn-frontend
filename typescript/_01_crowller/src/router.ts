import fs from 'fs';
import path from 'path';
import { Router, Request, Response, NextFunction } from 'express';
import Crowller from './utils/crowller';
import AnalyzerOne from './utils/analyzerOne';
import { getResponseData } from './utils/utils';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; // 可以匹配
  };
}
// 检测是否登录
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
    <html>
    <body>
      <p>您已登录</p>
      <a href='/getData'>点击开始爬取</a>
      <a href='/showData'>点击展示</a>
      <a href='/logout'>退出登录</a>
    </body>
  </html>`);
  } else {
    res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" />
          <button>login</button>
        </form>
      </body>
    </html>
  `);
  }
});

// 登录
router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  // 判断是否已经登录
  const isLogin = req.session ? req.session.login : false;
  // 如果已经登录
  if (isLogin) {
    res.json(getResponseData(false, '已经登录过'));
  } else {
    // 未登录
    // 看看验证码
    if (password === '111' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, '登录失败'));
    }
  }
});

// 登出
router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.json(getResponseData(true));
});

// 获取数据
router.get('/getData', checkLogin, (req: Request, res: Response) => {
  const secret = 'x3b174jsx';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = AnalyzerOne.getInstance();
  new Crowller(url, analyzer);
  res.json(getResponseData(true));
});

// 展示数据
router.get('/showData', (req: Request, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json');
    const result = fs.readFileSync(position, 'utf-8');
    res.json(getResponseData(JSON.parse(result)));
  } catch (error) {
    res.json(getResponseData(false, '数据不存在'));
  }
});

export default router;
