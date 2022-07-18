import { Answer, QuestionEvent, QuestionResponseEvent, RegisterCommandOptions, RegisterOptions } from '@/types';
import {
    QUESTION_EVENT_KEY,
    QUESTION_RESULT_EVENT_KEY,
    generateId,
    addRegistry,
    registry,
    FORCE_UPDATE_EVENT,
} from '@/utils';

function updateSpotlight (): void {
    const ev = new CustomEvent(FORCE_UPDATE_EVENT, {
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

export function registerCommand <Options extends RegisterCommandOptions> (
    title: string,
    action: Options extends { options: any[] }
        ? ((result: string) => any | Promise<any | unknown | void>)
        : ((result: undefined) => any | Promise<any | unknown | void>),
    options?: Options,
): void {
    addRegistry({
        id: generateId(title),
        type: 'command',
        key: title,
        label: title,
        action: action as never,
        category: options?.category ?? 'Commands',
        confirm: options?.confirm,
        icon: options?.icon,
        iconColor: options?.iconColor,
        options: options?.options,
    });
    setTimeout(() => {
        updateSpotlight();
    }, 100);
}

export function registerPage (
    title: string,
    page: string,
    options?: RegisterOptions,
): void {
    addRegistry({
        id: generateId(title),
        type: 'page',
        key: title,
        label: title,
        action: () => {
            window.location.href = page;
        },
        category: options?.category ?? 'Pages',
        icon: options?.icon ?? 'redirect',
        iconColor: options?.iconColor,
    });
    setTimeout(() => {
        updateSpotlight();
    }, 100);
}

export function unregister (title: string) {
    const index = registry.items.findIndex((item) => item.key === title);
    if (index === -1) return;
    registry.items.splice(index, 1);
    setTimeout(() => {
        updateSpotlight();
    }, 100);
}
