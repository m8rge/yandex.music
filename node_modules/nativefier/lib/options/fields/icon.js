"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.icon = void 0;
const log = __importStar(require("loglevel"));
const inferIcon_1 = require("../../infer/inferIcon");
async function icon(options) {
    if (options.packager.icon) {
        log.debug('Got icon from options. Using it, no inferring needed');
        return undefined;
    }
    if (!options.packager.platform) {
        log.error('No platform specified. Icon can not be inferrerd.');
        return undefined;
    }
    try {
        return await (0, inferIcon_1.inferIcon)(options.packager.targetUrl, options.packager.platform);
    }
    catch (err) {
        log.warn('Cannot automatically retrieve the app icon:', err);
        return undefined;
    }
}
exports.icon = icon;
//# sourceMappingURL=icon.js.map