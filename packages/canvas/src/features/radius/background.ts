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
export function drawRoundBackground(ctx:  UniNamespace.CanvasContext, x: number, y: number, width: number, height: number, radiusTL: number, radiusTR: number, radiusBL: number, radiusBR: number, bgColor: string) {
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
