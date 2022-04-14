import { Item } from '@/types';
import { COMMANDS, HISTORY_KEY, HISTORY_LENGTH_KEY, PAGES } from './constants';

export function updateHistory (item: Item) {
    let keys: string[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    if (keys.includes(item.title)) {
        keys.splice(keys.indexOf(item.title), 1);
    } else {
        keys = keys.slice(0, Math.max(0, Number(localStorage.getItem(HISTORY_LENGTH_KEY))));
    }
    keys.unshift(item.title);
    localStorage.setItem(HISTORY_KEY, JSON.stringify([...new Set(keys)]));
}

export function getHistory (): Item[] {
    const keys: string[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const commands = [...COMMANDS, ...PAGES];
    const results = keys.map((key: string) => {
        return commands.find((cmd) => cmd.title === key)
    }) as Item[];
    return results.filter((item) => !!item).slice(0, Math.max(0, Number(localStorage.getItem(HISTORY_LENGTH_KEY))));
}

export function clearHistory () {
    localStorage.removeItem(HISTORY_KEY);
}

