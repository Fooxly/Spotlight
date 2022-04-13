"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_COMMANDS = void 0;
var utils_1 = require("@/utils");
exports.BASE_COMMANDS = [
    {
        id: (0, utils_1.uuid)(),
        action: function () { window.location.href = '/'; },
        title: 'Homepage',
        type: 'jump-to',
        options: {
            icon: 'house',
            keywords: ['home', 'homepage'],
        }
    },
    {
        id: (0, utils_1.uuid)(),
        action: function () { window.location.reload(); },
        title: 'Reload window',
        type: 'command',
        options: {
            icon: 'redo',
            keywords: ['reload', 'window', 'refresh'],
        }
    },
];
