"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAppearance = exports.generateConfig = exports.DefaultConfig = void 0;
const utils_1 = require("./utils");
exports.DefaultConfig = {
    devMode: false,
    appearance: 'auto',
    spotlightShortcut: 'cmd+shift+k, ctrl+shift+k',
    colorPickerShortcut: undefined,
    showRecentlyUsed: 5,
    showTips: true,
};
let lastConfigSettings = exports.DefaultConfig;
// Update / set the config for spotlight
function generateConfig(setup) {
    return function (options) {
        // Merge the default options (or last chosen options) with the new user chosen ones
        lastConfigSettings = Object.assign(Object.assign({}, lastConfigSettings), options);
        if (typeof window !== 'undefined') {
            localStorage.setItem(utils_1.HISTORY_LENGTH_KEY, lastConfigSettings.showRecentlyUsed.toString());
        }
        setup(lastConfigSettings);
    };
}
exports.generateConfig = generateConfig;
// Update the appearance of spotlight
function setAppearance(appearance) {
    if (typeof window === 'undefined') {
        console.error('Unable to set appearance. Window is not defined.');
        return;
    }
    const ev = new CustomEvent(utils_1.THEME_UPDATE_EVENT_KEY, {
        bubbles: false,
        detail: {
            appearance,
        },
    });
    document.dispatchEvent(ev);
}
exports.setAppearance = setAppearance;
