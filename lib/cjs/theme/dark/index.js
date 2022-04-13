"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dark = void 0;
var base_1 = require("../base");
var color_1 = require("./color");
var shadow_1 = require("./shadow");
exports.dark = __assign(__assign({}, base_1.base), { light: false, color: color_1.color, shadow: shadow_1.shadow });
