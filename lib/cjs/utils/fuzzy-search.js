"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzySearch = void 0;
const fuse_js_1 = __importDefault(require("fuse.js"));
const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'key'],
};
function fuzzySearch(search, results, customSelection = false) {
    const text = search.toLowerCase().trim();
    // const words = text.split(' ').filter((word) => word.length > 1);
    if (text.length === 0)
        return results;
    if (customSelection) {
        // TODO: add support for > and / in search
    }
    else {
        const fuse = new fuse_js_1.default(results, FUSE_PROPS);
        return fuse.search(text).map((result) => result.item);
    }
    return results;
}
exports.fuzzySearch = fuzzySearch;
