/* eslint-disable @typescript-eslint/brace-style */
import React from 'react';

import { THEME_UPDATE_EVENT_KEY } from './utils';

import { Appearance, SpotlightOptions } from '@/types';
import {
    registerCommand,
    question,
    toast,
} from '@/commands';

const DefaultConfig: SpotlightOptions = {
    devMode: false,
    appearance: 'auto',
    spotlightShortcut: 'cmd+shift+k, ctrl+shift+k',
    colorPickerShortcut: undefined,
    showRecentlyUsed: 5,
    showTips: true,
};

let lastConfigSettings = DefaultConfig;

// Update / set the config for spotlight
function config (options: SpotlightOptions) {
    // Merge the default options (or last chosen options) with the new user chosen ones
    lastConfigSettings = { ...lastConfigSettings, ...options };
    // Get the major react version the project is running on
    const majorReactVersion = Number(React.version.split('.')[0]);

    // #region React 18 and above
    if (majorReactVersion >= 18) {
        void (async () => {
            const { setup } = await import('./renderers/r18');
            setup(lastConfigSettings);
        })();
    }
    // #endregion
    // #region React 15 - 17
    else if (majorReactVersion >= 15 && majorReactVersion <= 17) {
        void (async () => {
            const { setup } = await import('./renderers/r17');
            setup(lastConfigSettings);
        })();
    }
    // #endregion
    // #region Older React Versions
    else {
        console.error(`Spotlight was not able to start. Your current React version is not supported. Please refer to our Readme for the available versions. (Found React version: ${React.version})`);
    }
    // #endregion
}

// Update the appearance of spotlight
function setAppearance (appearance: Appearance) {
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

export * from '@/commands';
export default {
    config,
    setAppearance,
    registerCommand,
    question,
    toast,
};
