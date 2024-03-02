export declare const ERR_CODE: {
    readonly NORMAL: 0;
};
export declare const errMsg: {
    readonly 0: "正常";
    readonly 12000: "未先调用startWifi接口";
    readonly 12001: "当前系统不支持wifi能力";
    readonly 12002: "密码错误";
    readonly 12003: "连接超时";
    readonly 12004: "重复连接WIFI";
    readonly 12006: "未打开GPS定位开光";
    readonly 12007: "用户拒绝授权 WIFI";
    readonly 12008: "无效 SSID";
    readonly 12009: "系统运营商拒绝连接 WIFI";
    readonly 12011: "应用在后台无法配置 WIFI";
    readonly 12005: "未打开Wifi开关";
    readonly 12013: "系统保存的 Wi-Fi 配置过期，建议忘记 Wi-Fi 后重试";
    readonly 12014: "无效的 WEP / WPA 密码";
};
export declare function getErrMsg(code: string | number): string;
