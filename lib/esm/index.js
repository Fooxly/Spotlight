var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/brace-style */
import React from 'react';
import { THEME_UPDATE_EVENT_KEY } from './utils';
import { registerCommand, question, toast, } from './commands';
const DefaultConfig = {
    devMode: false,
    appearance: 'auto',
    spotlightShortcut: 'cmd+shift+k, ctrl+shift+k',
    colorPickerShortcut: undefined,
    showRecentlyUsed: 5,
    showTips: true,
};
let lastConfigSettings = DefaultConfig;
// Update / set the config for spotlight
function config(options) {
    // Merge the default options (or last chosen options) with the new user chosen ones
    lastConfigSettings = Object.assign(Object.assign({}, lastConfigSettings), options);
    // Get the major react version the project is running on
    const majorReactVersion = Number(React.version.split('.')[0]);
    // #region React 18 and above
    if (majorReactVersion >= 18) {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const { setup } = yield import('./renderers/r18');
            setup(lastConfigSettings);
        }))();
    }
    // #endregion
    // #region React 15 - 17
    else if (majorReactVersion >= 15 && majorReactVersion <= 17) {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const { setup } = yield import('./renderers/r17');
            setup(lastConfigSettings);
        }))();
    }
    // #endregion
    // #region Older React Versions
    else {
        console.error(`Spotlight was not able to start. Your current React version is not supported. Please refer to our Readme for the available versions. (Found React version: ${React.version})`);
    }
    // #endregion
}
// Update the appearance of spotlight
function setAppearance(appearance) {
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
export * from './commands';
export default {
    config,
    setAppearance,
    registerCommand,
    question,
    toast,
};
