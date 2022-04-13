"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lens = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
var lens = function (obj, path) {
    return path.split('.').reduce(function (o, key) { return (o === null || o === void 0 ? void 0 : o[key]) !== undefined ? o[key] : null; }, obj);
};
exports.lens = lens;
