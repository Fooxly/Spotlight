export interface Item {
    title: string;
    options?: ItemOptions;
    type: 'command' | 'jump-to';
}

export interface Command extends Item {
    action: (result?: any) => any | Promise<any | unknown | void>;
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

export type ItemIcon = 'redirect' | 'redo' | 'house' | 'undo';