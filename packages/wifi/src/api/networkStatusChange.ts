/*
 * @Author: @memo28.repo
 * @Date: 2023-12-26 23:33:30
 * @LastEditTime: 2023-12-26 23:34:33
 * @Description: 
 * @FilePath: /uniRepo/packages/wifi/src/api/networkStatusChange.ts
 */
import { connectToWifiTrigger, unConnectToWifiTrigger } from '../store/init';
import { config } from './defineConfig';

/**
 * 
 * 
 * 监听网络变化
 * 
 * @public
 */
function networkStatusChange() {
    function change(res: UniNamespace.OnNetworkStatusChangeSuccess) {
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
    }


    return {
        onNetworkStatusChange() {
            config.listenToNetworkStatus && uni.onNetworkStatusChange(change)
        },
        offNetworkStatusChange() {
            config.listenToNetworkStatus && uni.offNetworkStatusChange(change)
        }
    }
}


export const networkStatusChangeTrigger = networkStatusChange()

export const offNetworkStatusChange = networkStatusChangeTrigger.offNetworkStatusChange