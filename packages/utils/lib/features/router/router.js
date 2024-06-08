"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleRouteJump = exports.DefineJumpCallback = void 0;
const page_1 = require("./page");
const defineConfig_1 = require("./defineConfig");
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
// 路由组
const routerMap = new Map();
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
    constructor(url, meta) {
        super();
        this.simpleRouteJumpConfig = { method: "navigateTo" };
        this.meta = {};
        this.meta = Object.assign(Object.assign({}, meta), { instance: this });
        this.setUrl(url);
        this.addRouterMap(url || '');
    }
    addRouterMap(url) {
        var _a;
        if (!((_a = url === null || url === void 0 ? void 0 : url.trim()) === null || _a === void 0 ? void 0 : _a.length))
            return;
        if (routerMap.has(url))
            return;
        routerMap.set(url, this.meta || {});
    }
    getRouters() {
        return routerMap;
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
        this.addRouterMap(url || '');
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
        var _a, _b, _c, _d, _e, _f;
        const from = (0, page_1.getCurPage)();
        const toConfig = Object.assign(Object.assign(Object.assign({}, this.meta), options), this.simpleRouteJumpConfig);
        // @ts-ignore
        const beforeEach = (_b = (_a = defineConfig_1.defineSimpleRouteJumpConfig === null || defineConfig_1.defineSimpleRouteJumpConfig === void 0 ? void 0 : defineConfig_1.defineSimpleRouteJumpConfig.getBeforeEach) === null || _a === void 0 ? void 0 : _a.call(defineConfig_1.defineSimpleRouteJumpConfig)) === null || _b === void 0 ? void 0 : _b(toConfig, from);
        if (typeof beforeEach === 'boolean') {
            if (!beforeEach)
                return;
            this.triggerCore(options);
            return;
        }
        if (typeof beforeEach === 'string' && !(beforeEach === null || beforeEach === void 0 ? void 0 : beforeEach.length)) {
            const route = routerMap.get(beforeEach);
            if (route) {
                (_c = route.instance) === null || _c === void 0 ? void 0 : _c.trigger(options);
                return;
            }
            else {
                (_d = console === null || console === void 0 ? void 0 : console.error) === null || _d === void 0 ? void 0 : _d.call(console, `未找到name为${beforeEach}的路由配置`);
                return;
            }
        }
        if (typeof beforeEach === 'object') {
            const route = routerMap.get(beforeEach.name);
            if (route) {
                (_e = route.instance) === null || _e === void 0 ? void 0 : _e.trigger(Object.assign(Object.assign({}, options), { mete: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.mete), beforeEach === null || beforeEach === void 0 ? void 0 : beforeEach.mete) }));
                return;
            }
            else {
                (_f = console === null || console === void 0 ? void 0 : console.error) === null || _f === void 0 ? void 0 : _f.call(console, `未找到name为${beforeEach.name}的路由配置`);
                return;
            }
        }
        this.triggerCore(options);
    }
    /**
     * 跳转核心逻辑
     */
    triggerCore(options) {
        if (this.simpleRouteJumpConfig.preJumpInterceptor) {
            const preJumpInterceptor = this.simpleRouteJumpConfig.preJumpInterceptor(options === null || options === void 0 ? void 0 : options.mete);
            if (preJumpInterceptor && typeof preJumpInterceptor === "object" && !Reflect.has(preJumpInterceptor, "msg")) {
                // @ts-ignore
                return jumpMethodContainer[(options === null || options === void 0 ? void 0 : options.temporaryRedirects) || this.simpleRouteJumpConfig.method](Object.assign(Object.assign(Object.assign({}, this.callbackCollection), options), { url: `${this.simpleRouteJumpConfig.url}${parseParameters((options === null || options === void 0 ? void 0 : options.mete) || {})}` }));
            }
            else {
                throw new Error(`预跳转验证未通过 ${this.simpleRouteJumpConfig.url}: ${typeof preJumpInterceptor === "object" ? Reflect.get(preJumpInterceptor, "msg") : ""}`);
            }
        }
        if (!this.simpleRouteJumpConfig.preJumpInterceptor) {
            // @ts-ignore
            return jumpMethodContainer[(options === null || options === void 0 ? void 0 : options.temporaryRedirects) || this.simpleRouteJumpConfig.method](Object.assign(Object.assign(Object.assign({}, this.callbackCollection), options), { url: `${this.simpleRouteJumpConfig.url}${parseParameters((options === null || options === void 0 ? void 0 : options.mete) || {})}` }));
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
