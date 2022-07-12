import { RegistryItem } from '@/types';

export const registry = {
    store: [] as RegistryItem[],
    get items () {
        return this.store;
    },
    set items (newItems) {
        this.store = newItems;
    },
};

export function updateRegistry (newRegistry: RegistryItem[]) {
    registry.items = newRegistry;
}

export function addRegistry (item: RegistryItem) {
    const index = registry.items.findIndex((i) => i.key === item.key);
    if (index !== -1) {
        registry.items.splice(index, 1);
    }
    registry.items = [...registry.items, item];
}
