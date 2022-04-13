import React from 'react';

import { $icon, IconProps } from './_icon';

export function TimesIcon (props: IconProps): JSX.Element {
    const [color, size] = $icon(props);

    return (
        <svg width={size} height={size} className={props.className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M21 4L4 21' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M4 4L21 21' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
