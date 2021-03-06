import { Answer, CommandOption, CommandOptions, ItemOptions, ShellCommandOptions, SpotlightType } from '@/types';
import { COMMANDS, INPUT_TYPE_EVENT_KEY, PAGES, TEXT_INPUT_RESULT_EVENT_KEY, UPDATE_SPOTLIGHT_EVENT_KEY } from '@/utils';

function updateSpotlightRegistry (): void {
    const ev = new CustomEvent(UPDATE_SPOTLIGHT_EVENT_KEY, {
        bubbles: false,
    });
    // Add a small timeout to wait for possible rerenders inside the spotlight
    setTimeout(() => {
        document.dispatchEvent(ev);
    }, 10);
}

export function unregister (title: string): void {
    const commandIndex = COMMANDS.findIndex((command) => command.title === title);
    if (commandIndex !== -1) {
        COMMANDS.splice(commandIndex, 1);
    }
    const pagesIndex = PAGES.findIndex((page) => page.title === title);
    if (pagesIndex !== -1) {
        PAGES.splice(pagesIndex, 1);
    }
}

export function registerPage (title: string, page: string, options?: ItemOptions): () => void {
    const oldIndex = PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1) PAGES.splice(oldIndex, 1);

    const oldCommandIndex = COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldCommandIndex > -1) COMMANDS.splice(oldCommandIndex, 1);

    PAGES.push({
        title,
        page,
        type: 'jump-to',
        options: {
            icon: 'redirect',
            ...options,
        },
    });
    updateSpotlightRegistry();
    return () => unregister(title);
}

export function registerCommand (
    title: string,
    action: (result?: string) => any | Promise<any | unknown | void>,
    options?: CommandOptions,
): () => void {
    const oldIndex = COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1) COMMANDS.splice(oldIndex, 1);

    const oldPageIndex = PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldPageIndex > -1) PAGES.splice(oldPageIndex, 1);

    COMMANDS.push({
        title,
        action,
        type: 'command',
        options,
    });
    updateSpotlightRegistry();
    return () => unregister(title);
}

export function question (
    question: string,
    answers?: string[] | Answer[] | CommandOption[],
): Promise<string> {
    return new Promise((resolve) => {
        const handleRequest = (ev: CustomEvent<{ value: string }>) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(TEXT_INPUT_RESULT_EVENT_KEY, handleRequest as any);
            resolve(ev.detail.value);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(TEXT_INPUT_RESULT_EVENT_KEY, handleRequest as any);
        const ev = new CustomEvent(INPUT_TYPE_EVENT_KEY, {
            bubbles: false,
            detail: {
                type: (answers?.length ? 'question' : 'input') as SpotlightType,
                question,
                answers,
            },
        });
        // Add a small timeout to wait for possible rerenders inside the spotlight
        setTimeout(() => {
            document.dispatchEvent(ev);
        }, 10);
    });
}

/* eslint-disable @typescript-eslint/no-throw-literal */
export async function shell (command: string, options?: ShellCommandOptions): Promise<string | null> {
    const port = options?.port ?? 1898;

    try {
        const raw = await fetch(`http://localhost:${port}/cmd`, {
            method: 'POST',
            body: JSON.stringify({
                command,
                inTerminal: options?.externalTerminal,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response = (await raw.json()) as { success: boolean; error?: string; result?: string };
        if (!response.success) throw { message: 'COMMAND_FAILED', port, reason: response.error, result: response.result };
        return response.result ?? null;
    } catch (error) {
        if ((error as Error).message === 'Load failed') throw { message: 'SERVER_DOWN', port };
        throw { message: 'UNKNOWN', port, reason: error };
    }
}
