import { COMMANDS, HISTORY_KEY, HISTORY_LENGTH_KEY, PAGES } from './constants';
export function updateHistory(item) {
    var _a;
    let keys = JSON.parse((_a = localStorage.getItem(HISTORY_KEY)) !== null && _a !== void 0 ? _a : '[]');
    if (keys.includes(item.title)) {
        keys.splice(keys.indexOf(item.title), 1);
    }
    else {
        keys = keys.slice(0, Math.max(0, Number(localStorage.getItem(HISTORY_LENGTH_KEY))));
    }
    keys.unshift(item.title);
    localStorage.setItem(HISTORY_KEY, JSON.stringify([...new Set(keys)]));
}
export function getHistory() {
    var _a;
    const keys = JSON.parse((_a = localStorage.getItem(HISTORY_KEY)) !== null && _a !== void 0 ? _a : '[]');
    const commands = [...COMMANDS, ...PAGES];
    const results = keys.map((key) => {
        return commands.find((cmd) => cmd.title === key);
    });
    return results.filter((item) => !!item).slice(0, Math.max(0, Number(localStorage.getItem(HISTORY_LENGTH_KEY))));
}
export function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
}
