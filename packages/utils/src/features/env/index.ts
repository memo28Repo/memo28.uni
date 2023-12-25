/*
 * @Author: @memo28.repo
 * @Date: 2023-12-16 12:18:35
 * @LastEditTime: 2023-12-16 12:34:22
 * @Description: 判断环境执行函数
 * @FilePath: /uniRepo/packages/utils/src/features/env/index.ts
 */
import { fn } from '@memo28/types';

/**
 * 在 H5 环境下，调用传入的函数并返回结果。
 * 
 * @paramsType T - 泛型参数，函数返回值的类型
 * @param fn - 要调用的函数，接受未知数量的参数并返回类型为 T 的结果
 * @returns 函数的返回值
 * 
 * @public
 */
export function inH5Fn<T>(fn: fn<unknown[], T>): T {
    // #ifdef H5
    return fn()
    // #endif
}


/**
 * H5外部函数
 * @param {Function} fn - 要执行的函数
 * @paramType T - 返回值类型
 * @returns {T} - 返回函数执行结果
 * 
 * @public
 */
export function notInH5Fn<T>(fn: fn<unknown[], T>): T {
    // #ifndef H5
    return fn()
    // #endif
}



/**
 * 在 app 环境下才会被执行的函数
 * 
 * @param { fn } fn - 函数参数为unknown类型的数组，返回值为T类型的函数
 * @paramType  T -  泛型参数，函数返回值的类型
 * 
 * @returns T类型的值
 * 
 * @public
 */
export function inApp<T>(fn: fn<unknown[], T>): T {
    // #ifndef APP
    return fn()
    // #endif
}




/**
 * 在 app外 环境下才会被执行的函数
 * 
 * @param { fn } fn - 函数参数为unknown类型的数组，返回值为T类型的函数
 * @paramType  T -  泛型参数，函数返回值的类型
 * 
 * @returns T类型的值
 * 
 * @public
 */
export function notInApp<T>(fn: fn<unknown[], T>): T {
    // #ifndef APP
    return fn()
    // #endif
}



/**
 * 在 wx外 环境下才会被执行的函数
 * 
 * @param { fn } fn - 函数参数为unknown类型的数组，返回值为T类型的函数
 * @paramType  T -  泛型参数，函数返回值的类型
 * 
 * @returns T类型的值
 * 
 * @public
 */
export function notInWx<T>(fn: fn<unknown[], T>): T {
    // #ifndef MP-WEIXIN
    return fn()
    // #endif
}

/**
 * 在 wx 环境下才会被执行的函数
 * 
 * @param { fn } fn - 函数参数为unknown类型的数组，返回值为T类型的函数
 * @paramType  T -  泛型参数，函数返回值的类型
 * 
 * @returns T类型的值
 * 
 * @public
 */
export function inWx<T>(fn: fn<unknown[], T>): T {
    // #ifndef MP-WEIXIN
    return fn()
    // #endif
}