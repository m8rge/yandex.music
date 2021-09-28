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
exports.convertToTrayIcon = exports.convertToIcns = exports.convertToIco = exports.convertToPng = exports.singleIco = void 0;
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const helpers_1 = require("./helpers");
const log = __importStar(require("loglevel"));
const SCRIPT_PATHS = {
    singleIco: path.join(__dirname, '../..', 'icon-scripts/singleIco'),
    convertToPng: path.join(__dirname, '../..', 'icon-scripts/convertToPng'),
    convertToIco: path.join(__dirname, '../..', 'icon-scripts/convertToIco'),
    convertToIcns: path.join(__dirname, '../..', 'icon-scripts/convertToIcns'),
    convertToTrayIcon: path.join(__dirname, '../..', 'icon-scripts/convertToTrayIcon'),
};
/**
 * Executes a shell script with the form "./pathToScript param1 param2"
 */
function iconShellHelper(shellScriptPath, icoSource, icoDestination) {
    if ((0, helpers_1.isWindows)()) {
        throw new Error('Icon conversion only supported on macOS or Linux. ' +
            'If building for Windows, download/create a .ico and pass it with --icon favicon.ico . ' +
            'If building for macOS/Linux, do it from macOS/Linux');
    }
    const shellCommand = `"${shellScriptPath}" "${icoSource}" "${icoDestination}"`;
    log.debug(`Converting icon ${icoSource} to ${icoDestination}.`, `Calling shell command: ${shellCommand}`);
    const { stdout, stderr, status } = (0, child_process_1.spawnSync)(shellScriptPath, [icoSource, icoDestination], { timeout: 10000 });
    if (status) {
        throw new Error(`Icon conversion failed with status code ${status}.\nstdout: ${stdout.toString()}\nstderr: ${stderr.toString()}`);
    }
    log.debug(`Conversion succeeded and produced icon at ${icoDestination}`);
    return icoDestination;
}
function singleIco(icoSrc) {
    return iconShellHelper(SCRIPT_PATHS.singleIco, icoSrc, `${(0, helpers_1.getTempDir)('iconconv')}/icon.ico`);
}
exports.singleIco = singleIco;
function convertToPng(icoSrc) {
    return iconShellHelper(SCRIPT_PATHS.convertToPng, icoSrc, `${(0, helpers_1.getTempDir)('iconconv')}/icon.png`);
}
exports.convertToPng = convertToPng;
function convertToIco(icoSrc) {
    return iconShellHelper(SCRIPT_PATHS.convertToIco, icoSrc, `${(0, helpers_1.getTempDir)('iconconv')}/icon.ico`);
}
exports.convertToIco = convertToIco;
function convertToIcns(icoSrc) {
    if (!(0, helpers_1.isOSX)()) {
        throw new Error('macOS is required to convert to a .icns icon');
    }
    return iconShellHelper(SCRIPT_PATHS.convertToIcns, icoSrc, `${(0, helpers_1.getTempDir)('iconconv')}/icon.icns`);
}
exports.convertToIcns = convertToIcns;
function convertToTrayIcon(icoSrc) {
    if (!(0, helpers_1.isOSX)()) {
        throw new Error('macOS is required to convert from a .icns icon');
    }
    return iconShellHelper(SCRIPT_PATHS.convertToTrayIcon, icoSrc, `${path.dirname(icoSrc)}/tray-icon.png`);
}
exports.convertToTrayIcon = convertToTrayIcon;
//# sourceMappingURL=iconShellHelpers.js.map