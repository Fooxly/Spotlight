import { Appearance } from './colors';
export interface SpotlightOptions {
    devMode: boolean;
    appearance?: Appearance;
    spotlightShortcut?: string;
    colorPickerShortcut?: string;
    showRecentlyUsed?: number;
    showTips?: boolean;
    customTips?: string[];
    onLoaded?: () => void;
    onLoadFailed?: (error: Error) => void;
}
