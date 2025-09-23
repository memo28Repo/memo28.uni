# @memo28.uni/wifi

封装 uni-app 的 Wi-Fi 能力，提供初始化、MAC 获取与网络状态监听等高级工具。

## 特性

- 统一封装 Wi-Fi 模块启动逻辑，内置错误处理与平台分支。
- 在完成初始化后，通过 `uni.getConnectedWifi` 获取当前 BSSID。
- 支持单个或批量 MAC 地址的大小写无关比较。
- 监听网络变化，根据连接/断开状态触发回调。

## 安装

```bash
pnpm add @memo28.uni/wifi
```

该包依赖 `@memo28.uni/utils` 与 `@memo28/utils`，需运行在支持 uni-app Wi-Fi API 的环境（原生 App、微信小程序等）。

## 使用示例

### 配置回调与调试选项

```ts
import {defineConfig} from '@memo28.uni/wifi'

defineConfig({
    debugger: import.meta.env.DEV,
    listenToNetworkStatus: true,
    wifiFailToast(error) {
        console.error('Wi-Fi 错误', error)
    },
    connectToWifi() {
        console.log('已连接到 Wi-Fi')
    },
    unConnectToWifi() {
        console.log('已断开 Wi-Fi 连接')
    },
})
```

`defineConfig` 用于保存模块共用选项（调试日志、提示重写、生命周期回调等），供后续 API 读取。【F:packages/wifi/src/api/defineConfig.ts†L1-L33】

### 初始化 Wi-Fi 并获取 MAC 地址

```ts
import {initWifi, getMac} from '@memo28.uni/wifi'

await initWifi()
const mac = await getMac()
if (!mac) {
    console.warn('当前没有连接 Wi-Fi')
}
```

- `initWifi` 会按平台（`inApp`、`inWx`、`inH5Fn`）执行不同分支，在确认设备联网后调用 `uni.startWifi`。发生错误时触发自定义提示，并在 `wifiInitializedSuccessfully` 中记录状态避免重复初始化。【F:packages/wifi/src/api/initWifi.ts†L1-L98】【F:packages/wifi/src/store/init.ts†L1-L20】
- `getMac` 会确保完成初始化，再返回当前连接 Wi-Fi 的 `BSSID`，失败时回退为空字符串。【F:packages/wifi/src/api/getMac.ts†L1-L22】

### 比对 MAC 地址

```ts
import {compareMACAddress, compareMACAddressGroup} from '@memo28.uni/wifi'

const isMatch = await compareMACAddress('AA:BB:CC:DD:EE:FF')
const matches = await compareMACAddressGroup([
    'AA:BB:CC:DD:EE:FF',
    '11:22:33:44:55:66',
])
```

`compareMACAddress` 会获取当前 MAC 并进行大小写无关的比较，而 `compareMACAddressGroup` 则会返回传入数组中所有匹配的项。【F:packages/wifi/src/api/compareMACAddress.ts†L1-L33】

### 网络状态监听

启用 `listenToNetworkStatus` 后，`initWifi` 会注册监听器，并通过 store 中的标记保证 `connectToWifi` 与 `unConnectToWifi` 只在状态变化时触发一次。【F:packages/wifi/src/api/networkStatusChange.ts†L1-L40】【F:packages/wifi/src/store/init.ts†L1-L20】

## 开发流程

- 构建：`pnpm build`
- 监听构建：`pnpm build:watch`
- 单元测试：`pnpm test`

源码按 `src/api`、`src/store`、`src/constant` 分类管理，公共导出位于 `src/index.ts`，会编译成 CommonJS 与 ESM 两种格式。

## 发布流程

1. 在 `src/` 下更新 API 实现或常量。
2. 校验 `dts/` 中的类型声明是否保持最新。
3. 运行 `pnpm build` 与 `pnpm test` 确认无误。
4. 使用 `pnpm publish --filter @memo28.uni/wifi` 发布。
