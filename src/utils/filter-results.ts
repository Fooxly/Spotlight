import Fuse from 'fuse.js';

import { getHistory } from './history';
import { COMMANDS, PAGES } from './constants';

import type { Category, CategoryType, Item } from '@/types';

const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'options.keywords', 'page'],
};

export function filterResults (searchText: string, menu?: { title: string; items: Item[] }): Category[] {
    const ALL_ITEMS = [...COMMANDS, ...PAGES];

    const text = searchText.toLowerCase().trim();
    const words = text.split(' ').filter((word) => word.length > 1);

    if (text?.length && text.charAt(0) === '>') {
        if (text.length === 1) {
            return sortResults(COMMANDS, false, false);
        }
        const fuse = new Fuse(COMMANDS, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    } else if (text?.length && text.charAt(0) === '/') {
        if (text.length === 1) {
            return sortResults(PAGES, false, false);
        }
        const fuse = new Fuse(PAGES, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    } else if (!menu && (text.length === 0 || words.length === 0)) {
        // Return all the items if the search text is empty.
        return sortResults(ALL_ITEMS, false, true);
    } else if (menu) {
        const fuse = new Fuse(menu.items, FUSE_PROPS);
        return [
            createCategory(
                menu.title,
                (text.length === 0 || words.length === 0) ? menu.items : fuse.search(searchText).map((result) => result.item),
            ),
        ];
    } else {
        const fuse = new Fuse(ALL_ITEMS, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    }
}

function sortResults (items: Item[], hasRecommended = true, useHistory = false): Category[] {
    if (items.length === 0) return [];
    const first = items[0];
    const indexOffset = hasRecommended ? 1 : 0;

    const historyItems = getHistory();
    let rest = items.slice(indexOffset, items.length);

    let history: null | Category = null;

    if (useHistory) {
        rest = rest.filter((item) => !historyItems.includes(item));
        history = createCategory('Recently used', historyItems, {
            indexOffset: indexOffset,
            type: 'history',
        });
    }

    const pages = createCategory('Pages', rest.filter((i) => i.type === 'jump-to'), {
        indexOffset: indexOffset + (history?.results?.length ?? 0),
        type: 'pages',
    });

    const commands = createCategory('Commands', rest.filter((i) => i.type === 'command'), {
        indexOffset: indexOffset + (history?.results?.length ?? 0) + pages.results.length,
        type: 'commands',
    });

    if (hasRecommended) {
        return [
            createCategory('Top result', [first]),
            pages,
            commands,
        ];
    }

    return [useHistory && history?.results?.length ? history : null, pages, commands].filter((cat) => !!cat) as Category[];
}

function createCategory (title: string, items: Item[], options?: { indexOffset?: number; type?: CategoryType }): Category {
    return {
        title,
        type: options?.type ?? 'mixed',
        results: items.map((item, index) => ({ item, index: index + (options?.indexOffset ?? 0) })),
    };
}
