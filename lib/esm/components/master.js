import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { HISTORY_LENGTH_KEY, THEME_UPDATE_EVENT_KEY, } from '../utils';
import { Toast } from '../components/toast';
import { getTheme } from '../utils/appearance';
export function Master(props) {
    var _a;
    const [appearance, SetAppearance] = useState((_a = props.appearance) !== null && _a !== void 0 ? _a : 'auto');
    const changeAppearance = (ev) => {
        const newAppearance = ev.detail.appearance;
        SetAppearance(newAppearance);
    };
    const updateTheme = useCallback(() => {
        const container = document.querySelector('#spotlight');
        if (!container)
            return;
        container.className = `spotlight-${getTheme(appearance)}`;
    }, [appearance]);
    useEffect(() => {
        var _a;
        (_a = props === null || props === void 0 ? void 0 : props.onLoaded) === null || _a === void 0 ? void 0 : _a.call(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
    return (_jsx(_Fragment, { children: _jsx(Toast, {}) }));
}
