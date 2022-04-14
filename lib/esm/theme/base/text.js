import { css } from 'styled-components';
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
export const FALLBACK = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
export const CODE_FALLBACK = '"SFMono-Regular","SF Mono",Consolas,"Liberation Mono",Menlo,monospace';
export function getFont(font) {
    switch (font) {
        case 'System': return `${FALLBACK}`;
        case 'SourceCodePro': return `"Source Code Pro", ${CODE_FALLBACK}`;
    }
}
const obj = {};
export const text = Object.keys(weights).reduce(function (acc, ff) {
    const weight = weights[ff];
    return {
        ...acc,
        [ff]: Object.keys(weight).reduce(function (acc, w) {
            const func = (size, rawColor, alignment = 'inherit') => {
                const color = rawColor ?? 'inherit';
                return css `
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
