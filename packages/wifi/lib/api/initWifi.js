"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWifi = exports.wifiFail = void 0;
const utils_1 = require("@memo28.uni/utils");
const utils_2 = require("@memo28/utils");
const errorCode_1 = require("../constant/errorCode");
const init_1 = require("../store/init");
const defineConfig_1 = require("./defineConfig");
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
exports.wifiFail = wifiFail;
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
exports.initWifi = initWifi;
function removeNex() {
    uni.offNetworkStatusChange();
}
function initWifiCore() {
    return new Promise((resolve, reject) => {
        // 如果已初始化成功则直接跳过当前逻辑
        if (init_1.wifiInitializedSuccessfully.value)
            return resolve(true);
        defineConfig_1.config.listenToNetworkStatus && uni.onNetworkStatusChange((res) => {
            var _a, _b;
            if (res.isConnected && res.networkType === 'wifi') {
                if (init_1.connectToWifiTrigger.value)
                    return;
                if (init_1.unConnectToWifiTrigger.value) {
                    init_1.unConnectToWifiTrigger.value = false;
                }
                if (!init_1.connectToWifiTrigger.value) {
                    (_a = defineConfig_1.config.connectToWifi) === null || _a === void 0 ? void 0 : _a.call(defineConfig_1.config);
                    init_1.connectToWifiTrigger.value = true;
                }
            }
            if (!res.isConnected || (res.isConnected && res.networkType !== 'wifi')) {
                if (init_1.connectToWifiTrigger.value) {
                    init_1.connectToWifiTrigger.value = false;
                }
                if (init_1.unConnectToWifiTrigger.value)
                    return;
                if (!init_1.unConnectToWifiTrigger.value) {
                    (_b = defineConfig_1.config.unConnectToWifi) === null || _b === void 0 ? void 0 : _b.call(defineConfig_1.config);
                    init_1.unConnectToWifiTrigger.value = true;
                }
            }
        });
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
