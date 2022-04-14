"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeItem = void 0;
function executeItem(item) {
    if (item.type === 'command') {
        item.action();
    }
    else {
        // TODO: support external links
        window.location.href = item.page;
    }
}
exports.executeItem = executeItem;
