import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { SpotlightComponent } from './components';
import { getColorFunction, themes } from './theme';
import { COMMANDS, PAGES, uuid } from './utils';
export function Spotlight({ isDarkMode }) {
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
    const id = uuid();
    PAGES.push({
        id,
        title,
        page,
        type: 'jump-to',
        options: {
            icon: 'redirect',
            ...options,
        }
    });
    return id;
}
export function RegisterCommand(title, action, options) {
    const id = uuid();
    COMMANDS.push({
        id,
        title,
        action,
        type: 'command',
        options,
    });
    return id;
}
export function Unregister(id) {
    COMMANDS.splice(COMMANDS.findIndex(command => command.id === id), 1);
    PAGES.splice(PAGES.findIndex(page => page.id === id), 1);
}
export default {
    Spotlight,
    RegisterJumpTo,
    RegisterCommand,
    Unregister,
};
