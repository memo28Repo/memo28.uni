export const ERR_CODE = {
    NORMAL: 0
} as const


export const errMsg = {
    [ERR_CODE.NORMAL]: '正常',
    12000: '未先调用startWifi接口',
    12001: '当前系统不支持wifi能力',
    12002: '密码错误',
    12003: '连接超时',
    12004: '重复连接WIFI',
    12006: '未打开GPS定位开光',
    12007: '用户拒绝授权 WIFI',
    12008: '无效 SSID',
    12009: '系统运营商拒绝连接 WIFI',
    12011: '应用在后台无法配置 WIFI',
    12005: '未打开Wifi开关',
    12013: '系统保存的 Wi-Fi 配置过期，建议忘记 Wi-Fi 后重试',
    12014: '无效的 WEP / WPA 密码'
} as const


export function getErrMsg(code: string | number): string {
    return errMsg[code as keyof typeof errMsg] as string

}
