import React, { useCallback, useEffect } from 'react';

import {
    HISTORY_LENGTH_KEY, useAppearance,
} from '../../utils';
import { Toast } from './toast';
import { getTheme } from '../../utils/appearance';
import { Search } from './search';

import type { SpotlightOptions } from '@/types';

import '@/styles/main.css';

export function Master (props: SpotlightOptions): JSX.Element {
    const { light, appearance } = useAppearance(props.appearance ?? 'auto');

    const updateTheme = useCallback(() => {
        const container = document.querySelector('#spotlight');
        if (!container) return;
        container.className = `spotlight-${getTheme(appearance)}`;
    }, [appearance]);

    useEffect(() => {
        void props?.onLoaded?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update the prop values with the current active state
    useEffect(() => {
        updateTheme();
        if (props.showRecentlyUsed) {
            localStorage.setItem(HISTORY_LENGTH_KEY, String(props.showRecentlyUsed));
        }
    }, [props, light, updateTheme]);

    return (
        <>
            <Search {...props} />
            <Toast />
        </>
    );
}
