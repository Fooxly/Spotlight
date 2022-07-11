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
    exports.registry.items = [...exports.registry.items, item];
}
exports.addRegistry = addRegistry;
