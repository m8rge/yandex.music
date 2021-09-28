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
exports.inferIcon = void 0;
const path = __importStar(require("path"));
const fs_1 = require("fs");
const util_1 = require("util");
const gitCloud = require("gitcloud");
const page_icon_1 = __importDefault(require("page-icon"));
const helpers_1 = require("../helpers/helpers");
const log = __importStar(require("loglevel"));
const writeFileAsync = (0, util_1.promisify)(fs_1.writeFile);
const GITCLOUD_SPACE_DELIMITER = '-';
const GITCLOUD_URL = 'https://nativefier.github.io/nativefier-icons/';
function getMaxMatchScore(iconWithScores) {
    const score = iconWithScores.reduce((maxScore, currentIcon) => {
        const currentScore = currentIcon.score;
        if (currentScore && currentScore > maxScore) {
            return currentScore;
        }
        return maxScore;
    }, 0);
    log.debug('Max icon match score:', score);
    return score;
}
function getMatchingIcons(iconsWithScores, maxScore) {
    return iconsWithScores.filter((item) => item.score === maxScore);
}
function mapIconWithMatchScore(cloudIcons, targetUrl) {
    const normalisedTargetUrl = targetUrl.toLowerCase();
    return cloudIcons.map((item) => {
        const itemWords = item.name.split(GITCLOUD_SPACE_DELIMITER);
        const score = itemWords.reduce((currentScore, word) => {
            if (normalisedTargetUrl.includes(word)) {
                return currentScore + 1;
            }
            return currentScore;
        }, 0);
        return { ...item, ext: path.extname(item.url), score };
    });
}
async function inferIconFromStore(targetUrl, platform) {
    log.debug(`Inferring icon from store for ${targetUrl} on ${platform}`);
    const allowedFormats = new Set((0, helpers_1.getAllowedIconFormats)(platform));
    const cloudIcons = await gitCloud(GITCLOUD_URL);
    log.debug(`Got ${cloudIcons.length} icons from gitcloud`);
    const iconWithScores = mapIconWithMatchScore(cloudIcons, targetUrl);
    const maxScore = getMaxMatchScore(iconWithScores);
    if (maxScore === 0) {
        log.debug('No relevant icon in store.');
        return undefined;
    }
    const iconsMatchingScore = getMatchingIcons(iconWithScores, maxScore);
    const iconsMatchingExt = iconsMatchingScore.filter((icon) => { var _a; return allowedFormats.has((_a = icon.ext) !== null && _a !== void 0 ? _a : path.extname(icon.url)); });
    const matchingIcon = iconsMatchingExt[0];
    const iconUrl = matchingIcon && matchingIcon.url;
    if (!iconUrl) {
        log.debug('Could not infer icon from store');
        return undefined;
    }
    return (0, helpers_1.downloadFile)(iconUrl);
}
async function inferIcon(targetUrl, platform) {
    log.debug(`Inferring icon for ${targetUrl} on ${platform}`);
    const tmpDirPath = (0, helpers_1.getTempDir)('iconinfer');
    let icon = await inferIconFromStore(targetUrl, platform);
    if (!icon) {
        const ext = platform === 'win32' ? '.ico' : '.png';
        log.debug(`Trying to extract a ${ext} icon from the page.`);
        icon = await (0, page_icon_1.default)(targetUrl, { ext });
    }
    if (!icon) {
        return undefined;
    }
    log.debug(`Got an icon from the page.`);
    const iconPath = path.join(tmpDirPath, `/icon${icon.ext}`);
    log.debug(`Writing ${(icon.data.length / 1024).toFixed(1)} kb icon to ${iconPath}`);
    await writeFileAsync(iconPath, icon.data);
    return iconPath;
}
exports.inferIcon = inferIcon;
//# sourceMappingURL=inferIcon.js.map