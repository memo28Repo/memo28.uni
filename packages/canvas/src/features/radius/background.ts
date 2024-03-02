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
