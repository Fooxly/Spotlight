"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lens = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const lens = (obj, path) => path.split('.').reduce((o, key) => o?.[key] !== undefined ? o[key] : null, obj);
exports.lens = lens;
