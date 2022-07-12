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
import { useHotkeys } from 'react-hotkeys-hook';
import { SEARCH_CLOSED_EVENT_KEY } from '../../../utils';
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
export function Overlay(_a) {
    var { visible, setVisible, children, className } = _a, restProps = __rest(_a, ["visible", "setVisible", "children", "className"]);
    useHotkeys('esc', (e) => {
        preventDefault(e);
        handleCloseEvent();
    }, {
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [setVisible]);
    const handleCloseEvent = () => {
        setVisible(false);
        const ev = new CustomEvent(SEARCH_CLOSED_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: undefined,
            },
        });
        document.dispatchEvent(ev);
    };
    if (!visible)
        return null;
    return (_jsxs("div", Object.assign({}, restProps, { className: `${className !== null && className !== void 0 ? className : ''} spotlight-overlay`.trim() }, { children: [_jsx("div", { className: 'spotlight-overlay-background', onClick: handleCloseEvent }), _jsx("div", Object.assign({ className: 'spotlight-overlay-content' }, { children: _jsx(_Fragment, { children: children }) }))] })));
}
