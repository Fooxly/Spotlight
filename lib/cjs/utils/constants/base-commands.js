"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICONS = exports.BASE_PAGES = exports.BASE_COMMANDS = void 0;
const icons_1 = require("./icons");
const index_1 = require("../../index");
const DEVELOPER_COMMANDS = [
    {
        action: () => {
            return new Promise(() => {
                throw new Error(
                // eslint-disable-next-line max-len
                'Test error extra long and heavy, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor dui elit, nec bibendum leo luctus non. Phasellus mattis ullamcorper dui');
            });
        },
        title: 'Throw error',
        type: 'command',
        options: {
            icon: 'gear',
            keywords: ['error'],
        },
    },
];
exports.BASE_COMMANDS = [
    ...DEVELOPER_COMMANDS,
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
        action: (icon) => {
            var _a, _b;
            if (!icon)
                return;
            try {
                if (navigator.clipboard) {
                    (0, index_1.toast)(`"${icon}" is copied to your clipboard!`);
                    return (_b = (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText) === null || _b === void 0 ? void 0 : _b.call(_a, icon);
                }
                else {
                    throw new Error('CLIPBOARD_API_NOT_SUPPORTED');
                }
            }
            catch (_c) {
                (0, index_1.toast)(`We were not able to copy "${icon}" to your clipboard.`);
            }
        },
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
