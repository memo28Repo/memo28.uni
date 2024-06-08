/// <reference types="@dcloudio/types" />
import type { readingWritingSeparationUtilsType } from '@memo28/utils';
import { simpleRouteJumpConfig, simpleRouteMeta, triggerOptions } from "./router";
import { obj } from "@memo28/types";
export interface beforeEachReturns {
    name: string;
    /**
     * 附带到路由上的参数
     */
    mete?: object;
}
export declare class DefineSimpleRouteJumpConfig {
    /**
     *
     * 全局守卫
     *
     * to: 传入即将跳转页面的参数配置
     * from: 传入当前页面实例
     *
     *
     * 当函数返回一个字符串 && 字符串内容和路由的name匹配上 则默认跳转到对应路由页面
     *
     * 当函数返回对象 {name: 'router'}  && name的内容和路由的name匹配上 则默认跳转到对应路由页面
     *
     * 当函数返回 boolean  && boolean === true 则允许跳转
     */
    beforeEach?: (to: Partial<simpleRouteMeta> & simpleRouteJumpConfig<unknown> & triggerOptions<obj>, from: Page.PageInstance) => beforeEachReturns | boolean | string;
}
export declare const defineSimpleRouteJumpConfig: readingWritingSeparationUtilsType<DefineSimpleRouteJumpConfig>;
