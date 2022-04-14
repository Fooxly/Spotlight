import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { SpotlightComponent } from './components';
import { getColorFunction, themes } from './theme';
import { ItemOptions, Theme } from './types';
import { COMMANDS, PAGES, uuid } from './utils';

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

export function RegisterJumpTo (title: string, page: string, options?: ItemOptions): string {
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

export function RegisterCommand (title: string, action: () => void, options?: ItemOptions): string {
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

export function Unregister (id: string): void {
    COMMANDS.splice(COMMANDS.findIndex(command => command.id === id), 1);
    PAGES.splice(PAGES.findIndex(page => page.id === id), 1);
}

export default {
    Spotlight,
    RegisterJumpTo,
    RegisterCommand,
    Unregister,
}
