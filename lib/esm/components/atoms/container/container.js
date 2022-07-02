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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useAppearance } from '../../../utils';
import './styles.css';
export function Container(_a) {
    var { children, className } = _a, restProps = __rest(_a, ["children", "className"]);
    const { light } = useAppearance();
    return (_jsx("div", Object.assign({}, restProps, { className: `${className !== null && className !== void 0 ? className : ''} spotlight-container spotlight-container-${light ? 'light' : 'dark'}`.trim() }, { children: _jsx(_Fragment, { children: children }) })));
}
