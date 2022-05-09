"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-misused-promises */
var express_1 = require("express");
exports.router = (0, express_1.Router)();
var cmd_1 = require("./cmd");
exports.router.post('/cmd', cmd_1.cmd);
