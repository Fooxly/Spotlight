export interface Item {
    id: string;
    title: string;
    options?: ItemOptions;
    type: 'command' | 'jump-to';
}

export interface Command extends Item {
    action: () => void;
    type: 'command';
}

export interface JumpTo extends Item {
    page: string;
    type: 'jump-to';
}

export interface ItemOptions {
    keywords?: string[];
    icon?: ItemIcon;
}

export type ItemIcon = 'redirect' | 'redo' | 'house' | 'undo';