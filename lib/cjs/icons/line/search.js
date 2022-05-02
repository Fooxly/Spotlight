"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _icon_1 = require("./_icon");
function SearchIcon(props) {
    const [color, size] = (0, _icon_1.$icon)(props);
    return ((0, jsx_runtime_1.jsxs)("svg", Object.assign({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: [(0, jsx_runtime_1.jsx)("path", { stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M11.2173 19.436C15.6355 19.436 19.2173 15.8543 19.2173 11.436C19.2173 7.01776 15.6355 3.43604 11.2173 3.43604C6.79898 3.43604 3.21725 7.01776 3.21725 11.436C3.21725 15.8543 6.79898 19.436 11.2173 19.436Z' }), (0, jsx_runtime_1.jsx)("path", { stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M21.2173 21.4361L16.8673 17.0861' })] })));
}
exports.SearchIcon = SearchIcon;
