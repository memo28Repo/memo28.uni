interface CallbackResult {
    /** 错误信息 */
    errMsg: string;
}
export interface callbackCollectionTypes {
    complete?: (res: CallbackResult) => void;
    fail?: (res: CallbackResult) => void;
    success?: (res: CallbackResult) => void;
}
export declare class DefineJumpCallback {
    protected callbackCollection: Partial<callbackCollectionTypes>;
    success(cb?: (res: CallbackResult) => void): this;
    fail(cb?: (res: CallbackResult) => void): this;
    complete(cb?: (res: CallbackResult) => void): this;
}
type navigateBackTypes = typeof uni.navigateBack;
type navigateToTypes = typeof uni.navigateTo;
type reLaunchTypes = typeof uni.reLaunch;
type redirectTo = typeof uni.redirectTo;
export type jumpMethod = navigateBackTypes | navigateToTypes | reLaunchTypes | redirectTo | undefined;
export type jumpMethodName = "navigateBack" | "navigateTo" | "reLaunch" | "redirectTo";
export type getJumpParametersAccordingToJumpMethod<T extends jumpMethodName> = T extends "navigateBack" ? navigateBackTypes : T extends "navigateTo" ? navigateToTypes : T extends "reLaunch" ? reLaunchTypes : T extends "redirectTo" ? redirectTo : never;
export type simpleRouteJumpConfig<T = unknown> = {
    method: jumpMethodName;
    url?: string;
    preJumpInterceptor?: (params: T) => boolean | {
        msg: string;
    };
};
/**
 * 配置路由元数据
 */
export interface simpleRouteMeta {
    /**
     * 路由Name
     */
    name?: string;
    /**
     * 当前路由实例
     */
    instance: SimpleRouteJump<any>;
}
export interface triggerOptions<T extends object> {
    mete: T;
    /**
     * 临时跳转方法
     */
    temporaryRedirects?: jumpMethodName;
}
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
export declare class SimpleRouteJump<Mete extends object, T extends jumpMethodName = "navigateTo"> extends DefineJumpCallback {
    private simpleRouteJumpConfig;
    private meta?;
    constructor(url?: string, meta?: Partial<simpleRouteMeta>);
    private addRouterMap;
    getRouters(): Map<string, Partial<simpleRouteMeta>>;
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
    setUrl(url?: string): this;
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
    setMethod<M extends jumpMethodName>(method?: M): SimpleRouteJump<Mete, M>;
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
    setPreJumpInterceptor(fn?: simpleRouteJumpConfig<Mete>["preJumpInterceptor"]): this;
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
    trigger(options?: Partial<triggerOptions<Mete>> & Omit<NonNullable<Parameters<getJumpParametersAccordingToJumpMethod<T>>[0]>, "url">): void;
    /**
     * 跳转核心逻辑
     */
    private triggerCore;
    /**
     *
     * 判断当前页面是否在该路由下
     *
     *
     * @public
     *
     */
    isCurRoute(): boolean;
    /**
     *
     *
     *
     * 新增获取路由参数方法
     *
     * @public
     *
     */
    getURL(): string | undefined;
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
    static parseParameters: typeof parseParameters;
}
declare function parseParameters(mete: object): string;
export {};
