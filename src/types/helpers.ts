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

export interface ItemOptions {
    keywords?: string[];
    icon?: ItemIcon;
}

export interface CommandOptions extends ItemOptions {
    options?: string[];
}

export interface ShellCommandOptions extends ItemOptions {
    port?: number;
    externalTerminal?: boolean;
}

export type ItemIcon = 'redirect' | 'redo' | 'house' | 'undo';
