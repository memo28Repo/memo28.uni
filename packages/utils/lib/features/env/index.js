"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inH5Fn = inH5Fn;
exports.notInH5Fn = notInH5Fn;
exports.inApp = inApp;
exports.notInApp = notInApp;
exports.notInWx = notInWx;
exports.inWx = inWx;
/**
 * 在 H5 环境下，调用传入的函数并返回结果。
 *
 * @paramsType T - 泛型参数，函数返回值的类型
 * @param fn - 要调用的函数，接受未知数量的参数并返回类型为 T 的结果
 * @returns 函数的返回值
 *
 * @public
 */
function inH5Fn(fn) {
    // #ifdef H5
    return fn();
    // #endif
}
/**
 * H5外部函数才会执行
 *
 * @param {Function} fn - 要执行的函数
 * @paramType T - 返回值类型
 * @returns {T} - 返回函数执行结果
 *
 * @public
 */
function notInH5Fn(fn) {
    // #ifndef H5
    return fn();
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
function inApp(fn) {
    // #ifndef APP
    return fn();
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
function notInApp(fn) {
    // #ifndef APP
    return fn();
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
function notInWx(fn) {
    // #ifndef MP-WEIXIN
    return fn();
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
function inWx(fn) {
    // #ifndef MP-WEIXIN
    return fn();
    // #endif
}
