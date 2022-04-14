import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { SpotlightComponent } from './components';
import { getColorFunction, themes } from './theme';
import { CommandOptions, ItemOptions, Theme } from './types';
import { COMMANDS, PAGES } from './utils';

interface Props {
    isDarkMode?: boolean;
}

export function Spotlight ({ isDarkMode }: Props): JSX.Element {
    const calculatedTheme = useMemo(() => {
    const selectedTheme: Theme = themes[isDarkMode ? 'dark' : 'light'];
        return {
            ...selectedTheme,
            color: getColorFunction({ ...selectedTheme.color.colors }),
        };
    }, [isDarkMode]);

    return (
        <ThemeProvider theme={calculatedTheme}>
            <SpotlightComponent />
        </ThemeProvider>
    );
}

export function RegisterJumpTo (title: string, page: string, options?: ItemOptions) {
    const oldIndex = PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1) PAGES.splice(oldIndex, 1);

    const oldCommandIndex = COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldCommandIndex > -1) COMMANDS.splice(oldCommandIndex, 1);

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

export function RegisterCommand (title: string, action: () => any | Promise<any | unknown | void>, options?: CommandOptions) {
    const oldIndex = COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1) COMMANDS.splice(oldIndex, 1);

    const oldPageIndex = PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldPageIndex > -1) PAGES.splice(oldPageIndex, 1);

    COMMANDS.push({
        title,
        action,
        type: 'command',
        options,
    });
}

export function Unregister (title: string): void {
    COMMANDS.splice(COMMANDS.findIndex(command => command.title === title), 1);
    PAGES.splice(PAGES.findIndex(page => page.title === title), 1);
}

export default {
    Spotlight,
    RegisterJumpTo,
    RegisterCommand,
    Unregister,
}
