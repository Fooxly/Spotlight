import { uuid } from '../../utils/uuid';
export const BASE_COMMANDS = [
    {
        id: uuid(),
        action: () => { window.location.reload(); },
        title: 'Reload window',
        type: 'command',
        options: {
            icon: 'redo',
            keywords: ['reload', 'window', 'refresh'],
        }
    },
];
export const BASE_PAGES = [
    {
        id: uuid(),
        title: 'Homepage',
        page: '/',
        type: 'jump-to',
        options: {
            icon: 'house',
            keywords: ['home', 'homepage'],
        }
    },
];
