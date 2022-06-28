import { ToastMessageEvent, ToastType } from '@/types';
import { TOAST_EVENT_KEY } from '@/utils';

export function toast (message: string | JSX.Element, type: ToastType = 'info'): void {
    const ev = new CustomEvent(TOAST_EVENT_KEY, {
        bubbles: false,
        detail: {
            message,
            type,
        } as ToastMessageEvent,
    });
    document.dispatchEvent(ev);
}
