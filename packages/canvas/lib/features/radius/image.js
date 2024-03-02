"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawRoundImage = void 0;
/**
 *
 * 绘制圆角图片的函数
 *
 * @param ctx
 * @param img
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radiusTL
 * @param radiusTR
 * @param radiusBL
 * @param radiusBR
 *
 * @public
 */
function drawRoundImage(ctx, img, x, y, width, height, radiusTL, radiusTR, radiusBL, radiusBR) {
    ctx.save();
    ctx.beginPath();
    // 左上角
    ctx.moveTo(x + radiusTL, y);
    ctx.lineTo(x + width - radiusTR, y);
    ctx.arcTo(x + width, y, x + width, y + radiusTR, radiusTR);
    // 右上角
    ctx.lineTo(x + width, y + height - radiusBR);
    ctx.arcTo(x + width, y + height, x + width - radiusBR, y + height, radiusBR);
    // 右下角
    ctx.lineTo(x + radiusBL, y + height);
    ctx.lineTo(x + radiusBL, y + height);
    // 左下角
    ctx.lineTo(x, y + radiusTL);
    ctx.arcTo(x, y, x + radiusTL, y, radiusTL);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, width, height);
    ctx.restore();
}
exports.drawRoundImage = drawRoundImage;
