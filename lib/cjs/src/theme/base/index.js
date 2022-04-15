"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
const animation_1 = require("./animation");
const color_1 = require("./color");
const flex_1 = require("./flex");
const shadow_1 = require("./shadow");
const text_1 = require("./text");
exports.base = {
    light: true,
    animation: animation_1.animation,
    color: color_1.color,
    flex: flex_1.flex,
    shadow: shadow_1.shadow,
    text: text_1.text,
};
