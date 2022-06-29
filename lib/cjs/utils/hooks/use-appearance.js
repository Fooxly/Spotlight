"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppearance = void 0;
const react_1 = require("react");
const appearance_1 = require("../appearance");
const constants_1 = require("../constants");
function useAppearance(forcedAppearance) {
    var _a;
    const [_appearance, SetAppearance] = (0, react_1.useState)(forcedAppearance !== null && forcedAppearance !== void 0 ? forcedAppearance : ((_a = localStorage.getItem(constants_1.SPOTLIGHT_THEME_KEY)) !== null && _a !== void 0 ? _a : 'auto'));
    const [light, setLight] = (0, react_1.useState)((0, appearance_1.getTheme)(_appearance) === 'light');
    const changeAppearance = (ev) => {
        const newAppearance = ev.detail.appearance;
        SetAppearance(newAppearance);
    };
    const updateTheme = (0, react_1.useCallback)(() => {
        setLight((0, appearance_1.getTheme)(_appearance) === 'light');
    }, [_appearance]);
    (0, react_1.useEffect)(() => {
        const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        updateTheme();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(constants_1.THEME_UPDATE_EVENT_KEY, changeAppearance, false);
        matchDarkMode.addEventListener('change', updateTheme);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(constants_1.THEME_UPDATE_EVENT_KEY, changeAppearance, false);
            matchDarkMode.removeEventListener('change', updateTheme);
        };
    }, [updateTheme]);
    (0, react_1.useEffect)(() => {
        if (forcedAppearance) {
            localStorage.setItem(constants_1.SPOTLIGHT_THEME_KEY, forcedAppearance);
            SetAppearance(forcedAppearance);
            updateTheme();
        }
    }, [forcedAppearance, updateTheme]);
    return {
        light,
        appearance: _appearance,
    };
}
exports.useAppearance = useAppearance;
