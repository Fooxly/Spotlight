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
import { css } from 'styled-components';
var weights = {
    System: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
    SourceCodePro: {
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
    },
};
export var FALLBACK = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
export var CODE_FALLBACK = '"SFMono-Regular","SF Mono",Consolas,"Liberation Mono",Menlo,monospace';
export function getFont(font) {
    switch (font) {
        case 'System': return "".concat(FALLBACK);
        case 'SourceCodePro': return "\"Source Code Pro\", ".concat(CODE_FALLBACK);
    }
}
var obj = {};
export var text = Object.keys(weights).reduce(function (acc, ff) {
    var _a;
    var weight = weights[ff];
    return __assign(__assign({}, acc), (_a = {}, _a[ff] = Object.keys(weight).reduce(function (acc, w) {
        var _a;
        var func = function (size, rawColor, alignment) {
            if (alignment === void 0) { alignment = 'inherit'; }
            var color = rawColor !== null && rawColor !== void 0 ? rawColor : 'inherit';
            return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                    font-weight: ", ";\n                    font-family: ", ";\n                    ", "\n                    ", ";\n                    ", ";\n                "], ["\n                    font-weight: ", ";\n                    font-family: ", ";\n                    ", "\n                    ", ";\n                    ", ";\n                "])), weight[w], getFont(ff), "font-size: ".concat(size.toString(), "px;"), function (p) { return color === 'inherit' ? '' : "color: ".concat(p.theme.color(color), ";"); }, alignment === 'inherit' ? '' : "text-align: ".concat(alignment, ";"));
        };
        func.weight = weight[w];
        return __assign(__assign({}, acc), (_a = { family: ff }, _a[w] = func, _a));
    }, obj), _a));
}, obj);
var templateObject_1;
