import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { SpotlightComponent } from './components';
import { getColorFunction, themes } from './theme';
import { COMMANDS, HISTORY_LENGTH_KEY, PAGES } from './utils';
export function Spotlight({ isDarkMode, showRecentlyUsed = 5 }) {
    useEffect(() => {
        localStorage.setItem(HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);
    const calculatedTheme = useMemo(() => {
        const selectedTheme = themes[isDarkMode ? 'dark' : 'light'];
        return {
            ...selectedTheme,
            color: getColorFunction({ ...selectedTheme.color.colors }),
        };
    }, [isDarkMode]);
    return (_jsx(ThemeProvider, { theme: calculatedTheme, children: _jsx(SpotlightComponent, {}) }));
}
export function RegisterJumpTo(title, page, options) {
    const oldIndex = PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1)
        PAGES.splice(oldIndex, 1);
    const oldCommandIndex = COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldCommandIndex > -1)
        COMMANDS.splice(oldCommandIndex, 1);
    PAGES.push({
        title,
        page,
        type: 'jump-to',
        options: {
            icon: 'redirect',
            ...options,
        }
    });
}
export function RegisterCommand(title, action, options) {
    const oldIndex = COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1)
        COMMANDS.splice(oldIndex, 1);
    const oldPageIndex = PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldPageIndex > -1)
        PAGES.splice(oldPageIndex, 1);
    COMMANDS.push({
        title,
        action,
        type: 'command',
        options,
    });
}
export function Unregister(title) {
    COMMANDS.splice(COMMANDS.findIndex(command => command.title === title), 1);
    PAGES.splice(PAGES.findIndex(page => page.title === title), 1);
}
export default {
    Spotlight,
    RegisterJumpTo,
    RegisterCommand,
    Unregister,
};
