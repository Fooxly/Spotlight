import { catalog } from './constants';

import { Result } from '@/types';

export function getResultById (id?: string, results?: Result[]): Result | undefined {
    const resultsArr = results ?? catalog.store;
    if (!id) return undefined;
    for (const item of resultsArr) {
        if (item.id === id) {
            return item;
        }
        if (item.children?.length) {
            const result = getResultById(id, item.children);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
}

export function getResultsByParentId (parentId?: string, results?: Result[]): Result[] {
    const resultsArr = results ?? catalog.items;
    if (!resultsArr?.length) return [];
    if (!parentId) {
        return [...resultsArr];
    }
    // Deep search trough all the results and children props to find an object with the parent id
    for (const item of resultsArr) {
        if (item.id === parentId) {
            return item.children ?? [];
        }
        if (item.children?.length) {
            const results = getResultsByParentId(parentId, item.children);
            if (results.length > 0) {
                return [...results];
            }
        }
    }
    return [];
}
