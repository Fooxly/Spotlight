import { lens } from '../../src/utils';
export const colors = {
    green: '#34C759',
    yellow: '#FFCC00',
    orange: '#FF9500',
    red: '#FF3B30',
    teal: '#5AC8FA',
    blue: '#007AFF',
    indigo: '#5856D6',
    purple: '#AF52DE',
    pink: '#FF2D55',
    // Shades
    gray10: '#FFFFFF',
    gray9: '#F2F2F7',
    gray8: '#E5E5EA',
    gray7: '#D1D1D6',
    gray6: '#C7C7CC',
    gray5: '#AEAEB2',
    gray4: '#8E8E93',
    gray3: '#636366',
    gray2: '#3A3A3C',
    gray1: '#000000',
};
export function getColorFunction(colorSet) {
    // Color function
    const color = ((c, fallback) => {
        if (!c)
            return fallback ? color(fallback) : 'transparent';
        if (c.startsWith('#') || c.startsWith('rgb') || c === 'inherit')
            return c;
        return lens(colorSet, c) ?? (fallback ? color(fallback) : undefined) ?? c ?? 'transparent';
    });
    // Add colors to Color function
    for (const [key, value] of Object.entries(colorSet)) {
        color[key] = value;
    }
    color.colors = colorSet;
    return color;
}
export const color = getColorFunction(colors);
