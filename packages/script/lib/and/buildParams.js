"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndParams = void 0;
function getAndParams(config) {
    const certalias = config.certalias || 'platform-uniapp';
    return `--platform android --android.packagename ${config.packageName} --android.androidpacktype 0 --android.certalias ${certalias} --android.certpassword  ${config.certpassword} --android.certfile  ${config.certfile}`;
}
exports.getAndParams = getAndParams;
