/// <reference types="react" />
import { SpotlightType } from '../types';
export interface SpotlightContextType {
    type: SpotlightType;
}
export declare const SpotlightContext: import("react").Context<SpotlightContextType>;
export declare const useSpotlightContext: () => SpotlightContextType;
