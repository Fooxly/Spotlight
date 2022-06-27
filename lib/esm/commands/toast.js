import { TOAST_EVENT_KEY } from '../utils';
export function toast(message) {
    const handleRequest = (ev) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(TOAST_EVENT_KEY, handleRequest);
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    document.addEventListener(TOAST_EVENT_KEY, handleRequest);
    const ev = new CustomEvent(TOAST_EVENT_KEY, {
        bubbles: false,
        detail: {
            value: message,
        },
    });
    // Add a small timeout to wait for possible rerenders inside the spotlight
    setTimeout(() => {
        document.dispatchEvent(ev);
    }, 10);
}
