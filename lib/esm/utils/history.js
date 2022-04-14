import { COMMANDS, PAGES } from './constants';
const HISTORY_KEY = '__fooxly_spotlight_history__';
export function updateHistory(item, maxCount) {
    let keys = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    if (keys.includes(item.title)) {
        keys.splice(keys.indexOf(item.title), 1);
    }
    else {
        keys = keys.slice(0, maxCount);
    }
    keys.unshift(item.title);
    localStorage.setItem(HISTORY_KEY, JSON.stringify([...new Set(keys)]));
}
export function getHistory() {
    const keys = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const commands = [...COMMANDS, ...PAGES];
    const results = keys.map((key) => {
        return commands.find((cmd) => cmd.title === key);
    });
    return results.filter((item) => !!item);
}
export function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
}
