import { Icons } from './icons';

export type ItemIcon = typeof Icons[number];

export interface ItemOptions {
    keywords?: string[];
    icon?: ItemIcon;
}

export interface CommandOption extends ItemOptions {
    title: string;
}

export interface CommandOptions extends ItemOptions {
    options?: string[] | CommandOption[];
}

export interface ShellCommandOptions extends ItemOptions {
    port?: number;
    externalTerminal?: boolean;
}

export interface Item {
    title: string;
    options?: ItemOptions;
    type: 'command' | 'jump-to';
}

export interface Category {
    results: Result[];
    title: string;
    type: CategoryType;
}

export type CategoryType = 'history' | 'normal';

export interface Result {
    isRecommended?: boolean;
    index: number;
    item: Item;
}

export interface Command extends Item {
    action: (result?: string) => any | Promise<any | unknown | void>;
    type: 'command';
    parentCommand?: Command;
    options?: CommandOptions;
}

export interface JumpTo extends Item {
    page: string;
    type: 'jump-to';
}

interface Props {
    isDarkMode?: boolean;
    showRecentlyUsed?: number;
}

export declare function Spotlight ({ isDarkMode, showRecentlyUsed }: Props): JSX.Element;

export declare function registerJumpTo (title: string, page: string, options?: ItemOptions): void;

export declare function registerCommand (
    title: string, action: (result?: string) => any | Promise<any | unknown | void>,
    options?: CommandOptions,
): void;

export declare function unregister (title: string): void;

export declare function shell (command: string, options?: ShellCommandOptions | undefined): Promise<void>;

declare const _default: {
    Spotlight: typeof Spotlight;
    registerJumpTo: typeof registerJumpTo;
    registerCommand: typeof registerCommand;
    unregister: typeof unregister;
    shell: typeof shell;
};

export default _default;
