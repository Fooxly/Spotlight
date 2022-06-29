import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { HISTORY_LENGTH_KEY, } from './utils';
import { ColorPicker, SpotlightComponent, Toast } from './components';
import { getColorFunction, themes } from './theme';
import { isSystemInDarkMode } from './utils/appearance';
import { pickColor, registerPage, registerCommand, unregister, shell, question, toast, } from './commands';
export function Spotlight({ isDarkMode, onBranchSwitchCmd, showTips = true, showRecentlyUsed = 5, }) {
    const [darkMode, setDarkMode] = useState(isDarkMode !== null && isDarkMode !== void 0 ? isDarkMode : false);
    const listenerDarkMode = useCallback(() => {
        if (typeof isDarkMode === 'boolean')
            return;
        setDarkMode(isSystemInDarkMode());
    }, [isDarkMode]);
    useEffect(() => {
        const url = new URL(window.location.href);
        const error = url.searchParams.get('spotlight-error');
        if (error) {
            toast(error);
            url.searchParams.delete('spotlight-error');
            window.history.pushState(null, '', [window.location.pathname, url.searchParams.toString()].filter(Boolean).join('?'));
        }
        const branchSwitched = url.searchParams.get('spotlight-branch-switch') === 'true';
        if (branchSwitched) {
            toast(onBranchSwitchCmd ? 'Please wait ...' : 'Please wait for packages to update ...');
            url.searchParams.delete('spotlight-branch-switch');
            shell(onBranchSwitchCmd !== null && onBranchSwitchCmd !== void 0 ? onBranchSwitchCmd : 'yarn')
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
        const selectedTheme = themes[darkMode ? 'dark' : 'light'];
        return Object.assign(Object.assign({}, selectedTheme), { color: getColorFunction(Object.assign({}, selectedTheme.color.colors)) });
    }, [darkMode]);
    return (_jsxs(ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: [_jsx(SpotlightComponent, { showTips: showTips }), _jsx(ColorPicker, {}), _jsx(Toast, {})] })));
}
export * from './commands';
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
