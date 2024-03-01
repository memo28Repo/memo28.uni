"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offNetworkStatusChange = exports.networkStatusChangeTrigger = void 0;
/*
 * @Author: @memo28.repo
 * @Date: 2023-12-26 23:33:30
 * @LastEditTime: 2023-12-26 23:34:33
 * @Description:
 * @FilePath: /uniRepo/packages/wifi/src/api/networkStatusChange.ts
 */
const init_1 = require("../store/init");
const defineConfig_1 = require("./defineConfig");
/**
 *
 *
 * 监听网络变化
 *
 * @public
 */
function networkStatusChange() {
    function change(res) {
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
    }
    return {
        onNetworkStatusChange() {
            defineConfig_1.config.listenToNetworkStatus && uni.onNetworkStatusChange(change);
        },
        offNetworkStatusChange() {
            defineConfig_1.config.listenToNetworkStatus && uni.offNetworkStatusChange(change);
        }
    };
}
exports.networkStatusChangeTrigger = networkStatusChange();
exports.offNetworkStatusChange = exports.networkStatusChangeTrigger.offNetworkStatusChange;
