"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wifiFail = wifiFail;
exports.initWifi = initWifi;
exports.stopWifi = stopWifi;
/*
 * @Author: @memo28.repo
 * @Date: 2023-12-24 23:35:47
 * @LastEditTime: 2023-12-26 23:40:55
 * @Description:
 * @FilePath: /uniRepo/packages/wifi/src/api/initWifi.ts
 */
const utils_1 = require("@memo28.uni/utils");
const utils_2 = require("@memo28/utils");
const errorCode_1 = require("../constant/errorCode");
const init_1 = require("../store/init");
const defineConfig_1 = require("./defineConfig");
const networkStatusChange_1 = require("./networkStatusChange");
function wifiFail(err) {
    var _a;
    if ((0, utils_2.SNI)(err.errCode, errorCode_1.ERR_CODE.NORMAL))
        return;
    defineConfig_1.config.wifiFailToast ? (_a = defineConfig_1.config.wifiFailToast) === null || _a === void 0 ? void 0 : _a.call(defineConfig_1.config, err) : uni.showToast({
        title: (0, errorCode_1.getErrMsg)(err.errCode),
        icon: 'none',
        duration: 3000,
    });
}
function initWifi() {
    return new Promise((resolve, reject) => {
        (0, utils_1.inApp)(() => {
            initWifiCore().then(resolve).catch(reject);
        });
        (0, utils_1.inWx)(() => {
            initWifiCore().then(resolve).catch(reject);
        });
        (0, utils_1.inH5Fn)(() => {
            uni.showToast({
                title: 'h5不支持wifi模块',
                icon: 'none',
                duration: 3000,
            });
        });
    });
}
function initWifiCore() {
    return new Promise((resolve, reject) => {
        // 如果已初始化成功则直接跳过当前逻辑
        if (init_1.wifiInitializedSuccessfully.value)
            return resolve(true);
        networkStatusChange_1.networkStatusChangeTrigger.onNetworkStatusChange();
        uni.getNetworkType({
            success(res) {
                if (res.networkType !== 'wifi')
                    return reject(false);
                uni.startWifi({
                    success(res) {
                        if (!(0, utils_2.SNI)(res.errCode, errorCode_1.ERR_CODE.NORMAL))
                            resolve(true);
                        else
                            reject(false);
                    },
                    fail(err) {
                        if (!(0, utils_2.SNI)(err.errCode, errorCode_1.ERR_CODE.NORMAL)) {
                            if (defineConfig_1.config.debugger)
                                console.log(err);
                            wifiFail(err);
                        }
                        reject(false);
                    }
                });
            },
            fail(err) {
                if (defineConfig_1.config.debugger)
                    console.log(err);
                reject(false);
            }
        });
    }).then(res => {
        init_1.wifiInitializedSuccessfully.value = true;
        return res;
    });
}
/**
 *
 * 关闭 wifi 模块
 *
 * @public
 *
 */
function stopWifi() {
    return new Promise((resolve, reject) => {
        (0, utils_1.inH5Fn)(() => {
            reject();
            uni.showToast({
                title: 'h5不支持wifi模块',
                icon: 'none',
                duration: 3000,
            });
        });
        (0, utils_1.inWx)(() => {
            stopWifiCore().then(resolve).catch(reject);
        });
        (0, utils_1.inApp)(() => {
            stopWifiCore().then(resolve).catch(reject);
        });
    });
}
function stopWifiCore() {
    return new Promise((resolve, reject) => {
        uni.stopWifi({
            success(res) {
                if (!(0, utils_2.SNI)(res.errCode, errorCode_1.ERR_CODE.NORMAL)) {
                    if (defineConfig_1.config.debugger)
                        console.log(res);
                    wifiFail(res);
                    reject();
                }
                else {
                    resolve(true);
                    networkStatusChange_1.networkStatusChangeTrigger.offNetworkStatusChange();
                }
            },
            fail(err) {
                if (!(0, utils_2.SNI)(err.errCode, errorCode_1.ERR_CODE.NORMAL)) {
                    if (defineConfig_1.config.debugger)
                        console.log(err);
                    wifiFail(err);
                    reject();
                }
            }
        });
    });
}
