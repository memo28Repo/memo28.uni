/*
 * @Author: @memo28.repo
 * @Date: 2023-12-24 23:35:47
 * @LastEditTime: 2023-12-26 23:40:55
 * @Description: 
 * @FilePath: /uniRepo/packages/wifi/src/api/initWifi.ts
 */
import { inApp, inH5Fn, inWx } from '@memo28.uni/utils';
import { SNI } from '@memo28/utils';
import { ERR_CODE, getErrMsg } from "../constant/errorCode";
import { wifiInitializedSuccessfully } from '../store/init';
import { config } from './defineConfig';
import { networkStatusChangeTrigger } from './networkStatusChange';


export function wifiFail(err: UniNamespace.WifiError) {
    if (SNI(err.errCode, ERR_CODE.NORMAL)) return
    config.wifiFailToast ? config.wifiFailToast?.(err) : uni.showToast({
        title: getErrMsg(err.errCode),
        icon: 'none',
        duration: 3000,
    });
}

export function initWifi() {
    return new Promise((resolve, reject) => {
        inApp(() => {
            initWifiCore().then(resolve).catch(reject)
        })
        inWx(() => {
            initWifiCore().then(resolve).catch(reject)
        })
        inH5Fn(() => {
            uni.showToast({
                title: 'h5不支持wifi模块',
                icon: 'none',
                duration: 3000,
            });
        })
    })
}



function initWifiCore() {
    return new Promise((resolve, reject) => {
        // 如果已初始化成功则直接跳过当前逻辑
        if (wifiInitializedSuccessfully.value) return resolve(true)

        networkStatusChangeTrigger.onNetworkStatusChange()

        uni.getNetworkType({
            success(res) {
                if (res.networkType !== 'wifi') return reject(false)
                uni.startWifi({
                    success(res) {
                        if (!SNI(res.errCode, ERR_CODE.NORMAL)) resolve(true)
                        else reject(false)
                    },
                    fail(err) {
                        if (!SNI(err.errCode, ERR_CODE.NORMAL)) {
                            if (config.debugger) console.log(err)
                            wifiFail(err)
                        }
                        reject(false)
                    }
                })
            },
            fail(err) {
                if (config.debugger) console.log(err)
                reject(false)
            }
        })
    }).then(res => {
        wifiInitializedSuccessfully.value = true
        return res
    })

}


/**
 * 
 * 关闭 wifi 模块
 * 
 * @public
 * 
 */
export function stopWifi() {
    return new Promise((resolve, reject) => {
        inH5Fn(() => {
            reject()
            uni.showToast({
                title: 'h5不支持wifi模块',
                icon: 'none',
                duration: 3000,
            });
        })
        inWx(() => {
            stopWifiCore().then(resolve).catch(reject)
        })

        inApp(() => {
            stopWifiCore().then(resolve).catch(reject)
        })
    })

}

function stopWifiCore() {
    return new Promise((resolve, reject) => {
        uni.stopWifi({
            success(res) {
                if (!SNI(res.errCode, ERR_CODE.NORMAL)) {
                    if (config.debugger) console.log(res)
                    wifiFail(res)
                    reject()
                } else {
                    resolve(true)
                    networkStatusChangeTrigger.offNetworkStatusChange()
                }
            },
            fail(err) {
                if (!SNI(err.errCode, ERR_CODE.NORMAL)) {
                    if (config.debugger) console.log(err)
                    wifiFail(err)
                    reject()
                }
            }
        })
    })

}