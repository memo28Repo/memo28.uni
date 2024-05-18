import {getAndParams, AndBuildParams} from './and/buildParams'
import {IosBuildParams, getIOSParams} from './ios/buildParams'


export interface BuildScriptTypes {
    /**
     *
     * 脚本路径
     *
     * @public
     */
    uniCliPath: string

    /**
     *
     * 项目名
     * @public
     */
    projectName: string
}


/**
 * 根据传入参数生成打包脚本
 */
export class BuildScript {

    constructor(private config: BuildScriptTypes) {
    }

    private configScript = ''

    getAndScript(config: AndBuildParams): this {
        this.configScript = `${this.configScript} ${getAndParams(config)}`
        return this
    }

    getIosScript(config: IosBuildParams): this {
        this.configScript = `${this.configScript} ${getIOSParams(config)}`
        return this
    }

    getAppScript() {
        return `${this.config.uniCliPath} pack --project ${this.config.projectName} --iscustom false --safemode false --isconfusion true --splashads false --rpads false --pushads false --exchange false ${this.configScript}`;
    }
}