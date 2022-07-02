"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const appearance_1 = require("../../../utils/appearance");
require("./styles.css");
function Loading({ size = 25, color, thickness: rawThickness, }) {
    const themeColor = (0, appearance_1.getColor)(color !== null && color !== void 0 ? color : 'blue');
    const thickness = rawThickness !== null && rawThickness !== void 0 ? rawThickness : (size / 10);
    const circleStyle = {};
    const rootStyle = {
        width: `${size}px`,
        height: `${size}px`,
        color: themeColor,
    };
    const rootProps = {};
    return ((0, jsx_runtime_1.jsx)("span", Object.assign({}, rootProps, { style: rootStyle, role: 'progressbar', className: 'spotlight-loader' }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ viewBox: `${size / 2} ${size / 2} ${size} ${size}` }, { children: (0, jsx_runtime_1.jsx)("circle", { style: circleStyle, cx: size, cy: size, r: (size - thickness) / 2, fill: 'none', stroke: themeColor, strokeWidth: thickness }) })) })));
}
exports.Loading = Loading;
