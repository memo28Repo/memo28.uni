# @memo28.uni/utils

提供 uni-app 常用工具集合，涵盖环境守卫、路由辅助以及 Vue 响应式增强等能力。

## 特性

- 利用 uni-app 条件编译指令实现的环境判断（`inH5Fn`、`notInH5Fn`、`inApp`、`inWx` 等）。
- 一次定义、多处复用的路由抽象，统一维护跳转配置。
- 友好的 Vue 3 增强工具，例如拦截 ref 变更的 `useEnhanceRef`。

## 安装

```bash
pnpm add @memo28.uni/utils
```

该包依赖 `@memo28/types`、`@memo28/utils` 以及 Vue 3，请确保在工程内能够解析这些依赖。

## 使用示例

### 环境工具

```ts
import {inH5Fn, notInWx} from '@memo28.uni/utils'

inH5Fn(() => {
    console.log('仅在 H5 构建中执行')
})

notInWx(() => {
    console.log('除微信小程序外的所有平台都会执行')
})
```

每个工具函数都会自动包裹 uni-app 的条件编译指令，让平台差异逻辑与业务代码共存，而不必手写大量 `#ifdef` 注释。【F:packages/utils/src/features/env/index.ts†L1-L79】

### 路由工具集

路由模块导出了链式的 `SimpleRouteJump` 类与单例配置 `defineSimpleRouteJumpConfig`，用于集中管理全局守卫。

```ts
import {
    SimpleRouteJump,
    defineSimpleRouteJumpConfig,
    getCurrentParams,
    getPrevPageInstance,
} from '@memo28.uni/utils'

// 定义一次路由元数据，后续直接复用
const detailRoute = new SimpleRouteJump<{ id: string }>('/pages/detail/index', { name: 'detail' })

defineSimpleRouteJumpConfig.beforeEach = (to, from) => {
    if (!uni.getStorageSync('token')) {
        return 'login'
    }
    return true
}

// 在组件中使用
const params = getCurrentParams<{ id: string }>()
detailRoute.trigger({ mete: { id: params.id } })
```

- `SimpleRouteJump` 封装了目标 URL、跳转方式、拦截器以及事件回调，最终统一调用 `uni.navigateTo`/`uni.redirectTo` 等跳转方法。【F:packages/utils/src/features/router/router.ts†L1-L229】
- `defineSimpleRouteJumpConfig` 用读写分离的方式保存全局守卫，方便在任意位置重新赋值。【F:packages/utils/src/features/router/defineConfig.ts†L1-L35】
- `getCurrentParams`、`getPrevPageInstance`、`getCurPage`、`addMethodToCurrentExample` 等方法帮助暴露当前页面实例，简化跨页面通信。【F:packages/utils/src/features/router/page.ts†L1-L72】

### 响应式增强

```ts
import {useEnhanceRef} from '@memo28.uni/utils'

const [count, setCount] = useEnhanceRef(0, {
    onBeforeUpdate(value) {
        console.log('即将更新的值', value)
    }
})

setCount(1)
```

`useEnhanceRef` 返回 `[ref, setter]` 元组，并在更新底层 Vue ref 之前触发可选的 `onBeforeUpdate` 钩子。【F:packages/utils/src/features/enhanceRef/index.ts†L1-L35】

## 开发流程

- 构建产物：`pnpm build`
- 监听构建：`pnpm build:watch`
- 单元测试：`pnpm test`

入口由 `src/index.ts` 汇总，统一 re-export `features/**` 下的模块。`pnpm build` 会同时生成 CommonJS（`lib/`）与 ESM（`dist/`）构建。

## 发布流程

1. 在 `src/` 目录内更新或新增工具函数。
2. 保持 TypeScript 类型定义与实现同步。
3. 执行 `pnpm build` 与 `pnpm test` 验证产物。
4. 使用 `pnpm publish --filter @memo28.uni/utils` 发布。
