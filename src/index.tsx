import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { COMMANDS, HISTORY_LENGTH_KEY, PAGES } from './utils';
import { SpotlightComponent } from './spotlight';
import { getColorFunction, themes } from './theme';
import type { CommandOptions, ItemOptions, ShellCommandOptions, Theme } from './types';

interface Props {
    isDarkMode?: boolean;
    showRecentlyUsed?: number;
}

export function Spotlight ({ isDarkMode, showRecentlyUsed = 5 }: Props): JSX.Element {
    useEffect(() => {
        localStorage.setItem(HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);

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

export function registerJumpTo (title: string, page: string, options?: ItemOptions) {
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
        },
    });
}

export function registerCommand (
    title: string,
    action: (result?: string) => any | Promise<any | unknown | void>,
    options?: CommandOptions,
) {
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

export function unregister (title: string): void {
    COMMANDS.splice(COMMANDS.findIndex((command) => command.title === title), 1);
    PAGES.splice(PAGES.findIndex((page) => page.title === title), 1);
}

export async function shell (command: string, options?: ShellCommandOptions) {
    try {
        const raw = await fetch(`http://localhost:${options?.port ?? 1898}/cmd`, {
            method: 'POST',
            body: JSON.stringify({
                command,
                inTerminal: options?.externalTerminal,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response = (await raw.json()) as { success: boolean };

        if (!response.success) throw new Error('COMMAND_FAILED');
    } catch (error) {
        if ((error as Error).message === 'Load failed') throw new Error('SERVER_DOWN');
        throw error;
    }
}

export default {
    Spotlight,
    registerJumpTo,
    registerCommand,
    unregister,
    shell,
};
