interface defineConfigTypes {
    debugger?: boolean;
    wifiFailToast?(opt: UniNamespace.WifiError): void;
    getNetworkTypeFailToast?(): void;
    /**
     *
     * 是否监听网络状态
     *
     * @public
     */
    listenToNetworkStatus?: boolean;
    /**
     *
     * 连上 wifi
     *
     * @public
     */
    connectToWifi(): void;
    /**
     *
     * 断开 wifi
     *
     * @public
     */
    unConnectToWifi(): void;
}
export declare let config: Partial<defineConfigTypes>;
export declare function defineConfig(c: Partial<defineConfigTypes>): void;
export {};
