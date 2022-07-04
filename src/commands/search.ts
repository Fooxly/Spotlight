import { Answer, QuestionEvent, QuestionResponseEvent, RegisterOptions } from '@/types';
import { Registry, QUESTION_EVENT_KEY, QUESTION_RESULT_EVENT_KEY, REGISTRY_UPDATE_EVENT_KEY, getUUID } from '@/utils';

function updateSpotlightRegistry (): void {
    const ev = new CustomEvent(REGISTRY_UPDATE_EVENT_KEY, {
        bubbles: false,
    });
    document.dispatchEvent(ev);
}

export function question (
    question: string,
    options: string[] | Answer[] = [],
): Promise<string | Answer> {
    return new Promise((resolve, reject) => {
        const handleRequest = (ev: CustomEvent<QuestionResponseEvent>) => {
            if (!ev.detail.value?.length) {
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
            } as QuestionEvent,
        });
        document.dispatchEvent(ev);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(QUESTION_RESULT_EVENT_KEY, handleRequest as any, { once: true });
    });
}

export function registerCommand (
    title: string,
    action: (result?: string) => any | Promise<any | unknown | void>,
    options?: RegisterOptions,
): void {
    Registry.push({
        id: getUUID(),
        type: 'command',
        key: title,
        label: title,
        action,
        category: options?.category ?? 'Commands',
        icon: options?.icon,
        iconColor: options?.iconColor,
        options: options?.options,
    });
    updateSpotlightRegistry();
}
