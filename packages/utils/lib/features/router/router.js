"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleRouteJump = exports.DefineJumpCallback = void 0;
const page_1 = require("./page");
class DefineJumpCallback {
    constructor() {
        this.callbackCollection = {};
    }
    success(cb) {
        this.callbackCollection = Object.assign(Object.assign({}, this.callbackCollection), { success: cb });
        return this;
    }
    fail(cb) {
        this.callbackCollection = Object.assign(Object.assign({}, this.callbackCollection), { fail: cb });
        return this;
    }
    complete(cb) {
        this.callbackCollection = Object.assign(Object.assign({}, this.callbackCollection), { complete: cb });
        return this;
    }
}
exports.DefineJumpCallback = DefineJumpCallback;
const jumpMethodContainer = {
    navigateBack: uni.navigateBack,
    navigateTo: uni.navigateTo,
    reLaunch: uni.reLaunch,
    redirectTo: uni.redirectTo
};
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
class SimpleRouteJump extends DefineJumpCallback {
    constructor(url) {
        super();
        this.simpleRouteJumpConfig = { method: "navigateTo" };
        this.setUrl(url);
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
    setUrl(url) {
        this.simpleRouteJumpConfig = Object.assign(Object.assign({}, this.simpleRouteJumpConfig), { url });
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
    setMethod(method) {
        this.simpleRouteJumpConfig = Object.assign(Object.assign({}, this.simpleRouteJumpConfig), { method: method || "navigateTo" });
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
    setPreJumpInterceptor(fn) {
        if (!fn)
            return this;
        this.simpleRouteJumpConfig = Object.assign(Object.assign({}, this.simpleRouteJumpConfig), { preJumpInterceptor: fn });
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
    trigger(options) {
        if (this.simpleRouteJumpConfig.preJumpInterceptor) {
            const preJumpInterceptor = this.simpleRouteJumpConfig.preJumpInterceptor(options === null || options === void 0 ? void 0 : options.mete);
            if (preJumpInterceptor && typeof preJumpInterceptor === "object" && !Reflect.has(preJumpInterceptor, "msg")) {
                // @ts-ignore
                return jumpMethodContainer[this.simpleRouteJumpConfig.method](Object.assign(Object.assign(Object.assign({}, this.callbackCollection), options), { url: `${this.simpleRouteJumpConfig.url}${parseParameters((options === null || options === void 0 ? void 0 : options.mete) || {})}` }));
            }
            else {
                throw new Error(`预跳转验证未通过 ${this.simpleRouteJumpConfig.url}: ${typeof preJumpInterceptor === "object" ? Reflect.get(preJumpInterceptor, "msg") : ""}`);
            }
        }
        if (!this.simpleRouteJumpConfig.preJumpInterceptor) {
            // @ts-ignore
            return jumpMethodContainer[this.simpleRouteJumpConfig.method](Object.assign(Object.assign(Object.assign({}, this.callbackCollection), options), { url: `${this.simpleRouteJumpConfig.url}${parseParameters((options === null || options === void 0 ? void 0 : options.mete) || {})}` }));
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
        const path = `/${(0, page_1.getCurRoutePage)()}`;
        return this.simpleRouteJumpConfig.url === path;
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
}
exports.SimpleRouteJump = SimpleRouteJump;
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
SimpleRouteJump.parseParameters = parseParameters;
// 对象转字符串
function objectToStr(obj) {
    if (typeof obj === "object")
        return JSON.stringify(obj);
    return obj;
}
function parseParameters(mete) {
    if (typeof mete !== "object")
        throw new Error(`${mete} 不是一个对象`);
    if (Array.isArray(mete))
        throw new Error(`${mete} 不是一个对象 {} `);
    let h = "?";
    for (const key in mete) {
        if (h.length === 1) {
            let result = objectToStr(mete[key]);
            h += `${key}=${result}`;
        }
        else
            h += `&${key}=${objectToStr(mete[key])}`;
    }
    return h;
}
