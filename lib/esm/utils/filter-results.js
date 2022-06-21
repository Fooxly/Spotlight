import Fuse from 'fuse.js';
import { getHistory } from './history';
import { COMMANDS, PAGES } from './constants';
const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'options.keywords', 'page'],
};
export function filterResults(searchText, menu) {
    const ALL_ITEMS = [...COMMANDS, ...PAGES];
    const text = searchText.toLowerCase().trim();
    const words = text.split(' ').filter((word) => word.length > 1);
    if ((text === null || text === void 0 ? void 0 : text.length) && text.charAt(0) === '>' && !menu) {
        if (text.length === 1) {
            return sortResults(COMMANDS, false, false);
        }
        const fuse = new Fuse(COMMANDS, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    }
    else if ((text === null || text === void 0 ? void 0 : text.length) && text.charAt(0) === '/' && !menu) {
        if (text.length === 1) {
            return sortResults(PAGES, false, false);
        }
        const fuse = new Fuse(PAGES, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    }
    else if (!menu && (text.length === 0 || words.length === 0)) {
        // Return all the items if the search text is empty.
        return sortResults(ALL_ITEMS, false, true);
    }
    else if (menu) {
        const fuse = new Fuse(menu.items, FUSE_PROPS);
        return [
            createCategory(menu.title, (text.length === 0 || words.length === 0) ? menu.items : fuse.search(searchText).map((result) => result.item)),
        ];
    }
    else {
        const fuse = new Fuse(ALL_ITEMS, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    }
}
function sortResults(items, hasRecommended = true, useHistory = false) {
    var _a, _b, _c, _d, _e;
    if (items.length === 0)
        return [];
    const first = items[0];
    const indexOffset = hasRecommended ? 1 : 0;
    const historyItems = getHistory();
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
        type: 'pages',
    });
    const commands = createCategory('Commands', rest.filter((i) => i.type === 'command'), {
        indexOffset: indexOffset + ((_d = (_c = history === null || history === void 0 ? void 0 : history.results) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) + pages.results.length,
        type: 'commands',
    });
    if (hasRecommended) {
        return [
            createCategory('Top result', [first]),
            pages,
            commands,
        ];
    }
    return [
        useHistory && ((_e = history === null || history === void 0 ? void 0 : history.results) === null || _e === void 0 ? void 0 : _e.length) ? history : null,
        pages,
        commands,
    ].filter((cat) => { var _a; return cat ? ((_a = cat === null || cat === void 0 ? void 0 : cat.results) === null || _a === void 0 ? void 0 : _a.length) > 0 : false; });
}
function createCategory(title, items, options) {
    var _a;
    return {
        title,
        type: (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : 'mixed',
        results: items.map((item, index) => { var _a; return ({ item, index: index + ((_a = options === null || options === void 0 ? void 0 : options.indexOffset) !== null && _a !== void 0 ? _a : 0) }); }),
    };
}
