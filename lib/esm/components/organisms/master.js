import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect } from 'react';
import { HISTORY_LENGTH_KEY, useAppearance, } from '../../utils';
import { Toast } from './toast';
import { getTheme } from '../../utils/appearance';
import { Search } from './search';
import '../../styles/main.css';
export function Master(props) {
    var _a;
    const { light, appearance } = useAppearance((_a = props.appearance) !== null && _a !== void 0 ? _a : 'auto');
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
    // Update the prop values with the current active state
    useEffect(() => {
        updateTheme();
        if (props.showRecentlyUsed) {
            localStorage.setItem(HISTORY_LENGTH_KEY, String(props.showRecentlyUsed));
        }
    }, [props, light, updateTheme]);
    return (_jsxs(_Fragment, { children: [_jsx(Search, {}), _jsx(Toast, {})] }));
}
