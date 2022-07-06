import type { Result } from '@/types';

export const catalog = {
    store: [] as Result[],
    get items () {
        return this.store;
    },
    set items (newItems) {
        this.store = newItems;
    },
};

export function updateCatalog (newCatalog: Result[]) {
    catalog.items = newCatalog;
}
