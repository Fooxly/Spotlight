import { HISTORY_LENGTH_KEY, THEME_UPDATE_EVENT_KEY } from './utils';
export const DefaultConfig = {
    devMode: true,
    appearance: 'auto',
    spotlightShortcut: 'cmd+shift+k, ctrl+shift+k',
    showRecentlyUsed: 5,
    showTips: true,
};
let lastConfigSettings = DefaultConfig;
// Update / set the config for spotlight
export function generateConfig(setup) {
    return function (options) {
        // Merge the default options (or last chosen options) with the new user chosen ones
        lastConfigSettings = Object.assign(Object.assign({}, lastConfigSettings), options);
        if (typeof window !== 'undefined') {
            localStorage.setItem(HISTORY_LENGTH_KEY, lastConfigSettings.showRecentlyUsed.toString());
        }
        setup(lastConfigSettings);
    };
}
// Update the appearance of spotlight
export function setAppearance(appearance) {
    if (typeof window === 'undefined') {
        console.error('Unable to set appearance. Window is not defined.');
        return;
    }
    const ev = new CustomEvent(THEME_UPDATE_EVENT_KEY, {
        bubbles: false,
        detail: {
            appearance,
        },
    });
    document.dispatchEvent(ev);
}
