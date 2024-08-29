"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentParams = getCurrentParams;
exports.getPrevPageInstance = getPrevPageInstance;
exports.getCurPage = getCurPage;
exports.addMethodToCurrentExample = addMethodToCurrentExample;
exports.getCurRoutePage = getCurRoutePage;
/**
 *
 * 获取当前路由参数
 *
 * @example
 * ```ts
 * const { id } = getCurrentParams<{ id: number }>()
 * ```
 *
 * @public
 */
function getCurrentParams() {
    var _a, _b, _c, _d;
    // @ts-ignore
    return ((_a = getCurPage()) === null || _a === void 0 ? void 0 : _a.options) ? (_b = getCurPage()) === null || _b === void 0 ? void 0 : _b.options : (_d = (_c = getCurPage()) === null || _c === void 0 ? void 0 : _c.$page) === null || _d === void 0 ? void 0 : _d.options;
}
/**
 *
 * 默认获取上一个页面实例
 *
 * 通常用于上一个页面自定义的属性和方法
 *
 * @typeParam {obj} T - 此类型通常用于上一个页面自定义的属性和方法
 *
 * @param {number} n - 获取上n个页面实例
 *
 * @example
 * ```ts
 *  getPrevPageInstance<{ add: () => void }>().add()
 *
 *  getPrevPageInstance().$vm
 * ```
 *
 *
 * @public
 */
function getPrevPageInstance(n) {
    const page = getCurrentPages();
    // @ts-ignore
    return page[page.length - (n ? n + 1 : 2)];
}
/**
 *
 * 获取当前页面实例
 *
 *
 * @example
 * ```ts
 * getCurPage() // 页面实例对象
 * ```
 *
 * @public
 */
function getCurPage() {
    const page = getCurrentPages();
    // @ts-ignore
    return page[page.length - 1];
}
/**
 *
 * 向当前页面中添加属性
 * 通常是搭配在返回上一页前 需要调用上一页方法时
 *
 * @example
 * ```ts
 * addMethodToCurrentExample({
 *   add: () => {
 *     console.log()
 *   },
 * })
 * ```
 *
 * @param {} obj
 *
 * @public
 */
function addMethodToCurrentExample(obj) {
    if (obj === null)
        throw new Error("addMethodToCurrentExample函数需要一个对象参数");
    if (Array.isArray(obj))
        throw new Error("addMethodToCurrentExample函数需要一个对象参数");
    if (typeof obj !== "object")
        throw new Error("addMethodToCurrentExample函数需要一个对象参数");
    for (const key in obj) {
        // @ts-ignore
        const el = obj[key];
        Reflect.set(getCurPage(), key, el);
    }
}
/**
 *
 * 获取当前页面地址
 *
 * @public
 *
 */
function getCurRoutePage() {
    var _a, _b, _c, _d;
    return ((_b = (_a = getCurPage()) === null || _a === void 0 ? void 0 : _a.$vm) === null || _b === void 0 ? void 0 : _b.route) || ((_d = (_c = getCurPage()) === null || _c === void 0 ? void 0 : _c.$vm) === null || _d === void 0 ? void 0 : _d.__route__);
}
