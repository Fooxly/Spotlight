import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { HISTORY_LENGTH_KEY, THEME_UPDATE_EVENT_KEY, } from '../utils';
import { Toast } from '../components/toast';
// import { SpotlightComponent } from '../components/spotlight';
// import { ColorPicker } from '../components/color-picker';
import { getColorFunction, themes } from '../theme';
import { getTheme } from '../utils/appearance';
export function Master(props) {
    var _a;
    const [appearance, SetAppearance] = useState((_a = props.appearance) !== null && _a !== void 0 ? _a : 'auto');
    const [forceUpdate, SetForceUpdate] = useState(Date.now());
    const changeAppearance = (ev) => {
        const newAppearance = ev.detail.appearance;
        SetAppearance(newAppearance);
    };
    const changeSystemDarkMode = useCallback(() => {
        if (appearance !== 'auto')
            return;
        SetForceUpdate(Date.now());
    }, [appearance]);
    useEffect(() => {
        var _a;
        (_a = props === null || props === void 0 ? void 0 : props.onLoaded) === null || _a === void 0 ? void 0 : _a.call(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(THEME_UPDATE_EVENT_KEY, changeAppearance, false);
        matchDarkMode.addEventListener('change', changeSystemDarkMode);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(THEME_UPDATE_EVENT_KEY, changeAppearance, false);
            matchDarkMode.removeEventListener('change', changeSystemDarkMode);
        };
    }, [changeSystemDarkMode]);
    useEffect(() => {
        if (props.appearance) {
            SetAppearance(props.appearance);
        }
        if (props.showRecentlyUsed) {
            localStorage.setItem(HISTORY_LENGTH_KEY, String(props.showRecentlyUsed));
        }
    }, [props]);
    const calculatedTheme = useMemo(() => {
        const selectedTheme = themes[getTheme(appearance)];
        return Object.assign(Object.assign({}, selectedTheme), { color: getColorFunction(Object.assign({}, selectedTheme.color.colors)) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceUpdate, appearance]);
    return (_jsx(ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: _jsx(Toast, {}) })));
}
