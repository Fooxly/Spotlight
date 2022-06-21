import { Icons } from './icons';
import { toast } from '../../index';
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
export const BASE_COMMANDS = [
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
                    toast(`"${icon}" is copied to your clipboard!`);
                    return (_b = (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText) === null || _b === void 0 ? void 0 : _b.call(_a, icon);
                }
                else {
                    throw new Error('CLIPBOARD_API_NOT_SUPPORTED');
                }
            }
            catch (_c) {
                toast(`We were not able to copy "${icon}" to your clipboard.`);
            }
        },
        title: 'Spotlight icon list',
        type: 'command',
        options: {
            icon: 'brush',
            keywords: ['icons'],
            options: Icons.map((icon) => ({ title: icon, icon })),
        },
    },
];
export const BASE_PAGES = [
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
export const ICONS = Icons.map((icon) => ({
    title: icon,
    page: '/',
    type: 'jump-to',
    options: {
        icon,
    },
}));
