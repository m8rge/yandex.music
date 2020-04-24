"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const shell = require("shelljs");
const helpers_1 = require("./helpers");
const log = require("loglevel");
const SCRIPT_PATHS = {
    singleIco: path.join(__dirname, '../..', 'icon-scripts/singleIco'),
    convertToPng: path.join(__dirname, '../..', 'icon-scripts/convertToPng'),
    convertToIco: path.join(__dirname, '../..', 'icon-scripts/convertToIco'),
    convertToIcns: path.join(__dirname, '../..', 'icon-scripts/convertToIcns'),
};
/**
 * Executes a shell script with the form "./pathToScript param1 param2"
 */
async function iconShellHelper(shellScriptPath, icoSource, icoDestination) {
    return new Promise((resolve, reject) => {
        if (helpers_1.isWindows()) {
            reject(new Error('Icon conversion only supported on macOS or Linux. ' +
                'If building for Windows, download/create a .ico and pass it with --icon favicon.ico . ' +
                'If building for macOS/Linux, do it from macOS/Linux'));
            return;
        }
        const shellCommand = `"${shellScriptPath}" "${icoSource}" "${icoDestination}"`;
        log.debug(`Converting icon ${icoSource} to ${icoDestination}.`, `Calling: ${shellCommand}`);
        shell.exec(shellCommand, { silent: true }, (exitCode, stdOut, stdError) => {
            if (exitCode) {
                reject({
                    stdOut,
                    stdError,
                });
                return;
            }
            log.debug(`Conversion succeeded and produced icon at ${icoDestination}`);
            resolve(icoDestination);
        });
    });
}
function singleIco(icoSrc) {
    return iconShellHelper(SCRIPT_PATHS.singleIco, icoSrc, `${helpers_1.getTempDir('iconconv')}/icon.ico`);
}
exports.singleIco = singleIco;
async function convertToPng(icoSrc) {
    return iconShellHelper(SCRIPT_PATHS.convertToPng, icoSrc, `${helpers_1.getTempDir('iconconv')}/icon.png`);
}
exports.convertToPng = convertToPng;
async function convertToIco(icoSrc) {
    return iconShellHelper(SCRIPT_PATHS.convertToIco, icoSrc, `${helpers_1.getTempDir('iconconv')}/icon.ico`);
}
exports.convertToIco = convertToIco;
async function convertToIcns(icoSrc) {
    if (!helpers_1.isOSX()) {
        throw new Error('macOS is required to convert to a .icns icon');
    }
    return iconShellHelper(SCRIPT_PATHS.convertToIcns, icoSrc, `${helpers_1.getTempDir('iconconv')}/icon.icns`);
}
exports.convertToIcns = convertToIcns;
//# sourceMappingURL=iconShellHelpers.js.map