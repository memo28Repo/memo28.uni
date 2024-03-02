"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMac = void 0;
const initWifi_1 = require("./initWifi");
/**
 *
 * 获取当前连接wifi的 mac 地址
 *
 * @public
 */
function getMac() {
    return new Promise(resolve => {
        (0, initWifi_1.initWifi)().then(() => {
            uni.getConnectedWifi({
                success(res) {
                    resolve(res.wifi.BSSID);
                },
                fail(err) {
                    (0, initWifi_1.wifiFail)(err);
                    resolve("");
                }
            });
        }).catch(() => {
            resolve('');
        });
    });
}
exports.getMac = getMac;
