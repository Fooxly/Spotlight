"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = exports.getColorFunction = exports.colors = void 0;
const utils_1 = require("../../utils");
exports.colors = {
    green: '#34C759',
    yellow: '#FFCC00',
    orange: '#FF9500',
    red: '#FF3B30',
    teal: '#5AC8FA',
    blue: '#007AFF',
    indigo: '#5856D6',
    purple: '#AF52DE',
    pink: '#FF2D55',
    // Shades
    gray10: '#FFFFFF',
    gray9: '#F2F2F7',
    gray8: '#E5E5EA',
    gray7: '#D1D1D6',
    gray6: '#C7C7CC',
    gray5: '#AEAEB2',
    gray4: '#8E8E93',
    gray3: '#636366',
    gray2: '#3A3A3C',
    gray1: '#000000',
};
function getColorFunction(colorSet) {
    // Color function
    const color = ((c, fallback) => {
        var _a, _b, _c;
        if (!c)
            return fallback ? color(fallback) : 'transparent';
        if (c.startsWith('#') || c.startsWith('rgb') || c === 'inherit')
            return c;
        return (_c = (_b = (_a = (0, utils_1.lens)(colorSet, c)) !== null && _a !== void 0 ? _a : (fallback ? color(fallback) : undefined)) !== null && _b !== void 0 ? _b : c) !== null && _c !== void 0 ? _c : 'transparent';
    });
    // Add colors to Color function
    for (const [key, value] of Object.entries(colorSet)) {
        color[key] = value;
    }
    color.colors = colorSet;
    return color;
}
exports.getColorFunction = getColorFunction;
exports.color = getColorFunction(exports.colors);
