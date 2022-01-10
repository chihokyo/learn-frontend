import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import AnalyzerOne from './analyzerOne';
import fs from 'fs';
import path from 'path';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; // 可以匹配
  };
}

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
});

// 登出
router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect('/');
});

// 获取数据
router.get('/getData', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = AnalyzerOne.getInstance();
    new Crowller(url, analyzer);
    res.send('成功获取数据');
  } else {
    res.send('请登录后进行爬取');
  }
});

// 展示数据
router.get('/showData', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    try {
      const position = path.resolve(__dirname, '../data/course.json');
      const result = fs.readFileSync(position, 'utf-8');
      res.json(JSON.parse(result));
    } catch (error) {
      res.send('尚未爬取到内容');
    }
  } else {
    res.send('请登录后查看内容');
  }
});

export default router;
