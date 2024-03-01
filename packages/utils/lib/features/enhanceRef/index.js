"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEnhanceRef = void 0;
const vue_1 = require("vue");
/**
 *
 * 增强ref
 *
 *
 * @param val
 */
function useEnhanceRef(val, opt) {
    const value = (0, vue_1.ref)(val);
    function setValue(newValue) {
        var _a;
        (_a = opt === null || opt === void 0 ? void 0 : opt.onBeforeUpdate) === null || _a === void 0 ? void 0 : _a.call(opt, newValue);
        value.value = newValue;
    }
    return [value, setValue];
}
exports.useEnhanceRef = useEnhanceRef;
