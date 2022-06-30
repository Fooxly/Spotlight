import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { HISTORY_LENGTH_KEY } from './utils';
import { isSystemInDarkMode } from './utils/appearance';
import { ColorGrabber, ColorGrabberProps, ColorPicker, SpotlightComponent, Toast } from './components';
import { getColorFunction, themes } from './theme';

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
    onBranchSwitchCmd?: string | null;
}

export function Spotlight ({
    isDarkMode,
    onBranchSwitchCmd,
    showTips = true,
    showRecentlyUsed = 5,
}: Props): JSX.Element {
    const [darkMode, setDarkMode] = useState<boolean>(isDarkMode ?? false);
    const [colorGrabberProps, setColorGrabberProps] = useState<ColorGrabberProps | null>(null);

    const listenerDarkMode = useCallback(() => {
        if (typeof isDarkMode === 'boolean') return;
        setDarkMode(isSystemInDarkMode());
    }, [isDarkMode]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const error = url.searchParams.get('spotlight-error');
        if (error) {
            toast(error);
            url.searchParams.delete('spotlight-error');
            window.history.pushState(
                null,
                '',
                [window.location.pathname, url.searchParams.toString()].filter(Boolean).join('?'),
            );
        }
        const branchSwitched = url.searchParams.get('spotlight-branch-switch') === 'true';
        if (branchSwitched) {
            toast(onBranchSwitchCmd ? 'Please wait ...' : 'Please wait for packages to update ...');
            url.searchParams.delete('spotlight-branch-switch');
            shell(onBranchSwitchCmd ?? 'yarn')
                .then(() => {
                    window.location.href = url.toString();
                })
                .catch(() => {
                    toast('Failed to update packages.');
                });
        }
    }, [onBranchSwitchCmd]);

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
            <ColorPicker setColorGrabberProps={setColorGrabberProps} />
            <ColorGrabber {...colorGrabberProps} />
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
