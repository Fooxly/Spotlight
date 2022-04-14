"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$icon = void 0;
const styled_components_1 = require("styled-components");
function $icon(props, color = 'gray1', size = 25) {
    const colorFunc = (0, styled_components_1.useTheme)().color;
    return [
        color === '' ? undefined : colorFunc(props.color ?? color),
        typeof props.size === 'string' ? Number.parseInt(props.size) : props.size ?? size,
    ];
}
exports.$icon = $icon;
