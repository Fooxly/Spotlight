"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$icon = void 0;
const appearance_1 = require("../../utils/appearance");
function $icon(props, color = 'gray1', size = 25) {
    var _a, _b;
    return [
        color === '' ? undefined : (0, appearance_1.getColor)((_a = props.color) !== null && _a !== void 0 ? _a : color),
        typeof props.size === 'string' ? Number.parseInt(props.size) : (_b = props.size) !== null && _b !== void 0 ? _b : size,
    ];
}
exports.$icon = $icon;
