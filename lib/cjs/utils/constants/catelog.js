"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCatalog = exports.catalog = void 0;
exports.catalog = {
    store: [],
    get items() {
        return this.store;
    },
    set items(newItems) {
        this.store = newItems;
    },
};
function updateCatalog(newCatalog) {
    exports.catalog.items = newCatalog;
}
exports.updateCatalog = updateCatalog;
