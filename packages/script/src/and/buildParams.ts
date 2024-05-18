export interface AndBuildParams {
    /**
     * 包名
     *
     * @public
     */
    packageName: string
    /**
     *
     * 打包证书别名 默认 platform-uniapp
     *
     * @default  platform-uniapp
     *
     * @public
     */
    certalias?: string

    /**
     *
     * 证书别名文件路径
     *
     * @public
     */
    certfile: string


    /**
     *
     * 密码
     *
     * @public
     */
    certpassword: string
}

export function getAndParams(config: AndBuildParams) {
    const certalias = config.certalias || 'platform-uniapp'
    return `--platform android --android.packagename ${config.packageName} --android.androidpacktype 0 --android.certalias ${certalias} --android.certpassword  ${config.certpassword} --android.certfile  ${config.certfile}`;
}