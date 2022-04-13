export type ReactChildren =
    // eslint-disable-next-line no-multi-spaces
    |       JSX.Element | false | null | undefined | string
    | Array<JSX.Element | false | null | undefined | string>;

export interface Command {
    id: string;
    title: string;
    action: () => void;
    type: 'command' | 'jump-to';
    options?: CommandOptions;
}

export interface CommandOptions {
    keywords?: string[];
    icon?: CommandIcon;
}

export type CommandIcon = 'redirect' | 'redo' | 'house' | 'undo';