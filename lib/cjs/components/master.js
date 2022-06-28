"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Master = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = require("styled-components");
const utils_1 = require("../utils");
const toast_1 = require("../components/toast");
// import { SpotlightComponent } from '../components/spotlight';
// import { ColorPicker } from '../components/color-picker';
const theme_1 = require("../theme");
const appearance_1 = require("../utils/appearance");
function Master(props) {
    var _a;
    const [appearance, SetAppearance] = (0, react_1.useState)((_a = props.appearance) !== null && _a !== void 0 ? _a : 'auto');
    const [forceUpdate, SetForceUpdate] = (0, react_1.useState)(Date.now());
    const changeAppearance = (ev) => {
        const newAppearance = ev.detail.appearance;
        SetAppearance(newAppearance);
    };
    const changeSystemDarkMode = (0, react_1.useCallback)(() => {
        if (appearance !== 'auto')
            return;
        SetForceUpdate(Date.now());
    }, [appearance]);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = props === null || props === void 0 ? void 0 : props.onLoaded) === null || _a === void 0 ? void 0 : _a.call(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, react_1.useEffect)(() => {
        const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.THEME_UPDATE_EVENT_KEY, changeAppearance, false);
        matchDarkMode.addEventListener('change', changeSystemDarkMode);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.THEME_UPDATE_EVENT_KEY, changeAppearance, false);
            matchDarkMode.removeEventListener('change', changeSystemDarkMode);
        };
    }, [changeSystemDarkMode]);
    // Update the prop values with the current active state
    (0, react_1.useEffect)(() => {
        if (props.appearance) {
            SetAppearance(props.appearance);
        }
        if (props.showRecentlyUsed) {
            localStorage.setItem(utils_1.HISTORY_LENGTH_KEY, String(props.showRecentlyUsed));
        }
    }, [props]);
    // Get the theme based on the current appearance
    const calculatedTheme = (0, react_1.useMemo)(() => {
        const selectedTheme = theme_1.themes[(0, appearance_1.getTheme)(appearance)];
        return Object.assign(Object.assign({}, selectedTheme), { color: (0, theme_1.getColorFunction)(Object.assign({}, selectedTheme.color.colors)) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceUpdate, appearance]);
    return ((0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: (0, jsx_runtime_1.jsx)(toast_1.Toast, {}) })));
}
exports.Master = Master;
