import { Icons } from './icons';

export type SpotlightType = 'search' | 'input' | 'question';

export type ItemIcon = typeof Icons[number];

export interface ItemOptions {
    // Keywords can be set to make an item more searchable. When searching for a command / page,
    // every keyword will be searched for invidually.
    keywords?: string[];
    // Icon can be set to make an item stand out more and give it more personality.
    icon?: ItemIcon;
    // Should the user be warned when they try to execute the item? (A custom warning message can be written here if needed)
    warnBeforeUse?: boolean | string;
}

export interface CommandOption extends ItemOptions {
    // The title which will be shown inside the spotlight results.
    title: string;
    // A list of sub options the user will be shown when clicking on the command. (e.g. a list of themes)
    options?: string[] | CommandOption[];
}

export interface CommandOptions extends ItemOptions {
    // A list of sub options the user will be shown when clicking on the command. (e.g. a list of themes)
    options?: string[] | CommandOption[];
}

export interface ShellCommandOptions extends ItemOptions {
    // On which port the shell listener will be listening.
    port?: number;
    // Run the shell commands in an external terminal which can be viewed by the user.
    externalTerminal?: boolean;
}

export interface Item {
    // The title which will be shown inside the spotlight results.
    title: string;
    // Customizability for an item.
    options?: ItemOptions;
    // The type of item.
    type: 'command' | 'jump-to';
}

export interface Category {
    // The results that belong to this category.
    results: Result[];
    // The title of the category. This will be shown above the results.
    title: string;
    // The type of category.
    type: CategoryType;
}

// Category types. This is used to determine how the category will be displayed.
export type CategoryType = 'history' | 'normal';

export interface Result {
    // Is this result recommended to the user? This is used to determine how the result will be displayed.
    isRecommended?: boolean;
    // The index of the result.
    index: number;
    // The command / page itself.
    item: Item;
}

export interface Command extends Item {
    // The action which will be executed when the command is clicked.
    action: (result?: string) => any | Promise<any | unknown | void>;
    // The type to diffirentiate between commands and pages.
    type: 'command';
    // When the user is inside a nested list, the parent command will always be remembered to execute their action in the end.
    parentCommand?: Command;
    // Customizability for an item.
    options?: CommandOptions;
}

export interface JumpTo extends Item {
    // The page to which we will be jumping to.
    page: string;
    // The type to diffirentiate between commands and pages.
    type: 'jump-to';
}

interface Props {
    // Should the spotlight be rendered in dark mode?
    isDarkMode?: boolean;
    // The amount of items which will be shown in the spotlight. (Default value is 5)
    showRecentlyUsed?: number;
}

export declare function Spotlight ({ isDarkMode, showRecentlyUsed }: Props): JSX.Element;

export declare function registerJumpTo (title: string, page: string, options?: ItemOptions): void;

export declare function registerCommand (
    title: string, action: (result?: string) => any | Promise<any | unknown | void>,
    options?: CommandOptions,
): void;

export declare function unregister (title: string): void;

export declare function question (question: string, answers?: string[] | CommandOption[]): Promise<string>;

export declare function shell (command: string, options?: ShellCommandOptions | undefined): Promise<void>;

declare const _default: {
    Spotlight: typeof Spotlight;
    registerJumpTo: typeof registerJumpTo;
    registerCommand: typeof registerCommand;
    unregister: typeof unregister;
    question: typeof question;
    shell: typeof shell;
};

export default _default;
