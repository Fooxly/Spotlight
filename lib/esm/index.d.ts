import { Appearance, SpotlightOptions } from './types';
import { registerCommand, registerPage, unregister, question, toast, shell } from './commands';
declare function config(options: SpotlightOptions): void;
declare function setAppearance(appearance: Appearance): void;
export * from './commands';
declare const _default: {
    config: typeof config;
    setAppearance: typeof setAppearance;
    registerCommand: typeof registerCommand;
    registerPage: typeof registerPage;
    unregister: typeof unregister;
    question: typeof question;
    toast: typeof toast;
    shell: typeof shell;
};
export default _default;
