"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$icon = void 0;
var styled_components_1 = require("styled-components");
function $icon(props, color, size) {
    var _a, _b;
    if (color === void 0) { color = 'gray1'; }
    if (size === void 0) { size = 25; }
    var colorFunc = (0, styled_components_1.useTheme)().color;
    return [
        color === '' ? undefined : colorFunc((_a = props.color) !== null && _a !== void 0 ? _a : color),
        typeof props.size === 'string' ? Number.parseInt(props.size) : (_b = props.size) !== null && _b !== void 0 ? _b : size,
    ];
}
exports.$icon = $icon;
