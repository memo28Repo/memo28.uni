/// <reference types="@dcloudio/types" />
/**
 *
 * 绘制圆角背景
 *
 *
 * @param ctx canvas 上下文
 * @param x x 坐标
 * @param y y 坐标
 * @param width 宽
 * @param height 高
 * @param radiusTL 左上角圆角
 * @param radiusTR 右上角圆角
 * @param radiusBL 左下角圆角
 * @param radiusBR 右下角圆角
 * @param bgColor 背景颜色
 *
 * @public
 *
 */
export declare function drawRoundBackground(ctx: UniNamespace.CanvasContext, x: number, y: number, width: number, height: number, radiusTL: number, radiusTR: number, radiusBL: number, radiusBR: number, bgColor: string): void;
