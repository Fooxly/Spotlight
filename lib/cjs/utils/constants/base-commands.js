"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_PAGES = exports.BASE_COMMANDS = void 0;
exports.BASE_COMMANDS = [
    {
        action: () => { window.location.reload(); },
        title: 'Reload window',
        type: 'command',
        options: {
            icon: 'redo',
            keywords: ['reload', 'window', 'refresh'],
        },
    },
];
exports.BASE_PAGES = [
    {
        title: 'Homepage',
        page: '/',
        type: 'jump-to',
        options: {
            icon: 'house',
            keywords: ['home', 'homepage'],
        },
    },
];
