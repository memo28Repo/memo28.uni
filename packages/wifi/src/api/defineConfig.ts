interface defineConfigTypes {
    // 如果debugger是开启的，则会在控制台打印一些调试信息
    debugger?: boolean

    // toast 信息
    wifiFailToast?(opt: UniNamespace.WifiError): void

    getNetworkTypeFailToast?(): void

    /**
     *
     * 是否监听网络状态
     *
     * @public
     */
    listenToNetworkStatus?: boolean

    /**
     *
     * 连上 wifi
     *
     * @public
     */
    connectToWifi(): void

    /**
     *
     * 断开 wifi
     *
     * @public
     */
    unConnectToWifi(): void
}

export let config: Partial<defineConfigTypes> = {}

export function defineConfig(c: Partial<defineConfigTypes>) {
    config = c
}
