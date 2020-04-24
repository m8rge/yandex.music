"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const buildNativefierApp_1 = require("./build/buildNativefierApp");
exports.buildNativefierApp = buildNativefierApp_1.buildNativefierApp;
/**
 * Only for compatibility with Nativefier <= 7.7.1 !
 * Use the better, modern async `buildNativefierApp` instead if you can!
 */
function buildNativefierAppOldCallbackStyle(options, callback) {
    buildNativefierApp_1.buildNativefierApp(options)
        .then((result) => callback(null, result))
        .catch((err) => callback(err));
}
exports.default = buildNativefierAppOldCallbackStyle;
//# sourceMappingURL=main.js.map