"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearHistory = exports.getHistory = exports.updateHistory = void 0;
const constants_1 = require("./constants");
const HISTORY_KEY = '__fooxly_spotlight_history__';
function updateHistory(item, maxCount) {
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
exports.updateHistory = updateHistory;
function getHistory() {
    const keys = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const commands = [...constants_1.COMMANDS, ...constants_1.PAGES];
    const results = keys.map((key) => {
        return commands.find((cmd) => cmd.title === key);
    });
    return results.filter((item) => !!item);
}
exports.getHistory = getHistory;
function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
}
exports.clearHistory = clearHistory;
