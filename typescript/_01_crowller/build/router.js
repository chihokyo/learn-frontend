"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowller_1 = __importDefault(require("./crowller"));
const analyzerOne_1 = __importDefault(require("./analyzerOne"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
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
router.post('/getData', (req, res) => {
    const { password } = req.body;
    if (password === '111') {
        const secret = 'x3b174jsx';
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
        const analyzer = analyzerOne_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('hello getData111');
    }
    else {
        res.send(`${req.name} Error`);
    }
});
exports.default = router;
