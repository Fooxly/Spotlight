import React from 'react';
import { createRoot, Root } from 'react-dom/client';

import { getMainComponent } from '@/utils';
import { SpotlightOptions } from '@/types';
import { Master } from '@/components';

let root: Root | null = null;

export function Setup (options: SpotlightOptions) {
    const mainComponent = getMainComponent();
    if (!mainComponent) {
        console.error('Spotlight was unable to create a root component.');
        return;
    }
    if (!root) {
        root = createRoot(mainComponent);
    }
    root.render(<Master {...options} />);
}
