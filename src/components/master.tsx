import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import {
    HISTORY_LENGTH_KEY, THEME_UPDATE_EVENT_KEY,
} from '../utils';
import { Toast } from '../components/toast';
// import { SpotlightComponent } from '../components/spotlight';
// import { ColorPicker } from '../components/color-picker';
import { getColorFunction, themes } from '../theme';
import { getTheme } from '../utils/appearance';

import type { Appearance, Theme, SpotlightOptions, ChangeThemeEvent } from '@/types';

export function Master (props: SpotlightOptions): JSX.Element {
    const [appearance, SetAppearance] = useState<Appearance>(props.appearance ?? 'auto');
    const [forceUpdate, SetForceUpdate] = useState(Date.now());

    const changeAppearance = (ev: CustomEvent<ChangeThemeEvent>) => {
        const newAppearance = ev.detail.appearance;
        SetAppearance(newAppearance);
    };

    const changeSystemDarkMode = useCallback(() => {
        if (appearance !== 'auto') return;
        SetForceUpdate(Date.now());
    }, [appearance]);

    useEffect(() => {
        props?.onLoaded?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(THEME_UPDATE_EVENT_KEY, changeAppearance as any, false);
        matchDarkMode.addEventListener('change', changeSystemDarkMode);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(THEME_UPDATE_EVENT_KEY, changeAppearance as any, false);
            matchDarkMode.removeEventListener('change', changeSystemDarkMode);
        };
    }, [changeSystemDarkMode]);

    // Update the prop values with the current active state
    useEffect(() => {
        if (props.appearance) {
            SetAppearance(props.appearance);
        }
        if (props.showRecentlyUsed) {
            localStorage.setItem(HISTORY_LENGTH_KEY, String(props.showRecentlyUsed));
        }
    }, [props]);

    // Get the theme based on the current appearance
    const calculatedTheme = useMemo(() => {
        const selectedTheme: Theme = themes[getTheme(appearance)];
        return {
            ...selectedTheme,
            color: getColorFunction({ ...selectedTheme.color.colors }),
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceUpdate, appearance]);

    return (
        <ThemeProvider theme={calculatedTheme}>
            {/* <SpotlightComponent showTips={props.showTips} />
            <ColorPicker /> */}
            <Toast />
        </ThemeProvider>
    );
}
