"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Master = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_1 = require("../../utils");
const toast_1 = require("./toast");
const appearance_1 = require("../../utils/appearance");
const search_1 = require("./search");
require("../../styles/main.css");
function Master(props) {
    var _a;
    const { light, appearance } = (0, utils_1.useAppearance)((_a = props.appearance) !== null && _a !== void 0 ? _a : 'auto');
    const updateTheme = (0, react_1.useCallback)(() => {
        const container = document.querySelector('#spotlight');
        if (!container)
            return;
        container.className = `spotlight-${(0, appearance_1.getTheme)(appearance)}`;
    }, [appearance]);
    (0, react_1.useEffect)(() => {
        var _a;
        void ((_a = props === null || props === void 0 ? void 0 : props.onLoaded) === null || _a === void 0 ? void 0 : _a.call(props));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Update the prop values with the current active state
    (0, react_1.useEffect)(() => {
        updateTheme();
        if (props.showRecentlyUsed) {
            localStorage.setItem(utils_1.HISTORY_LENGTH_KEY, String(props.showRecentlyUsed));
        }
    }, [props, light, updateTheme]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(search_1.Search, Object.assign({}, props)), (0, jsx_runtime_1.jsx)(toast_1.Toast, {})] }));
}
exports.Master = Master;
