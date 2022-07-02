import Fuse from 'fuse.js';
const FUSE_PROPS = {
    includeScore: true,
    isCaseSensitive: false,
    keys: ['title', 'key'],
};
export function fuzzySearch(search, results, customSelection = false) {
    const text = search.toLowerCase().trim();
    // const words = text.split(' ').filter((word) => word.length > 1);
    if (text.length === 0)
        return results;
    if (customSelection) {
        // TODO: add support for > and / in search
    }
    else {
        const fuse = new Fuse(results, FUSE_PROPS);
        return fuse.search(text).map((result) => result.item);
    }
    return results;
}
