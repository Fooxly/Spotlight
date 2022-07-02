import { Answer, RegisterOptions } from '../types';
export declare function question(question: string, options?: string[] | Answer[]): Promise<string | Answer>;
export declare function registerCommand(title: string, action: (result?: string) => any | Promise<any | unknown | void>, options?: RegisterOptions): void;
