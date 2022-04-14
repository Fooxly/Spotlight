import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { SpotlightComponent } from './components';
import { getColorFunction, themes } from './theme';
import { CommandOptions, Theme } from './types';
import { COMMANDS, uuid } from './utils';

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
        <div id='dev-toolkit'>
            <ThemeProvider theme={calculatedTheme}>
                <SpotlightComponent />
            </ThemeProvider>
        </div>
    );
}


export function RegisterJumpTo (title: string, page: string, options?: CommandOptions): string {
    const id = uuid();
    COMMANDS.push({
        id,
        title,
        action: () => {
            // TODO: check if this link is external
            if (page.startsWith('/')) {
                window.location.href = `${window.location.origin}${page}`;
            } else {
                window.location.href = page;
            }
        },
        type: 'jump-to',
        options: {
            icon: 'redirect',
            ...options,
        }
    });
    return id;
}

export function RegisterCommand (title: string, action: () => void, options?: CommandOptions): string {
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
}

export default {
    Spotlight,
    RegisterJumpTo,
    RegisterCommand,
    Unregister,
}