import { css, FlattenInterpolation, ThemeProps } from 'styled-components';

import type { Color, Theme } from '@/types';

const weights = {
    System: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
    SourceCodePro: {
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
    },
};

type Weights = typeof weights;
export type FontFamily = keyof Weights;
export type FontWeight<FF extends FontFamily> = keyof Weights[FF];

export const FALLBACK =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
export const CODE_FALLBACK =
    '"SFMono-Regular","SF Mono",Consolas,"Liberation Mono",Menlo,monospace';

export function getFont (font: FontFamily): string {
    switch (font) {
        case 'System': return `${FALLBACK}`;
        case 'SourceCodePro': return `"Source Code Pro", ${CODE_FALLBACK}`;
    }
}

export type TextAlign = 'left' | 'center' | 'right' | 'inherit';
type TextFunctionBase = (
    size: number,
    color?: Color | null,
    alignment?: TextAlign,
) => FlattenInterpolation<ThemeProps<Theme>>;
export interface TextFunction extends TextFunctionBase {
    weight: number;
}
type Text = {
    [FF in FontFamily]: Record<'family', string> & { [w in FontWeight<FF>]: TextFunction }
};

const obj: any = {};
export const text = (Object.keys(weights) as FontFamily[]).reduce<Text>(function (acc, ff) {
    const weight = weights[ff];
    type FontFamilyObj = Record<keyof Weights[typeof ff], TextFunction>;

    return {
        ...acc,
        [ff]: (Object.keys(weight) as Array<keyof typeof weight>).reduce<FontFamilyObj>(function (acc, w) {
            const func: TextFunction = (size, rawColor, alignment = 'inherit') => {
                const color = rawColor ?? 'inherit';
                return css`
                    font-weight: ${weight[w]};
                    font-family: ${getFont(ff)};
                    ${`font-size: ${size.toString()}px;`}
                    ${(p) => color === 'inherit' ? '' : `color: ${p.theme.color(color)};`};
                    ${alignment === 'inherit' ? '' : `text-align: ${alignment};`};
                `;
            };

            func.weight = weight[w];

            return { ...acc, family: ff, [w]: func };
        }, obj),
    };
}, obj);
