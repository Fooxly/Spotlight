"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Master = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_1 = require("../utils");
const toast_1 = require("../components/toast");
const appearance_1 = require("../utils/appearance");
function Master(props) {
    var _a;
    const [appearance, SetAppearance] = (0, react_1.useState)((_a = props.appearance) !== null && _a !== void 0 ? _a : 'auto');
    const changeAppearance = (ev) => {
        const newAppearance = ev.detail.appearance;
        SetAppearance(newAppearance);
    };
    const updateTheme = (0, react_1.useCallback)(() => {
        const container = document.querySelector('#spotlight');
        if (!container)
            return;
        container.className = `spotlight-${(0, appearance_1.getTheme)(appearance)}`;
    }, [appearance]);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = props === null || props === void 0 ? void 0 : props.onLoaded) === null || _a === void 0 ? void 0 : _a.call(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, react_1.useEffect)(() => {
        const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        updateTheme();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.THEME_UPDATE_EVENT_KEY, changeAppearance, false);
        matchDarkMode.addEventListener('change', updateTheme);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.THEME_UPDATE_EVENT_KEY, changeAppearance, false);
            matchDarkMode.removeEventListener('change', updateTheme);
        };
    }, [updateTheme]);
    // Update the prop values with the current active state
    (0, react_1.useEffect)(() => {
        if (props.appearance) {
            SetAppearance(props.appearance);
            updateTheme();
        }
        if (props.showRecentlyUsed) {
            localStorage.setItem(utils_1.HISTORY_LENGTH_KEY, String(props.showRecentlyUsed));
        }
    }, [props, updateTheme]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(toast_1.Toast, {}) }));
}
exports.Master = Master;
