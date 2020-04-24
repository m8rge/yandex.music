"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const path = require("path");
const axios_1 = require("axios");
const hasbin = require("hasbin");
const ncp_1 = require("ncp");
const log = require("loglevel");
const tmp = require("tmp");
tmp.setGracefulCleanup(); // cleanup temp dirs even when an uncaught exception occurs
const now = new Date();
const TMP_TIME = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
function isOSX() {
    return os.platform() === 'darwin';
}
exports.isOSX = isOSX;
function isWindows() {
    return os.platform() === 'win32';
}
exports.isWindows = isWindows;
/**
 * Create a temp directory with a debug-friendly name, and return its path.
 * Will be automatically deleted on exit.
 */
function getTempDir(prefix, mode) {
    return tmp.dirSync({
        mode,
        unsafeCleanup: true,
        prefix: `nativefier-${TMP_TIME}-${prefix}-`,
    }).name;
}
exports.getTempDir = getTempDir;
async function copyFileOrDir(sourceFileOrDir, dest) {
    return new Promise((resolve, reject) => {
        ncp_1.ncp(sourceFileOrDir, dest, (error) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
}
exports.copyFileOrDir = copyFileOrDir;
async function downloadFile(fileUrl) {
    log.debug(`Downloading ${fileUrl}`);
    return axios_1.default
        .get(fileUrl, {
        responseType: 'arraybuffer',
    })
        .then((response) => {
        if (!response.data) {
            return null;
        }
        return {
            data: response.data,
            ext: path.extname(fileUrl),
        };
    });
}
exports.downloadFile = downloadFile;
function getAllowedIconFormats(platform) {
    const hasIdentify = hasbin.sync('identify');
    const hasConvert = hasbin.sync('convert');
    const hasIconUtil = hasbin.sync('iconutil');
    const pngToIcns = hasConvert && hasIconUtil;
    const pngToIco = hasConvert;
    const icoToIcns = pngToIcns && hasIdentify;
    const icoToPng = hasConvert;
    // Unsupported
    const icnsToPng = false;
    const icnsToIco = false;
    const formats = [];
    // Shell scripting is not supported on windows, temporary override
    if (isWindows()) {
        switch (platform) {
            case 'darwin':
                formats.push('.icns');
                break;
            case 'linux':
                formats.push('.png');
                break;
            case 'win32':
                formats.push('.ico');
                break;
            default:
                throw new Error(`Unknown platform ${platform}`);
        }
        log.debug(`Allowed icon formats when building for ${platform} (limited on Windows):`, formats);
        return formats;
    }
    switch (platform) {
        case 'darwin':
            formats.push('.icns');
            if (pngToIcns) {
                formats.push('.png');
            }
            if (icoToIcns) {
                formats.push('.ico');
            }
            break;
        case 'linux':
            formats.push('.png');
            if (icoToPng) {
                formats.push('.ico');
            }
            if (icnsToPng) {
                formats.push('.icns');
            }
            break;
        case 'win32':
            formats.push('.ico');
            if (pngToIco) {
                formats.push('.png');
            }
            if (icnsToIco) {
                formats.push('.icns');
            }
            break;
        default:
            throw new Error(`Unknown platform ${platform}`);
    }
    log.debug(`Allowed icon formats when building for ${platform}:`, formats);
    return formats;
}
exports.getAllowedIconFormats = getAllowedIconFormats;
//# sourceMappingURL=helpers.js.map