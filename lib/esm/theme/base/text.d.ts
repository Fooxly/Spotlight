import { FlattenInterpolation, ThemeProps } from 'styled-components';
import type { Color, Theme } from '../../types';
declare const weights: {
    System: {
        thin: number;
        extralight: number;
        light: number;
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
        extrabold: number;
        black: number;
    };
    SourceCodePro: {
        extralight: number;
        light: number;
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
        black: number;
    };
};
declare type Weights = typeof weights;
export declare type FontFamily = keyof Weights;
export declare type FontWeight<FF extends FontFamily> = keyof Weights[FF];
export declare const FALLBACK = "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif";
export declare const CODE_FALLBACK = "\"SFMono-Regular\",\"SF Mono\",Consolas,\"Liberation Mono\",Menlo,monospace";
export declare function getFont(font: FontFamily): string;
export declare type TextAlign = 'left' | 'center' | 'right' | 'inherit';
declare type TextFunctionBase = (size: number, color?: Color | null, alignment?: TextAlign) => FlattenInterpolation<ThemeProps<Theme>>;
export interface TextFunction extends TextFunctionBase {
    weight: number;
}
declare type Text = {
    [FF in FontFamily]: Record<'family', string> & {
        [w in FontWeight<FF>]: TextFunction;
    };
};
export declare const text: Text;
export {};
