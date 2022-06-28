export function isSystemInDarkMode() {
    var _a;
    try {
        return ((_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme: dark)').matches);
    }
    catch (_b) { }
    return false;
}
export function getTheme(appearance) {
    if (appearance === 'auto') {
        return isSystemInDarkMode() ? 'dark' : 'light';
    }
    return appearance;
}
