"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommand = exports.question = void 0;
const utils_1 = require("../utils");
function updateSpotlightRegistry() {
    const ev = new CustomEvent(utils_1.REGISTRY_UPDATE_EVENT_KEY, {
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
    utils_1.Registry.push({
        id: (0, utils_1.getUUID)(),
        type: 'command',
        key: title,
        label: title,
        action,
        category: (_a = options === null || options === void 0 ? void 0 : options.category) !== null && _a !== void 0 ? _a : 'Commands',
        icon: options === null || options === void 0 ? void 0 : options.icon,
        iconColor: options === null || options === void 0 ? void 0 : options.iconColor,
        options: options === null || options === void 0 ? void 0 : options.options,
    });
    updateSpotlightRegistry();
}
exports.registerCommand = registerCommand;
