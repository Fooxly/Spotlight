import { Answer, RegisterCommandOptions, RegisterOptions } from '../types';
export declare function question(question: string, options?: string[] | Answer[]): Promise<string | Answer>;
export declare function registerCommand<Options extends RegisterCommandOptions>(title: string, action: Options extends {
    options: any[];
} ? ((result: string) => any | Promise<any | unknown | void>) : ((result: undefined) => any | Promise<any | unknown | void>), options?: Options): void;
export declare function registerPage(title: string, page: string, options?: RegisterOptions): void;
export declare function unregister(title: string): void;
