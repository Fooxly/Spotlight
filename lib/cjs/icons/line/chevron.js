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
exports.ChevronIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _icon_1 = require("./_icon");
function ChevronIcon(_a) {
    var { direction } = _a, props = __rest(_a, ["direction"]);
    const [color, size] = (0, _icon_1.$icon)(props);
    switch (direction) {
        case 'left': return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: (0, jsx_runtime_1.jsx)("path", { d: 'M15 18L9 12L15 6', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }) })));
        case 'up': return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: (0, jsx_runtime_1.jsx)("path", { d: 'M18 15L12 9L6 15', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }) })));
        case 'down': return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: (0, jsx_runtime_1.jsx)("path", { d: 'M6 9L12 15L18 9', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }) })));
        default: return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: (0, jsx_runtime_1.jsx)("path", { d: 'M9 18L15 12L9 6', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }) })));
    }
}
exports.ChevronIcon = ChevronIcon;
