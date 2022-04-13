import React from 'react';

import { $icon, IconProps } from './_icon';

export function SearchIcon (props: IconProps): JSX.Element {
    const [color, size] = $icon(props);

    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M11.2173 19.436C15.6355 19.436 19.2173 15.8543 19.2173 11.436C19.2173 7.01776 15.6355 3.43604 11.2173 3.43604C6.79898 3.43604 3.21725 7.01776 3.21725 11.436C3.21725 15.8543 6.79898 19.436 11.2173 19.436Z' />
            <path stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M21.2173 21.4361L16.8673 17.0861' />
        </svg>
    );
}
