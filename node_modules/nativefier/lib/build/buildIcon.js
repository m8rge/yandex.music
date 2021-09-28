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
exports.convertIconIfNecessary = void 0;
const path = __importStar(require("path"));
const log = __importStar(require("loglevel"));
const helpers_1 = require("../helpers/helpers");
const iconShellHelpers_1 = require("../helpers/iconShellHelpers");
function iconIsIco(iconPath) {
    return path.extname(iconPath) === '.ico';
}
function iconIsPng(iconPath) {
    return path.extname(iconPath) === '.png';
}
function iconIsIcns(iconPath) {
    return path.extname(iconPath) === '.icns';
}
/**
 * Will convert a `.png` icon to the appropriate arch format (if necessary),
 * and return adjusted options
 */
function convertIconIfNecessary(options) {
    if (!options.packager.icon) {
        log.debug('Option "icon" not set, skipping icon conversion.');
        return;
    }
    if (options.packager.platform === 'win32') {
        if (iconIsIco(options.packager.icon)) {
            log.debug('Building for Windows and icon is already a .ico, no conversion needed');
            return;
        }
        try {
            const iconPath = (0, iconShellHelpers_1.convertToIco)(options.packager.icon);
            options.packager.icon = iconPath;
            return;
        }
        catch (err) {
            log.warn('Failed to convert icon to .ico, skipping.', err);
            return;
        }
    }
    if (options.packager.platform === 'linux') {
        if (iconIsPng(options.packager.icon)) {
            log.debug('Building for Linux and icon is already a .png, no conversion needed');
            return;
        }
        try {
            const iconPath = (0, iconShellHelpers_1.convertToPng)(options.packager.icon);
            options.packager.icon = iconPath;
            return;
        }
        catch (err) {
            log.warn('Failed to convert icon to .png, skipping.', err);
            return;
        }
    }
    if (iconIsIcns(options.packager.icon)) {
        log.debug('Building for macOS and icon is already a .icns, no conversion needed');
    }
    if (!(0, helpers_1.isOSX)()) {
        log.warn('Skipping icon conversion to .icns, conversion is only supported on macOS');
        return;
    }
    try {
        if (!iconIsIcns(options.packager.icon)) {
            const iconPath = (0, iconShellHelpers_1.convertToIcns)(options.packager.icon);
            options.packager.icon = iconPath;
        }
        if (options.nativefier.tray !== 'false') {
            (0, iconShellHelpers_1.convertToTrayIcon)(options.packager.icon);
        }
    }
    catch (err) {
        log.warn('Failed to convert icon to .icns, skipping.', err);
        options.packager.icon = undefined;
    }
}
exports.convertIconIfNecessary = convertIconIfNecessary;
//# sourceMappingURL=buildIcon.js.map