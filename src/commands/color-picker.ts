import { ColorPickerOptions } from '@/types';
import { ALL_COLOR_MODES, COLOR_PICKER_EVENT_KEY, COLOR_PICKER_RESULT_EVENT_KEY } from '@/utils';

export function pickColor (options?: ColorPickerOptions): Promise<Record<string, string>> {
    const baseOptions: ColorPickerOptions = {
        modes: ALL_COLOR_MODES,
        alpha: true,
    };
    return new Promise((resolve, reject) => {
        const handleRequest = (ev: CustomEvent<{ value?: Record<string, string>; error?: Error }>) => {
            if (!ev.detail.value || ev.detail.error) {
                reject(ev.detail.error ?? new Error('COLOR_PICK_FAILED'));
                return;
            }
            resolve(ev.detail.value);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(COLOR_PICKER_RESULT_EVENT_KEY, handleRequest as any);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(COLOR_PICKER_RESULT_EVENT_KEY, handleRequest as any);
        const ev = new CustomEvent(COLOR_PICKER_EVENT_KEY, {
            bubbles: false,
            detail: {
                ...baseOptions,
                ...options,
            },
        });
        // Add a small timeout to wait for possible rerenders inside the spotlight
        setTimeout(() => {
            document.dispatchEvent(ev);
        }, 10);
    });
}
