import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { COMMANDS, HISTORY_LENGTH_KEY, INPUT_TYPE_EVENT_KEY, PAGES, TEXT_INPUT_RESULT_EVENT_KEY } from './utils';
import { SpotlightComponent } from './spotlight';
import { getColorFunction, themes } from './theme';

import type { ItemOptions, CommandOptions, ShellCommandOptions, SpotlightType, CommandOption } from '@/types';
import type { Theme } from '@/types/theme';

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

export function question (question: string, answers?: string[] | CommandOption[]): Promise<string> {
    return new Promise((resolve) => {
        const handleInputRequest = (ev: { detail: { value: string } }) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(TEXT_INPUT_RESULT_EVENT_KEY, handleInputRequest as any);
            resolve(ev.detail.value);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(TEXT_INPUT_RESULT_EVENT_KEY, handleInputRequest as any);
        const ev = new CustomEvent(INPUT_TYPE_EVENT_KEY, {
            bubbles: false,
            detail: {
                type: (answers?.length ? 'question' : 'input') as SpotlightType,
                question,
                answers,
            },
        });
        document.dispatchEvent(ev);
    });
}

/* eslint-disable @typescript-eslint/no-throw-literal */
export async function shell (command: string, options?: ShellCommandOptions) {
    const port = options?.port ?? 1898;

    try {
        const raw = await fetch(`http://localhost:${port}/cmd`, {
            method: 'POST',
            body: JSON.stringify({
                command,
                inTerminal: options?.externalTerminal,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response = (await raw.json()) as { success: boolean; error?: string };

        if (!response.success) throw { message: 'COMMAND_FAILED', port, reason: response.error };
    } catch (error) {
        if ((error as Error).message === 'Load failed') throw { message: 'SERVER_DOWN', port };
        throw { message: 'UNKNOWN', port, reason: error };
    }
}

export default {
    Spotlight,
    registerJumpTo,
    registerCommand,
    unregister,
    question,
    shell,
};
