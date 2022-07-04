import { Result } from '@/types';

export function getResultById (catalog: Result[], id?: string): Result | undefined {
    if (!id) return undefined;
    for (const item of catalog) {
        if (item.id === id) {
            return item;
        }
        if (item.children?.length) {
            const result = getResultById(item.children, id);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
}

export function getResultsByParentId (catalog: Result[], parentId?: string): Result[] {
    if (!parentId) {
        return catalog;
    }
    // Deep search trough all the results and children props to find an object with the parent id
    for (const item of catalog) {
        if (item.id === parentId) {
            return item.children ?? [];
        }
        if (item.children?.length) {
            const results = getResultsByParentId(item.children, parentId);
            if (results.length > 0) {
                return results;
            }
        }
    }
    return [];
}
