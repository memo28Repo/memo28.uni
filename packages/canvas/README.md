# @memo28.uni/canvas

面向 uni-app 的 Canvas 场景提供圆角绘制工具，方便在海报、分享卡片等画布上生成统一的视觉效果。

## 特性

- 支持带有独立圆角半径与填充色的矩形背景绘制。
- 将图片裁剪为圆角矩形，无需手动维护路径状态。
- 对外同时产出 CommonJS（`lib`）和 ESM（`dist`）构建，并生成 `dts/` 类型声明，方便在不同打包器中复用。

## 安装

```bash
pnpm add @memo28.uni/canvas
```

使用时默认处于提供 `UniNamespace.CanvasContext` 的 uni-app 运行时，可直接通过 `uni` 全局对象获取上下文。

## 使用示例

```ts
import {drawRoundBackground, drawRoundImage} from '@memo28.uni/canvas'

const ctx = uni.createCanvasContext('poster')

// 先绘制统一的圆角背景
const width = 300
const height = 180
const x = 0
const y = 0
const radius = 16

drawRoundBackground(ctx, x, y, width, height, radius, radius, radius, radius, '#FFFFFF')

// 再绘制带独立圆角的头像
const avatarSize = 120
await new Promise<void>((resolve) => {
    uni.getImageInfo({
        src: 'https://example.com/avatar.png',
        success(info) {
            drawRoundImage(
                ctx,
                info.path,
                x + 24,
                y + 24,
                avatarSize,
                avatarSize,
                20,
                20,
                20,
                20,
            )
            ctx.draw(false, resolve)
        }
    })
})
```

## API 说明

### `drawRoundBackground(ctx, x, y, width, height, radiusTL, radiusTR, radiusBL, radiusBR, bgColor)`

在当前画布上下文中绘制填充的圆角矩形。四个圆角半径参数分别对应左上、右上、左下、右下的弧度。函数内部负责保存/恢复画布状态（`save`、`restore`）并设置填充颜色，无需调用方额外处理。【F:packages/canvas/src/features/radius/background.ts†L1-L41】

### `drawRoundImage(ctx, img, x, y, width, height, radiusTL, radiusTR, radiusBL, radiusBR)`

先将画布裁剪为圆角矩形，再通过 `ctx.drawImage` 绘制目标图片路径。适用于头像、缩略图等需要圆角效果的场景。【F:packages/canvas/src/features/radius/image.ts†L1-L40】

## 开发流程

- 构建全部产物：`pnpm build`
- 持续构建：`pnpm build:watch`
- 运行单测：`pnpm test`

TypeScript 源码位于 `src/`，会同时编译到 `lib/`（CommonJS）和 `dist/`（ESM）。对外导出统一在 `src/index.ts` 中维护。

## 发布流程

1. 修改或新增 `src/` 下的绘制工具。
2. 执行 `pnpm build` 重新生成构建产物。
3. 如有需要更新 `CHANGELOG.md`。
4. 通过 `pnpm publish --filter @memo28.uni/canvas` 发布。
