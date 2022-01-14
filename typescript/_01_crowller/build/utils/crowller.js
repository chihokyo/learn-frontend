"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Crowller {
    // 构造函数
    constructor(url, analyzer) {
        this.url = url;
        this.analyzer = analyzer;
        this.rawHtml = ''; // 初始化html源文件
        this.filePath = path_1.default.resolve(__dirname, '../../data/course.json');
        this.initSpiderProcess();
    }
    /**
     * 获取源文件
     * @returns 输出文本信息
     */
    getRawHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield superagent_1.default.get(this.url); // 这里返回一个reponse类型的
            return result.text;
        });
    }
    /**
     * 将文件写入
     * @param content 对象
     */
    writeFile(content) {
        fs_1.default.writeFileSync(this.filePath, content);
    }
    /**
     * 主函数
     */
    initSpiderProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            // ①读取html源文件 ======> 通用的
            const html = yield this.getRawHtml(); // 异步函数同样需要添加html
            const fileContent = this.analyzer.analyzer(html, this.filePath);
            // ④写入json文件 ======> 通用的
            this.writeFile(fileContent);
        });
    }
}
exports.default = Crowller;
