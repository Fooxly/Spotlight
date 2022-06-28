"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSystemInDarkMode = void 0;
function isSystemInDarkMode() {
    var _a;
    try {
        return ((_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme: dark)').matches);
    }
    catch (_b) { }
    return false;
}
exports.isSystemInDarkMode = isSystemInDarkMode;
