"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowller_1 = __importDefault(require("./crowller"));
const analyzerOne_1 = __importDefault(require("./analyzerOne"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
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
    }
    else {
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
router.post('/login', (req, res) => {
    const { password } = req.body;
    // 判断是否已经登录
    const isLogin = req.session ? req.session.login : false;
    // 如果已经登录
    if (isLogin) {
        res.send('已经登录');
    }
    else {
        // 未登录
        // 看看验证码
        if (password === '111' && req.session) {
            req.session.login = true;
            res.send('登录成功');
        }
        else {
            res.send('登录失败');
        }
    }
});
// 登出
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect('/');
});
// 获取数据
router.get('/getData', (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        const secret = 'x3b174jsx';
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
        const analyzer = analyzerOne_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('成功获取数据');
    }
    else {
        res.send('请登录后进行爬取');
    }
});
// 展示数据
router.get('/showData', (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        try {
            const position = path_1.default.resolve(__dirname, '../data/course.json');
            const result = fs_1.default.readFileSync(position, 'utf-8');
            res.json(JSON.parse(result));
        }
        catch (error) {
            res.send('尚未爬取到内容');
        }
    }
    else {
        res.send('请登录后查看内容');
    }
});
exports.default = router;
