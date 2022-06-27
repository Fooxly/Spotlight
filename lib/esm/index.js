import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { HISTORY_LENGTH_KEY, } from './utils';
import { ColorPicker, SpotlightComponent, Toast } from './components';
import { getColorFunction, themes } from './theme';
import { pickColor, registerPage, registerCommand, unregister, shell, question, toast } from './commands';
export function Spotlight({ isDarkMode, showRecentlyUsed = 5, showTips = true }) {
    useEffect(() => {
        localStorage.setItem(HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);
    const calculatedTheme = useMemo(() => {
        const selectedTheme = themes[isDarkMode ? 'dark' : 'light'];
        return Object.assign(Object.assign({}, selectedTheme), { color: getColorFunction(Object.assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return (_jsxs(ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: [_jsx(SpotlightComponent, { showTips: showTips }), _jsx(ColorPicker, {}), _jsx(Toast, {})] })));
}
export * from './commands';
export default {
    Spotlight,
    registerPage,
    registerCommand,
    unregister,
    question,
    shell,
    toast,
    pickColor,
};
