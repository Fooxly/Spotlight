import Fuse from 'fuse.js';

import { getHistory } from './history';

import { Result } from '@/types';

const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'key'],
};

export function fuzzySearch (search: string, results: Result[], allowHistory = false): Result[] {
    const text = search.toLowerCase().trim();
    let finalText = text;

    if (text.length === 0) {
        if (allowHistory) {
            const historyItems = getHistory();
            for (const id of historyItems) {
                const item = results.find((item) => item.id === id);
                if (!item) continue;
                item.category = 'Recently used';
            }
        }
        return results;
    }
    let fuse;
    if (text.charAt(0) === '>') {
        const commands = results.filter((result) => result.type === 'command');
        if (text.length === 1) return commands;
        fuse = new Fuse(commands, FUSE_PROPS);
        finalText = text.slice(1);
    } else if (text.charAt(0) === '/') {
        const pages = results.filter((result) => result.type === 'page');
        if (text.length === 1) return pages;
        fuse = new Fuse(pages, FUSE_PROPS);
        finalText = text.slice(1);
    } else {
        fuse = new Fuse(results, FUSE_PROPS);
    }

    if (!fuse) return results;
    return fuse.search(finalText).map((result) => result.item);
}
