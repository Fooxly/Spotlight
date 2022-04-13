import { Command } from '@/types';
import { uuid } from '@/utils';

export const BASE_COMMANDS: Command[] = [
    {
        id: uuid(),
        action: () => { window.location.href = '/' },
        title: 'Homepage',
        type: 'jump-to',
        options: {
            icon: 'house',
            keywords: ['home', 'homepage'],
        }
    },
    {
        id: uuid(),
        action: () => { window.location.reload() },
        title: 'Reload window',
        type: 'command',
        options: {
            icon: 'redo',
            keywords: ['reload', 'window', 'refresh'],
        }
    },
];
