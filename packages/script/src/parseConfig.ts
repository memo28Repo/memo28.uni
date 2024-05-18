import {$} from 'zx'

/**
 *
 * 解析环境变量的参数
 *
 * @public
 *
 */
export class ParseConfig<E extends object = object> {
    /**
     *
     * 获取配置文件内容 转为对象
     *
     * @public
     */
    async getEnvConfig(): Promise<E> {
        const bashProfileContent = await $`cat ~/.bash_profile`;
        return this.formatObject<E>(bashProfileContent.stdout)
    }

    /**
     *
     *
     * 传入配置文件的输出 转为该函数的输入返回一个对象
     *
     * @param {string} stdout 配置文件的输入
     *
     * @public
     */
    private formatObject<T extends object = object>(stdout: string): T {
        const lines = stdout.split('\n');

        // 初始化一个空对象来存储键值对
        const keyValuePairs = {} as T;

        // 解析每一行，提取键值对和别名
        for (const line of lines) {
            // 去除空白字符并忽略空行和注释行
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                // 匹配 export KEY=VALUE 或 export alias KEY=VALUE 形式的行
                let match = trimmedLine.match(/^export\s+(?:alias\s+)?(\w+)\s*=\s*['"]?(.*?)['"]?$/);
                if (match) {
                    const key = match[1];
                    const value = match[2];
                    // @ts-ignore
                    keyValuePairs[key] = value;
                }
            }
        }
        return keyValuePairs;
    }

}
