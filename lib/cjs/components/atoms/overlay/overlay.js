"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hotkeys_hook_1 = require("react-hotkeys-hook");
const utils_1 = require("../../../utils");
require("./styles.css");
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
function Overlay(_a) {
    var { visible, setVisible, children, className } = _a, restProps = __rest(_a, ["visible", "setVisible", "children", "className"]);
    (0, react_hotkeys_hook_1.useHotkeys)('esc', (e) => {
        preventDefault(e);
        handleCloseEvent();
    }, {
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [setVisible]);
    const handleCloseEvent = () => {
        setVisible(false);
        const ev = new CustomEvent(utils_1.SEARCH_CLOSED_EVENT_KEY, {
            bubbles: false,
        });
        document.dispatchEvent(ev);
    };
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({}, restProps, { className: `${className !== null && className !== void 0 ? className : ''} spotlight-overlay`.trim() }, { children: [(0, jsx_runtime_1.jsx)("div", { className: 'spotlight-overlay-background', onClick: handleCloseEvent }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-overlay-content' }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) }))] })));
}
exports.Overlay = Overlay;
