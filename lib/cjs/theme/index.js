"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorFunction = exports.themes = void 0;
var base_1 = require("./base");
var dark_1 = require("./dark");
var light = base_1.base;
exports.themes = { light: light, dark: dark_1.dark };
var color_1 = require("./base/color");
Object.defineProperty(exports, "getColorFunction", { enumerable: true, get: function () { return color_1.getColorFunction; } });
__exportStar(require("./app"), exports);
