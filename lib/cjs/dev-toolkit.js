"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.DevToolkit = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var spotlight_1 = require("./spotlight");
var theme_1 = require("./theme");
__exportStar(require("./spotlight"), exports);
function DevToolkit(_a) {
    var isDarkMode = _a.isDarkMode;
    var calculatedTheme = (0, react_1.useMemo)(function () {
        var selectedTheme = theme_1.themes[isDarkMode ? 'dark' : 'light'];
        return __assign(__assign({}, selectedTheme), { color: (0, theme_1.getColorFunction)(__assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ id: 'dev-toolkit' }, { children: (0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, __assign({ theme: calculatedTheme }, { children: (0, jsx_runtime_1.jsx)(spotlight_1.SpotlightComponent, {}) })) })));
}
exports.DevToolkit = DevToolkit;
