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
    res.send('hello /222');
});
router.get('/getData', (req, res) => {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = analyzerOne_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.send('hello getData111');
});
exports.default = router;
