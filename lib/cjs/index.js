"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spotlight = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = require("styled-components");
const utils_1 = require("./utils");
const components_1 = require("./components");
const theme_1 = require("./theme");
const appearance_1 = require("./utils/appearance");
const commands_1 = require("./commands");
function Spotlight({ isDarkMode, showRecentlyUsed = 5, showTips = true }) {
    const [darkMode, setDarkMode] = (0, react_1.useState)(isDarkMode !== null && isDarkMode !== void 0 ? isDarkMode : false);
    const listenerDarkMode = (0, react_1.useCallback)(() => {
        if (typeof isDarkMode === 'boolean')
            return;
        setDarkMode((0, appearance_1.isSystemInDarkMode)());
    }, [isDarkMode]);
    (0, react_1.useEffect)(() => {
        const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        // The user has manually set the dark mode property
        if (typeof isDarkMode === 'boolean') {
            matchDarkMode.removeEventListener('change', listenerDarkMode);
            setDarkMode(isDarkMode);
            return;
        }
        matchDarkMode.addEventListener('change', listenerDarkMode);
        listenerDarkMode();
        return () => { matchDarkMode.removeEventListener('change', listenerDarkMode); };
    }, [isDarkMode, listenerDarkMode]);
    (0, react_1.useEffect)(() => {
        localStorage.setItem(utils_1.HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);
    const calculatedTheme = (0, react_1.useMemo)(() => {
        const selectedTheme = theme_1.themes[darkMode ? 'dark' : 'light'];
        return Object.assign(Object.assign({}, selectedTheme), { color: (0, theme_1.getColorFunction)(Object.assign({}, selectedTheme.color.colors)) });
    }, [darkMode]);
    return ((0, jsx_runtime_1.jsxs)(styled_components_1.ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: [(0, jsx_runtime_1.jsx)(components_1.SpotlightComponent, { showTips: showTips }), (0, jsx_runtime_1.jsx)(components_1.ColorPicker, {}), (0, jsx_runtime_1.jsx)(components_1.Toast, {})] })));
}
exports.Spotlight = Spotlight;
__exportStar(require("./commands"), exports);
exports.default = {
    Spotlight,
    registerPage: commands_1.registerPage,
    registerCommand: commands_1.registerCommand,
    unregister: commands_1.unregister,
    question: commands_1.question,
    shell: commands_1.shell,
    toast: commands_1.toast,
    pickColor: commands_1.pickColor,
};
