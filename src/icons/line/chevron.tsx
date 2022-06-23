import React from 'react';

import { $icon, IconProps } from './_icon';

interface Props extends IconProps {
    direction: 'up' | 'down' | 'left' | 'right';
}

export function ChevronIcon ({ direction, ...props }: Props): JSX.Element {
    const [color, size] = $icon(props);

    switch (direction) {
        case 'left': return (
            <svg width={size} height={size} className={props.className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M15 18L9 12L15 6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        );
        case 'up': return (
            <svg width={size} height={size} className={props.className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M18 15L12 9L6 15' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        );
        case 'down': return (
            <svg width={size} height={size} className={props.className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M6 9L12 15L18 9' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        );
        default: return (
            <svg width={size} height={size} className={props.className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M9 18L15 12L9 6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        );
    }
}
