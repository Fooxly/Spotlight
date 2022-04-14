"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_PAGES = exports.BASE_COMMANDS = void 0;
const uuid_1 = require("@/utils/uuid");
exports.BASE_COMMANDS = [
    {
        id: (0, uuid_1.uuid)(),
        action: () => { window.location.reload(); },
        title: 'Reload window',
        type: 'command',
        options: {
            icon: 'redo',
            keywords: ['reload', 'window', 'refresh'],
        }
    },
];
exports.BASE_PAGES = [
    {
        id: (0, uuid_1.uuid)(),
        title: 'Homepage',
        page: '/',
        type: 'jump-to',
        options: {
            icon: 'house',
            keywords: ['home', 'homepage'],
        }
    },
];
