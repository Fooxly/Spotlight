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
import { jsx as _jsx } from "react/jsx-runtime";
import { $icon } from './_icon';
export function RedirectIcon(props) {
    var _a = __read($icon(props), 2), color = _a[0], size = _a[1];
    return (_jsx("svg", __assign({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M4.77539 14.574C4.77539 17.5949 6.7567 19.5762 10.1166 19.5762H11.9397C12.4445 19.5762 12.791 19.1995 12.791 18.74C12.791 18.2804 12.4445 17.9038 11.9397 17.9038H10.1769C7.76618 17.9038 6.43276 16.4724 6.43276 14.5137C6.43276 12.555 7.76618 11.1839 10.1769 11.1839H14.9456L16.6858 11.1086L15.3675 12.216L13.454 14.0843C13.3033 14.235 13.2129 14.4158 13.2129 14.6644C13.2129 15.139 13.5368 15.478 14.034 15.478C14.2374 15.478 14.471 15.38 14.6367 15.2218L18.9534 10.9654C19.1267 10.7997 19.2171 10.5737 19.2171 10.3477C19.2171 10.1141 19.1267 9.88813 18.9534 9.72239L14.6367 5.46598C14.471 5.30777 14.2374 5.20984 14.034 5.20984C13.5368 5.20984 13.2129 5.54885 13.2129 6.02345C13.2129 6.27206 13.3033 6.4604 13.454 6.60353L15.3675 8.47184L16.6858 9.58679L14.9456 9.50392H10.2146C6.8019 9.50392 4.77539 11.5756 4.77539 14.574Z', fill: color }) })));
}
