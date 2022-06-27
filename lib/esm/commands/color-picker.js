import { ALL_COLOR_MODES, COLOR_PICKER_EVENT_KEY, COLOR_PICKER_RESULT_EVENT_KEY } from '../utils';
export function pickColor(options) {
    const baseOptions = {
        modes: ALL_COLOR_MODES,
        alpha: true,
    };
    return new Promise((resolve, reject) => {
        const handleRequest = (ev) => {
            var _a;
            if (!ev.detail.value || ev.detail.error) {
                reject((_a = ev.detail.error) !== null && _a !== void 0 ? _a : new Error('COLOR_PICK_FAILED'));
                return;
            }
            resolve(ev.detail.value);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(COLOR_PICKER_RESULT_EVENT_KEY, handleRequest);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(COLOR_PICKER_RESULT_EVENT_KEY, handleRequest);
        const ev = new CustomEvent(COLOR_PICKER_EVENT_KEY, {
            bubbles: false,
            detail: Object.assign(Object.assign({}, baseOptions), options),
        });
        // Add a small timeout to wait for possible rerenders inside the spotlight
        setTimeout(() => {
            document.dispatchEvent(ev);
        }, 10);
    });
}
