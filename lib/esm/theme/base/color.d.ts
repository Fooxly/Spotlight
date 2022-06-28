export declare type HexColor = `#${string}`;
export declare const colors: {
    green: `#${string}`;
    yellow: `#${string}`;
    orange: `#${string}`;
    red: `#${string}`;
    teal: `#${string}`;
    blue: `#${string}`;
    indigo: `#${string}`;
    purple: `#${string}`;
    pink: `#${string}`;
    gray10: `#${string}`;
    gray9: `#${string}`;
    gray8: `#${string}`;
    gray7: `#${string}`;
    gray6: `#${string}`;
    gray5: `#${string}`;
    gray4: `#${string}`;
    gray3: `#${string}`;
    gray2: `#${string}`;
    gray1: `#${string}`;
};
export declare type CSSColor = 'inherit' | HexColor | `rgb(${number},${number},${number})` | `rgba(${number},${number},${number},${number})`;
declare type Colors = typeof colors;
export declare type Color = keyof Colors | CSSColor;
declare type ColorFunction = ((color?: Color, fallback?: Color) => string) & Colors & {
    colors: Colors;
};
export declare function getColorFunction(colorSet: Colors): ColorFunction;
export declare const color: ColorFunction;
export {};
