"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = void 0;
const color_1 = require("../base/color");
exports.color = (0, color_1.getColorFunction)({
    ...color_1.colors,
    green: '#32D74B',
    yellow: '#FFD60A',
    orange: '#FF9F0A',
    red: '#FF453A',
    teal: '#64D2FF',
    blue: '#0A84FF',
    indigo: '#5E5CE6',
    purple: '#BF5AF2',
    pink: '#FF2D55',
    // Shades
    gray10: '#000000',
    gray9: '#1C1C1E',
    gray8: '#2C2C2E',
    gray7: '#3A3A3C',
    gray6: '#48484A',
    gray5: '#636366',
    gray4: '#8E8E93',
    gray3: '#C7C7CC',
    gray2: '#E5E5EA',
    gray1: '#FFFFFF',
});
