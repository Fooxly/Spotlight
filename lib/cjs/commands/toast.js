"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toast = void 0;
const utils_1 = require("../utils");
function toast(message, type = 'info') {
    const ev = new CustomEvent(utils_1.TOAST_EVENT_KEY, {
        bubbles: false,
        detail: {
            message,
            type,
        },
    });
    document.dispatchEvent(ev);
}
exports.toast = toast;
