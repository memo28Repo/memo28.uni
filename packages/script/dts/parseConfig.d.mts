/**
 *
 * 解析环境变量的参数
 *
 * @public
 *
 */
export declare class ParseConfig<E extends object = object> {
    /**
     *
     * 获取配置文件内容 转为对象
     *
     * @public
     */
    getEnvConfig(): Promise<E>;
    /**
     *
     *
     * 传入配置文件的输出 转为该函数的输入返回一个对象
     *
     * @param {string} stdout 配置文件的输入
     *
     * @public
     */
    private formatObject;
}
