import { lens } from '@/utils';

export type HexColor = `#${string}`;
export const colors = {
    green: '#34C759' as HexColor,
    yellow: '#FFCC00' as HexColor,
    orange: '#FF9500' as HexColor,
    red: '#FF3B30' as HexColor,
    teal: '#5AC8FA' as HexColor,
    blue: '#007AFF' as HexColor,
    indigo: '#5856D6' as HexColor,
    purple: '#AF52DE' as HexColor,
    pink: '#FF2D55' as HexColor,
    // Shades
    gray10: '#FFFFFF' as HexColor,
    gray9: '#F2F2F7' as HexColor,
    gray8: '#E5E5EA' as HexColor,
    gray7: '#D1D1D6' as HexColor,
    gray6: '#C7C7CC' as HexColor,
    gray5: '#AEAEB2' as HexColor,
    gray4: '#8E8E93' as HexColor,
    gray3: '#636366' as HexColor,
    gray2: '#3A3A3C' as HexColor,
    gray1: '#000000' as HexColor,
};

export type CSSColor =
    | 'inherit'
    | HexColor
    | `rgb(${number},${number},${number})`
    | `rgba(${number},${number},${number},${number})`;

type Colors = typeof colors;
type SingleColor = keyof Colors;

export type Color = keyof Colors | CSSColor;

type ColorFunction = ((color?: Color, fallback?: Color) => string) & Colors & { colors: Colors };

export function getColorFunction (colorSet: Colors): ColorFunction {
    // Color function
    const color = ((c?: Color, fallback?: Color): string => {
        if (!c) return fallback ? color(fallback) : 'transparent';
        if (c.startsWith('#') || c.startsWith('rgb') || c === 'inherit') return c;

        return lens(colorSet, c) as string ?? (fallback ? color(fallback) : undefined) ?? c ?? 'transparent';
    }) as ColorFunction;

    // Add colors to Color function
    for (const [key, value] of Object.entries(colorSet)) {
        color[key as SingleColor] = value;
    }

    color.colors = colorSet;

    return color;
}

export const color = getColorFunction(colors);
