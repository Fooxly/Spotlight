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
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { SpotlightComponent } from './spotlight';
import { getColorFunction, themes } from './theme';
export * from './spotlight';
export function DevToolkit(_a) {
    var isDarkMode = _a.isDarkMode;
    var calculatedTheme = useMemo(function () {
        var selectedTheme = themes[isDarkMode ? 'dark' : 'light'];
        return __assign(__assign({}, selectedTheme), { color: getColorFunction(__assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return (_jsx("div", __assign({ id: 'dev-toolkit' }, { children: _jsx(ThemeProvider, __assign({ theme: calculatedTheme }, { children: _jsx(SpotlightComponent, {}) })) })));
}
