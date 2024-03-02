"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawRoundBackground = void 0;
/**
 *
 * 绘制圆角背景
 *
 *
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radiusTL
 * @param radiusTR
 * @param radiusBL
 * @param radiusBR
 * @param bgColor
 *
 * @public
 *
 */
function drawRoundBackground(ctx, x, y, width, height, radiusTL, radiusTR, radiusBL, radiusBR, bgColor) {
    ctx.save();
    ctx.beginPath();
    // 左上角
    ctx.moveTo(x + radiusTL, y);
    ctx.arcTo(x + width, y, x + width, y + height, radiusTR);
    // 右上角
    ctx.arcTo(x + width, y + height, x, y + height, radiusBR);
    // 右下角
    ctx.arcTo(x, y + height, x, y, radiusBL);
    // 左下角
    ctx.arcTo(x, y, x + width, y, radiusTL);
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.restore();
}
exports.drawRoundBackground = drawRoundBackground;
