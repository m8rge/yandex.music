"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("loglevel");
const constants_1 = require("../constants");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sanitize = require('sanitize-filename');
function sanitizeFilename(platform, filenameToSanitize) {
    let result = sanitize(filenameToSanitize);
    // remove all non ascii or use default app name
    // eslint-disable-next-line no-control-regex
    result = result.replace(/[^\x00-\x7F]/g, '') || constants_1.DEFAULT_APP_NAME;
    // spaces will cause problems with Ubuntu when pinned to the dock
    if (platform === 'linux') {
        result = result.replace(/ /g, '');
    }
    log.debug(`Sanitized filename for ${filenameToSanitize} : ${result}`);
    return result;
}
exports.sanitizeFilename = sanitizeFilename;
//# sourceMappingURL=sanitizeFilename.js.map