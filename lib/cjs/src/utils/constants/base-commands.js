"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICONS = exports.BASE_PAGES = exports.BASE_COMMANDS = void 0;
const icons_1 = require("types/icons");
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
    {
        action: console.log,
        title: 'Spotlight icon list',
        type: 'command',
        options: {
            icon: 'brush',
            keywords: ['icons'],
            options: icons_1.Icons.map((icon) => ({ title: icon, icon })),
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
exports.ICONS = icons_1.Icons.map((icon) => ({
    title: icon,
    page: '/',
    type: 'jump-to',
    options: {
        icon,
    },
}));
