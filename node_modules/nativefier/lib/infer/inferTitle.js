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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferTitle = void 0;
const axios_1 = __importDefault(require("axios"));
const log = __importStar(require("loglevel"));
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36';
async function inferTitle(url) {
    var _a, _b, _c;
    const { data } = await axios_1.default.get(url, {
        headers: {
            // Fake user agent for pages like http://messenger.com
            'User-Agent': USER_AGENT,
        },
    });
    log.debug(`Fetched ${(data.length / 1024).toFixed(1)} kb page at`, url);
    const inferredTitle = (_c = (_b = (_a = /<\s*title.*?>(?<title>.+?)<\s*\/title\s*?>/i.exec(data)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : 'Webapp';
    log.debug('Inferred title:', inferredTitle);
    return inferredTitle;
}
exports.inferTitle = inferTitle;
//# sourceMappingURL=inferTitle.js.map