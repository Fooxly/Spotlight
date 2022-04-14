import { uuid } from '../../utils';
export var BASE_COMMANDS = [
    {
        id: uuid(),
        action: function () { window.location.href = '/'; },
        title: 'Homepage',
        type: 'jump-to',
        options: {
            icon: 'house',
            keywords: ['home', 'homepage'],
        }
    },
    {
        id: uuid(),
        action: function () { window.location.reload(); },
        title: 'Reload window',
        type: 'command',
        options: {
            icon: 'redo',
            keywords: ['reload', 'window', 'refresh'],
        }
    },
];
