import {connectToWifiTrigger, unConnectToWifiTrigger, wifiInitializedSuccessfully} from '../store/init'
import {config} from './defineConfig'
import {SNI} from '@memo28/utils'
import {ERR_CODE, getErrMsg} from "../constant/errorCode";
import {inApp, inWx, inH5Fn} from '@memo28.uni/utils'


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
        config.listenToNetworkStatus && uni.onNetworkStatusChange((res) => {
            if (res.isConnected && res.networkType === 'wifi') {
                if (connectToWifiTrigger.value) return
                if (unConnectToWifiTrigger.value) {
                    unConnectToWifiTrigger.value = false
                }
                if (!connectToWifiTrigger.value) {
                    config.connectToWifi?.();
                    connectToWifiTrigger.value = true
                }
            }
            if (!res.isConnected || (res.isConnected && res.networkType !== 'wifi')) {
                if (connectToWifiTrigger.value) {
                    connectToWifiTrigger.value = false
                }
                if (unConnectToWifiTrigger.value) return
                if (!unConnectToWifiTrigger.value) {
                    config.unConnectToWifi?.()
                    unConnectToWifiTrigger.value = true
                }
            }
        })
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
