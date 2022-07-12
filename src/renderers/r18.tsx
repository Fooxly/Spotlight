import React from 'react';
import { createRoot, Root } from 'react-dom/client';

import { getMainComponent } from '@/utils';
import { SpotlightOptions } from '@/types';
import { Master } from '@/components';

let root: Root | null = null;

export function setup (options: SpotlightOptions) {
    const mainComponent = getMainComponent();
    if (!mainComponent) {
        if (typeof window !== 'undefined') {
            console.error('Spotlight was unable to create a root component.');
            void options?.onLoadFailed?.(new Error('SPOTLIGHT_NO_ROOT_COMPONENT'));
        }
        return;
    }
    if (!root) {
        root = createRoot(mainComponent);
    }
    root.render(<Master {...options} />);
}
