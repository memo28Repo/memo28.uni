export interface IosBuildParams {
    /**
     *
     * 支持的设备 默认 iPhone
     *
     * @default iPhone
     *
     * @public
     */
    supporteddevice?: ('iPhone' | 'iPad')[];
    /**
     * bundle Id
     *
     * @public
     */
    bundle: string;
    /**
     *
     * profile 文件地址
     *
     * @public
     */
    profile: string;
    /**
     *
     *
     * .p12 证书文件
     *
     * @public
     */
    certfile: string;
    /**
     *
     * 密码
     *
     * @public
     */
    certpassword: string;
}
/**
 *
 * 传入iOS配置生成脚本字符串
 *
 * @param config
 */
export declare function getIOSParams(config: IosBuildParams): string;
