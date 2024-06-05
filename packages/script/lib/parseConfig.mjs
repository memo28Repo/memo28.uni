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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseConfig = void 0;
const zx_1 = require("zx");
/**
 *
 * 解析环境变量的参数
 *
 * @public
 *
 */
class ParseConfig {
    /**
     *
     * 获取配置文件内容 转为对象
     *
     * @public
     */
    getEnvConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const bashProfileContent = yield (0, zx_1.$) `cat ~/.bash_profile`;
            return this.formatObject(bashProfileContent.stdout);
        });
    }
    /**
     *
     *
     * 传入配置文件的输出 转为该函数的输入返回一个对象
     *
     * @param {string} stdout 配置文件的输入
     *
     * @public
     */
    formatObject(stdout) {
        const lines = stdout.split('\n');
        // 初始化一个空对象来存储键值对
        const keyValuePairs = {};
        // 解析每一行，提取键值对和别名
        for (const line of lines) {
            // 去除空白字符并忽略空行和注释行
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                // 匹配 export KEY=VALUE 或 export alias KEY=VALUE 形式的行
                let match = trimmedLine.match(/^export\s+(?:alias\s+)?(\w+)\s*=\s*['"]?(.*?)['"]?$/);
                if (match) {
                    const key = match[1];
                    const value = match[2];
                    // @ts-ignore
                    keyValuePairs[key] = value;
                }
            }
        }
        return keyValuePairs;
    }
}
exports.ParseConfig = ParseConfig;
