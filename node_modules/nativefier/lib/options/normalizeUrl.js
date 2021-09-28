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
exports.normalizeUrl = void 0;
const url = __importStar(require("url"));
const log = __importStar(require("loglevel"));
function appendProtocol(inputUrl) {
    const parsed = url.parse(inputUrl);
    if (!parsed.protocol) {
        const urlWithProtocol = `https://${inputUrl}`;
        log.warn(`URL "${inputUrl}" lacks a protocol.`, `Will try to parse it as HTTPS: "${urlWithProtocol}".`, `Please pass "http://${inputUrl}" if this is what you meant.`);
        return urlWithProtocol;
    }
    return inputUrl;
}
function normalizeUrl(urlToNormalize) {
    const urlWithProtocol = appendProtocol(urlToNormalize);
    let parsedUrl;
    try {
        parsedUrl = new url.URL(urlWithProtocol);
    }
    catch (err) {
        log.error('normalizeUrl ERROR', err);
        throw new Error(`Your url "${urlWithProtocol}" is invalid`);
    }
    const normalizedUrl = parsedUrl.toString();
    log.debug(`Normalized URL ${urlToNormalize} to:`, normalizedUrl);
    return normalizedUrl;
}
exports.normalizeUrl = normalizeUrl;
//# sourceMappingURL=normalizeUrl.js.map