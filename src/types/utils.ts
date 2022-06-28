import { Appearance } from './colors';

export interface SpotlightOptions {
    // If the spotlight is in dev mode or not. Dev mode will give more features but is not suitable for production.
    devMode: boolean;
    // The appearance spotlight should start with. (Default value is auto)
    appearance?: Appearance;
    // A shortcut for the spotlight view. (Default vaue is cmd+shift+k, ctrl+shift+k)
    spotlightShortcut?: string;
    // A shortcut for the color picker. (Default value is null)
    colorPickerShortcut?: string;
    // The amount of items which will be shown in the recently used section in spotlight. (Default value is 5)
    showRecentlyUsed?: number;
    // This can disable the tips view all together. (Default value is true)
    showTips?: boolean;
    // Ability to add your own tips to the tips menu besides the default ones.
    customTips?: string[];
    // Event which fires when the spotlight has loaded.
    onLoaded?: () => void;
    // Event which fires when the spotlight was not loaded successfully.
    onLoadFailed?: (error: Error) => void;
}
