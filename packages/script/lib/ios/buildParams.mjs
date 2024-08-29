"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIOSParams = getIOSParams;
/**
 *
 * 传入iOS配置生成脚本字符串
 *
 * @param config
 */
function getIOSParams(config) {
    var _a;
    const supporteddevice = ((_a = config.supporteddevice) === null || _a === void 0 ? void 0 : _a.length) ? config.supporteddevice.join(',') : 'iPhone';
    return `--platform IOS --ios.isprisonbreak false --ios.supporteddevice ${supporteddevice} --ios.bundle ${config.bundle} --ios.profile ${config.profile} --ios.certfile ${config.certfile} --ios.certpassword ${config.certpassword}`;
}
