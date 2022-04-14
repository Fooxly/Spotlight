import React from 'react';
import styled, { css, keyframes, useTheme } from 'styled-components';

import type { Color } from '@/types';

interface Props {
    size?: number;
    color?: Color;
    thickness?: number;
}

export function Loading ({
    size = 25,
    color,
    thickness: rawThickness,
}: Props): JSX.Element {
    const { color: themeColor } = useTheme();
    const thickness = rawThickness ?? (size / 10);
    const circleStyle: React.CSSProperties = {};
    const rootStyle: React.CSSProperties = {};
    const rootProps: React.HTMLAttributes<HTMLSpanElement> = {};

    return (
        <Container {...rootProps} style={rootStyle} $size={size} $color={color} role='progressbar'>
            <Svg viewBox={`${size / 2} ${size / 2} ${size} ${size}`}>
                <Circle
                    style={circleStyle}
                    cx={size}
                    cy={size}
                    r={(size - thickness) / 2}
                    fill='none'
                    stroke={themeColor(color)}
                    strokeWidth={thickness}
                />
            </Svg>
        </Container>
    );
}

const CircularRotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Container = styled.span<{ $size: number; $color?: Color }>`
    display: inline-block;
    width: ${(p) => p.$size}px;
    height: ${(p) => p.$size}px;
    color: ${(p) => p.theme.color(p.$color)};
    animation: ${CircularRotate} 1.4s linear infinite;
`;

const Svg = styled.svg`
    display: block;
`;

const DashAnimation = keyframes`
    0% {
        stroke-dasharray: 1px, 200px;
        stroke-dashoffset: 0px;
    }
    50% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -15px;
    }
    100% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -125px;
    }
`;

const Circle = styled.circle`
    display: inline-block;
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    animation: ${DashAnimation} 1.4s ease-in-out infinite;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
    /* stroke: inherit; */
`;
