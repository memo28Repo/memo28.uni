import { obj } from "@memo28/types";
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
export declare function getCurrentParams<T extends obj>(): T;
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
export declare function getPrevPageInstance<T extends obj>(n?: number): Page.PageInstance & T;
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
export declare function getCurPage(): Page.PageInstance;
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
export declare function addMethodToCurrentExample(obj: obj): void;
/**
 *
 * 获取当前页面地址
 *
 * @public
 *
 */
export declare function getCurRoutePage(): any;
