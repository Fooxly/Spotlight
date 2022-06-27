import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import {
    HISTORY_LENGTH_KEY,
} from './utils';
import { ColorPicker, SpotlightComponent, Toast } from './components';
import { getColorFunction, themes } from './theme';

import type { Theme } from '@/types/theme';
import { pickColor, registerPage, registerCommand, unregister, shell, question, toast } from '@/commands';

interface Props {
    isDarkMode?: boolean;
    showRecentlyUsed?: number;
    showTips?: boolean;
}

export function Spotlight ({ isDarkMode, showRecentlyUsed = 5, showTips = true }: Props): JSX.Element {
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
