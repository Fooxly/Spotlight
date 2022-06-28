/// <reference types="react" />
import { Icons } from './icons';
import { Appearance } from './theme';
export declare type ToastType = 'warning' | 'error' | 'info';
export declare type SpotlightType = 'search' | 'input' | 'question';
export declare type ColorMode = 'hex' | 'rgba' | 'hsla';
export declare type ReactChildren = JSX.Element | JSX.Element[] | false | null | undefined | string | Array<JSX.Element | JSX.Element[] | false | null | undefined | string>;
export interface ColorPickerOptions {
    title?: string;
    modes?: ColorMode[];
    alpha?: boolean;
}
export declare type ItemIcon = typeof Icons[number];
export interface ItemOptions {
    keywords?: string[];
    icon?: ItemIcon | string;
    confirm?: boolean | string;
}
export declare type CommandAction = (result?: string) => any | Promise<any | null | unknown | void>;
export interface Answer {
    key: string;
    label: string;
    icon?: ItemIcon;
}
export interface CommandOption extends ItemOptions {
    title: string;
    options?: string[] | CommandOption[];
}
export interface CommandOptionWithAction extends CommandOption {
    action: CommandAction;
}
export interface CommandOptions extends ItemOptions {
    options?: string[] | CommandOption[] | CommandOptionWithAction[];
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
    action?: () => void;
    actionText?: string;
}
export declare type CategoryType = 'history' | 'mixed' | 'pages' | 'commands';
export interface Result {
    isRecommended?: boolean;
    index: number;
    item: Item;
}
export interface Command extends Item {
    action: CommandAction;
    type: 'command';
    /** @private */
    returnKey?: string;
    /** @private */
    parentCommand?: Command;
    /** @private */
    detachAsParent?: boolean;
    options?: CommandOptions;
}
export interface JumpTo extends Item {
    page: string;
    type: 'jump-to';
}
export interface SpotlightOptions {
    devMode: boolean;
    appearance?: Appearance;
    spotlightShortcut?: string;
    colorPickerShortcut?: string;
    showRecentlyUsed?: number;
    showTips?: boolean;
    customTips?: string[];
    onLoaded?: () => void;
    onLoadFailed?: (error: Error) => void;
}
