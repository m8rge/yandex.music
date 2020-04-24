"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("loglevel");
const inferIcon_1 = require("../../infer/inferIcon");
async function icon(options) {
    if (options.packager.icon) {
        log.debug('Got icon from options. Using it, no inferring needed');
        return null;
    }
    try {
        return await inferIcon_1.inferIcon(options.packager.targetUrl, options.packager.platform);
    }
    catch (error) {
        log.warn('Cannot automatically retrieve the app icon:', error);
        return null;
    }
}
exports.icon = icon;
//# sourceMappingURL=icon.js.map