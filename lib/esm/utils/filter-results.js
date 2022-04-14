import Fuse from 'fuse.js';
import { getHistory } from './history';
import { COMMANDS, PAGES } from './constants';
const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'options.keywords'],
};
export function filterResults(searchText, menu) {
    const ALL_ITEMS = [...COMMANDS, ...PAGES];
    const text = searchText.toLowerCase().trim();
    const words = text.split(' ').filter((word) => word.length > 1);
    // Return first 8 items to help guide the user for commands
    if (!menu && (text.length === 0 || words.length === 0)) {
        return sortResults(ALL_ITEMS, false, true);
    }
    else if (!!menu) {
        const fuse = new Fuse(menu.items, FUSE_PROPS);
        return [createCategory(menu.title, (text.length === 0 || words.length === 0) ? menu.items : fuse.search(searchText).map((result) => result.item))];
    }
    else {
        const fuse = new Fuse(ALL_ITEMS, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    }
}
function sortResults(items, hasRecommended = true, useHistory = false) {
    if (!items.length)
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
        indexOffset: indexOffset + (history?.results?.length ?? 0),
        type: 'normal',
    });
    const commands = createCategory('Commands', rest.filter((i) => i.type === 'command'), {
        indexOffset: indexOffset + (history?.results?.length ?? 0) + pages.results.length,
        type: 'normal',
    });
    if (hasRecommended) {
        return [
            createCategory('Top result', [first]),
            pages,
            commands,
        ];
    }
    return [useHistory ? history : null, pages, commands].filter((cat) => !!cat);
}
function createCategory(title, items, options) {
    return {
        title,
        type: options?.type ?? 'normal',
        results: items.map((item, index) => ({ item, index: index + (options?.indexOffset ?? 0) }))
    };
}
