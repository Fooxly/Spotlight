import { Icons } from './icons';

import type { Command, JumpTo } from '@/types';
import { toast } from '@/index';

const DEVELOPER_COMMANDS: Command[] = [
    {
        action: () => {
            return new Promise(() => {
                throw new Error(
                    // eslint-disable-next-line max-len
                    'Test error extra long and heavy, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor dui elit, nec bibendum leo luctus non. Phasellus mattis ullamcorper dui',
                );
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

export const BASE_COMMANDS: Command[] = [
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
            if (!icon) return;
            try {
                if (navigator.clipboard) {
                    toast(`"${icon}" is copied to your clipboard!`);
                    return navigator.clipboard?.writeText?.(icon);
                } else {
                    throw new Error('CLIPBOARD_API_NOT_SUPPORTED');
                }
            } catch {
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

export const BASE_PAGES: JumpTo[] = [
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

export const ICONS: JumpTo[] = Icons.map((icon) => ({
    title: icon,
    page: '/',
    type: 'jump-to',
    options: {
        icon,
    },
}));
