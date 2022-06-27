"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickColor = void 0;
const utils_1 = require("../utils");
function pickColor(options) {
    const baseOptions = {
        modes: utils_1.ALL_COLOR_MODES,
        alpha: true,
    };
    return new Promise((resolve, reject) => {
        const handleRequest = (ev) => {
            var _a;
            if (!ev.detail.value || ev.detail.error) {
                reject((_a = ev.detail.error) !== null && _a !== void 0 ? _a : new Error('COLOR_PICK_FAILED'));
                return;
            }
            resolve(ev.detail.value);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.COLOR_PICKER_RESULT_EVENT_KEY, handleRequest);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.COLOR_PICKER_RESULT_EVENT_KEY, handleRequest);
        const ev = new CustomEvent(utils_1.COLOR_PICKER_EVENT_KEY, {
            bubbles: false,
            detail: Object.assign(Object.assign({}, baseOptions), options),
        });
        // Add a small timeout to wait for possible rerenders inside the spotlight
        setTimeout(() => {
            document.dispatchEvent(ev);
        }, 10);
    });
}
exports.pickColor = pickColor;
