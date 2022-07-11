import { HISTORY_KEY, HISTORY_LENGTH_KEY } from './constants';

import { Result } from '@/types';

export function updateHistory (item: Result) {
    let keys: string[] = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]') as string[];
    if (keys.includes(item.id)) {
        keys.splice(keys.indexOf(item.id), 1);
    } else {
        keys = keys.slice(0, Math.max(0, Number(localStorage.getItem(HISTORY_LENGTH_KEY))));
    }
    keys.unshift(item.id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify([...new Set(keys)]));
}

export function getHistory (): string[] {
    const keys: string[] = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]') as string[];
    return keys.slice(0, Math.max(0, Number(localStorage.getItem(HISTORY_LENGTH_KEY))));
}

export function clearHistory () {
    localStorage.removeItem(HISTORY_KEY);
}
