import { Registry, QUESTION_EVENT_KEY, QUESTION_RESULT_EVENT_KEY, REGISTRY_UPDATE_EVENT_KEY, getUUID } from '../utils';
function updateSpotlightRegistry() {
    const ev = new CustomEvent(REGISTRY_UPDATE_EVENT_KEY, {
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
    Registry.push({
        id: getUUID(),
        type: 'command',
        label: title,
        action,
        category: (_a = options === null || options === void 0 ? void 0 : options.category) !== null && _a !== void 0 ? _a : 'Commands',
        icon: options === null || options === void 0 ? void 0 : options.icon,
        iconColor: options === null || options === void 0 ? void 0 : options.iconColor,
        options: options === null || options === void 0 ? void 0 : options.options,
    });
    updateSpotlightRegistry();
}
