import { Icons } from './icons';
import './colors';

export type SpotlightType = 'search' | 'input' | 'question';

export type ColorMode = 'hex' | 'rgba' | 'hsla';

export type ReactChildren =
    // eslint-disable-next-line no-multi-spaces
    |       JSX.Element | JSX.Element[] | false | null | undefined | string
    | Array<JSX.Element | JSX.Element[] | false | null | undefined | string>;

export interface ColorPickerOptions {
    title?: string;
    modes?: ColorMode[];
    alpha?: boolean;
    startColor?: string;
}

export type ItemIcon = typeof Icons[number];

export interface ItemOptions {
    // Keywords can be set to make an item more searchable. When searching for a command / page,
    // every keyword will be searched for invidually.
    keywords?: string[];
    // Icon can be set to make an item stand out more and give it more personality.
    icon?: ItemIcon | string;
    // Should the user be warned when they try to execute the item? (A custom warning message can be written here if needed)
    confirm?: boolean | string;
}

export type CommandAction = (result?: string) => any | Promise<any | null | unknown | void>;

export interface Answer { key: string; label: string; icon?: ItemIcon | string }

export interface CommandOption extends ItemOptions {
    // The title which will be shown inside the spotlight results.
    title: string;
    // A list of sub options the user will be shown when clicking on the command. (e.g. a list of themes)
    options?: string[] | CommandOption[];
}

export interface CommandOptionWithAction extends CommandOption {
    // The action which will be executed when the command is clicked.
    action: CommandAction;
}

export interface CommandOptions extends ItemOptions {
    // A list of sub options the user will be shown when clicking on the command. (e.g. a list of themes)
    options?: string[] | CommandOption[] | CommandOptionWithAction[];
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
    action?: () => void;
    actionText?: string;
}

// Category types. This is used to determine how the category will be displayed.
export type CategoryType = 'history' | 'mixed' | 'pages' | 'commands';

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
    action: CommandAction;
    // The type to diffirentiate between commands and pages.
    type: 'command';
    // When asking for a question, there can be a key result which does not have to be shown in the spotlight.
    /** @private */
    returnKey?: string;
    // When the user is inside a nested list, the parent command will always be remembered to execute their action in the end.
    /** @private */
    parentCommand?: Command;
    // This is used internally to detach parents from command when they should not be used.
    /** @private */
    detachAsParent?: boolean;
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
    // If the tips should be visible when nothing has been typed yet.
    showTips?: boolean;
}

// The base Spotlight component.
export declare function Spotlight ({ isDarkMode, showRecentlyUsed }: Props): JSX.Element;

// Register a custom redirect.
export declare function registerPage (title: string, page: string, options?: ItemOptions): () => void;

// Register a custom command.
export declare function registerCommand (
    title: string, action: (result?: string) => any | Promise<any | unknown | void>,
    options?: CommandOptions,
): () => void;

// Removes a command /page from the registered commands / page lists.
export declare function unregister (title: string): void;

// Shows a toast message at the bottom of the screen.
export declare function toast (message: string | JSX.Element): void;

// Ask the user for a question with possible answers.
export declare function question (
    question: string,
    answers?: string[] | Answer[] | CommandOption[]
): Promise<string>;

export declare function pickColor (options?: ColorPickerOptions): Promise<Record<string, string>>;

// Execute a shell command in an external script. (This only runs when the spotlight server is running)
export declare function shell (command: string, options?: ShellCommandOptions | undefined): Promise<string | null>;

declare const _default: {
    Spotlight: typeof Spotlight;
    registerPage: typeof registerPage;
    registerCommand: typeof registerCommand;
    unregister: typeof unregister;
    question: typeof question;
    shell: typeof shell;
    toast: typeof toast;
    pickColor: typeof pickColor;
};

export default _default;
