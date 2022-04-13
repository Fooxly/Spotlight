"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = exports.getColorFunction = exports.colors = void 0;
var utils_1 = require("@/utils");
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
    var e_1, _a;
    // Color function
    var color = (function (c, fallback) {
        var _a, _b, _c;
        if (!c)
            return fallback ? color(fallback) : 'transparent';
        if (c.startsWith('#') || c.startsWith('rgb') || c === 'inherit')
            return c;
        return (_c = (_b = (_a = (0, utils_1.lens)(colorSet, c)) !== null && _a !== void 0 ? _a : (fallback ? color(fallback) : undefined)) !== null && _b !== void 0 ? _b : c) !== null && _c !== void 0 ? _c : 'transparent';
    });
    try {
        // Add colors to Color function
        for (var _b = __values(Object.entries(colorSet)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            color[key] = value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    color.colors = colorSet;
    return color;
}
exports.getColorFunction = getColorFunction;
exports.color = getColorFunction(exports.colors);
