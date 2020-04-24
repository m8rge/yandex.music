"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio = require("cheerio");
const log = require("loglevel");
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36';
async function inferTitle(url) {
    const { data } = await axios_1.default.get(url, {
        headers: {
            // Fake user agent for pages like http://messenger.com
            'User-Agent': USER_AGENT,
        },
    });
    log.debug(`Fetched ${(data.length / 1024).toFixed(1)} kb page at`, url);
    const $ = cheerio.load(data);
    const inferredTitle = $('title').first().text();
    log.debug('Inferred title:', inferredTitle);
    return inferredTitle;
}
exports.inferTitle = inferTitle;
//# sourceMappingURL=inferTitle.js.map