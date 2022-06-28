import { TOAST_EVENT_KEY } from '../utils';
export function toast(message, type = 'info') {
    const ev = new CustomEvent(TOAST_EVENT_KEY, {
        bubbles: false,
        detail: {
            message,
            type,
        },
    });
    document.dispatchEvent(ev);
}
