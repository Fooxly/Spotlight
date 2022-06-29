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
require("./styles.css");
function Overlay(_a) {
    var { visible, setVisible, children, className } = _a, restProps = __rest(_a, ["visible", "setVisible", "children", "className"]);
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({}, restProps, { className: `${className !== null && className !== void 0 ? className : ''} spotlight-overlay` }, { children: [(0, jsx_runtime_1.jsx)("div", { className: 'spotlight-overlay-background', onClick: () => setVisible(false) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-overlay-content' }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) }))] })));
}
exports.Overlay = Overlay;
