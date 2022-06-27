"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toast = void 0;
const utils_1 = require("../utils");
function toast(message) {
    const handleRequest = (ev) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(utils_1.TOAST_EVENT_KEY, handleRequest);
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    document.addEventListener(utils_1.TOAST_EVENT_KEY, handleRequest);
    const ev = new CustomEvent(utils_1.TOAST_EVENT_KEY, {
        bubbles: false,
        detail: {
            value: message,
        },
    });
    // Add a small timeout to wait for possible rerenders inside the spotlight
    setTimeout(() => {
        document.dispatchEvent(ev);
    }, 10);
}
exports.toast = toast;
