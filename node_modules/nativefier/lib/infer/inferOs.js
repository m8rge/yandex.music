"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const log = require("loglevel");
function inferPlatform() {
    const platform = os.platform();
    if (platform === 'darwin' ||
        // @ts-ignore
        platform === 'mas' ||
        platform === 'win32' ||
        platform === 'linux') {
        log.debug('Inferred platform', platform);
        return platform;
    }
    throw new Error(`Untested platform ${platform} detected`);
}
exports.inferPlatform = inferPlatform;
function inferArch() {
    const arch = os.arch();
    if (arch !== 'ia32' && arch !== 'x64' && arch !== 'arm') {
        throw new Error(`Incompatible architecture ${arch} detected`);
    }
    log.debug('Inferred arch', arch);
    return arch;
}
exports.inferArch = inferArch;
//# sourceMappingURL=inferOs.js.map