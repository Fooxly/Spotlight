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
import { css } from 'styled-components';
function getFlexCss(direction, _a) {
    var _b = _a.align, align = _b === void 0 ? 'flex-start' : _b, _c = _a.justify, justify = _c === void 0 ? 'flex-start' : _c, _d = _a.grow, grow = _d === void 0 ? 0 : _d, _e = _a.shrink, shrink = _e === void 0 ? 1 : _e, _f = _a.basis, basis = _f === void 0 ? 'auto' : _f, _g = _a.fullWidth, fullWidth = _g === void 0 ? false : _g, _h = _a.fullHeight, fullHeight = _h === void 0 ? false : _h;
    return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        display: flex;\n        flex-direction: ", ";\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n    "], ["\n        display: flex;\n        flex-direction: ", ";\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n    "])), direction, align === 'flex-start' ? '' : "align-items: ".concat(align, ";"), justify === 'flex-start' ? '' : "justify-content: ".concat(justify, ";"), grow === false || grow === 0 ? '' : "flex-grow: ".concat(grow === true ? '1' : grow, ";"), shrink === true || shrink === 1 ? '' : "flex-shrink: ".concat(shrink === false ? '0' : shrink, ";"), basis === 'auto' ? '' : "flex-basis: ".concat(basis, ";"), fullWidth ? 'width: 100%;' : '', fullHeight ? 'height: 100%;' : '');
}
function row(_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.reverse, reverse = _b === void 0 ? false : _b, _c = _a.align, align = _c === void 0 ? 'center' : _c, _d = _a.fullWidth, fullWidth = _d === void 0 ? true : _d, props = __rest(_a, ["reverse", "align", "fullWidth"]);
    return getFlexCss(reverse ? 'row-reverse' : 'row', __assign({ align: align, fullWidth: fullWidth }, props));
}
function column(_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.reverse, reverse = _b === void 0 ? false : _b, props = __rest(_a, ["reverse"]);
    return getFlexCss(reverse ? 'column-reverse' : 'column', props);
}
export var flex = { row: row, col: column };
var templateObject_1;
