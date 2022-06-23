var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { $icon } from './_icon';
export function ChevronIcon(_a) {
    var { direction } = _a, props = __rest(_a, ["direction"]);
    const [color, size] = $icon(props);
    switch (direction) {
        case 'left': return (_jsx("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M15 18L9 12L15 6', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }) })));
        case 'up': return (_jsx("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M18 15L12 9L6 15', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }) })));
        case 'down': return (_jsx("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M6 9L12 15L18 9', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }) })));
        default: return (_jsx("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M9 18L15 12L9 6', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }) })));
    }
}
