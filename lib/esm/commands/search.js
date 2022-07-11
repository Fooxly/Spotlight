import { QUESTION_EVENT_KEY, QUESTION_RESULT_EVENT_KEY, generateId, addRegistry, registry, FORCE_UPDATE_EVENT, } from '../utils';
function updateSpotlight() {
    const ev = new CustomEvent(FORCE_UPDATE_EVENT, {
        bubbles: false,
    });
    document.dispatchEvent(ev);
}
export function question(question, options = []) {
    return new Promise((resolve, reject) => {
        const handleRequest = (ev) => {
            var _a;
            if (!((_a = ev.detail.value) === null || _a === void 0 ? void 0 : _a.length)) {
                reject(new Error('NO_VALUE'));
                return;
            }
            resolve(ev.detail.value);
        };
        const ev = new CustomEvent(QUESTION_EVENT_KEY, {
            bubbles: false,
            detail: {
                question,
                options,
            },
        });
        document.dispatchEvent(ev);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(QUESTION_RESULT_EVENT_KEY, handleRequest, { once: true });
    });
}
export function registerCommand(title, action, options) {
    var _a;
    addRegistry({
        id: generateId(title),
        type: 'command',
        key: title,
        label: title,
        action,
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
export function registerPage(title, page, options) {
    var _a, _b;
    addRegistry({
        id: generateId(title),
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
export function unregister(title) {
    const index = registry.items.findIndex((item) => item.key === title);
    if (index === -1)
        return;
    registry.items.splice(index, 1);
    setTimeout(() => {
        updateSpotlight();
    }, 100);
}
