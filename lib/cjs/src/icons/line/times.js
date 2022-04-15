"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _icon_1 = require("./_icon");
function TimesIcon(props) {
    const [color, size] = (0, _icon_1.$icon)(props);
    return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: [(0, jsx_runtime_1.jsx)("path", { d: 'M21 4L4 21', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }), (0, jsx_runtime_1.jsx)("path", { d: 'M4 4L21 21', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' })] }));
}
exports.TimesIcon = TimesIcon;
