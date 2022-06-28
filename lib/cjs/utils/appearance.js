"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColor = exports.getTheme = exports.isSystemInDarkMode = void 0;
function isSystemInDarkMode() {
    var _a;
    try {
        return ((_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme: dark)').matches);
    }
    catch (_b) { }
    return false;
}
exports.isSystemInDarkMode = isSystemInDarkMode;
function getTheme(appearance) {
    if (appearance === 'auto') {
        return isSystemInDarkMode() ? 'dark' : 'light';
    }
    return appearance;
}
exports.getTheme = getTheme;
function getColor(value) {
    const container = document.querySelector('#spotlight');
    if (!container)
        return value;
    const result = getComputedStyle(container).getPropertyValue(`--color-${value}`);
    if (result === null || result === void 0 ? void 0 : result.length)
        return result;
    return value;
}
exports.getColor = getColor;
