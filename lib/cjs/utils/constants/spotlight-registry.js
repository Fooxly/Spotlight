"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRegistry = exports.updateRegistry = exports.registry = void 0;
exports.registry = {
    store: [],
    get items() {
        return this.store;
    },
    set items(newItems) {
        this.store = newItems;
    },
};
function updateRegistry(newRegistry) {
    exports.registry.items = newRegistry;
}
exports.updateRegistry = updateRegistry;
function addRegistry(item) {
    const index = exports.registry.items.findIndex((i) => i.key === item.key);
    if (index !== -1) {
        exports.registry.items.splice(index, 1);
    }
    exports.registry.items = [...exports.registry.items, item];
}
exports.addRegistry = addRegistry;
