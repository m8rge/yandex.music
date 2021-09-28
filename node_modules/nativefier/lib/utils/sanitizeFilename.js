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
exports.sanitizeFilename = void 0;
const log = __importStar(require("loglevel"));
const sanitize = require("sanitize-filename");
const constants_1 = require("../constants");
function sanitizeFilename(platform, filenameToSanitize) {
    let result = sanitize(filenameToSanitize);
    // spaces will cause problems with Ubuntu when pinned to the dock
    if (platform === 'linux') {
        result = result.replace(/\s/g, '');
    }
    if (!result || result === '') {
        result = constants_1.DEFAULT_APP_NAME;
        log.warn('Falling back to default app name as result of filename sanitization. Use flag "--name" to set a name');
    }
    log.debug(`Sanitized filename for ${filenameToSanitize} : ${result}`);
    return result;
}
exports.sanitizeFilename = sanitizeFilename;
//# sourceMappingURL=sanitizeFilename.js.map