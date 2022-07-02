import React from 'react';
import ReactDOM from 'react-dom';

import { getMainComponent } from '@/utils';
import { SpotlightOptions } from '@/types';
import { Master } from '@/components';

export function setup (options: SpotlightOptions) {
    const mainComponent = getMainComponent();
    if (!mainComponent) {
        console.error('Spotlight was unable to create a root component.');
        void options?.onLoadFailed?.(new Error('SPOTLIGHT_NO_ROOT_COMPONENT'));
        return;
    }
    ReactDOM.render(<Master {...options} />, mainComponent);
}
