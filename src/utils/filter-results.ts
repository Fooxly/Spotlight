import Fuse from 'fuse.js';

import { getHistory } from './history';
import { COMMANDS, PAGES } from './constants';

import type { Category, CategoryType, Item, Result } from '@/types';

const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'options.keywords', 'page'],
};

export function filterResults (searchText: string, menu?: { title: string; items: Item[] }): Category[] {
    const ALL_ITEMS = [...COMMANDS, ...PAGES];

    const text = searchText.toLowerCase().trim();
    const words = text.split(' ').filter((word) => word.length > 1);

    if (text?.length && text.charAt(0) === '>' && !menu) {
        if (text.length === 1) {
            return sortResults(COMMANDS, false, false);
        }
        const fuse = new Fuse(COMMANDS, FUSE_PROPS);
        return sortResults(fuse.search(searchText).map((result) => result.item));
    } else if (text?.length && text.charAt(0) === '/' && !menu) {
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

    return [
        useHistory && history?.results?.length ? history : null,
        pages,
        commands,
    ].filter((cat) => cat ? cat?.results?.length > 0 : false) as Category[];
}

function createCategory (title: string, items: Item[], options?: { indexOffset?: number; type?: CategoryType }): Category {
    const sortedItems = items;
    // Sort the mappedItems alfabetically by title
    if (options?.type !== 'history') {
        sortedItems.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
    }
    const mappedItems = sortedItems
        .map((item, index) => ({ item, index: index + (options?.indexOffset ?? 0) }));

    // Place the icon list command at the bottom of the list
    const iconListCommandIndex =
        mappedItems
            .findIndex((item) => item.item.title === 'Spotlight icon list');
    const iconListCommand = iconListCommandIndex > -1 ? mappedItems[iconListCommandIndex] : undefined;

    return {
        title,
        type: options?.type ?? 'mixed',
        results: ([
            ...mappedItems.filter((item) => item.item.title !== 'Spotlight icon list'),
            iconListCommand,
        ].filter((item) => !!item)) as Result[],
    };
}
