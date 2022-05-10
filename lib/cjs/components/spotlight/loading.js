"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importStar(require("styled-components"));
function Loading({ size = 25, color, thickness: rawThickness, }) {
    const { color: themeColor } = (0, styled_components_1.useTheme)();
    const thickness = rawThickness !== null && rawThickness !== void 0 ? rawThickness : (size / 10);
    const circleStyle = {};
    const rootStyle = {};
    const rootProps = {};
    return ((0, jsx_runtime_1.jsx)(Container, Object.assign({}, rootProps, { style: rootStyle, "$size": size, "$color": color, role: 'progressbar' }, { children: (0, jsx_runtime_1.jsx)(Svg, Object.assign({ viewBox: `${size / 2} ${size / 2} ${size} ${size}` }, { children: (0, jsx_runtime_1.jsx)(Circle, { style: circleStyle, cx: size, cy: size, r: (size - thickness) / 2, fill: 'none', stroke: themeColor(color), strokeWidth: thickness }) })) })));
}
exports.Loading = Loading;
const CircularRotate = (0, styled_components_1.keyframes) `
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
const Container = styled_components_1.default.span `
    display: inline-block;
    width: ${(p) => p.$size}px;
    height: ${(p) => p.$size}px;
    color: ${(p) => p.theme.color(p.$color)};
    animation: ${CircularRotate} 1.4s linear infinite;
`;
const Svg = styled_components_1.default.svg `
    display: block;
`;
const DashAnimation = (0, styled_components_1.keyframes) `
    0% {
        stroke-dasharray: 1px, 200px;
        stroke-dashoffset: 0px;
    }
    50% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -15px;
    }
    100% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -125px;
    }
`;
const Circle = styled_components_1.default.circle `
    display: inline-block;
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    animation: ${DashAnimation} 1.4s ease-in-out infinite;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
    /* stroke: inherit; */
`;
