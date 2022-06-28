import { Answer, CommandOption, CommandOptions, ItemOptions, ShellCommandOptions } from '../types';
export declare function unregister(title: string): void;
export declare function registerPage(title: string, page: string, options?: ItemOptions): () => void;
export declare function registerCommand(title: string, action: (result?: string) => any | Promise<any | unknown | void>, options?: CommandOptions): () => void;
export declare function question(question: string, answers?: string[] | Answer[] | CommandOption[]): Promise<string>;
export declare function shell(command: string, options?: ShellCommandOptions): Promise<string | null>;
