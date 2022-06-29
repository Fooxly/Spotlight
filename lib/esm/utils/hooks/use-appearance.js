import { useCallback, useEffect, useState } from 'react';
import { getTheme } from '../appearance';
import { SPOTLIGHT_THEME_KEY, THEME_UPDATE_EVENT_KEY } from '../constants';
export function useAppearance(forcedAppearance) {
    var _a;
    const [_appearance, SetAppearance] = useState(forcedAppearance !== null && forcedAppearance !== void 0 ? forcedAppearance : ((_a = localStorage.getItem(SPOTLIGHT_THEME_KEY)) !== null && _a !== void 0 ? _a : 'auto'));
    const [light, setLight] = useState(getTheme(_appearance) === 'light');
    const changeAppearance = (ev) => {
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
        document.addEventListener(THEME_UPDATE_EVENT_KEY, changeAppearance, false);
        matchDarkMode.addEventListener('change', updateTheme);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(THEME_UPDATE_EVENT_KEY, changeAppearance, false);
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
