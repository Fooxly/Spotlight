import React, { useCallback, useEffect, useState } from 'react';

import {
    HISTORY_LENGTH_KEY, THEME_UPDATE_EVENT_KEY,
} from '../utils';
import { Toast } from '../components/toast';
import { getTheme } from '../utils/appearance';

import type { Appearance, SpotlightOptions, ChangeThemeEvent } from '@/types';

export function Master (props: SpotlightOptions): JSX.Element {
    const [appearance, SetAppearance] = useState<Appearance>(props.appearance ?? 'auto');

    const changeAppearance = (ev: CustomEvent<ChangeThemeEvent>) => {
        const newAppearance = ev.detail.appearance;
        SetAppearance(newAppearance);
    };

    const updateTheme = useCallback(() => {
        const container = document.querySelector('#spotlight');
        if (!container) return;
        container.className = `spotlight-${getTheme(appearance)}`;
    }, [appearance]);

    useEffect(() => {
        props?.onLoaded?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        updateTheme();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(THEME_UPDATE_EVENT_KEY, changeAppearance as any, false);
        matchDarkMode.addEventListener('change', updateTheme);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(THEME_UPDATE_EVENT_KEY, changeAppearance as any, false);
            matchDarkMode.removeEventListener('change', updateTheme);
        };
    }, [updateTheme]);

    // Update the prop values with the current active state
    useEffect(() => {
        if (props.appearance) {
            SetAppearance(props.appearance);
            updateTheme();
        }
        if (props.showRecentlyUsed) {
            localStorage.setItem(HISTORY_LENGTH_KEY, String(props.showRecentlyUsed));
        }
    }, [props, updateTheme]);

    return (
        <>
            <Toast />
        </>
    );
}
