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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { $icon } from './_icon';
export function SearchIcon(props) {
    var _a = __read($icon(props), 2), color = _a[0], size = _a[1];
    return (_jsxs("svg", __assign({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: [_jsx("path", { stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M11.2173 19.436C15.6355 19.436 19.2173 15.8543 19.2173 11.436C19.2173 7.01776 15.6355 3.43604 11.2173 3.43604C6.79898 3.43604 3.21725 7.01776 3.21725 11.436C3.21725 15.8543 6.79898 19.436 11.2173 19.436Z' }), _jsx("path", { stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M21.2173 21.4361L16.8673 17.0861' })] })));
}
