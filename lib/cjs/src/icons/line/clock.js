"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _icon_1 = require("./_icon");
function ClockIcon(props) {
    const [color, size] = (0, _icon_1.$icon)(props);
    return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: (0, jsx_runtime_1.jsx)("path", { d: 'M11.9925 19.4933C16.264 19.4933 19.7897 15.9676 19.7897 11.7037C19.7897 7.43973 16.2565 3.91406 11.985 3.91406C7.72102 3.91406 4.20288 7.43973 4.20288 11.7037C4.20288 15.9676 7.72855 19.4933 11.9925 19.4933ZM11.9925 17.9414C8.53463 17.9414 5.76984 15.1616 5.76984 11.7037C5.76984 8.24581 8.53463 5.47349 11.985 5.47349C15.4428 5.47349 18.2227 8.24581 18.2302 11.7037C18.2378 15.1616 15.4504 17.9414 11.9925 17.9414ZM8.19563 12.6529H11.985C12.3315 12.6529 12.5952 12.3892 12.5952 12.0502V7.12333C12.5952 6.78432 12.3315 6.52065 11.985 6.52065C11.6535 6.52065 11.3898 6.78432 11.3898 7.12333V11.4475H8.19563C7.85662 11.4475 7.59295 11.7112 7.59295 12.0502C7.59295 12.3892 7.85662 12.6529 8.19563 12.6529Z', fill: color }) }));
}
exports.ClockIcon = ClockIcon;
