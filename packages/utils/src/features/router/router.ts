import {obj} from "@memo28/types";
import {getCurPage, getCurRoutePage, getPrevPageInstance} from "./page";
import {defineSimpleRouteJumpConfig} from './defineConfig'

interface CallbackResult {
    /** 错误信息 */
    errMsg: string;
}

export interface callbackCollectionTypes {
    complete?: (res: CallbackResult) => void;
    fail?: (res: CallbackResult) => void;
    success?: (res: CallbackResult) => void;
}

export class DefineJumpCallback {
    protected callbackCollection: Partial<callbackCollectionTypes> = {};

    success(cb?: (res: CallbackResult) => void) {
        this.callbackCollection = {...this.callbackCollection, success: cb};
        return this;
    }

    fail(cb?: (res: CallbackResult) => void) {
        this.callbackCollection = {...this.callbackCollection, fail: cb};
        return this;
    }

    complete(cb?: (res: CallbackResult) => void) {
        this.callbackCollection = {...this.callbackCollection, complete: cb};
        return this;
    }
}

type navigateBackTypes = typeof uni.navigateBack

type navigateToTypes = typeof uni.navigateTo

type reLaunchTypes = typeof uni.reLaunch

type redirectTo = typeof uni.redirectTo

export type jumpMethod = navigateBackTypes | navigateToTypes | reLaunchTypes | redirectTo | undefined

export type jumpMethodName = "navigateBack" | "navigateTo" | "reLaunch" | "redirectTo"

export type getJumpParametersAccordingToJumpMethod<T extends jumpMethodName> = T extends "navigateBack"
    ? navigateBackTypes
    : T extends "navigateTo"
        ? navigateToTypes
        : T extends "reLaunch"
            ? reLaunchTypes
            : T extends "redirectTo"
                ? redirectTo
                : never

const jumpMethodContainer: { [key in jumpMethodName]: jumpMethod } = {
    navigateBack: uni.navigateBack,
    navigateTo: uni.navigateTo,
    reLaunch: uni.reLaunch,
    redirectTo: uni.redirectTo
};

export type simpleRouteJumpConfig<T = unknown> = {
    method: jumpMethodName
    url?: string
    // 预跳转回调
    // 返回值是falsy则拒绝跳转, 反之
    preJumpInterceptor?: (params: T) => boolean | { msg: string }
}

/**
 * 配置路由元数据
 */
export interface simpleRouteMeta {
    /**
     * 路由Name
     */
    name?: string,
    /**
     * 当前路由实例
     */
    instance: SimpleRouteJump<any>

}

export interface triggerOptions<T extends object> {
    // 附加在跳转时的url上
    mete: T;
    /**
     * 临时跳转方法
     */
    temporaryRedirects?: jumpMethodName
}

// 路由组
const routerMap: Map<string, Partial<simpleRouteMeta>> = new Map()

/**
 *
 * 对路由跳转的封装
 * 值得一提的是
 *
 * - 跳转前拦截器
 *
 * - 跳转参数转换，不再拼接字符串
 *
 * - 只定义一次路径，避免多次定义失误或忘记路径翻找配置文件的情况
 *
 *
 * @example
 * ```ts
 *  new SimpleRouteJump().setMethod('navigateBack').setPreJumpInterceptor().trigger({})
 * ```
 *
 * @public
 *
 *
 */
export class SimpleRouteJump<Mete extends object, T extends jumpMethodName = "navigateTo"> extends DefineJumpCallback {
    private simpleRouteJumpConfig: simpleRouteJumpConfig<Mete> = {method: "navigateTo"};

    private meta?: Partial<simpleRouteMeta> = {}

    constructor(url?: string, meta?: Partial<simpleRouteMeta>) {
        super();
        this.meta = {...meta, instance: this}
        this.setUrl(url);
        this.addRouterMap(url || '')
    }

    private addRouterMap(url: string) {
        if (!url?.trim()?.length) return
        if (routerMap.has(url)) return
        routerMap.set(url, this.meta || {})
    }


    getRouters() {
        return routerMap
    }

    /**
     *
     * 设置跳转路径
     *
     * @example
     *
     * ```ts
     * // 设置跳转路径
     * new SimpleRouteJump().setUrl('path')
     * ```
     *
     *
     * @param {string} url - 跳转页面路径
     * @returns {this}
     */
    setUrl(url?: string): this {
        this.simpleRouteJumpConfig = {...this.simpleRouteJumpConfig, url};
        this.addRouterMap(url || '')
        return this;
    }

    /**
     *
     *
     * 设置跳转方法
     *
     *
     * @example
     * ```ts
     * // 设置跳转方法
     * new SimpleRouteJump().setMethod('navigateBack')
     * ```
     *
     *
     * @param {jumpMethodName} method - 设置跳转方法
     *
     * @public
     *
     */
    setMethod<M extends jumpMethodName>(method?: M): SimpleRouteJump<Mete, M> {
        this.simpleRouteJumpConfig = {...this.simpleRouteJumpConfig, method: method || "navigateTo"};
        // @ts-ignore
        return this;
    }

    /**
     *
     * 预跳转判断
     *
     *
     * @example
     * ```ts
     * // 设置预跳转判断 为true才允许跳转
     * new SimpleRouteJump().setPreJumpInterceptor(() => true)
     * ```
     *
     * @param {simpleRouteJumpConfig<Mete>["preJumpInterceptor"]} fn - 设置预跳转回调，跳转时触发，当返回值不为 true 时， 报错并且拒绝跳转
     *
     * @@public
     */
    setPreJumpInterceptor(fn?: simpleRouteJumpConfig<Mete>["preJumpInterceptor"]) {
        if (!fn) return this;
        this.simpleRouteJumpConfig = {...this.simpleRouteJumpConfig, preJumpInterceptor: fn};
        return this;
    }

    /**
     *
     *
     * 触发跳转
     *
     *
     * @example
     * ```ts
     * new SimpleRouteJump().setMethod('navigateTo').trigger({
     * // 设置 navigateTo 方法的跳转参数 url除外 因为在跳转之前就已经设置
     * })
     * ```
     *
     * @param {Partial<triggerOptions<Mete>> & Omit<NonNullable<Parameters<getJumpParametersAccordingToJumpMethod<T>>[0]>, 'url'>} options - 跳转参数
     *
     * @public
     */
    trigger(options?: Partial<triggerOptions<Mete>> & Omit<NonNullable<Parameters<getJumpParametersAccordingToJumpMethod<T>>[0]>, "url">) {
        const from = getCurPage()
        const toConfig = {...this.meta, ...options, ...this.simpleRouteJumpConfig}
        // @ts-ignore
        const beforeEach = defineSimpleRouteJumpConfig?.getBeforeEach?.()?.(toConfig, from);
        if (typeof beforeEach === 'boolean') {
            if (!beforeEach) return
            this.triggerCore(options)
            return
        }
        if (typeof beforeEach === 'string' && !(beforeEach as string)?.length) {
            const route = routerMap.get(beforeEach);
            if (route) {
                route.instance?.trigger(options)
                return
            } else {
                console?.error?.(`未找到name为${beforeEach}的路由配置`)
                return
            }
        }
        if (typeof beforeEach === 'object') {
            const route = routerMap.get(beforeEach.name);
            if (route) {
                route.instance?.trigger({
                    ...options, mete: {
                        ...options?.mete,
                        ...beforeEach?.mete
                    }
                })
                return
            } else {
                console?.error?.(`未找到name为${beforeEach.name}的路由配置`)
                return
            }
        }
        this.triggerCore(options)

    }

    /**
     * 跳转核心逻辑
     */
    private triggerCore(options?: Partial<triggerOptions<Mete>> & Omit<NonNullable<Parameters<getJumpParametersAccordingToJumpMethod<T>>[0]>, "url">) {
        if (this.simpleRouteJumpConfig.preJumpInterceptor) {
            const preJumpInterceptor = this.simpleRouteJumpConfig.preJumpInterceptor(options?.mete as Mete);
            if (preJumpInterceptor && typeof preJumpInterceptor === "object" && !Reflect.has(preJumpInterceptor as obj, "msg")) {
                // @ts-ignore
                return jumpMethodContainer[options?.temporaryRedirects || this.simpleRouteJumpConfig.method]({
                    ...this.callbackCollection, ...options,
                    url: `${this.simpleRouteJumpConfig.url}${parseParameters(options?.mete || {})}`
                });
            } else {
                throw new Error(`预跳转验证未通过 ${this.simpleRouteJumpConfig.url}: ${typeof preJumpInterceptor === "object" ? Reflect.get(preJumpInterceptor, "msg") : ""}`);
            }
        }
        if (!this.simpleRouteJumpConfig.preJumpInterceptor) {
            // @ts-ignore
            return jumpMethodContainer[options?.temporaryRedirects || this.simpleRouteJumpConfig.method]({
                ...this.callbackCollection, ...options,
                url: `${this.simpleRouteJumpConfig.url}${parseParameters(options?.mete || {})}`
            });
        }
    }


    /**
     *
     * 判断当前页面是否在该路由下
     *
     *
     * @public
     *
     */
    isCurRoute() {
        const path = `/${getCurRoutePage()}`
        return this.simpleRouteJumpConfig.url === path
    }


    /**
     *
     *
     *
     * 新增获取路由参数方法
     *
     * @public
     *
     */

    getURL() {
        return this.simpleRouteJumpConfig.url;

    }

    /**
     *
     *
     * 参数转换
     *
     * @example
     * ```ts
     * SimpleRouteJump.parseParameters({ tab: 1 ,type: 1}) // => tab=1&type=1
     * ```
     *
     * @public
     */
    static parseParameters = parseParameters;
}

// 对象转字符串
function objectToStr(obj: unknown) {
    if (typeof obj === "object") return JSON.stringify(obj);
    return obj;
}


function parseParameters(mete: object) {
    if (typeof mete !== "object") throw new Error(`${mete} 不是一个对象`);
    if (Array.isArray(mete)) throw new Error(`${mete} 不是一个对象 {} `);
    let h = "?";
    for (const key in mete) {
        if (h.length === 1) {
            let result = objectToStr(mete[key as keyof typeof mete]);
            h += `${key}=${result}`;
        } else h += `&${key}=${objectToStr(mete[key as keyof typeof mete])}`;
    }

    return h;
}
