"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildScript = void 0;
const buildParams_1 = require("./and/buildParams");
const buildParams_2 = require("./ios/buildParams");
/**
 * 根据传入参数生成打包脚本
 */
class BuildScript {
    constructor(config) {
        this.config = config;
        this.configScript = '';
    }
    getAndScript(config) {
        this.configScript = `${this.configScript} ${(0, buildParams_1.getAndParams)(config)}`;
        return this;
    }
    getIosScript(config) {
        this.configScript = `${this.configScript} ${(0, buildParams_2.getIOSParams)(config)}`;
        return this;
    }
    getAppScript() {
        return `${this.config.uniCliPath} pack --project ${this.config.projectName} --iscustom false --safemode false --isconfusion true --splashads false --rpads false --pushads false --exchange false ${this.configScript}`;
    }
}
exports.BuildScript = BuildScript;
