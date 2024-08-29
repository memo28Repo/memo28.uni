"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareMACAddress = compareMACAddress;
exports.compareMACAddressGroup = compareMACAddressGroup;
const getMac_1 = require("./getMac");
const utils_1 = require("@memo28/utils");
/**
 *
 * 对比 mac 地址
 *
 * @public
 *
 */
function compareMACAddress(mac) {
    const lMac = mac.toLowerCase();
    return new Promise((resolve) => {
        (0, getMac_1.getMac)().then(res => {
            if ((0, utils_1.SNI)(res, lMac))
                resolve(true);
            else
                resolve(false);
        }).catch(() => {
            resolve(false);
        });
    });
}
/**
 *
 * 对比 mac 组 返回 匹配上的 mac 数组
 *
 * @public
 */
function compareMACAddressGroup(macGroup) {
    return __awaiter(this, void 0, void 0, function* () {
        const group = [];
        for (let i = 0; i < macGroup.length; i++) {
            const mac = macGroup[i];
            const result = yield compareMACAddress(mac);
            if (result) {
                group.push(mac);
            }
        }
        return group;
    });
}
