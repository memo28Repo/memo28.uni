import { AndBuildParams } from './and/buildParams';
import { IosBuildParams } from './ios/buildParams';
export interface BuildScriptTypes {
    /**
     *
     * 脚本路径
     *
     * @public
     */
    uniCliPath: string;
    /**
     *
     * 项目名
     * @public
     */
    projectName: string;
}
/**
 * 根据传入参数生成打包脚本
 */
export declare class BuildScript {
    private config;
    constructor(config: BuildScriptTypes);
    private configScript;
    getAndScript(config: AndBuildParams): this;
    getIosScript(config: IosBuildParams): this;
    getAppScript(): string;
}
