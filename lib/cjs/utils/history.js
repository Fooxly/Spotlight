"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearHistory = exports.getHistory = exports.updateHistory = void 0;
const constants_1 = require("./constants");
function updateHistory(item) {
    var _a;
    let keys = JSON.parse((_a = localStorage.getItem(constants_1.HISTORY_KEY)) !== null && _a !== void 0 ? _a : '[]');
    if (keys.includes(item.title)) {
        keys.splice(keys.indexOf(item.title), 1);
    }
    else {
        keys = keys.slice(0, Math.max(0, Number(localStorage.getItem(constants_1.HISTORY_LENGTH_KEY))));
    }
    keys.unshift(item.title);
    localStorage.setItem(constants_1.HISTORY_KEY, JSON.stringify([...new Set(keys)]));
}
exports.updateHistory = updateHistory;
function getHistory() {
    var _a;
    const keys = JSON.parse((_a = localStorage.getItem(constants_1.HISTORY_KEY)) !== null && _a !== void 0 ? _a : '[]');
    const commands = [...constants_1.COMMANDS, ...constants_1.PAGES];
    const results = keys.map((key) => {
        return commands.find((cmd) => cmd.title === key);
    });
    return results.filter((item) => !!item).slice(0, Math.max(0, Number(localStorage.getItem(constants_1.HISTORY_LENGTH_KEY))));
}
exports.getHistory = getHistory;
function clearHistory() {
    localStorage.removeItem(constants_1.HISTORY_KEY);
}
exports.clearHistory = clearHistory;
