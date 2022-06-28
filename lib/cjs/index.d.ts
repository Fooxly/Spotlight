import { Appearance, SpotlightOptions } from './types';
import { toast } from './commands';
declare function config(options: SpotlightOptions): void;
declare function setAppearance(appearance: Appearance): void;
export * from './commands';
declare const _default: {
    config: typeof config;
    setAppearance: typeof setAppearance;
    toast: typeof toast;
};
export default _default;
