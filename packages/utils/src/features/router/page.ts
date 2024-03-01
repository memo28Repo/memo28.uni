
import {obj} from "@memo28/types";

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
export function getCurrentParams<T extends obj>(): T {
    // @ts-ignore
    return getCurPage()?.options ? getCurPage()?.options : getCurPage()?.$page?.options;
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
export function getPrevPageInstance<T extends obj>(n?: number): Page.PageInstance & T {
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
export function getCurPage(): Page.PageInstance {
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
export function addMethodToCurrentExample(obj: obj) {
    if (obj === null) throw new Error("addMethodToCurrentExample函数需要一个对象参数");
    if (Array.isArray(obj)) throw new Error("addMethodToCurrentExample函数需要一个对象参数");
    if (typeof obj !== "object") throw new Error("addMethodToCurrentExample函数需要一个对象参数");
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
export function getCurRoutePage() {
    return getCurPage()?.$vm?.route || getCurPage()?.$vm?.__route__;
}

