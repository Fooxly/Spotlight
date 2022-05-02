"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = exports.getFont = exports.CODE_FALLBACK = exports.FALLBACK = void 0;
const styled_components_1 = require("styled-components");
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
exports.FALLBACK = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
exports.CODE_FALLBACK = '"SFMono-Regular","SF Mono",Consolas,"Liberation Mono",Menlo,monospace';
function getFont(font) {
    switch (font) {
        case 'System': return `${exports.FALLBACK}`;
        case 'SourceCodePro': return `"Source Code Pro", ${exports.CODE_FALLBACK}`;
    }
}
exports.getFont = getFont;
const obj = {};
exports.text = Object.keys(weights).reduce(function (acc, ff) {
    const weight = weights[ff];
    return Object.assign(Object.assign({}, acc), { [ff]: Object.keys(weight).reduce(function (acc, w) {
            const func = (size, rawColor, alignment = 'inherit') => {
                const color = rawColor !== null && rawColor !== void 0 ? rawColor : 'inherit';
                return (0, styled_components_1.css) `
                    font-weight: ${weight[w]};
                    font-family: ${getFont(ff)};
                    ${`font-size: ${size.toString()}px;`}
                    ${(p) => color === 'inherit' ? '' : `color: ${p.theme.color(color)};`};
                    ${alignment === 'inherit' ? '' : `text-align: ${alignment};`};
                `;
            };
            func.weight = weight[w];
            return Object.assign(Object.assign({}, acc), { family: ff, [w]: func });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        }, obj) });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
}, obj);
