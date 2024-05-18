export interface AndBuildParams {
    /**
     * 包名
     *
     * @public
     */
    packageName: string;
    /**
     *
     * 打包证书别名 默认 platform-uniapp
     *
     * @default  platform-uniapp
     *
     * @public
     */
    certalias?: string;
    /**
     *
     * 证书别名文件路径
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
export declare function getAndParams(config: AndBuildParams): string;
