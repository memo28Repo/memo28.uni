import {ref} from 'vue'

/**
 *
 * 是否初始化wifi成功
 *
 * @public
 *
 */
export const wifiInitializedSuccessfully = ref(false)


/**
 *
 * 用于防止回调连续触发
 *
 * @public
 *
 */
export const unConnectToWifiTrigger = ref(false)


/**
 *
 * 用于防止回调连续触发
 *
 * @public
 */
export const connectToWifiTrigger = ref(false)
