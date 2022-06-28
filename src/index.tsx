import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import {
    HISTORY_LENGTH_KEY,
} from './utils';
import { ColorPicker, SpotlightComponent, Toast } from './components';
import { getColorFunction, themes } from './theme';
import { isSystemInDarkMode } from './utils/appearance';

import type { Theme } from '@/types/theme';
import {
    pickColor,
    registerPage,
    registerCommand,
    unregister,
    shell,
    question,
    toast,
} from '@/commands';

interface Props {
    isDarkMode?: boolean;
    showRecentlyUsed?: number;
    showTips?: boolean;
}

export function Spotlight ({ isDarkMode, showRecentlyUsed = 5, showTips = true }: Props): JSX.Element {
    const [darkMode, setDarkMode] = useState<boolean>(isDarkMode ?? false);

    const listenerDarkMode = useCallback(() => {
        if (typeof isDarkMode === 'boolean') return;
        setDarkMode(isSystemInDarkMode());
    }, [isDarkMode]);

    useEffect(() => {
        const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

        // The user has manually set the dark mode property
        if (typeof isDarkMode === 'boolean') {
            matchDarkMode.removeEventListener('change', listenerDarkMode);
            setDarkMode(isDarkMode);
            return;
        }

        matchDarkMode.addEventListener('change', listenerDarkMode);
        listenerDarkMode();
        return () => { matchDarkMode.removeEventListener('change', listenerDarkMode); };
    }, [isDarkMode, listenerDarkMode]);

    useEffect(() => {
        localStorage.setItem(HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);

    const calculatedTheme = useMemo(() => {
        const selectedTheme: Theme = themes[darkMode ? 'dark' : 'light'];
        return {
            ...selectedTheme,
            color: getColorFunction({ ...selectedTheme.color.colors }),
        };
    }, [darkMode]);

    return (
        <ThemeProvider theme={calculatedTheme}>
            <SpotlightComponent showTips={showTips} />
            <ColorPicker />
            <Toast />
        </ThemeProvider>
    );
}

export * from '@/commands';

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
