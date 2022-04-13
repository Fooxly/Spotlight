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
exports.Spotlight = exports.Unregister = exports.RegisterCommand = exports.RegisterJumpTo = void 0;
var utils_1 = require("@/utils");
var spotlight_1 = require("./spotlight");
__exportStar(require("./spotlight"), exports);
function RegisterJumpTo(title, page, options) {
    var id = (0, utils_1.uuid)();
    spotlight_1.COMMANDS.push({
        id: id,
        title: title,
        action: function () {
            // TODO: check if this link is external
            if (page.startsWith('/')) {
                window.location.href = "".concat(window.location.origin).concat(page);
            }
            else {
                window.location.href = page;
            }
        },
        type: 'jump-to',
        options: __assign({ icon: 'redirect' }, options)
    });
    return id;
}
exports.RegisterJumpTo = RegisterJumpTo;
function RegisterCommand(title, action, options) {
    var id = (0, utils_1.uuid)();
    spotlight_1.COMMANDS.push({
        id: id,
        title: title,
        action: action,
        type: 'command',
        options: options,
    });
    return id;
}
exports.RegisterCommand = RegisterCommand;
function Unregister(id) {
    spotlight_1.COMMANDS.splice(spotlight_1.COMMANDS.findIndex(function (command) { return command.id === id; }), 1);
}
exports.Unregister = Unregister;
exports.Spotlight = {
    RegisterJumpTo: RegisterJumpTo,
    RegisterCommand: RegisterCommand,
    Unregister: Unregister
};
