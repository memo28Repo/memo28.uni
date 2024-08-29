"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawRoundImage = drawRoundImage;
/**
 *
 * 绘制圆角图片的函数
 *
 * @param ctx canvas 上下文
 * @param img 从getImageInfo获取的 img.path
 * @param x x坐标
 * @param y y坐标
 * @param width 宽
 * @param height 高
 * @param radiusTL 左上角圆角
 * @param radiusTR 右上角圆角
 * @param radiusBL 左下角圆角
 * @param radiusBR 右下角圆角
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
