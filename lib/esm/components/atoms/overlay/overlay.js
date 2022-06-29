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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './styles.css';
export function Overlay(_a) {
    var { visible, setVisible, children, className } = _a, restProps = __rest(_a, ["visible", "setVisible", "children", "className"]);
    if (!visible)
        return null;
    return (_jsxs("div", Object.assign({}, restProps, { className: `${className !== null && className !== void 0 ? className : ''} spotlight-overlay` }, { children: [_jsx("div", { className: 'spotlight-overlay-background', onClick: () => setVisible(false) }), _jsx("div", Object.assign({ className: 'spotlight-overlay-content' }, { children: _jsx(_Fragment, { children: children }) }))] })));
}
