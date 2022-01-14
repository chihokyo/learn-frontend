"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const crowller_1 = __importDefault(require("./utils/crowller"));
const analyzerOne_1 = __importDefault(require("./utils/analyzerOne"));
const utils_1 = require("./utils/utils");
// 检测是否登录
const checkLogin = (req, res, next) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json((0, utils_1.getResponseData)(null, '请先登录'));
    }
};
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
        res.json((0, utils_1.getResponseData)(false, '已经登录过'));
    }
    else {
        // 未登录
        // 看看验证码
        if (password === '111' && req.session) {
            req.session.login = true;
            res.json((0, utils_1.getResponseData)(true));
        }
        else {
            res.json((0, utils_1.getResponseData)(false, '登录失败'));
        }
    }
});
// 登出
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json((0, utils_1.getResponseData)(true));
});
// 获取数据
router.get('/getData', checkLogin, (req, res) => {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = analyzerOne_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.json((0, utils_1.getResponseData)(true));
});
// 展示数据
router.get('/showData', (req, res) => {
    try {
        const position = path_1.default.resolve(__dirname, '../data/course.json');
        const result = fs_1.default.readFileSync(position, 'utf-8');
        res.json((0, utils_1.getResponseData)(JSON.parse(result)));
    }
    catch (error) {
        res.json((0, utils_1.getResponseData)(false, '数据不存在'));
    }
});
exports.default = router;
