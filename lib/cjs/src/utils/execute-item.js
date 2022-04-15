"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeItem = void 0;
function executeItem(item, param) {
    if (item.type === 'command') {
        return item.action(param);
    }
    else {
        window.location.href = item.page;
    }
}
exports.executeItem = executeItem;
