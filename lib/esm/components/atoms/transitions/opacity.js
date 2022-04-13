var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
export function OpacityTransition(_a) {
    var children = _a.children, _b = _a.duration, duration = _b === void 0 ? 200 : _b, _c = _a.opacity, opacity = _c === void 0 ? 1 : _c, props = __rest(_a, ["children", "duration", "opacity"]);
    return (_jsx(Transition, __assign({}, props, { timeout: {
            appear: 0,
            enter: 0,
            exit: duration,
        } }, { children: function (state) { return (_jsx(OpacityContainer, __assign({ "$duration": duration, "$entered": state === 'entered', "$opacity": opacity }, { children: children }))); } })));
}
var OpacityContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    will-change: opacity;\n    opacity: ", ";\n    transition: opacity ", "ms ease-out;\n"], ["\n    will-change: opacity;\n    opacity: ", ";\n    transition: opacity ", "ms ease-out;\n"])), function (p) { return p.$entered ? p.$opacity : 0; }, function (p) { return p.$duration; });
var templateObject_1;
