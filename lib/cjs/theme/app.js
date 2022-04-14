"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStyles = void 0;
const styled_components_1 = require("styled-components");
const fonts_1 = require("./fonts");
// NOTE: background-color transition for theme switch
exports.AppStyles = (0, styled_components_1.createGlobalStyle) `
    ${fonts_1.SourceCodePro}

    #dev-toolkit {
        font-family: ${(p) => p.theme.text.System.family};
        line-height: 1.3;
        letter-spacing: .02em;
        ${(p) => p.$animations ? '' : (0, styled_components_1.css) `
            animation-delay: 0s !important;
            animation-duration: 0s !important;
            transition-delay: 0s !important;
            transition-duration: 0s !important;

            ::after,
            ::before {
                animation-delay: 0s !important;
                animation-duration: 0s !important;
                transition-delay: 0s !important;
                transition-duration: 0s !important;
            }
        `}
    }

    #dev-toolkit pre, kbd, code, samp {
        font-family: ${(p) => p.theme.text.SourceCodePro.family};
    }

    #dev-toolkit *::placeholder {
        font-weight: 400;
        color: ${(p) => p.theme.color.gray3} !important;
    }

    #dev-toolkit input[type="password"]::placeholder {
        font-weight: 700;
        letter-spacing: .4em;
    }
`;
