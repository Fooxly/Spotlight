"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dark = void 0;
const base_1 = require("../base");
const color_1 = require("./color");
const shadow_1 = require("./shadow");
exports.dark = Object.assign(Object.assign({}, base_1.base), { light: false, color: color_1.color,
    shadow: shadow_1.shadow });
