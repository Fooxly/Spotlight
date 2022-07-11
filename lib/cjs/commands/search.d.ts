import { Answer, RegisterCommandOptions, RegisterOptions } from '../types';
export declare function question(question: string, options?: string[] | Answer[]): Promise<string | Answer>;
export declare function registerCommand(title: string, action: (result?: string) => any | Promise<any | unknown | void>, options?: RegisterCommandOptions): void;
export declare function registerPage(title: string, page: string, options?: RegisterOptions): void;
export declare function unregister(title: string): void;
