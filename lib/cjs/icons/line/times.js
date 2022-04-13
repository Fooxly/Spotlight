"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.TimesIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var _icon_1 = require("./_icon");
function TimesIcon(props) {
    var _a = __read((0, _icon_1.$icon)(props), 2), color = _a[0], size = _a[1];
    return ((0, jsx_runtime_1.jsxs)("svg", __assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: [(0, jsx_runtime_1.jsx)("path", { d: 'M21 4L4 21', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }), (0, jsx_runtime_1.jsx)("path", { d: 'M4 4L21 21', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' })] })));
}
exports.TimesIcon = TimesIcon;
