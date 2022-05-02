"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterResults = void 0;
const fuse_js_1 = __importDefault(require("fuse.js"));
const history_1 = require("./history");
const constants_1 = require("./constants");
const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'options.keywords'],
};
function filterResults(searchText, menu) {
    const ALL_ITEMS = [...constants_1.COMMANDS, ...constants_1.PAGES];
    const text = searchText.toLowerCase().trim();
    const words = text.split(' ').filter((word) => word.length > 1);
    // Return first 8 items to help guide the user for commands
    if (!menu && (text.length === 0 || words.length === 0)) {
        return sortResults(ALL_ITEMS, false, true);
    }
    else if (menu) {
        const fuse = new fuse_js_1.default(menu.items, FUSE_PROPS);
        return [
            createCategory(menu.title, (text.length === 0 || words.length === 0) ? menu.items : fuse.search(searchText).map((result) => result.item)),
        ];
    }
    else {
        const fuse = new fuse_js_1.default(ALL_ITEMS, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    }
}
exports.filterResults = filterResults;
function sortResults(items, hasRecommended = true, useHistory = false) {
    var _a, _b, _c, _d, _e;
    if (items.length === 0)
        return [];
    const first = items[0];
    const indexOffset = hasRecommended ? 1 : 0;
    const historyItems = (0, history_1.getHistory)();
    let rest = items.slice(indexOffset, items.length);
    let history = null;
    if (useHistory) {
        rest = rest.filter((item) => !historyItems.includes(item));
        history = createCategory('Recently used', historyItems, {
            indexOffset: indexOffset,
            type: 'history',
        });
    }
    const pages = createCategory('Pages', rest.filter((i) => i.type === 'jump-to'), {
        indexOffset: indexOffset + ((_b = (_a = history === null || history === void 0 ? void 0 : history.results) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0),
        type: 'normal',
    });
    const commands = createCategory('Commands', rest.filter((i) => i.type === 'command'), {
        indexOffset: indexOffset + ((_d = (_c = history === null || history === void 0 ? void 0 : history.results) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) + pages.results.length,
        type: 'normal',
    });
    if (hasRecommended) {
        return [
            createCategory('Top result', [first]),
            pages,
            commands,
        ];
    }
    return [useHistory && ((_e = history === null || history === void 0 ? void 0 : history.results) === null || _e === void 0 ? void 0 : _e.length) ? history : null, pages, commands].filter((cat) => !!cat);
}
function createCategory(title, items, options) {
    var _a;
    return {
        title,
        type: (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : 'normal',
        results: items.map((item, index) => { var _a; return ({ item, index: index + ((_a = options === null || options === void 0 ? void 0 : options.indexOffset) !== null && _a !== void 0 ? _a : 0) }); }),
    };
}
