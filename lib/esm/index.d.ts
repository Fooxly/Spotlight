import { Appearance, SpotlightOptions } from './types';
import { pickColor, registerPage, registerCommand, unregister, shell, question, toast } from './commands';
declare function config(options: SpotlightOptions): void;
declare function setAppearance(appearance: Appearance): void;
export * from './commands';
declare const _default: {
    config: typeof config;
    setAppearance: typeof setAppearance;
    toast: typeof toast;
    registerPage: typeof registerPage;
    registerCommand: typeof registerCommand;
    unregister: typeof unregister;
    question: typeof question;
    shell: typeof shell;
    pickColor: typeof pickColor;
};
export default _default;
