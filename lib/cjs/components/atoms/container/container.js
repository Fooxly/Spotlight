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
exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../utils");
require("./styles.css");
function Container(_a) {
    var { children, className } = _a, restProps = __rest(_a, ["children", "className"]);
    const { light } = (0, utils_1.useAppearance)();
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({}, restProps, { className: `${className !== null && className !== void 0 ? className : ''} spotlight-container spotlight-container-${light ? 'light' : 'dark'}`.trim() }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) })));
}
exports.Container = Container;
