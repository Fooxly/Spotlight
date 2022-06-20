import { Icons } from './icons';

import type { Command, JumpTo } from '@/types';
import { toast } from '@/index';

export const BASE_COMMANDS: Command[] = [
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
