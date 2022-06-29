import { useCallback, useEffect, useState } from 'react';

import { getTheme } from '../appearance';
import { SPOTLIGHT_THEME_KEY, THEME_UPDATE_EVENT_KEY } from '../constants';

import { Appearance, ChangeThemeEvent } from '@/types';

export function useAppearance (forcedAppearance?: Appearance) {
    const [_appearance, SetAppearance] = useState<Appearance>(
        forcedAppearance ??
        (localStorage.getItem(SPOTLIGHT_THEME_KEY) ??
        'auto') as Appearance,
    );
    const [light, setLight] = useState<boolean>(getTheme(_appearance) === 'light');

    const changeAppearance = (ev: CustomEvent<ChangeThemeEvent>) => {
        const newAppearance = ev.detail.appearance;
        SetAppearance(newAppearance);
    };

    const updateTheme = useCallback(() => {
        setLight(getTheme(_appearance) === 'light');
    }, [_appearance]);

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

    useEffect(() => {
        if (forcedAppearance) {
            localStorage.setItem(SPOTLIGHT_THEME_KEY, forcedAppearance);
            SetAppearance(forcedAppearance);
            updateTheme();
        }
    }, [forcedAppearance, updateTheme]);

    return {
        light,
        appearance: _appearance,
    };
}
