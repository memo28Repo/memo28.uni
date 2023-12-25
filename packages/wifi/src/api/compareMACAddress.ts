import {getMac} from "./getMac";
import {SNI} from "@memo28/utils";

/**
 *
 * 对比 mac 地址
 *
 * @public
 *
 */
export function compareMACAddress(mac: string) {
    const lMac = mac.toLowerCase()
    return new Promise((resolve) => {
        getMac().then(res => {
            if (SNI(res, lMac)) resolve(true)
            else resolve(false)
        }).catch(() => {
            resolve(false)
        })
    })
}


/**
 *
 * 对比 mac 组 返回 匹配上的 mac 数组
 *
 * @public
 */
export async function compareMACAddressGroup(macGroup: string[]) {
    const group: string[] = []
    for (let i = 0; i < macGroup.length; i++) {
        const mac = macGroup[i]
        const result = await compareMACAddress(mac)
        if (result) {
            group.push(mac)
        }
    }
    return group
}
