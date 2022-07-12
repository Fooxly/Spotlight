/// <reference types="react" />
import { setAppearance } from './entry';
export * from './commands';
export { setAppearance } from './entry';
export declare const config: (options: import("./types").SpotlightOptions) => void;
declare const _default: {
    setAppearance: typeof setAppearance;
    config: (options: import("./types").SpotlightOptions) => void;
    question(question: string, options?: string[] | import("./types").Answer[]): Promise<string | import("./types").Answer>;
    registerCommand(title: string, action: (result?: string | undefined) => any, options?: import("./types").RegisterCommandOptions | undefined): void;
    registerPage(title: string, page: string, options?: import("./types").RegisterOptions | undefined): void;
    unregister(title: string): void;
    shell(command: string, options?: import("./types").ShellOptions | undefined): Promise<string | null>;
    toast(message: string | JSX.Element, type?: import("./types").ToastType): void;
};
export default _default;
