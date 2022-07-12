import { Appearance, SpotlightOptions } from './types';
export declare const DefaultConfig: SpotlightOptions;
export declare function generateConfig(setup: (options: SpotlightOptions) => void): (options: SpotlightOptions) => void;
export declare function setAppearance(appearance: Appearance): void;
