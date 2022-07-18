"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregister = exports.registerPage = exports.registerCommand = exports.question = void 0;
const utils_1 = require("../utils");
function updateSpotlight() {
    const ev = new CustomEvent(utils_1.FORCE_UPDATE_EVENT, {
        bubbles: false,
    });
    document.dispatchEvent(ev);
}
function question(question, options = []) {
    return new Promise((resolve, reject) => {
        const handleRequest = (ev) => {
            var _a;
            if (!((_a = ev.detail.value) === null || _a === void 0 ? void 0 : _a.length)) {
                reject(new Error('NO_VALUE'));
                return;
            }
            resolve(ev.detail.value);
        };
        const ev = new CustomEvent(utils_1.QUESTION_EVENT_KEY, {
            bubbles: false,
            detail: {
                question,
                options,
            },
        });
        document.dispatchEvent(ev);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.QUESTION_RESULT_EVENT_KEY, handleRequest, { once: true });
    });
}
exports.question = question;
function registerCommand(title, action, options) {
    var _a;
    (0, utils_1.addRegistry)({
        id: (0, utils_1.generateId)(title),
        type: 'command',
        key: title,
        label: title,
        action: action,
        category: (_a = options === null || options === void 0 ? void 0 : options.category) !== null && _a !== void 0 ? _a : 'Commands',
        confirm: options === null || options === void 0 ? void 0 : options.confirm,
        icon: options === null || options === void 0 ? void 0 : options.icon,
        iconColor: options === null || options === void 0 ? void 0 : options.iconColor,
        options: options === null || options === void 0 ? void 0 : options.options,
    });
    setTimeout(() => {
        updateSpotlight();
    }, 100);
}
exports.registerCommand = registerCommand;
function registerPage(title, page, options) {
    var _a, _b;
    (0, utils_1.addRegistry)({
        id: (0, utils_1.generateId)(title),
        type: 'page',
        key: title,
        label: title,
        action: () => {
            window.location.href = page;
        },
        category: (_a = options === null || options === void 0 ? void 0 : options.category) !== null && _a !== void 0 ? _a : 'Pages',
        icon: (_b = options === null || options === void 0 ? void 0 : options.icon) !== null && _b !== void 0 ? _b : 'redirect',
        iconColor: options === null || options === void 0 ? void 0 : options.iconColor,
    });
    setTimeout(() => {
        updateSpotlight();
    }, 100);
}
exports.registerPage = registerPage;
function unregister(title) {
    const index = utils_1.registry.items.findIndex((item) => item.key === title);
    if (index === -1)
        return;
    utils_1.registry.items.splice(index, 1);
    setTimeout(() => {
        updateSpotlight();
    }, 100);
}
exports.unregister = unregister;
