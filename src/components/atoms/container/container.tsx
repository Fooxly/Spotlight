import React from 'react';

import { useAppearance } from '@/utils';

import './styles.css';

export function Container ({ children, className, ...restProps }: React.HTMLProps<HTMLDivElement>): JSX.Element {
    const { light } = useAppearance();

    return (
        <div {...restProps} className={`${className ?? ''} spotlight-container spotlight-container-${light ? 'light' : 'dark'}`}>
            <>
                {children}
            </>
        </div>
    );
}
