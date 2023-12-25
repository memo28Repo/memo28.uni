"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToWifiTrigger = exports.unConnectToWifiTrigger = exports.wifiInitializedSuccessfully = void 0;
const vue_1 = require("vue");
/**
 *
 * 是否初始化wifi成功
 *
 * @public
 *
 */
exports.wifiInitializedSuccessfully = (0, vue_1.ref)(false);
/**
 *
 * 用于防止回调连续触发
 *
 * @public
 *
 */
exports.unConnectToWifiTrigger = (0, vue_1.ref)(false);
/**
 *
 * 用于防止回调连续触发
 *
 * @public
 */
exports.connectToWifiTrigger = (0, vue_1.ref)(false);
