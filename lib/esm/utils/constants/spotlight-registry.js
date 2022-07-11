export const registry = {
    store: [],
    get items() {
        return this.store;
    },
    set items(newItems) {
        this.store = newItems;
    },
};
export function updateRegistry(newRegistry) {
    registry.items = newRegistry;
}
export function addRegistry(item) {
    registry.items = [...registry.items, item];
}
