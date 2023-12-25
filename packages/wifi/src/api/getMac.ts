import {initWifi, wifiFail} from './initWifi'

/**
 *
 * 获取当前连接wifi的 mac 地址
 *
 * @public
 */
export function getMac(): Promise<string> {
    return new Promise(resolve => {
        initWifi().then(() => {
            uni.getConnectedWifi({
                success(res) {
                    resolve(res.wifi.BSSID)
                },
                fail(err) {
                    wifiFail(err)
                    resolve("")
                }
            })
        }).catch(() => {
            resolve('')
        })
    })
}
