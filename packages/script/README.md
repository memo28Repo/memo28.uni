# @memo28.uni/script

为跨平台 `uniapp` 打包流程提供脚本拼装工具，借助强类型参数快速生成命令行调用。

## 特性

- 基于轻量封装的 `zx`，将 Shell 配置文件解析为普通对象。
- 用类型安全的参数对象生成 Android 与 iOS 的 CLI 参数。
- 通过链式 API 组合完整的 `uniapp` pack 构建命令。

## 安装

```bash
pnpm add @memo28.uni/script
```

工具集定位于支持 ES Module 的 Node.js 运行时，默认可以调用到 `zx` 可执行文件（仓库依赖已内置）。

## 使用示例

### 解析环境配置

```ts
import {ParseConfig} from '@memo28.uni/script'

interface EnvVars {
    ANDROID_CERT?: string
    ANDROID_CERT_PASS?: string
}

const parser = new ParseConfig<EnvVars>()
const env = await parser.getEnvConfig()
console.log(env.ANDROID_CERT)
```

`ParseConfig#getEnvConfig` 会通过 `zx` 的模板字符串工具读取 `~/.bash_profile`，并把 `export KEY=value` 转换成对象映射。【F:packages/script/src/parseConfig.mts†L1-L47】

### 组合打包命令

```ts
import {BuildScript, getAndParams, getIOSParams} from '@memo28.uni/script'

const build = new BuildScript({
    uniCliPath: '/Applications/HBuilderX.app/Contents/MacOS/cli',
    projectName: 'uni-app-project',
})

const androidArgs = getAndParams({
    packageName: 'com.example.uni',
    certfile: '/path/to/keystore.keystore',
    certpassword: process.env.ANDROID_CERT_PASS!,
})

const iosArgs = getIOSParams({
    bundle: 'com.example.uni',
    profile: '/path/to/profile.mobileprovision',
    certfile: '/path/to/cert.p12',
    certpassword: process.env.IOS_CERT_PASS!,
})

const command = build
    .getAndScript({
        packageName: 'com.example.uni',
        certfile: '/path/to/keystore.keystore',
        certpassword: process.env.ANDROID_CERT_PASS!,
    })
    .getIosScript({
        bundle: 'com.example.uni',
        profile: '/path/to/profile.mobileprovision',
        certfile: '/path/to/cert.p12',
        certpassword: process.env.IOS_CERT_PASS!,
    })
    .getAppScript()

console.log(command)
```

- `getAndParams` 会展开 Android 签名配置，并在缺省时把 `certalias` 设为 `platform-uniapp`。【F:packages/script/src/and/buildParams.mts†L1-L36】
- `getIOSParams` 负责整理 iOS 签名参数，并把设备支持列表拼接为逗号分隔字符串。【F:packages/script/src/ios/buildParams.mts†L1-L45】
- `BuildScript` 收集生成的片段，最终通过 `getAppScript` 输出完整的 `uniapp` CLI 命令；`getAndScript`/`getIosScript` 用于追加平台特有参数。【F:packages/script/src/buildScript.mts†L1-L48】

## 开发流程

- 构建 CommonJS/ESM：`pnpm build`
- 监听模式：`pnpm build:watch`
- 单元测试：`pnpm test`

编译产物分别输出到 `lib/`（CommonJS）与 `dist/`（ESM）。源码使用 `.mts` 扩展名，并由 `src/index.mts` 统一导出入口。【F:packages/script/src/index.mts†L1-L5】

## 发布流程

1. 在 `src/` 下调整或新增脚本辅助函数。
2. 同步更新类型与单测，确保覆盖最新逻辑。
3. 发布前执行 `pnpm build` 与 `pnpm test`。
4. 使用 `pnpm publish --filter @memo28.uni/script` 发布。
