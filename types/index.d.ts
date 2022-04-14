import { CommandOptions, ItemOptions, ShellCommandOptions } from '@/types';

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
