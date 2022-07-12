import React from 'react';

import { getColor } from '@/utils/appearance';

interface Props {
    size?: number;
    color?: string;
    thickness?: number;
}

export function Loading ({
    size = 25,
    color,
    thickness: rawThickness,
}: Props): JSX.Element {
    const themeColor = getColor(color ?? 'blue');
    const thickness = rawThickness ?? (size / 10);
    const circleStyle: React.CSSProperties = {};
    const rootStyle: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        color: themeColor,
    };
    const rootProps: React.HTMLAttributes<HTMLSpanElement> = {};

    return (
        <span {...rootProps} style={rootStyle} role='progressbar' className='spotlight-loader'>
            <svg viewBox={`${size / 2} ${size / 2} ${size} ${size}`}>
                <circle
                    style={circleStyle}
                    cx={size}
                    cy={size}
                    r={(size - thickness) / 2}
                    fill='none'
                    stroke={themeColor}
                    strokeWidth={thickness}
                />
            </svg>
        </span>
    );
}
