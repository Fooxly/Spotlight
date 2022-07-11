"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzySearch = void 0;
const fuse_js_1 = __importDefault(require("fuse.js"));
const history_1 = require("./history");
const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'key'],
};
function fuzzySearch(search, results, allowHistory = false) {
    const text = search.toLowerCase().trim();
    let finalText = text;
    if (text.length === 0) {
        if (allowHistory) {
            const historyItems = (0, history_1.getHistory)();
            for (const id of historyItems) {
                const item = results.find((item) => item.id === id);
                if (!item)
                    continue;
                item.category = 'Recently used';
            }
        }
        return results;
    }
    let fuse;
    if (text.charAt(0) === '>') {
        const commands = results.filter((result) => result.type === 'command');
        if (text.length === 1)
            return commands;
        fuse = new fuse_js_1.default(commands, FUSE_PROPS);
        finalText = text.slice(1);
    }
    else if (text.charAt(0) === '/') {
        const pages = results.filter((result) => result.type === 'page');
        if (text.length === 1)
            return pages;
        fuse = new fuse_js_1.default(pages, FUSE_PROPS);
        finalText = text.slice(1);
    }
    else {
        fuse = new fuse_js_1.default(results, FUSE_PROPS);
    }
    if (!fuse)
        return results;
    return fuse.search(finalText).map((result) => result.item);
}
exports.fuzzySearch = fuzzySearch;
