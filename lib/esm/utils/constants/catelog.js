export const catalog = {
    store: [],
    get items() {
        return this.store;
    },
    set items(newItems) {
        this.store = newItems;
    },
};
export function updateCatalog(newCatalog) {
    catalog.items = newCatalog;
}
