import { Command, CommandOptions } from '@/types';
import { uuid } from '@/utils';
import { COMMANDS } from './spotlight';

export * from './spotlight';

export function RegisterJumpTo (title: string, page: string, options?: CommandOptions): string {
    const id = uuid();
    COMMANDS.push({
        id,
        title,
        action: () => {
            // TODO: check if this link is external
            if (page.startsWith('/')) {
                window.location.href = `${window.location.origin}${page}`;
            } else {
                window.location.href = page;
            }
        },
        type: 'jump-to',
        options: {
            icon: 'redirect',
            ...options,
        }
    });
    return id;
}

export function RegisterCommand (title: string, action: () => void, options?: CommandOptions): string {
    const id = uuid();
    COMMANDS.push({
        id,
        title,
        action,
        type: 'command',
        options,
    });
    return id;
}

export function Unregister (id: string): void {
    COMMANDS.splice(COMMANDS.findIndex(command => command.id === id), 1);
}

export const Spotlight = {
    RegisterJumpTo,
    RegisterCommand,
    Unregister
}
