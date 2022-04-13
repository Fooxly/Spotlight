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
import styled, { css } from 'styled-components';
import { Transition } from 'react-transition-group';
export function HeightTransition(_a) {
    var children = _a.children, _b = _a.duration, duration = _b === void 0 ? 200 : _b, height = _a.height, className = _a.className, props = __rest(_a, ["children", "duration", "height", "className"]);
    return (_jsx(Transition, __assign({}, props, { timeout: {
            appear: 0,
            enter: 0,
            exit: duration,
        } }, { children: function (state) { return (_jsx(HeightContainer, __assign({ className: className, "$duration": duration, "$entered": state === 'entered', "$height": height }, { children: children }))); } })));
}
var HeightContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    overflow-y: hidden;\n    will-change: max-height;\n    ", "\n    transition: max-height ", "ms ease-out;\n"], ["\n    overflow-y: hidden;\n    will-change: max-height;\n    ", "\n    transition: max-height ", "ms ease-out;\n"])), function (p) { return p.$height !== undefined ? css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        max-height: ", "px;\n    "], ["\n        max-height: ", "px;\n    "])), p.$entered ? p.$height : 0) : ''; }, function (p) { return p.$duration; });
var templateObject_1, templateObject_2;
